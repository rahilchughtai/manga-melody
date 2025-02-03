import { AuthService } from '../../shared/services';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-login-register',
  imports: [MatTabsModule, MatButtonModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
})
export class LoginRegisterComponent {
  public authService = inject(AuthService);
  public isLoggedInSig = this.authService.isLoggedInSig();
}
