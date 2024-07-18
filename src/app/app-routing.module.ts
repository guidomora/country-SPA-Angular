import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './shared/pages/aboutPage/aboutPage.component';
import { ContactPageComponent } from './shared/pages/contactPage/contactPage.component';

// definicion de las rutas
const routes: Routes = [
  // {
  //   path:'',
  //   component: HomePageComponent
  // },
  {
    path:'about',
    component: AboutPageComponent
  },
  {
    path:'contact',
    component: ContactPageComponent
  },
  // LAZY LOAD:
  {
    // para acceder a un modulo seria, countries/example
    path:'countries',
    // carga los hijos, primero especificar el path del archivo
    // se importa el modulo y con el then lo seleccionamos
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  },
  // ----------------------------------
  {
    path:'**', // cualqquier ruta que no exista redirige a la home
    redirectTo: 'countries'
  },
];

@NgModule({
  // route principal de la app por eso usamos el forRoot
  imports: [RouterModule.forRoot(routes)], // solo hay un forRoot
  exports: [RouterModule]
})
export class AppRoutingModule { }
