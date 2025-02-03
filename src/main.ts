import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import localeGerman from '@angular/common/locales/de';
import { bootstrapApplication } from '@angular/platform-browser';

registerLocaleData(localeGerman);
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
