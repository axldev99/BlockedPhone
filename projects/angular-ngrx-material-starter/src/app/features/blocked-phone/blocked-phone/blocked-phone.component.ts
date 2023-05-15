import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-blocked-phone',
  templateUrl: './blocked-phone.component.html',
  styleUrls: ['./blocked-phone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockedPhoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
