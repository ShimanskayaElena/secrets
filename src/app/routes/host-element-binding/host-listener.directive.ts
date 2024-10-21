import { Directive, EventEmitter, HostListener, Output, output } from '@angular/core';

@Directive({
  selector: '[appHostListener]',
  standalone: true,
  host: {
    '(click)': 'handleHostClick($event)'
  }
})
export class HostListenerDirective {

  // @Output() buttonClick = new EventEmitter<PointerEvent>();
  // @HostListener('click', ['$event']) private handleHostClick(event: PointerEvent) {
  //   event.preventDefault();
  //   this.buttonClick.emit(event);
  // }

  buttonClick = output<PointerEvent>();
  private handleHostClick(event: PointerEvent) {
    event.preventDefault();
    this.buttonClick.emit(event);
  }
}
