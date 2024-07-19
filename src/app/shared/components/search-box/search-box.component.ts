
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ByCapitalPageComponent } from '../../../countries/pages/by-capital-page/by-capital-page.component';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl:'search-box.component.html',
  styles: `
  `,
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  // Subject es un tiopo especial de observable
  private debouncer:Subject<string> = new Subject<string>()
  // es opcional pq en un punto de cuando se monta el componente, no lo tenemos
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder:string = ''

  @Output() // declara un evento emitido por el componente hijo y que puede
  // ser escuchado por el padre
  public onValue = new EventEmitter<string>() // crea una instancia para emitir eventos

  @Output() // declara un evento emitido por el componente hijo y que puede
  // ser escuchado por el padre
  public onDebounce = new EventEmitter<string>() // crea una instancia para emitir eventos


  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300) // cuanto esperar para hacer el prox proceso
    )
    .subscribe(value => {
      this.onDebounce.emit(value)
    })
  }

  // se manda a llamar una vez que se destruye el componente
  // cada vez que salgo de la pag, se destruye el componente
  // hay que hacerlo siempre que haya un subscribe a menos que sea get, post, put delete
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe() // asegurarnos que se se cancele la subscripcion
    // esto evita que se siga emitiendo valores y puede dar problemas de rendimiento
  }

  emitValue(value: string):void {
    this.onValue.emit(value)
  }


  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm)
  }
}
