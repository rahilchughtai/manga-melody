export class FirestoreWrapperServiceFixture {
  public addDoc = jasmine.createSpy('addDoc');
  public collection = jasmine
    .createSpy('collection')
    .and.returnValue('collection');
  public setDoc = jasmine.createSpy('setDoc').and.callThrough();
  public updateDoc = jasmine.createSpy('updateDoc').and.callThrough();
  public getDoc = jasmine.createSpy('getDoc').and.callThrough();
}
