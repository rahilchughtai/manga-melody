import { AuthService } from '../../shared/services';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  imports: [MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  public authService = inject(AuthService);
  public userData = toSignal(this.authService.getUserData());
  public imageError = false;
  public fallbackImage = 'assets/user.jpg';
  public imageUIrl = computed(
    () => this.userData()?.photoURL ?? this.fallbackImage
  );
}
