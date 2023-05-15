import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-blocked-phone-ui',
  templateUrl: './blocked-phone-ui.component.html',
  styleUrls: ['./blocked-phone-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockedPhoneUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
