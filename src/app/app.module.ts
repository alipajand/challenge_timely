import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';

/**
 * pages
 */
import {HomeComponent} from './components/home/';
import {ErrorComponent} from './components/error/';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ErrorComponent
    ],
    imports: [
        AppRoutes,
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [HttpClient],
    bootstrap: [AppComponent]
})

export class AppModule {
}
