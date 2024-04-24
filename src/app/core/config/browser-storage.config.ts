import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from './window.config';

export const BROWSER_STORAGE = new InjectionToken<Storage>(
  'Browser Storage',
  {
    providedIn: 'root',
    factory: () => {
      const { localStorage } = inject(WINDOW);

      if ( !localStorage ) {
        throw new Error('localStorage is not available');
      }

      return localStorage;
    }
  }
);
