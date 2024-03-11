/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-unused-vars */

export type IdirIdentityProvider = 'idir';
export type BceidIdentityProvider = 'bceidbasic' | 'bceidbusiness' | 'bceidboth';
export type GithubIdentityProvider = 'githubbcgov' | 'githubpublic';

export type IdentityProvider =
  | IdirIdentityProvider
  | BceidIdentityProvider
  | GithubIdentityProvider;

export type BaseKeycloakUser = {
  name?: string;
  preferred_username: string;
  email: string;
  display_name: string;
  client_roles?: string[];
  scope?: string;
  identity_provider: IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;
};

export type KeycloakIdirUser = {
  idir_user_guid?: string;
  idir_username?: string;
  given_name?: string;
  family_name?: string;
};

export type KeycloakBCeIDUser = {
  bceid_user_guid?: string;
  bceid_username?: string;
  bceid_business_name?: string;
};

export type KeycloakGithubUser = {
  github_id?: string;
  github_username?: string;
  orgs?: string;
  given_name?: string;
  family_name?: string;
  first_name?: string;
  last_name?: string;
};

export type CombinedKeycloakUser = BaseKeycloakUser &
  KeycloakIdirUser &
  KeycloakBCeIDUser &
  KeycloakGithubUser;

export type KeycloakUser = BaseKeycloakUser & {
  guid: string;
  username: string;
  first_name: string;
  last_name: string;
};

export type KCOptions = {
  afterUserLogin?: (user: KeycloakUser, userInfo: CombinedKeycloakUser) => Promise<void> | void;
  afterUserLogout?: (user: KeycloakUser, userInfo: CombinedKeycloakUser) => Promise<void> | void;
};

export type ProtectedRouteOptions = {
  requireAllRoles?: boolean;
};

export type HasRolesOptions = {
  requireAllRoles?: boolean;
};

// The token and user properties are not a part of the Request object by default.
declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: KeycloakUser;
      userInfo?: CombinedKeycloakUser;
    }
  }
}
