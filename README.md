# ngrx-material-auth0-schematics
This project provides a starter kit for Angular applications that use Angular Material for look and feel, NgRx for state management and Auth0 for authentication and authorization.  Whilst there are other notable starter projects for this set of technologies the key difference is that this project was built exclusively using Schematics.

## What are schematics?
When Angular CLI was introduced it had a fixed set of commands that were supported.  It wasn't very extensible but it was the best way to create a new project and generate elements.  To make the CLI more extensible (for themselves as well as package authers) the Angular team introduced an extension point through Schematics.  They converted commands like **generate** to use schematics, so this my give you a clue what a schematic is.  It is a way to extend Angular CLI capabilities for transforming an Angular application or project.  In short a Schematic describes a set of changes that Angular CLI should validate and apply.

More and more Angular libraries come with schematics.  @angular/cdk and @angular/material install schematics when the package is installed.   NgRx packages like @ngrx/store and @ngrx/effects include an ng-add schematic that allows them to be installed using **ng add**, but they also provide a separate package called @ngrx/schematics that supports generating new NgRx elements.

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

