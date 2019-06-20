import { Component, OnInit } from '@angular/core'

import { UsMasonryOptions } from '@ulfalfa/ng-util'

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss'],
})
export class MasonryComponent implements OnInit {
  options: UsMasonryOptions = {
    gutter: 15,
    columnWidth: 100,
  }
  constructor() {}

  ngOnInit() {}
}
