import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [CommonModule, CounterComponent],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountersComponent {

}
