import { Component } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-child',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatIconModule, NgTemplateOutlet ],
  templateUrl: './use-ngTemplateOutlet.component.html',
  styleUrl: './use-ngTemplateOutlet.component.scss'
})
export class UseNgTemplateOutletComponent {

  public onSingUp(event: Event): void {
    // console.log('Sing Up!');
  }

  public onSingIn(event: Event): void {
    // console.log('Sing In!');
  }

}
