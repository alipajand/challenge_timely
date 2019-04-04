import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

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
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}
