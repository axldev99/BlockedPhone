import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { AppState } from '../../../../core/core.state';
import { blockedPhoneDeleteRequested, blockedPhoneRetrieveRequested } from '../../blocked-phone.action';
import { BlockedPhone } from '../../blocked-phone.model';
import { selectAllBlockedPhone } from '../../blocked-phone.selector';
import { BlockedPhoneService } from '../../blocked-phone.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BlockedPhoneDeleteDialogComponent } from '../blocked-phone-delete-dialog/blocked-phone-delete-dialog.component';
import { BlockedPhoneAddDialogComponent } from '../blocked-phone-add-dialog/blocked-phone-add-dialog.component';

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
  initialBlockedPhone$: Observable<BlockedPhone[]>;
  isDataLoaded: boolean = false;

  constructor(public dialog: MatDialog, public store: Store<AppState>, public blockedPhoneService: BlockedPhoneService) { }

  openDeleteDialog(blockedPhone: BlockedPhone): void {
    const dialogRef = this.dialog.open(BlockedPhoneDeleteDialogComponent, {
      data: blockedPhone
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('The dialog was closed');
      if(result) {
        this.deleteBlockedPhone(blockedPhone);
        console.log('YES');
      }
      else {
        console.log('NO');
      }
      //this.animal = result;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(BlockedPhoneAddDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      //this.animal = result;
    });
  }

  ngOnInit(): void {
    //this.initialBlockedPhone$ = BlockedPhoneService.retrieveBlockedPhone();
    this.retrieveBlockedPhone();
    this.blockedPhones$ = this.store.pipe(takeUntil(this.unsubscribe)).pipe(select(selectAllBlockedPhone));

    this.blockedPhones$.subscribe((data) => {console.log(data) });
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
          this.store.dispatch(blockedPhoneRetrieveRequested({ blockedPhone }));
          this.isDataLoaded = true;
        }
      })
    )
    .subscribe();

    this.blockedPhones$ = this.store.pipe(select(selectAllBlockedPhone)); //Actualise le tableau OBSERVABLE de blockedPhone

    this.blockedPhones$.pipe(takeUntil(this.unsubscribe)).subscribe(
      blockedPhone => {
        this.blockedPhones = blockedPhone;
      }); //Actualise le tableau de blockedPhone
  }

  deleteBlockedPhone(blockedPhone: BlockedPhone) {
    this.store.dispatch(blockedPhoneDeleteRequested({ blockedPhone }));
    this.blockedPhones$ = this.store.pipe(select(selectAllBlockedPhone));
  }

}
