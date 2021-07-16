import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'iz-time-zone-select',
  templateUrl: './time-zone-select.component.html',
})
export class TimeZoneSelectComponent {
  @Input() model!: string;
  @Output() modelChange = new EventEmitter<string>();

  updateModel(value: string): void {
    this.model = value;
    this.modelChange.emit(value);
  }
}
