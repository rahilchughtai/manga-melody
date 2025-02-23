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
  /** AuthService to handle user authentication */
  public authService = inject(AuthService);

  /** User data from the AuthService */
  public userData = toSignal(this.authService.getUserData());

  /** Error flag for image loading */
  public imageError = false;

  /** Fallback image for user profile */
  public fallbackImage = 'assets/user.jpg';

  /** Computed property for the user's profile image URL */
  public imageUIrl = computed(
    () => this.userData()?.photoURL ?? this.fallbackImage
  );
}
