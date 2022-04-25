import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const isBaseUrl = request.url.startsWith(environment.BASE_URL);

    const apiKey = environment.API_KEY;

    if (isBaseUrl && apiKey) {
      request = request.clone(
        { headers: request.headers.set('Authorization', `Bearer ${apiKey}`) }
      );
    }

    return next.handle(request);
  }
}
