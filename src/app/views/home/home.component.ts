import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatButtonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  private media: MediaMatcher = inject(MediaMatcher);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  public mobileQuery: MediaQueryList = this.media.matchMedia('(max-width: 600px)'); // Создание запроса
  public fillerNav: Array<string> = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  public fillerContent: Array<string> = Array.from({ length: 50 }, () => `Main content`);

  private _mobileQueryListener: () => void = () => {
    this.changeSidenav();
    this.changeDetectorRef.detectChanges();
  }

  constructor() {
    this.mobileQuery.addEventListener('change',  this._mobileQueryListener);
  }


  public ngAfterViewInit(): void {
    this.changeSidenav();
  }

  public changeSidenav(): void {
    if ( this.mobileQuery.matches) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  }

  public onToggleSidenav(event: Event): void {
    event.stopPropagation();
    this.sidenav.toggle();
  }


  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
