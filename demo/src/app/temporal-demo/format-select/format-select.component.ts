import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SimpleFormat } from '@ization/temporal';

@Component({
  selector: 'iz-format-select',
  templateUrl: './format-select.component.html',
})
export class FormatSelectComponent {
  @Input() model: SimpleFormat | undefined;
  @Output() modelChange = new EventEmitter<SimpleFormat | undefined>();

  updateModel(value: SimpleFormat | undefined): void {
    this.model = value;
    this.modelChange.emit(value);
  }
}
