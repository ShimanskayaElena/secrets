import { signalStoreFeature, withState, withMethods, patchState, type, withHooks, getState } from '@ngrx/signals';
import { inject, effect } from '@angular/core';
import { MENU_STATUS } from '../config/menu.config';

export type MenuStatusState = {
  isOpenMenu: boolean;
}

export function withMenuStatus() {
  return signalStoreFeature(
    { state: type<{ isMobilePhone: boolean; }>()},
    withState<MenuStatusState>(() => inject(MENU_STATUS)),
    withMethods((store) => ({
      setMenuStatus(status: boolean): void {
        patchState(store, { isOpenMenu: status })
      }
    })),
    withHooks({
      onInit(store) {
        // effect(() => {
        //   const state = getState(store);
        //   // console.log(` state changed`, state);
        //   console.log(`effect isMobilePhone`, state.isMobilePhone );
        //   console.log('effect isOpenMenu', state.isOpenMenu);
        // });
      },
    })
  );
}
