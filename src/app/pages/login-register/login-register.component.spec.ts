import { LoginRegisterComponent } from './login-register.component';
import { AuthService } from '../../shared/services';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterComponent],
      providers: [
        provideAnimationsAsync(),
        AuthService,
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
