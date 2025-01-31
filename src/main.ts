import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localeGerman from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeGerman);
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
