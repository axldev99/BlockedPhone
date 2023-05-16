import { Component, OnInit, ChangeDetectionStrategy, Inject, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject, concat, fromEvent, of } from 'rxjs';
import { User } from '../../blocked-phone.model';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'anms-blocked-phone-add-dialog',
  templateUrl: './blocked-phone-add-dialog.component.html',
  styleUrls: ['./blocked-phone-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockedPhoneAddDialogComponent implements OnInit {
    users: User[] = [
    {name: "Jean", phoneNumber: "4509994808"}, 
    {name: "Paul", phoneNumber: "1234567890"},
    {name: "Robert", phoneNumber: "5148094380"},
    {name: "Jason", phoneNumber: "8766788888"},
    {name: "Alex", phoneNumber: "1010101111"},
    {name: "Guy", phoneNumber: "4509398765"}
  ];
  users$: Observable<User[]> = of(this.users);
  filteredUsers$: Observable<User[]>;
  AddBlockedPhoneForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BlockedPhoneAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, public fb: FormBuilder) {}

  ngOnInit(): void {
    
    this.AddBlockedPhoneForm = this.fb.group({
      blockedPhoneNumber: ['',{
        validators: [Validators.required, Validators.pattern('(([(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')],
      }],
      blockedPhoneForAll: new FormControl(true),
      blockedPhoneNumberForWho: ['',{
        validators: [Validators.pattern('(([(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')],
      }],
    });

    //Validation dynamique
    // Observe the changes on the blockedPhoneForAll control
    this.AddBlockedPhoneForm.get('blockedPhoneForAll').valueChanges.subscribe(checked => {
      // Get the blockedPhoneNumberForWho control
      const blockedPhoneNumberForWho = this.AddBlockedPhoneForm.get('blockedPhoneNumberForWho');
      if (checked) {
        // If the checkbox is checked, clear the validators
        blockedPhoneNumberForWho.setValidators(null);
      } else {
        // If the checkbox is not checked, set the required validator
        blockedPhoneNumberForWho.setValidators([
          Validators.required,
          Validators.pattern('(([(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')
        ]);
      }
      // Update the validity state of the control
      blockedPhoneNumberForWho.updateValueAndValidity();
    });
  }
  
  ngAfterViewInit() {
    const searchUsers$ = this.AddBlockedPhoneForm.get('blockedPhoneNumberForWho').valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(option => this._filter(option))
    );

    this.filteredUsers$ = concat(searchUsers$, this.users$)
  }

  private _filter(option: string): Observable<User[]> {
    const filteredUsers = this.users$.pipe(
      map(users => 
        users.filter( user =>
          user.name.toLowerCase().includes(option.toLowerCase()) ||
          user.phoneNumber.includes(option)
        )
      )
    );
    return filteredUsers
  }

  submit(): void { //Envoie les data au component parent
    this.dialogRef.close(this.AddBlockedPhoneForm.value);
  }

  cancel(): void { //Ferme le dialog
    this.dialogRef.close();
  }
}
