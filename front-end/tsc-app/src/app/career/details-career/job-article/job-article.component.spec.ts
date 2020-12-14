import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobArticleComponent } from './job-article.component';

describe('JobArticleComponent', () => {
  let component: JobArticleComponent;
  let fixture: ComponentFixture<JobArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
