import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';

import { withMobileStatus } from './mobile-status.feature';
import { withMenuStatus } from './menu-status.feature';
import { withThemeStatus } from './theme-status.feature';

export interface Flight {
  id: number;
  from: string;
  to: string;
  date: string;
  delayed: boolean;
}

export const initFlight: Flight = {
  id: 0,
  from: '',
  to: '',
  date: '',
  delayed: false
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState({
    from: 'Paris',
    to: 'London',
    initialized: false,
    flights: [] as Flight[],
    basket: {} as Record<number, boolean>,
  }),
  withComputed((store) => ({
    selected: computed(() => store.flights().filter((f) => store.basket()[f.id])),
    criteria: computed(() => ({ from: store.from(), to: store.to() })),
  })),
  withMethods((state) => {
    const { basket, flights, from, to, initialized } = state;

    return {
      updateCriteria: (from: string, to: string) => {
        patchState(state, { from, to });
      },
      updateBasket: (flightId: number, selected: boolean) => {
        patchState(state, {
          basket: {
            ...basket(),
            [flightId]: selected,
          },
        });
      },
    }
  }),
  withMobileStatus(),
  withMenuStatus(),
  withThemeStatus()
);
