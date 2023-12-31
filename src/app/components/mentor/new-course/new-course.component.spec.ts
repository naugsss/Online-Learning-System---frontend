import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewCourseComponent } from './new-course.component';
import { CourseDataService } from 'src/app/shared/courseData.service';
import { FormsModule } from '@angular/forms';

describe('new course Component', () => {
  let mockCourseDataservice: CourseDataService;
  let component: NewCourseComponent;
  let fixture: ComponentFixture<NewCourseComponent>;

  beforeEach(() => {
    mockCourseDataservice = jasmine.createSpyObj('CourseDataService', [
      'addCourse',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [NewCourseComponent],
      providers: [
        { provide: CourseDataService, useValue: mockCourseDataservice },
      ],
    });
    fixture = TestBed.createComponent(NewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form property', () => {
    expect(component.form).toBeTruthy();
  });

  it('should call addCourse service with correct data on form submission', () => {
    component.form.value.name = 'Test Course';
    component.form.value.price = '99';
    component.form.value.duration = '5';
    component.form.value.video = 'https://example.com/video';

    component.onSubmit();

    expect(mockCourseDataservice.addCourse).toHaveBeenCalledWith({
      name: 'Test Course',
      price: 99,
      duration: 5,
      video: 'https://example.com/video',
    });
  });
});
