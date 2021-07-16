// tslint:disable member-ordering
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NamedFormat } from '@ization/moment';

@Component({
  selector: 'iz-moment-demo',
  templateUrl: './moment-demo.component.html',
  styleUrls: ['./moment-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MomentDemoComponent {
  model: string;
  error: string | undefined;
  modelChanged(): void {
    try {
      Temporal.PlainDateTime.from(this.model);
      this.error = undefined;
    } catch (e) {
      this.error = `${e.constructor.name}: ${e.message}`;
    }
  }

  izMDateFormat: NamedFormat | undefined;
  izMTimeFormat: NamedFormat | undefined;
  izMDateTimeFormat: NamedFormat | undefined;
  izMYearMonthFormat: NamedFormat | undefined;
  izMWeekdayFormat: NamedFormat | undefined;

  constructor() {
    this.model = '2021-07-01T01:23:45';
    this.modelChanged();
  }
}
