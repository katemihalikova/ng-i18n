# @ization/core

> ization core that manages all plugins

## Install

Install this package and other required packages:

```sh
npm install @ization/core lodash
```

## Configure

Import the main module of this package into your app module using `IzCoreModule.withLocales` static method and define locales to be used by this package:

```typescript
@NgModule({
  imports: [
    ...
    IzCoreModule.withLocales([
      {localeCode: 'en'},
      ...
    ]),
    ...
  ],
  ...
})
export class AppModule {}
```

This package does nothing interesting on its own. The actual functionality is provided by plugins. See their docs for more info.

## Use

### `IzCoreService` Service

This service handles locales and their preference. Supported locales are sorted in this way:

1. User's preferred locale – User can have one locale configured to be the most preferred
1. Locales preferred by user's browser
1. Other supported locales

#### `getPreferredLocaleCode()` method

Returns locale code of user's preferred locale or `undefined` if none is selected.

#### `preferLocaleCode(localeCode)` method

Sets locale code as user's preferred locale and saves it for future use.

#### `clearLocaleCodePreference()` method

Clears any saved user's preferred locale.

#### `getLocalePreferenceChanged()` method

Returns an Observable that emits (with no value) each time user's preference changes.

#### `getLocaleCodesInOrderOfPreference()` method

Returns an Observable that emits an array of locale codes each time user's preference changes.

#### `getLocaleDefinitionsInOrderOfPreference()` method

Returns an Observable that emits an array of locale definitions, including any plugin overrides, each time user's preference changes.

## Develop

### Build

Run `npm run build:core` to build the package into the `dist/core/` directory.

### Unit tests

Run `npm run test:core` to execute the unit tests.

### Linter

Run `npm run lint:core` to run linter on all code, including spec files.
