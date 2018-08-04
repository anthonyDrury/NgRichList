import { Component, OnInit } from '@angular/core';
import { ListPipeService } from './list-pipe.service';
import { IRichList } from './rich-list';
import { ICelebrityList } from './celebrity-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  _richList: IRichList;
  _celebrityList: ICelebrityList;

  richList: IRichList;
  usDollarValue: number;
  australianDollarValue: number;
  euroValue: number;
  currencySelected = 0;
  netWorthPrefix = '$USD';
  errorMessage: string;
  searchString: string;

  constructor(
    private _ListPipeService: ListPipeService,
  ) { }


  searchFilter() {
    console.log(this.searchString);
    this.richList.celebrityList = JSON.parse(JSON.stringify(this._celebrityList));
    const testArr = JSON.parse(JSON.stringify(this._celebrityList));  // Deep Copy
    this.richList.celebrityList = testArr.map((x) => {
      let count = 0;
      for (const prop in x) {   // Searches data of each prop for string
        if (x[prop].toString().toLowerCase().includes(this.searchString.toLowerCase())) {
          count++;
        }
      }
      if (count) {
        return x;
      }
    }).filter(n => n); // Trims list
    console.log(this.richList.celebrityList.length);
  }

  currencyFilter() {
    if (this.currencySelected === this.richList.usDollarValue) {
      this.netWorthPrefix = '$USD';
    } else if (this.currencySelected === this.richList.australianDollarValue) {
      this.netWorthPrefix = '$AUD';
    } else if (this.currencySelected === this.richList.euroValue) {
      this.netWorthPrefix = '€EUR';
    }

    this.richList.celebrityList.map((x, i) => {
      x.netWorth = this.currencySelected * this._celebrityList[i].netWorth;
    });
  }


  ngOnInit(): void {
    this._ListPipeService.getJSON()
      .subscribe(elem => {
        this.richList = elem;

        // Deep Copy in order to avoid reference
        this._celebrityList = JSON.parse(JSON.stringify(elem.celebrityList));
        this._richList = JSON.parse(JSON.stringify(elem.celebrityList));


        this.usDollarValue = this.richList.usDollarValue;
        this.australianDollarValue = this.richList.australianDollarValue;
        this.euroValue = this.richList.euroValue;
        this.currencySelected = this.richList.usDollarValue;

      },
        error => this.errorMessage = <any>error);
  }
}
