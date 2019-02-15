export const environment = {
  production: true,
  auth0: {
    domain: '[your-production-tenant-domain-goes-here]]',
    clientId: '[your-production-clientid-goes-here]',
    callbackUrl: 'https://[your-production-domain-goes-here]/signin',
    logoutUrl: 'https://[your-production-domain-goes-here]/signout'
  },
  appTitle: 'NgRx, Angular Material, Auth0 using Schematics'
};
