import { inject, InjectionToken } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuStatusState } from '@core/store/menu-status.feature';

export const MENU_STATUS = new InjectionToken<MenuStatusState>(
  'defining side menu mode',
  {
    providedIn: 'root',
    factory: () => {
      const media: MediaMatcher = inject(MediaMatcher);
      return ({ isOpenMenu:  media.matchMedia('(min-width: 600px)').matches });
    }
  });
