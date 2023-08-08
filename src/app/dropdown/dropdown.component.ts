import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements AfterViewInit {
  options:any = null;
  selectedValue:any = null;
  showDropdown = false;
  isSearching = false;
  seachedOptions:any = [];
  @ViewChild('dropdownInput')
  dropdownInput!: ElementRef;
  @Output() onSelection = new EventEmitter<{value:string}>();
  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    this.showDropdown = false;
    this.seachedOptions = [];
  }
  
  constructor() {
    this.options = ['Option 1','Option 2','Option 3','Option 4','Option 5','Option 6','Option 7'];
    this.seachedOptions = this.options;
   }

   ngAfterViewInit() {
    this.searchOptions();
   }

  searchOptions() {
    const search$ = fromEvent(this.dropdownInput.nativeElement,'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.isSearching = true),
      switchMap((value: any) => value ? this.getOptions(value) : of<any>(this.options)),
      tap(() => {
        this.isSearching = false;
        this.showDropdown = true;
      }));

      search$.subscribe((res: any) => {
        this.isSearching = false;
        this.seachedOptions = res;
      });
  }

  getOptions(value: any): Observable<any> {
    if(!value) {
      return of(null);
    }
    return of(this.options.filter((option: any) => option.toLowerCase().includes(value.toLowerCase())));
  }

  onSelect(event: any) {
    this.selectedValue = event;
    this.showDropdown = false;
    this.seachedOptions = [];
    this.onSelection.emit({value: event});
  }
  
}
