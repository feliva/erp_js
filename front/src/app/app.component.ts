import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-show-message></app-show-message>
      <app-header class="header height-size-he-foo"/>
      <main>
        <app-nav/>
        <app-main/>
      </main>

    <app-header></app-header>
    </div>
  `,
  styles: [`
  `],
})
export class AppComponent {
  title = 'front-angular';

  constructor(){
  }
}
