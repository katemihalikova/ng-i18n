import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NamedFormat } from '@ization/moment';

@Component({
  selector: 'iz-format-select',
  templateUrl: './format-select.component.html',
})
export class FormatSelectComponent {
  @Input() model: NamedFormat | undefined;
  @Output() modelChange = new EventEmitter<NamedFormat | undefined>();

  updateModel(value: NamedFormat | undefined): void {
    this.model = value;
    this.modelChange.emit(value);
  }
}
