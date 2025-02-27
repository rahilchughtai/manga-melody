import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  DocumentReference,
  Firestore,
  getDoc,
  setDoc,
  SetOptions,
  updateDoc,
} from '@angular/fire/firestore';
import { Query, DocumentData, SnapshotOptions } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * This service is a wrapper around the Firestore service, mainly to make it easier to mock for unit testing
 */
export class FirestoreWrapperService {
  private firestore = inject(Firestore);

  public addDoc(ref: CollectionReference, data: unknown) {
    return addDoc(ref, data);
  }

  public setDoc(
    reference: DocumentReference,
    data: Partial<unknown>,
    options?: SetOptions
  ) {
    if (!options) return setDoc(reference, data);
    return setDoc(reference, data, options);
  }

  public getDoc(ref: DocumentReference) {
    return getDoc(ref);
  }

  public collection(path: string, ...pathSegments: string[]) {
    return collection(this.firestore, path, ...pathSegments);
  }

  public collectionData(
    query: Query<DocumentData, DocumentData>,
    options?: { idField?: string | number } & SnapshotOptions
  ): Observable<DocumentData[]> {
    return collectionData(query, options);
  }

  public updateDoc(ref: DocumentReference, data: Partial<unknown>) {
    return updateDoc(ref, data);
  }
}
