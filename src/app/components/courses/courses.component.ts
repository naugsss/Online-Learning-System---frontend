import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseDataService } from 'src/app/shared/courseData.service';
import { Course } from './course/course.model';
import { CourseService } from '../../services/course.service';
import * as constants from '../../../assets/constants/courses.constants';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  subscription: Subscription[] = [];
  searchtext: string = '';
  filteredCourse: Course[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  loadingMore: boolean = false;
  moreCourses: boolean = true;
  selectedCourse: Course;
  constants = constants.default;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor(
    private courseService: CourseService,
    private courseDataService: CourseDataService
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.courseDataService.fetchCourses().subscribe((courses) => {
        this.courseService.setAllCourses(courses);
        this.filteredCourse = courses;
        this.updateCourses();
      })
    );

    this.subscription.push(
      this.courseService.coursesList.subscribe((courses: Course[]): void => {
        this.courses = courses;
      })
    );

    this.subscription.push(
      this.courseService.coursesList.subscribe((courses: Course[]) => {
        this.courses = courses.slice();
      })
    );
  }

  fetchCourses(page: number, size: number) {
    this.loadingMore = true;
    this.courseDataService.fetchCourses(page, size).subscribe((courses) => {
      this.courses = courses;
      this.updateCourses();
      this.loadingMore = false;
    });
  }

  onSearchChange() {
    this.searchtext = this.searchInput.nativeElement.value;
    this.updateCourses();
  }

  clearSearch() {
    this.searchInput.nativeElement.value = '';
    this.searchtext = '';
    this.onSearchChange();
  }

  loadMoreCourses() {
    this.loadingMore = true;
    this.currentPage++;
    this.courseDataService
      .fetchCourses(this.currentPage, this.pageSize)
      .subscribe((courses) => {
        if (courses.length === 0) {
          this.moreCourses = false;
        }
        this.courses.push(...courses);

        this.updateCourses();
        this.loadingMore = false;
      });
  }

  updateCourses() {
    const userData: {
      username: string;
      role: number;
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (userData.role === 1) {
      this.filteredCourse = this.courses.filter(
        (course) =>
          course.status === 'active' && course.approval_status === 'approved'
      );
    } else {
      this.filteredCourse = this.courses;
    }

    if (this.searchtext) {
      this.filteredCourse = this.filteredCourse.filter((course) =>
        course.name.toLowerCase().includes(this.searchtext.toLowerCase())
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
