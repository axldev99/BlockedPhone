import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedPhoneAddDialogComponent } from './blocked-phone-add-dialog.component';

describe('BlockedPhoneAddDialogComponent', () => {
  let component: BlockedPhoneAddDialogComponent;
  let fixture: ComponentFixture<BlockedPhoneAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedPhoneAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedPhoneAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
