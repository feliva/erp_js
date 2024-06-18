import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { EstoqueModule } from './app/estoque/estoque.module';
import { PrimeNGAppUse } from './app/prime-ng-app-use.module';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TemplateModule } from './app/template/template.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loadingInterceptor } from './app/interceptor/loading.interceptor';
import { globalErrorInterceptor } from './app/interceptor/global.error.interceptor';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, TemplateModule, 
        // UsModule,
        // UserModule,
        ReactiveFormsModule, FormsModule, InputTextModule, PrimeNGAppUse, EstoqueModule),
        provideHttpClient(withInterceptors([globalErrorInterceptor, loadingInterceptor])),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations()
    ]
})
  .catch(err => console.error(err));
