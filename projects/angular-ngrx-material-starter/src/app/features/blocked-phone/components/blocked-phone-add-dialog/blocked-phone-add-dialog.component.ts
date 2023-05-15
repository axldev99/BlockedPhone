import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'anms-blocked-phone-add-dialog',
  templateUrl: './blocked-phone-add-dialog.component.html',
  styleUrls: ['./blocked-phone-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockedPhoneAddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BlockedPhoneAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
