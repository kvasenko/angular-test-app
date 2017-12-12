import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {BillService} from '../shared/services/bill.service';
import {EventService} from '../shared/services/event.service';
import {Observable} from 'rxjs/Observable';
import {Category} from '../shared/models/category.model';
import {Bill} from '../shared/models/bill.model';
import {WFMEvent} from '../shared/models/event.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: WFMEvent[] = [];
  s1: Subscription;

  constructor(
    private categoriesService: CategoriesService,
    private billService: BillService,
    private eventsService: EventService
  ) { }

  ngOnInit() {
    this.s1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, any, any]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter((e) => {
      return e.category === cat.id && e.type === 'outcome';
    });

    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;

    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category) {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 50 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }



}
