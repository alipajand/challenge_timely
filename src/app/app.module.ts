import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';

/**
 * pages
 */
import {HomeComponent} from './components/home/';
import {ErrorComponent} from './components/error/';
import {LoadingComponent} from './components/loading/';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ErrorComponent,
        LoadingComponent
    ],
    imports: [
        AppRoutes,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        SnotifyModule,
    ],
    providers: [
        {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
        SnotifyService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
