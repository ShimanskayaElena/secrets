import { Component, ChangeDetectionStrategy, inject, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MediaMatcher } from '@angular/cdk/layout';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppStore } from '../../core/store/app.store';
import { NavigationConfig, NavigationItem } from '../../core/config/navigation.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, RouterLink, MatSidenavModule, MatButtonModule, RouterLinkActive, CdkAccordionModule, MatExpansionModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  public menu = NavigationConfig;

  public mobileQuery: MediaQueryList;
  readonly store = inject(AppStore);
  private readonly media: MediaMatcher = inject(MediaMatcher);

  from = this.store.from;
  to = this.store.to;
  selected = this.store.selected;

  // public fillerNav: Array<string> = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  // public fillerContent: Array<string> = Array.from({ length: 40 }, () => `Main content`);

  constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addEventListener('change', () => {
      this.store.setMobileStatus(this.mobileQuery.matches);
      this.store.setMenuStatus( !this.mobileQuery.matches);
    });

    effect(() => {
      if (this.store.isMobilePhone()) {
        this.sidenav.mode = 'over';
        if (this.store.isOpenMenu()) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  updateCriteria(from: string, to: string): void {
    this.store.updateCriteria(from, to);
  }


  public onCloseSidenav(event: Event): void {
    event.stopPropagation();
    this.store.isMobilePhone() && this.store.setMenuStatus(!this.store.isOpenMenu());
    this.store.isMobilePhone() && this.sidenav.close();
  }


  public onClickMenu(event: Event, item?: NavigationItem): void {
    event.stopPropagation();
   if (item?.route) {
     this.store.isMobilePhone() && this.store.setMenuStatus(!this.store.isOpenMenu());
     this.store.isMobilePhone() && this.sidenav.close();
   }
  }

}
