import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p-toast />
      <app-show-message></app-show-message>
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
})
export class AppComponent {
  title = 'front-angular';

  constructor(){
  }
}
