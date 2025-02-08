import { PasswordFieldComponent } from '../../components/registration/password-field/password-field.component';
import { AuthService } from '../../shared/services';
import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login-register',
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    PasswordFieldComponent,
  ],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
})
export class LoginRegisterComponent {
  public authService = inject(AuthService);

  public registerErrorSig = signal<string | null>(null);
  public loginErrorSig = signal<string | null>(null);

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  public registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  public isLoggedInSig = this.authService.isLoggedInSig();

  public async login() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      return this.loginErrorSig.set('Please fill in all fields');
    }
    const response = await this.authService.logInWithEmailAndPassword(
      email,
      password
    );
    if (typeof response !== 'string') {
      this.loginErrorSig.set(response.message);
      return;
    }
    this.loginErrorSig.set(null);
  }

  public async register() {
    const { email, password, confirmPassword } = this.registerForm.value;
    if (!email || !password || password !== confirmPassword) {
      return this.registerErrorSig.set(
        'Please fill in all fields and ensure passwords match'
      );
    }
    const response = await this.authService.registerWithEmailAndPassword(
      email,
      password
    );
    if (typeof response !== 'string') {
      this.registerErrorSig.set(response.message);
      return;
    }
    this.registerErrorSig.set(null);
  }
}
