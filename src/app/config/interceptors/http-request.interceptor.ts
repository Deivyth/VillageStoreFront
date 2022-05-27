import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, catchError, retry } from "rxjs";
import { TokenService } from "src/app/entities/user/service/token.service";

@Injectable({
    providedIn: "root"
})

export class HttpRequestIntercept implements HttpInterceptor{

    constructor(private tokenService: TokenService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const retryNumber = 3;
        const token = this.tokenService.getToken();
        let intReq = req;

        if(token !=  null) {
            intReq = req.clone({ 
                setHeaders: {
                    Authorization: `Bearer ${ token }`
                }
            });
        }
        
        return next.handle(intReq)
            .pipe(
                retry(retryNumber),
                catchError((error:HttpErrorResponse) => {
                    let errorMessage = "";
                    if(error.status) {
                        errorMessage = "Error Status: ${error.status}\nMessage: ${error.message}";
                    }else{
                        errorMessage = "Error:${error.message}";
                    }
                    console.log(errorMessage);
                    return throwError(() => error);
                })
            )
    }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: HttpRequestIntercept, multi: true}];