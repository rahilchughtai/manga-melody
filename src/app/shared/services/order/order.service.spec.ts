import { OrderService } from './order.service';
import { CheckOutData } from '../../models';
import { AuthService } from '../auth/auth.service';
import { AuthServiceFixture } from '../auth/auth.service.fixture';
import { CartService } from '../cart/cart.service';
import { FirestoreWrapperService } from '../firestore-wrapper/firestore-wrapper.service';
import { FirestoreWrapperServiceFixture } from '../firestore-wrapper/firestore-wrapper.service.fixture';
import { TestBed } from '@angular/core/testing';

describe('OrderService', () => {
  const mockCheckoutData: CheckOutData = {
    orderIBAN: 'iban',
    orderItems: [],
    orderShippingAddress: {},
    totalAmount: 0,
  };
  const mockCartService = jasmine.createSpyObj('CartService', ['clearCart']);

  let service: OrderService;
  let firestoreWrapperFixture: FirestoreWrapperServiceFixture;
  let authServiceFixture: AuthServiceFixture;
  beforeEach(() => {
    firestoreWrapperFixture = new FirestoreWrapperServiceFixture();
    authServiceFixture = new AuthServiceFixture();
    authServiceFixture.userDocumentRef = { path: '' };
    authServiceFixture.userDataSnapshot = { name: 'user' };

    TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreWrapperService, useValue: firestoreWrapperFixture },
        { provide: AuthService, useValue: authServiceFixture },
        {
          provide: CartService,
          useValue: mockCartService,
        },
      ],
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if the user is not logged in', () => {
    authServiceFixture.userDataSnapshot = null;
    authServiceFixture.userDocumentRef = null;
    expect(service.makeOrder(mockCheckoutData)).toBeNull();
    expect(firestoreWrapperFixture.addDoc).not.toHaveBeenCalled();
  });

  it('should make an order when the user is logged in and clear the cart', () => {
    firestoreWrapperFixture.collection.and.returnValue('collection');
    authServiceFixture.userDocumentRef.path = 'path';
    authServiceFixture.userDataSnapshot = { name: 'user' };
    service.makeOrder(mockCheckoutData);

    expect(mockCartService.clearCart).toHaveBeenCalled();
    expect(firestoreWrapperFixture.addDoc).toHaveBeenCalled();
  });
});
