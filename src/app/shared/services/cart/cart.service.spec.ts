import { CartService } from './cart.service';
import { mockMangaData } from '../../mocks';
import { CartItem } from '../../models';
import { AuthService } from '../auth/auth.service';
import { AuthServiceFixture } from '../auth/auth.service.fixture';
import { FirestoreWrapperService } from '../firestore-wrapper/firestore-wrapper.service';
import { FirestoreWrapperServiceFixture } from '../firestore-wrapper/firestore-wrapper.service.fixture';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';

describe('CartService', () => {
  let service: CartService;
  let firestoreWrrapperFixture: FirestoreWrapperServiceFixture;
  let authServiceFixture: AuthServiceFixture;

  const mockCartItem: CartItem = {
    mangaData: mockMangaData,
    quantity: 1,
    volume: 1,
    subtotal: mockMangaData.price,
  };

  beforeEach(() => {
    firestoreWrrapperFixture = new FirestoreWrapperServiceFixture();
    authServiceFixture = new AuthServiceFixture();
    authServiceFixture.userDocumentRef = { path: '' };
    authServiceFixture.getUserData.and.returnValue(of({}));

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceFixture },
        {
          provide: FirestoreWrapperService,
          useValue: firestoreWrrapperFixture,
        },
      ],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear the cart', () => {
    service.clearCart();
    expect(firestoreWrrapperFixture.updateDoc).toHaveBeenCalledWith(
      { path: '' },
      { cart: [] }
    );
  });

  it('should return empty array if user data is empty object', async () => {
    authServiceFixture.getUserData.and.returnValue(of({}));
    expect(await firstValueFrom(service.getShoppingCart())).toEqual([]);
  });

  it('should return empty array if user data is undefined', async () => {
    authServiceFixture.getUserData.and.returnValue(of(undefined));
    expect(await firstValueFrom(service.getShoppingCart())).toEqual([]);
  });

  it('should return empty array if cart data is undefined', async () => {
    authServiceFixture.getUserData.and.returnValue(of({ cart: undefined }));
    expect(await firstValueFrom(service.getShoppingCart())).toEqual([]);
  });

  it('should get the cart item count', async () => {
    authServiceFixture.getUserData.and.returnValue(
      of({ cart: [mockCartItem, mockCartItem] })
    );
    const result = await firstValueFrom(service.getCartItemCount());
    expect(result).toBe(2);

    authServiceFixture.getUserData.and.returnValue(of({ cart: [] }));
    const emptyResult = await firstValueFrom(service.getCartItemCount());
    expect(emptyResult).toBe(0);
  });

  it('should upsert manga item to cart', () => {
    service.upsertMangaItemToCart(mockCartItem);
    expect(firestoreWrrapperFixture.updateDoc).toHaveBeenCalledWith(
      { path: '' },
      { cart: [mockCartItem] }
    );
  });

  it('should update the cart item quantity if manga already exists', () => {
    spyOn(service, 'getShoppingCart').and.returnValue(of([mockCartItem]));
    service.upsertMangaItemToCart(mockCartItem);
    const expectedCartItem = {
      ...mockCartItem,
      quantity: 2,
      subtotal: 2 * mockMangaData.price,
    };

    expect(firestoreWrrapperFixture.updateDoc).toHaveBeenCalledWith(
      { path: '' },
      { cart: [expectedCartItem] }
    );
  });

  it('should add the cart item if the manga does not exist already', () => {
    spyOn(service, 'getShoppingCart').and.returnValue(of([mockCartItem]));
    const newMockCartItem: CartItem = {
      mangaData: { ...mockMangaData, mal_id: 123 },
      quantity: 1,
      volume: 2,
      subtotal: mockMangaData.price,
    };
    service.upsertMangaItemToCart(newMockCartItem);

    expect(firestoreWrrapperFixture.updateDoc).toHaveBeenCalledWith(
      { path: '' },
      { cart: [mockCartItem, newMockCartItem] }
    );
  });

  it('should modify the cart item quantity', () => {
    spyOn(service, 'getShoppingCart').and.returnValue(of([mockCartItem]));
    service.modifyCartItemQuantity(mockCartItem, 5);
    const expectedCartItem = {
      ...mockCartItem,
      quantity: 5,
      subtotal: 5 * mockMangaData.price,
    };
    expect(firestoreWrrapperFixture.updateDoc).toHaveBeenCalledWith(
      { path: '' },
      { cart: [expectedCartItem] }
    );
  });

  it('should delete the cart item', () => {
    spyOn(service, 'getShoppingCart').and.returnValue(of([mockCartItem]));
    service.deleteItemFromShoppingCart(mockCartItem);
    expect(firestoreWrrapperFixture.updateDoc).toHaveBeenCalledWith(
      { path: '' },
      { cart: [] }
    );
  });

  it('should only delete the cart item with matching mal id and volume', () => {
    const secondCartItem: CartItem = { ...mockCartItem, volume: 2 };
    spyOn(service, 'getShoppingCart').and.returnValue(
      of([mockCartItem, secondCartItem])
    );
    service.deleteItemFromShoppingCart(secondCartItem);
    expect(firestoreWrrapperFixture.updateDoc).toHaveBeenCalledWith(
      { path: '' },
      { cart: [mockCartItem] }
    );
  });
});
