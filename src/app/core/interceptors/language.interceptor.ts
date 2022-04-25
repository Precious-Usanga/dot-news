import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Constants } from '../shared/constants';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const userPreferredlanguage = this.storageService.get(Constants.STORAGE_VARIABLES.LANGUAGE);

    if (userPreferredlanguage) {
      request = request.clone(
        { params: request.params.has('language') ? request.params : request.params.set('language', userPreferredlanguage) }
      );
    }

    return next.handle(request);
  }
}
