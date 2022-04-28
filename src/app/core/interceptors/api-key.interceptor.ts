import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();

    const isBaseUrl = request.url.startsWith(environment.BASE_URL);

    const apiKey = environment.API_KEY;

    if (isBaseUrl && apiKey) {
      request = request.clone(
        { headers: request.headers.set('Authorization', `Bearer ${apiKey}`) }
      );
    }

    return next.handle(request).pipe(finalize(() => this.spinner.hide()));
  }
}
