import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {


    private apiUrl: string = 'https://restcountries.com/v3.1'

    private getCountriesRequest(url:string): Observable<Country[]> {
        // el get retorna algo de Country[]
        return this.http.get<Country[]>(url)
        // es un operador de rxjs (liberria incluida en angular)
        .pipe(
            catchError(() => of([])), // si hay un error retorna un obsevable vacio
            // delay(2000) // simula una carga de 2 seg
        )
    }

    constructor(private http: HttpClient) { }

    searchCountryByAlphaCode(code :string):Observable<Country | null> {
        const url = `${this.apiUrl}/alpha/${code}`
        // el get retorna algo de Country
        return this.http.get<Country[]>(url)
        // es un operador de rxjs (liberria incluida en angular)
        .pipe(
            map(countries => countries.length > 0 ? countries[0] : null),
            catchError(() => of(null)) // si hay un error retorna un obsevable vacio
        )
    }

    searchCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`
        return this.getCountriesRequest(url)
    }

    searchCountry(term:string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`
        return this.getCountriesRequest(url)
    }

    searchRegion(region:string): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${region}`
        return this.getCountriesRequest(url)
    }
}