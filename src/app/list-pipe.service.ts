import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IRichList } from './rich-list';

@Injectable({
  providedIn: 'root'
})
export class ListPipeService {

  constructor(private http: HttpClient) {
  }

  public getJSON(): Observable<IRichList> {
    return this.http.get<IRichList>('./assets/richList.json');
  }
}
