// tslint:disable member-ordering
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SimpleFormat, SimpleOrZonedFormat } from '@ization/temporal';

@Component({
  selector: 'iz-temporal-demo',
  templateUrl: './temporal-demo.component.html',
  styleUrls: ['./temporal-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemporalDemoComponent {
  months = this.getMonthNames();

  plainDateModel: string;
  plainDate?: Temporal.PlainDate;
  plainDateError?: string;
  plainDateModelChanged(): void {
    try {
      this.plainDate = Temporal.PlainDate.from(this.plainDateModel);
      this.plainDateError = undefined;
    } catch (e) {
      this.plainDate = undefined;
      this.plainDateError = `${e.constructor.name}: ${e.message}`;
    }
  }

  plainTimeModel: string;
  plainTime: Temporal.PlainTime | undefined;
  plainTimeError: string | undefined;
  plainTimeModelChanged(): void {
    try {
      this.plainTime = Temporal.PlainTime.from(this.plainTimeModel);
      this.plainTimeError = undefined;
    } catch (e) {
      this.plainTime = undefined;
      this.plainTimeError = `${e.constructor.name}: ${e.message}`;
    }
  }

  plainDateTimeModel: string;
  plainDateTime: Temporal.PlainDateTime | undefined;
  plainDateTimeError: string | undefined;
  plainDateTimeModelChanged(): void {
    try {
      this.plainDateTime = Temporal.PlainDateTime.from(this.plainDateTimeModel);
      this.plainDateTimeError = undefined;
    } catch (e) {
      this.plainDateTime = undefined;
      this.plainDateTimeError = `${e.constructor.name}: ${e.message}`;
    }
  }

  zonedDateTimeModel: string;
  zonedDateTimeModelTimeZone: string;
  zonedDateTime: Temporal.ZonedDateTime | undefined;
  zonedDateTimeError: string | undefined;
  zonedDateTimeModelChanged(): void {
    try {
      this.zonedDateTime = Temporal.ZonedDateTime.from(`${this.zonedDateTimeModel}${this.zonedDateTimeModelTimeZone}`);
      this.zonedDateTimeError = undefined;
    } catch (e) {
      this.zonedDateTime = undefined;
      this.zonedDateTimeError = `${e.constructor.name}: ${e.message}`;
    }
  }

  instantModel: string;
  instant: Temporal.Instant | undefined;
  instantError: string | undefined;
  instantModelChanged(): void {
    try {
      this.instant = Temporal.Instant.from(this.instantModel + 'Z');
      this.instantError = undefined;
    } catch (e) {
      this.instant = undefined;
      this.instantError = `${e.constructor.name}: ${e.message}`;
    }
  }

  plainYearMonthModel: string;
  plainYearMonth: Temporal.PlainYearMonth | undefined;
  plainYearMonthError: string | undefined;
  plainYearMonthModelChanged(): void {
    try {
      this.plainYearMonth = Temporal.PlainYearMonth.from(this.plainYearMonthModel);
      this.plainYearMonthError = undefined;
    } catch (e) {
      this.plainYearMonth = undefined;
      this.plainYearMonthError = `${e.constructor.name}: ${e.message}`;
    }
  }

  plainMonthDayModelMonth: string;
  plainMonthDayModelDay: string;
  plainMonthDay: Temporal.PlainMonthDay | undefined;
  plainMonthDayError: string | undefined;
  plainMonthDayModelChanged(): void {
    try {
      this.plainMonthDay = Temporal.PlainMonthDay.from(`--${this.plainMonthDayModelMonth}-${this.plainMonthDayModelDay}`);
      this.plainMonthDayError = undefined;
    } catch (e) {
      this.plainMonthDay = undefined;
      this.plainMonthDayError = `${e.constructor.name}: ${e.message}`;
    }
  }

  izDateFormat: SimpleFormat | undefined;
  izTimeFormat: SimpleFormat | undefined;
  izTimeZonedFormat: SimpleOrZonedFormat | undefined;
  izDateTimeFormat: SimpleFormat | undefined;
  izDateTimeZonedFormat: SimpleOrZonedFormat | undefined;
  izMonthDayFormat: SimpleFormat | undefined;
  izYearMonthFormat: SimpleFormat | undefined;
  izWeekdayFormat: SimpleFormat | undefined;

  izTimeFormatChanged(): void {
    if (this.izTimeZonedFormat?.startsWith('zoned')) {
      if (this.izTimeFormat === 'short') {
        this.izTimeZonedFormat = 'zonedShort';
      } else if (this.izTimeFormat === 'medium') {
        this.izTimeZonedFormat = 'zonedMedium';
      } else {
        this.izTimeZonedFormat = 'zonedLong';
      }
    } else {
      this.izTimeZonedFormat = this.izTimeFormat;
    }
  }
  izTimeZonedFormatChanged(): void {
    if (this.izTimeZonedFormat === 'zonedShort') {
      this.izTimeFormat = 'short';
    } else if (this.izTimeZonedFormat === 'zonedMedium') {
      this.izTimeFormat = 'medium';
    } else if (this.izTimeZonedFormat === 'zonedLong') {
      this.izTimeFormat = 'long';
    } else {
      this.izTimeFormat = this.izTimeZonedFormat;
    }
  }

  izDateTimeFormatChanged(): void {
    if (this.izDateTimeZonedFormat?.startsWith('zoned')) {
      if (this.izDateTimeFormat === 'short') {
        this.izDateTimeZonedFormat = 'zonedShort';
      } else if (this.izDateTimeFormat === 'medium') {
        this.izDateTimeZonedFormat = 'zonedMedium';
      } else {
        this.izDateTimeZonedFormat = 'zonedLong';
      }
    } else {
      this.izDateTimeZonedFormat = this.izDateTimeFormat;
    }
  }
  izDateTimeZonedFormatChanged(): void {
    if (this.izDateTimeZonedFormat === 'zonedShort') {
      this.izDateTimeFormat = 'short';
    } else if (this.izDateTimeZonedFormat === 'zonedMedium') {
      this.izDateTimeFormat = 'medium';
    } else if (this.izDateTimeZonedFormat === 'zonedLong') {
      this.izDateTimeFormat = 'long';
    } else {
      this.izDateTimeFormat = this.izDateTimeZonedFormat;
    }
  }

  constructor() {
    this.plainDateModel = '2021-07-01';
    this.plainTimeModel = '01:23:45';
    this.plainDateTimeModel = '2021-07-01T01:23:45';
    this.zonedDateTimeModel = '2021-07-01T01:23:45';
    this.zonedDateTimeModelTimeZone = '+05:45[Asia/Kathmandu]';
    this.instantModel = '2021-07-01T01:23:45';
    this.plainYearMonthModel = '2021-07';
    this.plainMonthDayModelMonth = '07';
    this.plainMonthDayModelDay = '01';

    this.plainDateModelChanged();
    this.plainTimeModelChanged();
    this.plainDateTimeModelChanged();
    this.zonedDateTimeModelChanged();
    this.instantModelChanged();
    this.plainYearMonthModelChanged();
    this.plainMonthDayModelChanged();
  }

  private getMonthNames(): Array<{value: string, label: string}> {
    let formatter = new Intl.DateTimeFormat(undefined, {month: 'long', timeZone: 'UTC'});
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      .map(month => {
        let value = month.toString().padStart(2, '0');
        let date = new Date(`2017-${value}-01T00:00:00+00:00`);
        return {value, label: formatter.format(date)};
      });
  }
}
