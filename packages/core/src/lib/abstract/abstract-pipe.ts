import { Injectable, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isEqual } from 'lodash';
import { Subscription } from 'rxjs';

import { IzCoreService } from '../core/core.service';

/**
 * Parent class for each pipe that works with locale system
 *
 * So far Angular does not support Observables in pipes so an impure pipe with an memoization optimization is used instead.
 * All pipes that extend from this class must be marked as impure to work correctly.
 * See issue [angular/angular#15041](https://github.com/angular/angular/issues/15041) for more info.
 *
 * @template Input Pipe input - type of stuff that is passed before `|` and pipe name in Angular template
 * @template Params Pipe params - array of types of stuff that is passed after pipe name in Angular template
 * @category Pipes
 */
@Injectable()
export abstract class IzAbstractPipe<Input, Params extends unknown[] = []> implements PipeTransform, OnDestroy {
  constructor(
    private coreService: IzCoreService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  private previousInput?: Input;
  private previousParams: Params | [] = [];
  private previousOutput = '';

  private subscription: Subscription = this.coreService.getLocalePreferenceChanged()
    .subscribe(() => {
      this.previousInput = undefined;
      this.changeDetectorRef.markForCheck();
    });

  /**
   * Angular Pipe API method that includes memoization. Actual code of the pipe should be implemented in [[`convert`]] method.
   * @param input Pipe input
   * @param params Pipe params
   */
  transform(input?: Input, ...params: Params): string {
    if (input === undefined || input === null || Number.isNaN(input)) {
      return '';
    }

    // memoization: if input and params are the same as in previous call, just return memoized value
    if ((input === this.previousInput || isEqual(input, this.previousInput)) && (params === this.previousParams || isEqual(params, this.previousParams))) {
      return this.previousOutput;
    }

    // memoization: input and/or params changed, save them for next memoization check
    this.previousInput = input;
    this.previousParams = params;

    this.previousOutput = this.convert(input, ...params);
    return this.previousOutput;
  }

  /**
   * Actual pipe logic, extend this method to create locale-based pipe.
   * @param input Pipe input
   * @param params Pipe params
   */
  protected abstract convert(input: Input, ...params: Params): string;

  /** @internal */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
