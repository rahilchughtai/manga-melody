import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, signOut, User, authState } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { catchError, from, map, of, take, tap } from 'rxjs';
import { APP_ROUTES } from '../../utils/app-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private authStateChangeSig = toSignal(authState(this.auth));
  public userData = this.authStateChangeSig;

  public signOut() {
    signOut(this.auth).then(() => {
      this.router.navigate([APP_ROUTES.LOGIN]);
    });
  }

  public isLoggedIn() {
    return computed(() => this.authStateChangeSig() !== null);
  }

  public signInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()))
      .pipe(
        take(1),
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
        map((userCredential) => userCredential?.user ?? null)
      )
      .subscribe((user) => {
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
