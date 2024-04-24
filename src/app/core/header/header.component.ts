import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppStore } from '@core/store/app.store';
import { ThemeColor } from '@core/store/theme-status.feature';
import { StorageService } from '@shared/services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterLink, MatIconModule ],
  providers: [ StorageService ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  public title = 'Secrets';
  readonly store = inject(AppStore);
  private readonly storageService: StorageService = inject(StorageService);

  public toggleDarkTheme(event: Event, theme: ThemeColor): void {
    event.stopPropagation();
    this.store.setTheme(theme);
    this.storageService.set('theme', theme);
  }

  public onOpenMenu(event: Event): void {
    event.stopPropagation();
    this.store.setMenuStatus( !this.store.isOpenMenu());
  }
}
