import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMenuesComponent } from './all-menues.component';

describe('AllMenuesComponent', () => {
  let component: AllMenuesComponent;
  let fixture: ComponentFixture<AllMenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMenuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
