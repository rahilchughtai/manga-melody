import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type SnackbarStyle =
  | 'snackbar-success'
  | 'snackbar-danger'
  | 'snackbar-warning';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  public openSnackBar(
    message: string,
    styleClass: SnackbarStyle = 'snackbar-success',
    action = 'Okay',
    duration = 2000
  ) {
    this.snackbar.open(message, action, {
      panelClass: [styleClass],
      duration,
    });
  }
}
