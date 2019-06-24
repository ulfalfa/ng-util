import { Component, OnInit } from '@angular/core'
import { Ha4usFormControl } from '@ulfalfa/ng-util'
@Component({
  selector: 'app-testcontrol',
  templateUrl: './testcontrol.component.html',
  styleUrls: ['./testcontrol.component.scss'],
})
@Ha4usFormControl('test')
export class TestcontrolComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
