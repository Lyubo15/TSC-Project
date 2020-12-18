import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeBookComponent } from './make-book.component';

describe('MakeBookComponent', () => {
  let component: MakeBookComponent;
  let fixture: ComponentFixture<MakeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
