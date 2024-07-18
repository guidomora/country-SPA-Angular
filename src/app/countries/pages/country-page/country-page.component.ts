import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?:Country

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params
      // el pipe sirve para encadenar operadores que transforman los datos que pasan
      .pipe(
        // sM recibe el valor anterior (id de params) y regresa un nuevo observable
        switchMap(({ id }) => this.countriesService.searchCountryByAlphaCode(id))
      )
      // reciobimos la info transformada
      .subscribe(country => {
        if (!country) {
          return this.router.navigateByUrl('') // te devuelve a la ruta ppal
        }
        return this.country = country
      })
  }


}
