import { inject, InjectionToken } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MobileStatusState } from '@core/store/mobile-status.feature';

export const MOBILE_STATUS = new InjectionToken<MobileStatusState>(
  'determining the user\'s device type',
  {
    providedIn: 'root',
    factory: () => {
      const media: MediaMatcher = inject(MediaMatcher);
      return ({ isMobilePhone: media.matchMedia('(max-width: 600px)').matches });
    }
  });
