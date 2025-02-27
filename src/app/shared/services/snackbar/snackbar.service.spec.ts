import { SnackbarService } from './snackbar.service';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackbar', ['open']);
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: snackBarSpy }],
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snackbar with default values', () => {
    service.openSnackBar('Test message');
    expect(snackBarSpy.open).toHaveBeenCalledWith('Test message', 'Okay', {
      panelClass: ['snackbar-success'],
      duration: 2000,
    });
  });

  it('should open a snackbar with custom values', () => {
    service.openSnackBar('Custom message', 'snackbar-warning', 'Dismiss', 3000);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Custom message', 'Dismiss', {
      panelClass: ['snackbar-warning'],
      duration: 3000,
    });
  });
});
