import {Component, inject, Inject, OnInit} from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { MainComponent } from './template/main/main.component';
import { NavComponent } from './template/nav/nav.component';
import { HeaderComponent } from './template/header/header.component';
import { ToastModule } from 'primeng/toast';
import {Router} from "@angular/router";
import {InjectSetupWrapper} from "@angular/core/testing";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    template: `
      <p-toast />
      <app-header/>
      <main class="flex flex-row w-full">
        <app-nav />
        <app-main/>
      </main>
      <app-loading></app-loading>
    <!--app-header></app-header-->
  `,
    styles: [`
  `],
    standalone: true,
    imports: [
        ToastModule,
        HeaderComponent,
        NavComponent,
        MainComponent,
        LoadingComponent,
    ],
})
export class AppComponent implements OnInit{

  // config: PrimeNGConfig = inject(PrimeNGConfig);
  translateService: TranslateService = inject(TranslateService);

  constructor() {}

  ngOnInit() {
    this.translateService.use('pt-br')
    this.translateService.get('pt-br').subscribe(res =>{
      // this.config.setTranslation(res)
    });
  }

}
