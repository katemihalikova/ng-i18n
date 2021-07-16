# @ization/translate

> ization plugin for translations

## Install

Install ization Core, this plugin, and other required packages:

```sh
npm install @ization/core @ization/translate @messageformat/runtime lodash
```

Optionally also install `@messageformat` CLI:

```sh
npm install --save-dev @messageformat/cli @messageformat/core
```

## Configure

Configure `@ization/core` first. Then, import the main module of this plugin into your app module using `IzTranslateModule.withConfig` static method and define configuration of this plugin:

```typescript
@NgModule({
  imports: [
    ...
    IzTranslateModule.withConfig({
      translationLoader: (localeCode) => getTranslations(localeCode),
      numberOfLoadedLocales: 2,
      fallbackLocaleCode: 'en',
    }),
    ...
  ],
  ...
})
export class AppModule {}
```

`translationLoader` is a function that returns a Promise that resolves into an object of translations for that particular locale. In Angular projects, the best way is to have one code chunk per locale and load them using dynamic `import()`. See Demo app for such loader, including how to use messageFormat CLI to generate these chunks from YAML files.

You can override locale code used by this plugin in `IzCoreModule.withLocales` object via `translateLocaleCode` property.

## Use

### `izTranslate` Pipe

> `'TRANSLATION_KEY' | izTranslate: params`

* `'TRANSLATION_KEY'` - Translation key to look up in loaded translations. Translations can be nested, in such case translation key uses dot as a separator. Locale to use is choosed automatically via `@ization/core` and using configuration of this module.
* `params` - Translation params. An object of (mostly) strings to use for variable interpolation and formatters. See Demo app for examples and [MessageFormat docs](http://messageformat.github.io/messageformat/guide/) for more info.

Returns translated string. Until `@ization/core` is initialized, returns empty string. When translation key is not found in any loaded locale, returns empty string and emits a warning into console.

## Develop

### Build

Run `npm run build:translate` to build the package into the `dist/translate/` directory.

### Unit tests

Run `npm run test:translate` to execute the unit tests.

### Linter

Run `npm run lint:translate` to run linter on all code, including spec files.
