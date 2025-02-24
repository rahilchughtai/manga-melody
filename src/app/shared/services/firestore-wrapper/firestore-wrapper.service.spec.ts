import { FirestoreWrapperService } from './firestore-wrapper.service';
import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';

describe('FirestoreWrapperService', () => {
  let service: FirestoreWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Firestore, useValue: {} }],
    });
    service = TestBed.inject(FirestoreWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
