import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoursePreviewComponent } from './course-preview.component';

describe('Course preview component', () => {
  let component: CoursePreviewComponent;
  let fixture: ComponentFixture<CoursePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [CoursePreviewComponent],
    });
    fixture = TestBed.createComponent(CoursePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
