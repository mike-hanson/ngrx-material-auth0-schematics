# ngrx-material-auth0-schematics
This project provides a starter kit for Angular applications that use Angular Material for look and feel, NgRx for state management and Auth0 for authentication and authorization.  Whilst there are other notable starter projects for this set of technologies the key difference is that this project was built exclusively using Schematics.  Not just using Schematics but using them with defaults since we beleive these represent what the relevant teams see as best practice.

## What are schematics?
When Angular CLI was introduced it had a fixed set of commands that were supported.  It wasn't very extensible but it was the best way to create a new project and generate elements.  To make the CLI more extensible (for themselves as well as package authers) the Angular team introduced an extension point through Schematics.  They converted commands like **generate** to use schematics, so this my give you a clue what a schematic is.  It is a way to extend Angular CLI capabilities for transforming an Angular application or project.  In short a Schematic describes a set of changes that Angular CLI should validate and apply.

More and more Angular libraries come with schematics.  @angular/cdk and @angular/material install schematics when the package is installed.   NgRx packages like @ngrx/store and @ngrx/effects include an ng-add schematic that allows them to be installed using **ng add**, but they also provide a separate package called @ngrx/schematics that supports generating new NgRx elements.

## Getting Started

## Issues

We welcome any feedback or constructive criticism, simply post an an issue on GitHub.

## Building the project
In this section we describe the sequence of high level steps that were taken to build and configure this starter project. This won't be a deep dive into the code but it will help you understand where schematics fit in and any changes made (if any) following those made during schematic execution.  After each step we committed the changes to the GIT repo so you can see them reflected in the history, including changes to this file, which we updated as we went along.

### 1. Create project
We prefer using SCSS for styling apps and alway use routing so we created the project with
```bash
   ng new ngrx-material-auth0-schematics --style scss --routing true
```

### 2. Add Core and Shared modules
For anything but the simplest of applications the Angular style guide recommends creating Core and Shared modules so we did that next.  It would be nice if Angular CLI supported an option to do this for us, or maybe there was a Schematic to do it.  We did it with these commands
```bash
   ng generate module core --routing true -m app.module

   ng generate module shared --routing false
```

Notice we didn't include routing for our shared module and didn't specify the -m switch to have it automatically imported in any module, unlike the Core module the contents of the Shared module will be selectively included in other modules.  There appears to be some debate as to what should be in the Core module, some argue it should only be services and models and don't include any visual components.  We chose the approach of putting anything that would be seen as a root level component visual or otherwise as well as services that provide cross cutting concerns.  Out primary use of Core is to keep the root application folder clean, so we include nav components and visual components that are referenced in app.component.html.

### 3. Add Angular Material
Next step is to add Angular Material to our project.  This can be done manually using npm or yarn and some manual steps, but the @angular/material package includes a schematic that supports **ng add**, which not only installs the package and it's dependdencies but also configures the project with a theme and some imports in app.module so we used the following command
```bash
  ng add @angular/material
```

We were prompted for some options and responded with the following
1. Theme - Custom
1. Install Hammerjs - Y
1. Install BrowserAnimations - Y

Selecting Custom for theme added the code to styles.scss to build a custom theme with the values that are in the indigo-pink builtin theme.  We modified the code slightl to use deep-orange for our Accent pallette.

One convention we have seen and adopted is to create a separate module for Angular Material.  What we have done so far leaves us ready to use Angular Material, but we have found in the past that we end up having imports for various Mat--Modules and often the same ones in many places.  For a while we took to importing these Mat*Modules into the Shared module, but found ourselves importing the Shared module just to get the Material imports so we decided to go with a separate module.  So we added that with the following command.
```bash
  ng generate module material --routing false -m core/core.module
```

Notice we specified the new module should be imported into our core module.  We knew that we were going to create a toolbar component very soon that would use Angular Material modules so it seemed sensible to get the wiring up done for us early.

We knew that throughout our application we would need the Button and Icon modules from Angular Material so we added support for these and the Toolbar module to our new module straight away.  Now we just need to import the MaterialModule into any module that wants to use Angular Material components.  We felt the tradeoff that other modules would be importing Angular Material components they didn't need vs only dealing with Angular Material in once place worthwhile.

### 4. Add Basic UI
Before we go on to implementing NgRx we created the components for a basic user interface that provided Page Not Found, Home and About components along with a toolbar to support navigation between them.  We included Sign In and Sign Out buttons ready for later.  We executed the following commands to get this all setup and and then edited markup and routing to wire them all together.  Initially both the Sign In and Sign Out buttons are visible, but we will fix this later.
```bash
  ng generate component core/toolbar -m core.module

  ng generate component core/home -m core.module

  ng generate component core/about -m core.module

  ng generate component core/page-not-found -m core.module
```

### 5. Install NgRx Packages
Initially we though of just installing all the NgRx packages via **npm** and using the @ngrx/schematics to do all the setup and configuration.  As we investigated this we found that there is nothing in the schematics package for setting up @ngrx/router-store so we opted to use **ng add* for the three main NgRx packages then use @ngrx/schematics from then on.  So we started with:
```bash
  ng add @ngrx/store

  ng add @ngrx/effects

  ng add @ngrx/router-store
```
These commands did all the grunt work to install the packages, create our root reducer and update our AppModule with relevant imports.  However it also added an initial Effects file to the root of our project.  We don't want this as all of our functionality is going to be in feature modules so we removed *app.effects.ts* and *app.effects.spec.ts* files and fixed up app.module.ts to remove references to these files and their contents.  From here on in we are going to use the @ngrx/schematics collection to manage our NgRx components so we need to install that package.

At the time of writing @ngrx/schematics cannot be installed using **ng add** as it does not include an *ng-add* schematic.  The team have an open ticket to add this support, but until that is ready we have to install the package using **npm**
```bash
  npm install @ngrx/schematics --save-dev
```

At this point we thought we were ready to go with our NgRx installation and tried to run one of the schematics.  We got an error *Could not find module @angular-devkit/schematics*.  We googled the error but didn't find anything specific, but in the end it lead us to installing three additional packages to resolve the issue

```bash
  npm install @angular-devkit/schematics @angular-devkit/core @angular-devkit/architect --save-dev
```

### 6. Configuring @ngrx/schematics as Default Collection
@ngrx/schematics includes aliases for the schematics we use every day with **ng generate** so it made sense to configure it as our default collection so we didn't have to keep specifying the package.  Instead of doing this
```bash
  ng generate @ngrx/schematics:<element> <name> [options]
```
We want to be able to do this
```bash
  ng generate <element> <name> [options]
```

And still be able to use the original features e.g. ng generate component ... To configure this we ran
```bash
  ng config cli.defaultCollection @ngrx/schematics
```

This updates angular.json so we can do as mentioned.  However there is one final configuration change we needed to make, because we specified SCSS as our styling language.  This choice is saved in angular.json, but we need to modify the setting so that it is applied when we generate components using our new default collection.  In angular.json you will find a section like this

```javascript

{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ngrx-material-auth0-schematics": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {
        "@schematics/angular:component": { // we need to change this
          "style": "sass"
        }
      },
  ...
}
```

We need to modify the line with the comment added to read

```javascript
  "@mgrx/schematics:component": {
```

Now we are ready to start adding Authentication with Auth0 via NgRx to our project

### 7. Adding an auth module and service
Under normal circumstances we would probably put all of our Authentication elements into the *core* module, but we thought on this occasion it would be better in a separate feature module so that it is isolated and easy to find and understand.  So we created a new module like this
```bash
  ng generate module auth -m app.module
```

Then we created an *AuthService* like this
```bash
  ng generate service auth/services/auth
```

The auth service depends on Auth0 so we need to install the package
```bash
  npm install auth0-js --save
```
We will leave you to scan the code and tests for the auth service to understand how it uses auth0, but we feel we should mention one thing we did.  We wanted to be able to test the interaction between our app and Auth0, but if we followed the many examples out there this would not be possible because they all instantiate auth0.WebAuth inside their service implementation.  We wanted to inject an instance of auth0.WebAuth as a service, which is essentially what it is so we created an InjectionToken with a factory to create auth0.WebAuth.  We put it in auth.service.ts so it was clear when looking at the service what was going on, arguably the injection token should be in the module, but we preferred the clarity.
```javascript
export const Auth0WebAuthService = new InjectionToken<auth0.WebAuth>('Auth0WebAuthService', {
  providedIn: 'root',
  factory: () =>
    new auth0.WebAuth({
      clientID: environment.auth0.clientId,
      domain: environment.auth0.domain,
      redirectUri: environment.auth0.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
});
```
With this in place we could now inject Auth0WebAuthService into our AuthService via the @Inject decorator and provide a mock for it in our tests.  Check them out.

You may have noticed we are referencing properties of an auth0 object attached to our current environment object.  You will need to update some of these property values with your own Auth0 tenant values as mentioned in the Getting Started section above.

The callback urls in our configurations point to *signin* and *signout* endpoints.  This means we need routes to match, which means we need components for them so we created them using
```bash
  ng generate component auth/sign-in -m auth.module

  ng generate component auth/sign-out -m auth.module
```
And updated the auth routing module with routes for these.  Having what amount to visual components in this scenario felt a bit ugly but it is the simplest and only way to provide an end point that simply dispatches an action.  It would be nice if it was possible to define a function to handle a route, but at least a component is testable.

To keep all of our auth related elements isolated we created a component for the buttons that will initiate sign in and sign out
```bash
  ng generate component auth/auth-buttons -m auth.module
```
And exported it so making it available to use in our toolbar

Next we added the NgRx components using the feature schematic
```bash
  ng generate feature auth/auth -m auth/auth.module.ts
```
Now we were in the position to deinfe actions, reducer and effects to handle the sign in, sign out and token refresh workflows.

We will leave you to scan the code to understand these and to get on with adding your own functionality.

