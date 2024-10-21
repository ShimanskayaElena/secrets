import { Component, DestroyRef, HostBinding, Renderer2, OnInit,  effect } from '@angular/core';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HostListenerDirective } from './host-listener.directive';

@Component({
  selector: 'app-parent',
  standalone: true,
  host: {
    '[class.valid]': 'isValid()',
    '(keydown)': 'handleKeyboard($event)'
  },
  imports: [ NgClass, ReactiveFormsModule, HostListenerDirective ],
  templateUrl: './host-element-binding.component.html',
  styleUrl: './host-element-binding.component.scss'
})
export class HostElementBindingComponent implements OnInit {
  // @HostBinding('class.valid') isValid = false;
  // private isValid = false;
  protected emailControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  private isValid = toSignal(this.emailControl.statusChanges.pipe(map(status => { return status === 'VALID'; })));

  constructor(private destroyRef: DestroyRef, private renderer: Renderer2) {
    // effect(() => {
    //   this.isValid()
    //     ? console.log('Valid')
    //     : console.log('Invalid');
    // });
  }

  ngOnInit() {
    // this.emailControl.statusChanges
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe(status => {
    //     this.isValid = status === 'VALID';
    //     status === 'VALID'
    //       ? this.renderer.addClass(document.body, 'valid')
    //       : this.renderer.removeClass(document.body, 'valid');
    //   });
  }

  public onSubmit(event: Event): void {
    this.emailControl.valid && console.log('Submit', event);
    event.preventDefault();
  }

  public handleKeyboard(event: KeyboardEvent): void {
    // console.log('event key', event.key);
    // event.altKey && console.log('altKey', event.altKey);
    // event.shiftKey && console.log('shiftKey', event.shiftKey);
    // event.ctrlKey && console.log('ctrlKey', event.ctrlKey);
  }
}
