import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {SnotifyService} from 'ng-snotify';

import {Services} from '../../app.services';

import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    calendarEvents = [];
    calendarInfo: any = null;
    calendarForm: any = FormGroup;

    flags = {
        loading: false,
        showReset: false
    };

    form = {
        sampleUrl: '​https://calendar.dev.time.ly/i98cgmcr/'
    };

    params = {
        total_data: 1,
        total_page: [],
        total_page_count: 1,
        per_page: 20,
        queryData: null,
        currentPage: 1,
        has_next: true
    };

    constructor(private services: Services,
                private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private notifyService: SnotifyService) {

        this.router.events.subscribe(event => {
            if (!event) {
                return;
            }

            if (event instanceof NavigationEnd) {
                this.fillData();
            }
        });
    }

    ngOnInit(): void {
        this.fillData();

        /**
         * create form
         */
        this.calendarForm = this.formBuilder.group({
            url: ['', Validators.required]
        });
    }

    /**
     * convenience getter for easy access to form fields
     */
    get formControls(): any {
        return this.calendarForm.controls;
    }

    get formUrl(): string {
        return this.calendarForm.get('url');
    }

    generateUrl(calendar) {
        return calendar.images ? calendar.images[0].sizes.thumbnail.url : null;
    }

    /**
     *
     */
    resetData(): void {
        this.calendarInfo = null;
        this.params.queryData = null;

        this.calendarEvents = [];

        this.params.total_data = 1;
        this.params.currentPage = 1;
        this.params.total_page_count = 1;

        this.params.has_next = true;
        this.flags.showReset = false;

        this.calendarForm.patchValue({
            url: ''
        });

        this.router.navigate(['/home']);
    }

    /**
     * fire when router has changed!
     */
    fillData(): void {
        /**
         * fill query parameters
         */
        this.route.queryParamMap.subscribe(params => {
            this.params.queryData = {...params};
        });

        if (this.params.queryData) {
            this.getCalendarEvents();
        }
    }

    /**
     * fill sample url
     */
    fillForm(): void {
        this.calendarForm.patchValue({
            url: this.form.sampleUrl
        });
    }

    /**
     * send calendar url to get calendar id
     */
    postCalendarInfo(): void {
        const {url} = this.formControls;
        const form = `url=${encodeURIComponent(url.value).replace('%E2%80%8B', '')}`;

        /**
         * reset data
         */
        this.calendarInfo = null;
        this.params.queryData = null;

        this.calendarEvents = [];

        this.params.total_data = 1;
        this.params.currentPage = 1;
        this.params.total_page_count = 1;

        this.params.has_next = true;
        this.flags.showReset = false;


        /**
         * get calendar's info
         */
        this.services.postCalendarInfo(form).subscribe(res => {
            if (!res) {
                return;
            }

            /**
             * store date
             */
            this.calendarInfo = res.data;

            /**
             * get calendar's events based on calendar's id
             */
            this.router.navigate(['/home'], {
                queryParams: {
                    page: this.params.currentPage,
                    id: this.calendarInfo.id
                }
            });
        }, () => {
            this.flags.loading = false;

            /**
             * notify
             */
            this.notifyService.clear();
            this.notifyService.error('The calendar wasn\'t found!', {
                timeout: 3000,
                pauseOnHover: false
            });
        });
    }

    /**
     *
     */
    goToNextPage(): void {
        if (this.params.currentPage + 1 > this.params.total_page_count) {
            /**
             * notify
             */
            this.notifyService.clear();
            this.notifyService.error('It\'s the end! You can not go to next page.', {
                timeout: 3000,
                pauseOnHover: false
            });
            return;
        }

        /**
         * scroll to top
         */
        window.scrollTo(0, 0);

        this.params.currentPage++;
        this.router.navigate(['/home'], {
            queryParams: {
                page: this.params.currentPage,
                id: this.params.queryData.params.id
            }
        });
    }

    /**
     *
     */
    goToPreviousPage(): void {
        if (this.params.currentPage - 1 === 0) {
            /**
             * notify
             */
            this.notifyService.clear();
            this.notifyService.error('It\'s the first page! You can not go to previous page.', {
                timeout: 3000,
                pauseOnHover: false
            });
            return;
        }

        /**
         * scroll to top
         */
        window.scrollTo(0, 0);

        this.params.currentPage--;
        this.router.navigate(['/home'], {
            queryParams: {
                page: this.params.currentPage,
                id: this.params.queryData.params.id
            }
        });
    }

    /**
     * get calendar's events
     * @param id: calendar's id
     */
    getCalendarEvents(id?: string): void {
        if (!this.params.has_next) {
            return;
        }

        if (!id) {
            id = this.params.queryData ? this.params.queryData.params.id : null;
        }

        if (!id) {
            return;
        }

        this.flags.loading = true;
        this.services.getCalendarEvents(id, this.params.currentPage).subscribe(res => {
            this.flags.loading = false;
            this.flags.showReset = true;

            if (!res) {
                /**
                 * notify
                 */
                this.notifyService.clear();
                this.notifyService.error('An error has occurred, please try again!', {
                    timeout: 3000,
                    pauseOnHover: false
                });
                return;
            }

            /**
             * store data
             */
            const response = res.data;
            this.params.has_next = response.has_next;
            this.params.per_page = response.size;
            this.params.total_data = response.total;

            const total = Math.floor(response.total / response.size);
            this.params.total_page_count = total;
            for (let i = 1; i < total; i++) {
                this.params.total_page.push(i);
            }

            this.calendarEvents = [];
            response.items.map(item => {
                    this.calendarEvents.push(item);
                }
            );
        }, () => {
            this.flags.loading = false;

            /**
             * notify
             */
            this.notifyService.clear();
            this.notifyService.error('An error has occurred on getting Events, please try again!', {
                timeout: 3000,
                pauseOnHover: false
            });
        });
    }
}
