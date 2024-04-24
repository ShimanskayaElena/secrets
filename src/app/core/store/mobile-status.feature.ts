import { inject } from '@angular/core';
import { signalStoreFeature, withState, withMethods, patchState } from '@ngrx/signals';
import { MOBILE_STATUS } from '@core/config/mobile.config';

export type MobileStatusState = {
  isMobilePhone: boolean;
};

export function withMobileStatus() {
  return signalStoreFeature(
    withState<MobileStatusState>(() => inject(MOBILE_STATUS)),
    withMethods((store) => ({
      setMobileStatus(status: boolean): void {
        patchState(store, { isMobilePhone: status })
      }
    })
    ));
}
