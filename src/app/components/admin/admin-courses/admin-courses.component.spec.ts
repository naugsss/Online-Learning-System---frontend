// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AdminCoursesComponent } from './admin-courses.component';
// import { CartService } from 'src/app/services/cart.service';
// import { BehaviorSubject, of } from 'rxjs';
// import { Course } from '../../courses/course/course.model';
// import { CourseService } from 'src/app/services/course.service';
// import { CourseDataService } from 'src/app/shared/courseData.service';

// describe('admin courses component', () => {
//   let mockCourseSerivce;
//   let mockCourseDataService;
//   let component: AdminCoursesComponent;
//   let fixture: ComponentFixture<AdminCoursesComponent>;
//   let cartSub: BehaviorSubject<Course[]>;

//   beforeEach(() => {
//     mockCourseSerivce = jasmine.createSpyObj([
//       'setPendingCourses',
//       'getAllCourses',
//     ]);

//     mockCourseDataService = jasmine.createSpyObj([
//       'purchaseCourse',
//       'approveCourse',
//       'disableCourse',
//       'fetchCourses',
//     ]);

//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       declarations: [AdminCoursesComponent],
//       providers: [
//         { provide: CourseService, useValue: mockCourseSerivce },
//         { provide: CourseDataService, useValue: mockCourseDataService },
//       ],
//     });
//     fixture = TestBed.createComponent(AdminCoursesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should approve course', () => {
//     const mockCourse = {
//       name: 'Test Course',
//       price: 100,
//       duration: 12,
//       rating: 4.4,
//       status: 'active',
//       approval_status: 'approved',
//     };
//     component.approveCourse(mockCourse);
//     expect(component).toBeTruthy();
//     expect(component.isLoading).toBeFalsy();
//   });

//   // it('should disable a course', () => {
//   //   const mockCourseData = {
//   //     name: 'Test Course',
//   //     rating: 4,
//   //     status: 'active',
//   //     approval_status: 'approved',
//   //     price: 100,
//   //     duration: 12,
//   //   };

//   //   component.disableCourse(mockCourseData);
//   //   mockCourseDataService.fetchCourses.and.returnValue(of(mockCourseData));
//   //   expect(component.allCourses).toEqual([mockCourseData]);
//   //   expect(component.isDisable).toBeFalsy();
//   // });

//   it('should disable a course and fetch all courses', () => {
//     const course = {
//       name: 'Test Course',
//       rating: 4,
//       status: 'active',
//       approval_status: 'approved',
//       price: 100,
//       duration: 12,
//     };
//     const allCourses = [course];

//     mockCourseDataService.fetchCourses.and.returnValue(of(allCourses));
//     mockCourseDataService.disableCourse.and.returnValue(of({}));

//     component.disableCourse(course);

//     expect(component.isDisable).toBe(false);
//     expect(mockCourseDataService.disableCourse).toHaveBeenCalledWith(course);

//     // expect(component.isDisable).toBe(false);
//     // expect(mockCourseDataService.disableCourse).toHaveBeenCalledWith(course);
//     // expect(mockCourseDataService.fetchCourses).toHaveBeenCalled();
//     // expect(component.allCourses).toEqual(allCourses);
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminCoursesComponent } from './admin-courses.component';
import { CourseDataService } from 'src/app/shared/courseData.service';
import { CourseService } from '../../../services/course.service';

describe('AdminCoursesComponent', () => {
  let component: AdminCoursesComponent;
  let fixture: ComponentFixture<AdminCoursesComponent>;
  let mockCourseDataService;
  let mockCourseService;

  beforeEach(() => {
    mockCourseDataService = jasmine.createSpyObj([
      'fetchPendingCourseReqeust',
      'fetchCourses',
      'approveCourse',
      'disableCourse',
      'updateCourseList',
      'disableCourseList',
    ]);
    mockCourseService = jasmine.createSpyObj([
      'setPendingCourses',
      'coursesList',
      'getAllCourses',
    ]);

    TestBed.configureTestingModule({
      declarations: [AdminCoursesComponent],
      providers: [
        { provide: CourseDataService, useValue: mockCourseDataService },
        { provide: CourseService, useValue: mockCourseService },
      ],
    });

    fixture = TestBed.createComponent(AdminCoursesComponent);
    component = fixture.componentInstance;
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should fetch pending course requests on init', () => {
  //   mockCourseDataService.fetchPendingCourseReqeust.and.returnValue(of([]));
  //   component.ngOnInit();
  //   expect(mockCourseDataService.fetchPendingCourseReqeust).toHaveBeenCalled();
  // });

  // it('should fetch courses on init', () => {
  //   mockCourseDataService.fetchCourses.and.returnValue(of([]));
  //   component.ngOnInit();
  //   expect(mockCourseDataService.fetchCourses).toHaveBeenCalled();
  // });

  it('should approve a course', () => {
    const course = {
      name: 'Test Course',
      rating: 4,
      status: 'active',
      approval_status: 'approved',
      price: 100,
      duration: 12,
    };
    mockCourseDataService.approveCourse.and.returnValue(of({}));
    component.approveCourse(course);
    expect(mockCourseDataService.approveCourse).toHaveBeenCalledWith(
      course,
      'approve'
    );
  });

  it('should reject a course', () => {
    const course = {
      name: 'Test Course',
      rating: 4,
      status: 'active',
      approval_status: 'approved',
      price: 100,
      duration: 12,
    };
    mockCourseDataService.approveCourse.and.returnValue(of({}));
    component.rejectCourse(course);
    expect(mockCourseDataService.approveCourse).toHaveBeenCalledWith(
      course,
      'reject'
    );
  });

  it('should disable a course', () => {
    const course = {
      name: 'Test Course',
      rating: 4,
      status: 'active',
      approval_status: 'approved',
      price: 100,
      duration: 12,
    };
    mockCourseDataService.disableCourse.and.returnValue(of({}));
    mockCourseDataService.fetchCourses.and.returnValue(of([]));
    component.disableCourse(course);
    expect(mockCourseDataService.disableCourse).toHaveBeenCalledWith(course);
  });
});
