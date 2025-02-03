import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-next-tab-button',
  imports: [MatButtonModule],
  template: ` <button
    [disabled]="shouldBeDisabled()"
    (click)="clickEvent.emit()"
    mat-raised-button>
    Next
  </button>`,
  styles: ``,
})
export class NextTabButtonComponent {
  public shouldBeDisabled = input.required<boolean>();
  public clickEvent = output();
}
