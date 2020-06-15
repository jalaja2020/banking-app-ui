import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenfibeneficiaryComponent } from './benfibeneficiary.component';

describe('BenfibeneficiaryComponent', () => {
  let component: BenfibeneficiaryComponent;
  let fixture: ComponentFixture<BenfibeneficiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenfibeneficiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenfibeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
