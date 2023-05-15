import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedPhoneDeleteDialogComponent } from './blocked-phone-delete-dialog.component';

describe('BlockedPhoneDeleteDialogComponent', () => {
  let component: BlockedPhoneDeleteDialogComponent;
  let fixture: ComponentFixture<BlockedPhoneDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedPhoneDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedPhoneDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
