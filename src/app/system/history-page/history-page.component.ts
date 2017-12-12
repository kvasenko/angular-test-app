import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventService} from '../shared/services/event.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Category} from '../shared/models/category.model';
import {WFMEvent} from '../shared/models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  subs: Subscription;
  categories: Category[] = [];
  events: WFMEvent[] = [];
  filteredEvents: WFMEvent[] = [];
  isLoaded = false;

  chartData = [];

  isFilterVisible = false;

  constructor(private categoriesService: CategoriesService, private eventService: EventService) { }

  ngOnInit() {
    this.subs = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [any, any]) => {
      this.categories = data[0];
      this.events = data[1];
      this.isLoaded = true;

      this.setOriginalEvents();
      this.calculateChartData();
    });
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach(cat => {
      const catEvent = this.filteredEvents.filter((e: any) => e.category === cat.id && e.type === 'outcome');

      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e: any) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  filterApply(filterData) {
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return !filterData.type.length || filterData.type.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return !filterData.categories.length || filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
      const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();

  }

  filterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
