import {Component} from '@angular/core';
import {BreadcrumbService} from './breadcrumb.service';
import {BreadCrumbMenuItem} from "./BreadCrumbMenuItem.class";
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-breadcrumb',
    template: `
    <div class="breadcrumb-panel p-3">
      <div class="p-element max-w-full">
        <div class="p-breadcrumb p-component">
          <ul class="p-breadcrumb-list" >
            <li class="pr-1">
              <a class="pi pi-home" href="/" ></a>
            </li>
            <li *ngFor="let item of this.getMenuItens()" class="pr-1 pl-1 {{item.styleClass}}">
              <a class="{{item.icon}}" href="{{item.url}}" (click)="this.navigate($event,item)">{{item.label}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
    styles: [`
      .breadcrumb-panel{
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        background: #ffffff;
      }
    .p-breadcrumb .p-breadcrumb-list {
      margin: 0;
      padding: 0;
      list-style-type: none;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }


  `],
    standalone: true,
    imports: [NgFor]
})
export class BreadcrumbComponent {

  constructor(private breadService:BreadcrumbService) {}

  public getMenuItens(){
    return this.breadService.mm;
  }

  public navigate(event:Event,item:BreadCrumbMenuItem){
    this.breadService.navigate(item)
    event.preventDefault();
  }
}
