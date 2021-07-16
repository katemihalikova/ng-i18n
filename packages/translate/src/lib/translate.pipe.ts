import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { IzAbstractPipe, IzCoreService } from '@ization/core';
import { IzTranslatePluginLinkService } from './plugin-link.service';

/**
 * `izTranslate` pipe that converts translation keys and optional params into a translated and localized string
 * @category Pipes
 */
@Pipe({
  name: 'izTranslate',
  pure: false,
})
export class IzTranslatePipe extends IzAbstractPipe<string | string[], [Record<string, unknown> | void]> implements PipeTransform {
  constructor(
    private linkService: IzTranslatePluginLinkService,
    coreService: IzCoreService,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(coreService, changeDetectorRef);
  }

  convert(input: string | string[], params?: Record<string, unknown>): string {
    if (this.linkService.translations === undefined) {
      return '';
    }

    if (typeof input === 'string') {
      input = input.split('.');
    }

    let translation = this.linkService.translations.get(input, params || {});

    // input returned unchanged means that translation was not found
    if (input === translation) {
      console.warn(`@ization/translate: Translation key '${input.join('.')}' was not found (using locales: ${this.linkService.translations.availableLocales.join(', ')}).`);
      return '';
    }

    if (typeof translation === 'object') {
      console.warn(`@ization/translate: Translation key '${input.join('.')}' resolved to be an object (using locales: ${this.linkService.translations.availableLocales.join(', ')}):`, translation);
      return '';
    }

    return translation;
  }
}
