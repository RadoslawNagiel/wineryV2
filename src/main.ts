import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { routes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './utils/store/app.state';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(IonicModule.forRoot({})),
        importProvidersFrom(NgxsModule.forRoot([AppState])),
        provideRouter(routes, withPreloading(PreloadAllModules)),
    ],
});
