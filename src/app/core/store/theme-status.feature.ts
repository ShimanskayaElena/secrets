import { inject } from '@angular/core';
import { signalStoreFeature, withState, withMethods, patchState } from '@ngrx/signals';
import { THEME } from '../config/theme.config';

export type ThemeColor = 'LIGHT' | 'DARK';

export type ThemeStatusState = {
  theme: ThemeColor;
}

export function withThemeStatus() {
  return signalStoreFeature(
    withState<ThemeStatusState>(() => inject(THEME)),
    withMethods((store) => ({
      setTheme(theme: ThemeColor) {
        patchState(store, { theme: theme })
      }
    }))
  );
}

