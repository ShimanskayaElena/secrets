import { Component, inject,  OnInit } from '@angular/core';
import { ViewportScroller, CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute, NavigationEnd  } from '@angular/router';

import { AnchorDirective } from '../../shared/domain/anchor.directive';

@Component({
  selector: 'app-singleton',
  standalone: true,
  imports: [ RouterLink, CommonModule, AnchorDirective,],
  templateUrl: './highlight.component.html',
  styleUrl: './highlight.component.scss',
})
export class HighlightComponent implements  OnInit {

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly viewportScroller = inject(ViewportScroller);

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }
    });

    // this.router.events.subscribe((event ) => {
    //   if (event instanceof NavigationEnd && this.activatedRoute.snapshot.fragment != null) {
    //     console.log('scroll');
    //     this.viewportScroller.scrollToAnchor(this.activatedRoute.snapshot.fragment);
    //   }
    // });

     // Проверяем начальный фрагмент
    //  const initialFragment = this.activatedRoute.snapshot.fragment;
    //  if (initialFragment) {
    //    setTimeout(() => {
    //      console.log('scroll init');
    //      this.viewportScroller.scrollToAnchor(initialFragment);
    //    });
    //  }

     // Подписываемся на изменения фрагмента
    //  this.activatedRoute.fragment.subscribe(fragment => {
    //    if (fragment) {
    //      setTimeout(() => {
    //        console.log('scroll');
    //        this.viewportScroller.scrollToAnchor(fragment);
    //      });
    //    }
    //  });
   }
  }


