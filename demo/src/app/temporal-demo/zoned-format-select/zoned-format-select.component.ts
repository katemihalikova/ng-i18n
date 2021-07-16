import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SimpleOrZonedFormat } from '@ization/temporal';

@Component({
  selector: 'iz-zoned-format-select',
  templateUrl: './zoned-format-select.component.html',
})
export class ZonedFormatSelectComponent {
  @Input() model: SimpleOrZonedFormat | undefined;
  @Output() modelChange = new EventEmitter<SimpleOrZonedFormat | undefined>();

  updateModel(value: SimpleOrZonedFormat | undefined): void {
    this.model = value;
    this.modelChange.emit(value);
  }
}
