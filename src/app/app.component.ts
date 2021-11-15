import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontangular';

  public searchText:string ='';
  public entries:string[] = [];

  //dependance
  // =null se fait avant que le contsructor soit crée
  //private httpClient: HttpClient = null;

  //ou:
  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public handleList(): void {
    //<any[]> le type est un tableau d'any
    this.httpClient.get<any[]>('http://localhost:4000')
    //remplace le .then
    .subscribe(data => {
        this.entries = data.map(x => Object.values(x).join(' - '))
    })
  }
  public handleSearch(): void {
     this.httpClient.post<any[]>('http://localhost:4000/search', {
       text: this.searchText
       //la transformation en Json se fait automatiquement
     }).subscribe(data => {
        this.entries = data.map(x => Object.values(x).join(' - '))
    });
  }
}
