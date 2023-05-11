import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstFormExampleComponent } from './my-first-form-example.component';

describe('MyFirstFormExampleComponent', () => {
  let component: MyFirstFormExampleComponent;
  let fixture: ComponentFixture<MyFirstFormExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFirstFormExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFirstFormExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
