import {Directive, Input, NgModule, TemplateRef} from "@angular/core";

@Directive({
  selector: '[template]',
  standalone: true,
  host: {}
})
export class Template {
  @Input() type: string | undefined;

  @Input('template') name: string | undefined;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name!;
  }
}


@NgModule({
  imports: [Template],
  exports: [Template]
})
export class DiretivasModule {}
