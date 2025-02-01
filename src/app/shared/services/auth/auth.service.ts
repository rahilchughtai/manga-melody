import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, signOut, User, authState } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { catchError, from, map, Observable, of, take } from 'rxjs';
import { APP_ROUTES } from '../../utils/app-routes';
import { MangaUser } from '../../models/manga-user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  public userStateSig = toSignal(authState(this.auth));

  public signOut() {
    signOut(this.auth).then(() => {
      this.router.navigate([APP_ROUTES.LOGIN]);
    });
  }

  constructor() {
    effect(() => {
      const user = this.userStateSig();
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        return;
      }
      localStorage.removeItem('user');
    });
  }

  public get userDataSnapshot(): MangaUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  public getUserData() {
    return docData(this.userDocumentRef) as Observable<MangaUser | undefined>;
  }

  public get userDocumentRef() {
    const uid = this.userDataSnapshot?.uid;
    if (!uid) {
      console.error('No user Data Error, handling not implemented');
      throw Error('No user Data Error, handling not implemented');
    }
    return doc(this.firestore, 'users', uid);
  }

  public isLoggedInSig() {
    return computed(() => this.userStateSig() !== null);
  }

  public signInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()))
      .pipe(
        take(1),
        catchError(error => {
          console.error(error);
          return of(null);
        }),
        map(userCredential => userCredential?.user ?? null)
      )
      .subscribe(user => {
        this.setUserData(user);
        this.router.navigate([APP_ROUTES.PROFILE]);
      });
  }

  async setUserData(user: User | null) {
    if (!user) {
      throw Error('No user Data Error, handling not implemented');
    }
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    const docRef = doc(this.firestore, 'users', user.uid);
    await setDoc(docRef, userData);
  }
}
