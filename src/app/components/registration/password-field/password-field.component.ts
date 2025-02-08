import { Component, input, signal } from '@angular/core';
import {
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  template: `
    <div class="form-field-wrapper">
      <mat-form-field
        class="form-field"
        [formGroup]="inputFormGroupName()"
        appearance="outline">
        <mat-label>{{ label() }}</mat-label>
        <input
          matInput
          [formControlName]="inputFormControlName()"
          [type]="hiddenSig() ? 'password' : 'text'" />

        <mat-icon
          (click)="clickEvent($event)"
          [attr.aria-label]="'hiddenSig password'"
          [attr.aria-pressed]="hiddenSig()"
          matSuffix
          >{{ hiddenSig() ? 'visibility_off' : 'visibility' }}</mat-icon
        >
      </mat-form-field>
    </div>
  `,
  styles: ``,
})
export class PasswordFieldComponent {
  public label = input<string>('Password');
  public inputFormGroupName = input.required<FormGroup>();
  public inputFormControlName = input.required<FormControlName['name']>();

  public hiddenSig = signal(true);
  clickEvent(event: MouseEvent) {
    this.hiddenSig.set(!this.hiddenSig());
    event.stopPropagation();
  }
}
