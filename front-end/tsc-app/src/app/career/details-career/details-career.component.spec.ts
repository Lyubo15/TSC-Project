import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCareerComponent } from './details-career.component';

describe('DetailsCareerComponent', () => {
  let component: DetailsCareerComponent;
  let fixture: ComponentFixture<DetailsCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCareerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
