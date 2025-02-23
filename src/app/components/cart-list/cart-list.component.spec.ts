import { CartListComponent } from './cart-list.component';
import { mockCartItem } from '../../shared/mocks';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartListComponent],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cartItems', [mockCartItem]);
    fixture.componentRef.setInput('changeable', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
