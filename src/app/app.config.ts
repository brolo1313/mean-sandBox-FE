import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { httpErrorsInterceptor } from './admin-layout/interceptor/http-errors.interceptor';
import { GoogleLoginProvider, GoogleSigninButtonDirective, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors(
        [httpErrorsInterceptor,]
      )
    ),
    provideEnvironmentNgxMask(),
    provideAnimationsAsync(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '64531276471-rsgodsdm2879qssn0kvo3pkmtni0q1d5.apps.googleusercontent.com',
              {
                oneTapEnabled: false, // <===== default is true
              }
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    GoogleSigninButtonDirective,
  ]
};
