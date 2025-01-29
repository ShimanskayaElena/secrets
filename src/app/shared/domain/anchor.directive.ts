import {
  Directive,
  inject,
  HostAttributeToken,
  signal,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  concat,
  fromEvent,
  startWith,
  debounceTime,
  take,
  timer,
  map,
  switchMap,
  filter,
} from 'rxjs';


@Directive({
  selector: 'a[id]',
  standalone: true,
  host: {
    class: 'anchor',
    '[attr.data-text]': 'textContent()',
    '[class.highlighted]': 'highlighted()',
  },
})
export class AnchorDirective implements AfterViewInit {

  private readonly el = inject(ElementRef).nativeElement;
  private readonly route = inject(ActivatedRoute);
  private readonly id = inject(new HostAttributeToken('id'));

  readonly highlighted = toSignal(
    this.route.fragment.pipe(
      startWith(this.route.snapshot.fragment as (string | null)),
      filter((fragment) => this.id === fragment),
      switchMap(() =>
        concat(
          fromEvent(window, 'scroll').pipe(
            startWith(true),
            debounceTime(100),
            take(1)
          ),
          timer(2000).pipe(map(() => false))
        )
      )
    ),
    { initialValue: false }
  );

  readonly textContent = signal('');

  constructor() { }

  ngAfterViewInit() {
    this.textContent.set(this.el.textContent);
  }

}
