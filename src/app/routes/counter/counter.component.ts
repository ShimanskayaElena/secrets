import { Component, ChangeDetectionStrategy, signal, WritableSignal, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationEvent } from '@angular/animations';

import { balanceAnimation } from '../../shared/utils/balance-animation.utils';
import { WINDOW } from '../../core/config/window.config';


@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  animations: [ balanceAnimation ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnDestroy {

  public readonly isHidden: WritableSignal<boolean> = signal(false);
  public readonly counter: WritableSignal<number> = signal(0);
  public intervalId: number | undefined;

  private readonly COUNTER_INTERVAL_MS = 2000;
  private readonly window = inject(WINDOW);
 
  public toggleVisibility(): void {
    this.isHidden.update(hidden => !hidden);
    const hidden = this.isHidden();

    if (hidden) {
      this.startCounter();
    } else {
      this.stopCounter();
    }
  }

  public onAnimationEvent(event: AnimationEvent): void {
    // console.warn('AnimationEvent ', event);
    // // openClose is trigger name in this example
    // console.warn(`Animation Trigger: ${event.triggerName}`);
    //
    // // phaseName is "start" or "done"
    // console.warn(`Phase: ${event.phaseName}`);
    //
    // // in our example, totalTime is 1000 (number of milliseconds in a second)
    // console.warn(`Total time: ${event.totalTime}`);
    //
    // // in our example, fromState is either "open" or "closed"
    // console.warn(`From: ${event.fromState}`);
    //
    // // in our example, toState either "open" or "closed"
    // console.warn(`To: ${event.toState}`);
    //
    // // the HTML element itself, the button in this case
    // console.warn(`Element: ${event.element}`);
  }

  private startCounter(): void {
    this.counter.update(value => value + 1);

    if (!this.intervalId) {
      this.intervalId = this.window.setInterval(() => {
        this.counter.update(value => value + 1);
      }, this.COUNTER_INTERVAL_MS);
    }
  }

  private stopCounter(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  ngOnDestroy(): void {
    this.stopCounter();
  }
}
