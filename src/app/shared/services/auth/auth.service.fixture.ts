export class AuthServiceFixture {
  public isLoggedInSig = jasmine.createSpy('isLoggedInSig');
  public userDocumentRef = jasmine.createSpyObj('userDocumentRef', ['path']);
  public userDataSnapshot = jasmine.createSpyObj('userDataSnapshot', ['uid']);
  public getUserData = jasmine.createSpy('getUserData');
}
