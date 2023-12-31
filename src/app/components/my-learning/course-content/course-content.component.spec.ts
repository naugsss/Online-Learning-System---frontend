import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { CourseContentComponent } from './course-content.component';
import { CourseService } from 'src/app/services/course.service';
import { CourseDataService } from 'src/app/shared/courseData.service';

describe('CourseContentComponent', () => {
  let component: CourseContentComponent;
  let fixture: ComponentFixture<CourseContentComponent>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;
  let mockCourseDataService: jasmine.SpyObj<CourseDataService>;

  beforeEach(() => {
    courseServiceSpy = jasmine.createSpyObj('CourseService', [
      'getSelectedCourse',
    ]);
    mockCourseDataService = jasmine.createSpyObj('CourseDataService', [
      'addFeedback',
    ]);
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [CourseContentComponent],
      providers: [
        { provide: CourseService, useValue: courseServiceSpy },
        { provide: CourseDataService, useValue: mockCourseDataService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize component properties', () => {
    expect(component.selectedRating).toEqual(0);
    expect(component.feedbackText).toEqual('');
    expect(component.isLoadingVideo).toBeFalsy();
    expect(component.selectedVideo).toBeTruthy();
    expect(component.videos).toBeTruthy();
  });

  it('should fetch selected course on ngOnInit', () => {
    expect(courseServiceSpy.getSelectedCourse).toHaveBeenCalled();
  });

  it('should emit selected video on video click', () => {
    const mockVideo = { title: 'Test Video', sourceUrl: 'test.mp4' };
    component.onVideoClick(mockVideo);
    expect(component.videoClickedSubject.getValue()).toEqual(mockVideo);
  });

  it('should handle loading state on video click', () => {
    component.onVideoClick({
      title: 'Lecture 3: Intro to Programming',
      sourceUrl: '../../../../assets/videos/Promises-js.mp4',
    });
    component.isLoadingVideo = true;
    expect(component.isLoadingVideo).toBeTruthy();
    fixture.detectChanges();
    component.isLoadingVideo = false;
    expect(component.isLoadingVideo).toBeFalsy();
  });

  it('should call addFeedback service with correct data on feedback submission', () => {
    component.course = {
      name: 'Test Course',
      duration: 12,
      price: 3000,
      status: 'active',
      rating: 4.5,
      approval_status: 'approved',
    };
    component.selectedRating = 4;
    component.feedbackText = 'Great course!';

    component.submitFeedback();

    expect(mockCourseDataService.addFeedback).toHaveBeenCalledWith(
      'Test Course',
      'Great course!',
      4
    );
    expect(component.selectedRating).toEqual(0);
    expect(component.feedbackText).toEqual('');
  });
});
