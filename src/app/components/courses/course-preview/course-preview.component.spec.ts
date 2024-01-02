import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CoursePreviewComponent } from './course-preview.component';
import { CourseService } from '../../../services/course.service';
import { CartService } from '../../../services/cart.service';
import { CourseDataService } from 'src/app/shared/courseData.service';

describe('CoursePreviewComponent', () => {
  let component: CoursePreviewComponent;
  let fixture: ComponentFixture<CoursePreviewComponent>;
  let mockCourseService;
  let mockCartService;
  let mockCourseDataService;

  beforeEach(() => {
    mockCourseService = jasmine.createSpyObj(['getSelectedCourse']);
    mockCartService = jasmine.createSpyObj(['addToCart']);
    mockCourseDataService = jasmine.createSpyObj([
      'fetchCourseFaqs',
      'fetchCourseFeedbacks',
      'purchaseCourse',
    ]);

    TestBed.configureTestingModule({
      declarations: [CoursePreviewComponent],
      providers: [
        { provide: CourseService, useValue: mockCourseService },
        { provide: CartService, useValue: mockCartService },
        { provide: CourseDataService, useValue: mockCourseDataService },
      ],
    });

    fixture = TestBed.createComponent(CoursePreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch course FAQs on init', () => {
    const course = { name: 'Test Course' };
    mockCourseService.getSelectedCourse.and.returnValue(course);
    mockCourseDataService.fetchCourseFaqs.and.returnValue(of([]));
    component.ngOnInit();
    expect(mockCourseDataService.fetchCourseFaqs).toHaveBeenCalledWith(
      course.name
    );
  });

  it('should fetch course feedbacks on init', () => {
    const course = { name: 'Test Course' };
    mockCourseService.getSelectedCourse.and.returnValue(course);
    mockCourseDataService.fetchCourseFeedbacks.and.returnValue(of([]));
    component.ngOnInit();
    expect(mockCourseDataService.fetchCourseFeedbacks).toHaveBeenCalledWith(
      course.name
    );
  });

  it('should add a course to cart', () => {
    // const course = { name: 'Test Course' };
    const course = {
      name: 'Test Course',
      rating: 4,
      status: 'active',
      approval_status: 'approved',
      price: 100,
      duration: 12,
    };
    component.addTocart(course);
    expect(mockCartService.addToCart).toHaveBeenCalledWith(course);
  });

  it('should purchase a course', () => {
    const course = {
      name: 'Test Course',
      rating: 4,
      status: 'active',
      approval_status: 'approved',
      price: 100,
      duration: 12,
    };
    component.onBuyNowClick(course);
    expect(mockCourseDataService.purchaseCourse).toHaveBeenCalledWith(course);
  });
});
