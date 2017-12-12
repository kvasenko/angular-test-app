import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BaseApi} from '../../../shared/core/base.api';
import {Bill} from '../models/bill.model';

@Injectable()
export class BillService extends BaseApi {

  constructor (public http: HttpClient) {
    super(http);
  }

  getBill (): Observable<any> {
    return this.get('bill');
  }

  getCurrency (base: string = 'RUB'): Observable<any> {
    return this.http.get(`http://api.fixer.io/latest?base=${base}`)
      .map((response: HttpResponse<any>) => response);
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }
}
