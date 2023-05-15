import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockedPhone } from '../../blocked-phone.model';

@Component({
  selector: 'anms-blocked-phone-delete-dialog',
  templateUrl: './blocked-phone-delete-dialog.component.html',
  styleUrls: ['./blocked-phone-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockedPhoneDeleteDialogComponent implements OnInit {

  blockedPhoneNumber: string;

  constructor(
    public dialogRef: MatDialogRef<BlockedPhoneDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BlockedPhone) {
      this.blockedPhoneNumber = data.blockedPhoneNumber;
    }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
