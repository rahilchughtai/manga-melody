import { Component } from '@angular/core';
import { SearchFieldComponent } from "../../components/search-field/search-field.component";

@Component({
  selector: 'app-search',
  imports: [SearchFieldComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

}
