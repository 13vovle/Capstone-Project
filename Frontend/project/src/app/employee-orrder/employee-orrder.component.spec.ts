import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOrrderComponent } from './employee-orrder.component';

describe('EmployeeOrrderComponent', () => {
  let component: EmployeeOrrderComponent;
  let fixture: ComponentFixture<EmployeeOrrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeOrrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOrrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
