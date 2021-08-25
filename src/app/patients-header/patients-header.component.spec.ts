import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsHeaderComponent } from './patients-header.component';

describe('PatientsHeaderComponent', () => {
  let component: PatientsHeaderComponent;
  let fixture: ComponentFixture<PatientsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
