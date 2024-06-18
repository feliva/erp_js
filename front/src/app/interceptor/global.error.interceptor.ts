import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {catchError, finalize, of} from "rxjs";
import {ShowMessageService} from "../components/show-message/show-message.service";
import {MessageService} from "primeng/api";
import {Resposta} from "../model/Resposta";

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const showMessageService:ShowMessageService = inject(ShowMessageService);
  const  ss:MessageService = inject(MessageService)

  return next(req).pipe(
    catchError((errr)=>{
      const resposta:Resposta<any> =  errr.error;
      console.log(errr);
      if(resposta.msgs == undefined){
        ss.add({ severity: 'error', summary: 'Um erro ocorreu.'})
      }else {
        resposta.msgs.forEach((msg) => {
          ss.add({ severity: 'error', detail: msg})
        })
      }

      return of();
    })
  );

};
