
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ByCapitalPageComponent } from '../../../countries/pages/by-capital-page/by-capital-page.component';

@Component({
  selector: 'shared-search-box',
  templateUrl:'search-box.component.html',
  styles: `
  `,
})
export class SearchBoxComponent {


  @Input()
  public placeholder:string = ''

  @Output() // declara un evento emitido por el componente hijo y que puede
  // ser escuchado por el padre
  public onValue = new EventEmitter<string>() // crea una instancia para emitir eventos




  
  emitValue(value: string):void {
    this.onValue.emit(value)
  }
}
