import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedPhoneUiComponent } from './blocked-phone-ui.component';

describe('BlockedPhoneUiComponent', () => {
  let component: BlockedPhoneUiComponent;
  let fixture: ComponentFixture<BlockedPhoneUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedPhoneUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedPhoneUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
