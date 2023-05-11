import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
