import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpHandlerFn
} from '@angular/common/http';

import { Observable } from 'rxjs';

    export function  requestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
        console.log('------------------------------------------------')
        if(!req.url.includes('login')){
            const authToken = localStorage.getItem("token");
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer '+authToken)
            });
        }

        return next(req);
  }
