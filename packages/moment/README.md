# @ization/moment

> ization plugin for date/time formatting of ISO strings or `moment` instances

## Install

Install ization Core, this plugin, and other required packages:

```sh
npm install @ization/core @ization/moment moment
```

## Configure

Configure `@ization/core` first. Then, import the main module of this plugin into your app module using `IzMomentModule` static method and define configuration of this plugin:

```typescript
@NgModule({
  imports: [
    ...
    IzMomentModule,
    ...
  ],
  ...
})
export class AppModule {}
```

Optionally, you can provide your own formats for each pipe. To do that, import this plugin using `IzMomentModule.withCustomFormats` static method instead:

```typescript
@NgModule({
  imports: [
    ...
    IzMomentModule.withCustomFormats(myFormats),
    ...
  ],
  ...
})
export class AppModule {}
```

You can override locale code used by this plugin in `IzCoreModule.withLocales` object via `momentLocaleCode` property.

## Use

### `izMDate` Pipe

> `input | izMDate: format`

* `input` - Date ISO string, date-time ISO string, or `moment` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an arbitrary string with [`moment#format`](https://momentjs.com/docs/#/displaying/format/) tokens.

Returns string that represents the input localized as a date. Until `@ization/core` is initialized, returns empty string. When invalid input is provided, returns `'Invalid date'` string.

### `izMTime` Pipe

> `input | izMTime: format`

* `input` - Time ISO string, date-time ISO string, or `moment` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an arbitrary string with [`moment#format`](https://momentjs.com/docs/#/displaying/format/) tokens.

Returns string that represents the input localized as a time. Until `@ization/core` is initialized, returns empty string. When invalid input is provided, returns `'Invalid date'` string.

### `izMDateTime` Pipe

> `input | izMDateTime: format`

* `input` - Date-time ISO string or `moment` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an arbitrary string with [`moment#format`](https://momentjs.com/docs/#/displaying/format/) tokens.

Returns string that represents the input localized as a date & time. Until `@ization/core` is initialized, returns empty string. When invalid input is provided, returns `'Invalid date'` string.

### `izMYearMonth` Pipe

> `input | izMYearMonth: format`

* `input` - Year-month ISO string, date ISO string, date-time ISO string, or `moment` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an arbitrary string with [`moment#format`](https://momentjs.com/docs/#/displaying/format/) tokens.

Returns string that represents the input localized as a year & month. Until `@ization/core` is initialized, returns empty string. When invalid input is provided, returns `'Invalid date'` string.

### `izMWeekday` Pipe

> `input | izMWeekday: format`

* `input` - Date ISO string, date-time ISO string, or `moment` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an arbitrary string with [`moment#format`](https://momentjs.com/docs/#/displaying/format/) tokens.

Returns string that represents the input localized as a weekday. Until `@ization/core` is initialized, returns empty string. When invalid input is provided, returns `'Invalid date'` string.

## Develop

### Build

Run `npm run build:moment` to build the package into the `dist/moment/` directory.

### Unit tests

Run `npm run test:moment` to execute the unit tests.

### Linter

Run `npm run lint:moment` to run linter on all code, including spec files.
