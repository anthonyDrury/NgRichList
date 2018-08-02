import { Component, OnInit } from '@angular/core';
import { ListPipeService } from './list-pipe.service';
import { IRichList } from './rich-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  richList: IRichList;
  errorMessage: String;

  constructor(
    private _ListPipeService: ListPipeService,
  ) {}


  ngOnInit(): void {
    this._ListPipeService.getJSON()
      .subscribe(elem => {
        this.richList = elem;
        console.log(elem);
      },
        error => this.errorMessage = <any>error);
  }
}
