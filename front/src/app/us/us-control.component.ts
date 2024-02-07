import {Component} from '@angular/core';

@Component({
  selector: 'app-us-control',
  template: `
    <p>
      us-control works!
    </p>
    <app-us-busca></app-us-busca>
  `,
  styles: [
  ]
})
export class UsControlComponent {

  renderBuscar = false;
  renderListar = false;
  renderForm = false;

  telaBuscar(){
    this.renderBuscar = true;
    this.renderListar = false;
    this.renderForm = false;
  }

  telaListar(){
    this.renderBuscar = false;
    this.renderListar = true;
    this.renderForm = false;
  }

  telaForm(){
    this.renderBuscar = false;
    this.renderListar = false;
    this.renderForm = true;
  }
}
