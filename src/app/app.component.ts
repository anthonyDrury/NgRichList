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
  currencySelected: number;
  netWorthPrefix: string;
  errorMessage: string;
  searchString: string;
  nationalitySet: Set<string>;  // Set allows for only distinct values
  nationalitySearchString: string;
  rankSelected: string;

  constructor(
    private _ListPipeService: ListPipeService,
  ) {
    this.nationalitySet = new Set();
    this.nationalitySearchString = 'Show All';
    this.netWorthPrefix = '$USD';
    this.currencySelected = 0;
    this.rankSelected = 'rank';
  }

  rankSort() {
    if (this.rankSelected === 'rank') {
      this.richList.celebrityList.sort(function (a, b) {
        return a.rank - b.rank;
      });
    } else if (this.rankSelected === 'age') {
      this.richList.celebrityList.sort(function (a, b) {
        return a.age - b.age;
      });
    } else if (this.rankSelected === 'name') {
      this.richList.celebrityList.sort(function (a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    }
  }


  resetList() {
    this.richList.celebrityList = JSON.parse(JSON.stringify(this._celebrityList));
  }

  nationalityFilter() {
    this.resetList();
    const testArr = JSON.parse(JSON.stringify(this._celebrityList));  // Deep Copy
    this.richList.celebrityList = testArr.map((x) => {
      if (x.country.toString().toLowerCase().includes(this.searchString.toLowerCase())) {
        return x;
      }
    }).filter(n => n); // Trims list

    this.searchFilter();
  }

  searchFilter() {
    this.resetList();
    const testArr = JSON.parse(JSON.stringify(this._celebrityList));  // Deep Copy
    this.richList.celebrityList = testArr.map((x) => {
      let count = 0;
      let test = 0;

      // Search function
      if (this.searchString != null) {
        test++;
        for (const prop in x) {   // Searches data of each prop for string
          if (x[prop].toString().toLowerCase().includes(this.searchString.toLowerCase())) {
            count++;
            break;  // Only 1 prop needs to match
          }
        }
      }
      if (this.nationalitySearchString != null && this.nationalitySearchString !== 'Show All') {
        test++;
        if (x.country.toString().toLowerCase().includes(this.nationalitySearchString.toLowerCase())) {
          count++;
        }
      }



      if (count >= test) {
        return x;
      }
    }).filter(n => n); // Trims list

    this.rankSort();  // Re order the new list
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

        this.nationalitySet.add('Show All');
        elem.celebrityList.forEach(x => {
          this.nationalitySet.add(x.country);
        });
      },
        error => this.errorMessage = <any>error);


  }
}
