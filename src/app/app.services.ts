import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

// import * as $ from 'jquery';

import {MessageService} from './message.service';

const httpOptions = {
    headers: new HttpHeaders({
        'mimeType': 'multipart/form-data'
    })
};

@Injectable({providedIn: 'root'})
export class Services {

    /**
     * URL to web api
     */
    private baseUrl = 'https://timelyapp.dev.time.ly/api';
    private calendarInfoUrl = 'https://timelyapp.dev.time.ly/api/calendars/info';

    constructor(private http: HttpClient,
                private messageService: MessageService) {
    }

    /**
     * POST CalendarEvents from the server
     */
    postCalendarInfo(data: FormData) {
        return this.http.post<any>(this.calendarInfoUrl, data, httpOptions).pipe(
            tap((calendar: any) => this.log(`post event data=${calendar}`)),
            catchError(this.handleError<any>('addHero'))
        );
    }

    /**
     * GET CalendarEvents from the server
     */
    getCalendarEvents(id: string, page: number = 1): Observable<any> {
        const url = `${this.baseUrl}/calendars/${id}/events/?page=${page}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError<any>(`getEvent id=${id}`))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /**
     * Log a eventService message with the MessageService
     */
    private log(message: string) {
        this.messageService.add(`eventService: ${message}`);
    }
}
