import { CustomAuthError, MangaUser } from '../../models/manga-user.model';
import { APP_ROUTES } from '../../utils/app-routes';
import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  signOut,
  User,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { catchError, from, map, Observable, of, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private userStateSig = toSignal(authState(this.auth));

  public signOut() {
    signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate([APP_ROUTES.LOGIN]);
    });
  }

  constructor() {
    effect(() => {
      const user = this.userStateSig();
      if (localStorage.getItem('user')) {
        // User is already logged in
        return;
      }
      if (user) {
        // User is freshly logged in
        this.setUserData(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate([APP_ROUTES.PROFILE]);
        return;
      }
    });
  }

  public get userDataSnapshot(): MangaUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  public getUserData() {
    if (!this.userDocumentRef) {
      return of(undefined);
    }
    return docData(this.userDocumentRef) as Observable<MangaUser | undefined>;
  }

  public get userDocumentRef() {
    const uid = this.userDataSnapshot?.uid;
    if (!uid) {
      return null;
    }
    return doc(this.firestore, 'users', uid);
  }

  public isLoggedInSig() {
    return computed(() => this.userStateSig() !== null);
  }

  public registerWithEmailAndPassword(
    email: string,
    password: string,
    username: string
  ) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        this.setUserData({ ...userCredential.user, displayName: username });
        return userCredential.user.uid;
      })
      .catch(error => {
        const customError: CustomAuthError = {
          code: error.code ?? 'Unknown Error Code',
          message: error.message ?? 'Unknown Error Occurred',
        };
        return customError;
      });
  }

  public logInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => userCredential.user.uid)
      .catch(error => {
        const customError: CustomAuthError = {
          code: error.code ?? 'Unknown Error Code',
          message: error.message ?? 'Unknown Error Occurred',
        };
        return customError;
      });
  }

  public signInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      take(1),
      catchError(error => {
        console.log(error);
        return of(null);
      }),
      map(userCredential => userCredential?.user ?? null)
    );
  }

  private async setUserData(user: User | null) {
    if (!user) {
      throw Error('No user Data Error, handling not implemented');
    }
    const userData = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      ...(user.displayName && { displayName: user.displayName }),
    };
    const docRef = doc(this.firestore, 'users', user.uid);
    await setDoc(docRef, userData, { merge: true });
  }
}
