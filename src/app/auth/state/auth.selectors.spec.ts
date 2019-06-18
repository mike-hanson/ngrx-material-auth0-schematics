
import { Auth0DecodedHash } from 'auth0-js';

import { getAuthFeature, getIsAuthenticated, getFullName, getPicture } from './auth.selectors';
import { State } from './auth.reducer';

describe('selectors', () => {
    const parsedHash: Auth0DecodedHash = {
        accessToken: 'abcd',
        idToken: 'def',
        expiresIn: 200,
        idTokenPayload: {
            aud: 'abc123',
            email: 'someone@somewhere.com',
            given_name: 'Fred',
            family_name: 'Flintstone',
            picture: 'somepictureurl'
        }
    };


    const authenticatedState: State = {
        isAuthenticated: true,
        accessToken: parsedHash.accessToken,
        idToken: parsedHash.idToken,
        userId: parsedHash.idTokenPayload.aud,
        email: parsedHash.idTokenPayload.email,
        givenName: parsedHash.idTokenPayload.given_name,
        familyName: parsedHash.idTokenPayload.family_name,
        pictureUrl: parsedHash.idTokenPayload.picture
    };

    it('should provide selector to return auth feature', () => {
        const state = {
            somethingElse: true,
            auth: authenticatedState
        };

        const result = getAuthFeature(state);

        expect(result).toEqual(state.auth);
    });

    it('should provide selector to identify whether the user is authenticated', () => {
        const state = {
            somethingElse: true,
            auth: authenticatedState
        };

        const result = getIsAuthenticated(state);

        expect(result).toBe(state.auth.isAuthenticated);
    });

    it('should provide selector to get the users full name', () => {
        const state = {
            somethingElse: true,
            auth: authenticatedState
        };

        const result = getFullName(state);

        expect(result).toEqual(authenticatedState.givenName + ' ' + authenticatedState.familyName);
    });

    it('should provide selector to get the users picture', () => {
        const state = {
            somethingElse: true,
            auth: authenticatedState
        };

        const result = getPicture(state);

        expect(result).toEqual(authenticatedState.pictureUrl);
    });
});