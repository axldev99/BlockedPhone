import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedPhoneComponent } from './blocked-phone.component';

describe('BlockedPhoneComponent', () => {
  let component: BlockedPhoneComponent;
  let fixture: ComponentFixture<BlockedPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
