import { TestBed, inject } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { AuthService, Auth0WebAuthService } from './auth.service';

describe('AuthService', () => {
  let auth0WebAuthServiceMock: any;
  let service: AuthService;

  beforeEach(() => {
    auth0WebAuthServiceMock = jasmine.createSpyObj('Auth0WebAuthService', ['authorize', 'parseHash', 'checkSession', 'logout']);
    TestBed.configureTestingModule({
      imports: [StoreModule],
      providers: [
        { provide: Auth0WebAuthService, useValue: auth0WebAuthServiceMock },
      ]
    });
    service = TestBed.get(AuthService);
  });

  it('Should compile', () => {
    expect(service).toBeTruthy();
  });

  it('should implement a method to authenticate the user', () => {
    expect(typeof service.signIn).toBe('function', 'Method was not defined');
    expect(service.signIn.length).toBe(0, 'Method does not define correct number of parameters');
  });

  it('should implement a method to sign out', () => {
    expect(typeof service.signOut).toBe('function', 'Method was not defined');
    expect(service.signOut.length).toBe(0, 'Method does not define correct number of parameters');
  });

  it('should use auth0 WebAuth to initiate authentication', () => {
    service.signIn();
    expect(auth0WebAuthServiceMock.authorize).toHaveBeenCalled();
  });

  it('should use auth0 WebAuth to initiate sign out', () => {
    service.signOut();
    expect(auth0WebAuthServiceMock.logout).toHaveBeenCalledTimes(1);
  });
});
