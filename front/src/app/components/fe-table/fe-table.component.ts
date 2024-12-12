import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter, input,
  Input, OnInit, Output,
  output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DiretivasModule, Template} from "../../shared/diretivas";
import {PrimeTemplate} from "primeng/api";
import {TableLazyLoadEvent} from "primeng/table/table.interface";

@Component({
  selector: 'fe-table',
  standalone: true,
  imports: [CommonModule,DiretivasModule],
  template: `
    <div class="p-datatable p-component">
      <div class="p-datatable-wrapper">
        <table class="p-datatable-table ng-star-inserted w-full" >

          <thead class="p-datatable-thead">
            <tr class="ng-star-inserted">
                <ng-container *ngTemplateOutlet="thead?thead:defaultThead"></ng-container>
            </tr>
          </thead>
          <tbody class="p-element p-datatable-tbody">
            @for (item of this.values; track item[this.key]){
              <tr class="ng-star-inserted">
                <ng-container *ngTemplateOutlet="body?body:defaultBody; context: { $implicit: item }"></ng-container>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-center flex-wrap gap-6 mb-12 ">
      <div>
        <button type="button" class="p-link p-disabled " aria-label="Primeira Página">
          <i class="pi pi-angle-left"></i>
        </button>
        <span class="p-paginator-pages ng-star-inserted">
        @for(item of getPages();track item){
          <button class=" button mr-1" >
            <span class="text-xl">{{item}}</span>
          </button>
        }
        </span>
        <button type="button" class=" p-link p-disabled"  aria-label="Primeira Página">
          <i class="pi pi-angle-right"></i>
        </button>
      </div>
    </div>
    <ng-template #defaultThead></ng-template>
    <ng-template #defaultBody></ng-template>





  `,
  styles: `
    .button{
      color: #3B82F6;;
      background: transparent;
      border: 1px solid  #3B82F6;
      font-size: 1rem;
      transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
      border-radius: 50%;

    }
    .button:hover{
      background: rgba(59, 130, 246, 0.04);
      color: #3B82F6;
      border: 1px solid;
    }
  `
})
export class FeTableComponent implements AfterContentInit,OnInit{

  @Input()
  values:any;

  @Input()
  key!: string;

  @Input()
  body!:TemplateRef<any>

  @Input()
  thead!:TemplateRef<any>

  @Input()
  totalRegistro!:number;

  @Input()
  recPerPage:number = 3;

  page:number = 1

  @Output()
  onLazyLoadEvent:EventEmitter<TableLazyLoadEvent> = new EventEmitter<TableLazyLoadEvent>()

  @ContentChildren(Template) templates!: QueryList<Template>;

  ngOnInit() {
    this.onLazyLoadEvent.emit({first:1,last:this.recPerPage * this.page})
  }

  getPages():number[]{
    let valores:number[] = Array();
    let inicio = 0;
    if((this.page - 2) <=0){
      inicio = 1
    }else{
      inicio = this.page -2
    }

    for(inicio;inicio <= this.page+2;inicio++){
      valores.push(inicio);
    }
    return valores;
  }

  ngAfterContentInit(): void {

    (this.templates as QueryList<Template>).forEach((item) => {
      switch (item.getType()) {
        case 'body':
          this.body = item.template;
          break;
        case 'thead':
          this.thead = item.template;
          break;

      }
    })

    console.log(this.body)
  }

}

export interface TableLoadFilterEvent {

  filteredValue?: any[] | any;

  first?: number;
  /**
   * Last element in viewport.
   */
  last?: number;
}
