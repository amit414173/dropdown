import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dropdown';
  selectedValue:string = '';
  onSelection(event:{value:string}){
    this.selectedValue = event.value;
  }
}
