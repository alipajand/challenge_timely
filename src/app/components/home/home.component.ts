import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Services} from '../../app.services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    events = [];
    calendarForm: any = FormGroup;

    form = {
        sampleUrl: '​https://calendar.dev.time.ly/i98cgmcr/'
    };

    constructor(private services: Services,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.calendarForm = this.formBuilder.group({
            url: ['', Validators.required]
        });
    }

    /**
     * convenience getter for easy access to form fields
     */
    get formControls() {
        return this.calendarForm.controls;
    }
    get formUrl() {
        return this.calendarForm.get('url');
    }

    fillForm(): void {
        this.calendarForm.patchValue({
            url: String(this.form.sampleUrl)
        });
    }

    postCalendarInfo(): void {
        const payload = new FormData();
        const {url} = this.formControls;
        payload.append('url', String(url.value));

        this.services.postCalendarInfo(payload)
            .subscribe(res => console.log(res));
    }

    getCalendarEvents(id): void {
        this.services.getCalendarEvents(id)
            .subscribe(res => this.events = res);
    }
}
