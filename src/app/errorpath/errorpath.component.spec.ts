import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorpathComponent } from './errorpath.component';

describe('ErrorpathComponent', () => {
  let component: ErrorpathComponent;
  let fixture: ComponentFixture<ErrorpathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorpathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorpathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
