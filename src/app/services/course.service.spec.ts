import { TestBed } from '@angular/core/testing';
import { CourseDataService } from '../shared/courseData.service';

describe('course Service', () => {
  let mockCourseDataService: CourseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [mockCourseDataService],
    });
    mockCourseDataService = TestBed.inject(CourseDataService);
  });

  it('should fetch courses', () => {
    mockCourseDataService.fetchCourses(1, 10).subscribe((courses) => {
      expect(courses).toBeTruthy();
    });
  });


  it('should get all courses', () => {
    
  })
});
