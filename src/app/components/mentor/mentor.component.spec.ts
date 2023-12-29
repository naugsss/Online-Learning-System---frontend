import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MentorComponent } from './mentor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewCourseComponent } from './new-course/new-course.component';
import { FormsModule } from '@angular/forms';

describe('Mentor Component', () => {
  let component: MentorComponent;
  let fixture: ComponentFixture<MentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [MentorComponent, NewCourseComponent],
    });
    fixture = TestBed.createComponent(MentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
