import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {PrimeNGAppUse} from './app/prime-ng-app-use.module';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {loadingInterceptor} from './app/interceptor/loading.interceptor';
import {globalErrorInterceptor} from './app/interceptor/global.error.interceptor';
import {HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {PreloadAllModules, provideRouter, withPreloading} from "@angular/router";
import {APP_ROUTES} from "./app/app.routes";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {providePrimeNG} from "primeng/config";
import {ThemeApp} from "./app/ThemeApp";
import traducao from "./translate";


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
          PrimeNGAppUse,
          TranslateModule.forRoot({
            defaultLanguage: 'pt-br',
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient],
            },
          })
        ),
        provideHttpClient(withInterceptors([globalErrorInterceptor, loadingInterceptor])),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations(),
        providePrimeNG({
            theme: {
                preset: ThemeApp,
            },
            translation:traducao
        }),
        provideRouter(APP_ROUTES,withPreloading(PreloadAllModules))
    ]
})
  .catch(err => console.error(err));
