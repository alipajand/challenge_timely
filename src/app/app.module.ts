import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutes} from './app.routes';

import {HomeComponent} from './components/home/home.component';
import {ErrorComponent} from './components/error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ErrorComponent
    ],
    imports: [
        NgbModule,
        AppRoutes,
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
