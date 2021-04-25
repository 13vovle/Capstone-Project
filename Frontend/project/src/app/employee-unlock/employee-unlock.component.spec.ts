import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUnlockComponent } from './employee-unlock.component';

describe('EmployeeUnlockComponent', () => {
  let component: EmployeeUnlockComponent;
  let fixture: ComponentFixture<EmployeeUnlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeUnlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
