import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from './window.config';
import { ThemeStatusState, ThemeColor } from '../store/theme-status.feature';
import { StorageService } from '@shared/services/storage.service';

export const THEME = new InjectionToken<ThemeStatusState>(
  'determines which theme the user has selected on his device',
  {
    providedIn: 'root',
    factory: () => {
      const storageService: StorageService = inject(StorageService);
      const window: Window = inject(WINDOW);

      return storageService.get('theme') ?
        ({ theme: storageService.get('theme') as ThemeColor })
        : ({ theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'DARK' : 'LIGHT' });
    }
  }
);
