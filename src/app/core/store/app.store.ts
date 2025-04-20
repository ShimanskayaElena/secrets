import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';

import { withMobileStatus } from './mobile-status.feature';
import { withMenuStatus } from './menu-status.feature';
import { withThemeStatus } from './theme-status.feature';
import { Flight, initFlight } from './models/flight.model'; 


export interface AppState {
  from: string;
  to: string;
  initialized: boolean;
  flights: Flight[];
  basket: Record<number, boolean>;
}

export const initialState: AppState = {
  from: 'Paris',
  to: 'London',
  initialized: false,
  flights: [],
  basket: {},
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
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
