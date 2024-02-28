import {Route} from "@angular/router";

export interface CRoute extends Route{

  permissao?:Array<string>;

}
