import { ChangeDetectorRef } from '@angular/core';

export const changeDetectorRefMock: ChangeDetectorRef = {
  checkNoChanges(): void {},
  detach(): void {},
  detectChanges(): void {},
  markForCheck(): void {},
  reattach(): void {},
};
