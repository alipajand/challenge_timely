import {Component} from '@angular/core';
import {Services} from '../../app.services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent {
    events = [];

    constructor(private services: Services) {
    }

    getCalendarEvents(): void {
        this.services.getCalendarEvents()
            .subscribe(res => this.events = res);
    }
}
