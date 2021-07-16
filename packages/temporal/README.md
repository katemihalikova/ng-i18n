# @ization/temporal

> ization plugin for date/time formatting of various `Temporal` objects

## Install

Install ization Core, this plugin, and other required packages:

```sh
npm install @ization/core @ization/temporal @js-temporal/polyfill
```

## Configure

Configure `@ization/core` first. Then, import the main module of this plugin into your app module using `IzTemporalModule` static method and define configuration of this plugin:

```typescript
@NgModule({
  imports: [
    ...
    IzTemporalModule,
    ...
  ],
  ...
})
export class AppModule {}
```

Optionally, you can provide your own formats for each pipe. To do that, import this plugin using `IzTemporalModule.withCustomFormats` static method instead:

```typescript
@NgModule({
  imports: [
    ...
    IzTemporalModule.withCustomFormats(myFormats),
    ...
  ],
  ...
})
export class AppModule {}
```

You can override locale code used by this plugin in `IzCoreModule.withLocales` object via `temporalLocaleCode` property.

## Use

### `izDate` Pipe

> `temporalObj | izDate: format`

* `temporalObj` - `Temporal.PlainDate` or `Temporal.PlainDateTime` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an object conforming to `DateFormatOptions` interface.

Returns string that represents the input localized as a date. Until `@ization/core` is initialized, returns empty string.

### `izZonedDate` Pipe

> `temporalObj | izZonedDate: format`

* `temporalObj` - `Temporal.ZonedDateTime` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an object conforming to `DateFormatOptions` interface.

Returns string that represents the input localized as a date in provided time zone. Until `@ization/core` is initialized, returns empty string.

### `IzLocalDatePipe` Pipe

> `temporalObj | IzLocalDatePipe: format`

* `temporalObj` - `Temporal.ZonedDateTime` or `Temporal.Instant` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an object conforming to `DateFormatOptions` interface.

Returns string that represents the input localized as a date converted to local time zone. Until `@ization/core` is initialized, returns empty string.

### `izTime` Pipe

> `temporalObj | izTime: format`

* `temporalObj` - `Temporal.PlainTime` or `Temporal.PlainDateTime` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an object conforming to `TimeFormatOptions` interface.

Returns string that represents the input localized as a time. Until `@ization/core` is initialized, returns empty string.

### `izZonedTime` Pipe

> `temporalObj | izZonedTime: format`

* `temporalObj` - `Temporal.ZonedDateTime` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long' | 'zonedShort' | 'zonedMedium' | 'zonedLong'` or an object conforming to `ZonedTimeFormatOptions` interface.

Returns string that represents the input localized as a time in provided time zone. Until `@ization/core` is initialized, returns empty string.

### `IzLocalTimePipe` Pipe

> `temporalObj | IzLocalTimePipe: format`

* `temporalObj` - `Temporal.ZonedDateTime` or `Temporal.Instant` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long' | 'zonedShort' | 'zonedMedium' | 'zonedLong'` or an object conforming to `ZonedTimeFormatOptions` interface.

Returns string that represents the input localized as a time converted to local time zone. Until `@ization/core` is initialized, returns empty string.

### `izDateTime` Pipe

> `temporalObj | izDateTime: format`

* `temporalObj` - `Temporal.PlainDateTime` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an object conforming to `DateTimeFormatOptions` interface.

Returns string that represents the input localized as a date & time. Until `@ization/core` is initialized, returns empty string.

### `izZonedDateTime` Pipe

> `temporalObj | izZonedDateTime: format`

* `temporalObj` - `Temporal.ZonedDateTime` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long' | 'zonedShort' | 'zonedMedium' | 'zonedLong'` or an object conforming to `ZonedDateTimeFormatOptions` interface.

Returns string that represents the input localized as a date & time in provided time zone. Until `@ization/core` is initialized, returns empty string.

### `IzLocalDateTimePipe` Pipe

> `temporalObj | IzLocalDateTimePipe: format`

* `temporalObj` - `Temporal.ZonedDateTime` or `Temporal.Instant` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long' | 'zonedShort' | 'zonedMedium' | 'zonedLong'` or an object conforming to `ZonedDateTimeFormatOptions` interface.

Returns string that represents the input localized as a date & time converted to local time zone. Until `@ization/core` is initialized, returns empty string.

### `izYearMonth` Pipe

> `temporalObj | izYearMonth: format`

* `temporalObj` - `Temporal.PlainDate`, `Temporal.PlainDateTime`, or `Temporal.PlainYearMonth` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an object conforming to `YearMonthFormatOptions` interface.

Returns string that represents the input localized as a year & month. Until `@ization/core` is initialized, returns empty string.

### `izMonthDay` Pipe

> `temporalObj | izMonthDay: format`

* `temporalObj` - `Temporal.PlainDate`, `Temporal.PlainDateTime`, or `Temporal.PlainMonthDay` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an object conforming to `MonthDayFormatOptions` interface.

Returns string that represents the input localized as a month & day. Until `@ization/core` is initialized, returns empty string.

### `izWeekday` Pipe

> `temporalObj | izWeekday: format`

* `temporalObj` - `Temporal.PlainDate` or `Temporal.PlainDateTime` instance to localize.
* `format` - Format to use. Can be either one of strings `'short' | 'medium' | 'long'` or an object conforming to `WeekdayFormatOptions` interface.

Returns string that represents the input localized as a weekday. Until `@ization/core` is initialized, returns empty string.

## Develop

### Build

Run `npm run build:temporal` to build the package into the `dist/temporal/` directory.

### Unit tests

Run `npm run test:temporal` to execute the unit tests.

### Linter

Run `npm run lint:temporal` to run linter on all code, including spec files.
