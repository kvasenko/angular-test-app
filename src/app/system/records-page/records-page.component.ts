import { Component, OnInit } from '@angular/core';
import {Category} from '../shared/models/category.model';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
  selector: 'wfm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((categories: any) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const index = this.categories.findIndex(c => c.id === category.id);

    this.categories[index] = category;
  }

}
