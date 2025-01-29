import { ApplicationConfig, ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules, withInMemoryScrolling, withDebugTracing } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      // withInMemoryScrolling({
      // anchorScrolling: 'enabled',
      // scrollPositionRestoration: 'enabled'
      // }),
      withPreloading(PreloadAllModules),
    ),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: () => () => inject(ViewportScroller).setOffset([0, 64]),
      multi: true,
    },
  ]
};
