import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://cf53f74092da49beaa9dcb5313bfe774@o915446.ingest.sentry.io/5855785',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
