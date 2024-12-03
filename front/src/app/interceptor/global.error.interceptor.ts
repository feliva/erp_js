import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {catchError, finalize, of} from "rxjs";
import {ShowMessageService} from "../components/show-message/show-message.service";
import {MessageService} from "primeng/api";
import {Resposta} from "../model/Resposta";

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {

    const showMessageService: ShowMessageService = inject(ShowMessageService);
    const ss: MessageService = inject(MessageService)

    return next(req).pipe(
        catchError((errr) => {
            const resposta: Resposta<any> = errr.error;

            if (resposta?.erro) {
                ss.add({severity: 'error', detail: resposta?.erro?.msg})
            }

            if (resposta?.mensagenErros) {
                resposta.mensagenErros.forEach((msg) => {
                    ss.add({severity: 'error', detail: msg})
                })
            }

            if (!resposta?.erro && !resposta?.mensagenErros) {
                ss.add({severity: 'error', summary: 'Um erro ocorreu.'})
            }

            return of();
        })
    );

};
