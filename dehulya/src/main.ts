import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig, // spread the existing app config
  providers: [
    ...(appConfig.providers || []), // preserve any existing providers
    provideHttpClient()            // add HttpClient
  ]
}).catch((err) => console.error(err));
