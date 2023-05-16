import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { AppState } from '../../../../core/core.state';
import * as BlockedPhoneAction from '../../blocked-phone.action';
import { BlockedPhone } from '../../blocked-phone.model';
import { selectAllBlockedPhone } from '../../blocked-phone.selector';
import { BlockedPhoneService } from '../../blocked-phone.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BlockedPhoneDeleteDialogComponent } from '../blocked-phone-delete-dialog/blocked-phone-delete-dialog.component';
import { BlockedPhoneAddDialogComponent } from '../blocked-phone-add-dialog/blocked-phone-add-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'anms-blocked-phone-ui',
  templateUrl: './blocked-phone-ui.component.html',
  styleUrls: ['./blocked-phone-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockedPhoneUiComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>(); //Fais pour désouscrire les souscriptions qu'on va faire
  blockedPhones$: Observable<BlockedPhone[]>;
  blockedPhones: BlockedPhone[];
  isDataLoaded: boolean = false;


  constructor(public dialog: MatDialog, public store: Store<AppState>, public blockedPhoneService: BlockedPhoneService) { }

  openDeleteDialog(blockedPhone: BlockedPhone): void {
    const dialogRef = this.dialog.open(BlockedPhoneDeleteDialogComponent, { data: blockedPhone });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) this.deleteBlockedPhone(blockedPhone);
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(BlockedPhoneAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const date = new Date().toLocaleDateString('en-CA').replace(/\//g, '-');
        console.log(result);
        this.addBlockedPhone({
          blockedPhoneNumber: result.blockedPhoneNumber,
          blockedPhoneForWho: result.blockedPhoneForAll? "all" : result.blockedPhoneNumberForWho,
          blockedPhoneByWho: "Uncle Will",
          blockedPhoneDate: date,
          blockedPhoneDateLastModification: date,
          blockedPhoneLastCalled: date,
          blockedPhoneCallCount: 0,
          blockedPhoneActive: true
        })
      }       
    });
  }

  ngOnInit(): void {
    this.retrieveBlockedPhone();
  
    this.blockedPhones$ = this.store.pipe(
      takeUntil(this.unsubscribe),
      select(selectAllBlockedPhone)
    );
  
    // Each time that blockedPhones$ changes, update the array blockedPhones
    this.blockedPhones$.subscribe(
      blockedPhone => {
        this.blockedPhones = blockedPhone;
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  retrieveBlockedPhone() {
    this.blockedPhoneService.retrieveBlockedPhone()
    .pipe(
      takeUntil(this.unsubscribe),
      tap(blockedPhone => {
        if (!this.isDataLoaded) {
          this.store.dispatch(BlockedPhoneAction.blockedPhoneRetrieveRequested({ blockedPhone }));
          this.isDataLoaded = true;
        }
      })
    )
    .subscribe();
  }

  deleteBlockedPhone(blockedPhone: BlockedPhone) {
    this.store.dispatch(BlockedPhoneAction.blockedPhoneDeleteRequested({ blockedPhone }));
    //this.blockedPhones$ = this.store.pipe(select(selectAllBlockedPhone));
  }

  addBlockedPhone(blockedPhone: BlockedPhone) {
    this.store.dispatch(BlockedPhoneAction.blockedPhoneAddRequested({ blockedPhone }));
    //this.blockedPhones$ = this.store.pipe(select(selectAllBlockedPhone));
  }

  onChangeBlockedPhoneActiveStatus(event, blockedPhone: BlockedPhone){
    this.store.dispatch(BlockedPhoneAction.blockedPhoneUpdateActiveStatusRequested({status: event.checked, blockedPhone}));
  }

  updateBlockedPhoneActiveStatus(blockedPhone: BlockedPhone){

  }
}
