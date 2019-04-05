import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

// import * as $ from 'jquery';

import {MessageService} from './message.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache'
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
    postCalendarInfo(data: any) {
        return this.http.post<any>(this.calendarInfoUrl, data, httpOptions);
    }

    /**
     * GET CalendarEvents from the server
     */
    getCalendarEvents(id: string, page: number = 1): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/calendars/${id}/events/?page=${page}`);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
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
