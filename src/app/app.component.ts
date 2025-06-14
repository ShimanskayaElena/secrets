import { Component, inject, effect, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './core/header/header.component';
import { AppStore } from './core/store/app.store';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly store = inject(AppStore);
  private readonly document: Document = inject(DOCUMENT);
  private prefersDarkScheme: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    effect(() => {
      this.document.body.classList.toggle('dark-theme', this.store.theme() === 'DARK');
    });
  }

  ngOnInit() {
    this.handleThemeChange(this.prefersDarkScheme);
    this.prefersDarkScheme.addEventListener('change', (e) => this.handleThemeChange(e));
  }

  ngOnDestroy() {
    this.prefersDarkScheme?.removeEventListener('change', (e) => this.handleThemeChange(e));
  }

private handleThemeChange(e: MediaQueryList | MediaQueryListEvent): void {
    this.store.setTheme(e.matches ? 'DARK' : 'LIGHT');
  }
}

// "Как активировать темную тему в Google Chrome" - https://hi-tech.mail.ru/news/47641-kak-aktivirovat-temnuyu-temu/#anchor266726

// Пользователь может выбрать тёмную тему для приложений Windows:
//
//   (Win + I) -> «Персонализация» -> «Цвета» -> «Настраиваемый» -> выбрать режим приложения по умолчанию

// Принудительная тёмная тема для Chrome:
//
//   Введите в адресную строку Chrome: chrome://flags/#enable-force-dark
//   Найдите параметр Auto Dark Mode for Web Contents (Force Dark Mode for Web Contents <- старое название).
//   Измените значение с Default на Enabled.
//   Перезапустите Chrome.
//   Принудительно  добавить class dark-theme for body НЕ НАДО!
//

// если в процессе работы приложения пользователь захочет изменить цвет приложений в Настройках Windows
// это не отразится на цвете самого приложения так, как нет логики для показа приложения при выборе системного цвета

// this.prefersDarkScheme = this.window.matchMedia('(prefers-color-scheme: dark)');
// this.prefersDarkScheme.addEventListener('change', (event) => {
//   console.log('event', event.matches);
//   this.document.body.classList.toggle('dark-theme', event.matches);
// });