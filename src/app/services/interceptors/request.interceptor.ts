import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpHandlerFn
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
    export function  requestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
        console.log('------------------------------------------------')
        if(!req.url.includes('login')){
            const authToken = localStorage.getItem("token");
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer '+authToken)
            });
        }

        return next(req);
  }
