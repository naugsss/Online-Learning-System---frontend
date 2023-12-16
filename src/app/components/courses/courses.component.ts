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
import { CourseService } from './course.service';
import { FilterService } from './course-filter/filter.service';
import { CourseFilterComponent } from './course-filter/course-filter.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  subscription: Subscription;
  searchtext: string = '';
  filteredCourse: Course[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  loadingMore: boolean = false;
  moreCourses: boolean = true;
  selectedCourse: Course;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('filterComponent') filterComponent: CourseFilterComponent;

  constructor(
    private courseService: CourseService,
    private courseDataService: CourseDataService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.courseDataService.fetchCourses().subscribe((courses) => {
      this.courseService.setAllCourses(courses);
      this.filteredCourse = courses;
    });
    // this.fetchCourses(this.currentPage, this.pageSize);
    // this.courseService.fetchCourses(this.currentPage, this.pageSize); // Fetch first page

    this.subscription = this.courseService.coursesList.subscribe(
      (courses: Course[]): void => {
        this.courses = courses;
      }
    );

    this.subscription = this.courseService.coursesList.subscribe(
      (courses: Course[]) => {
        this.courses = courses.slice();
      }
    );

    if (this.filterComponent) {
      this.filterComponent.ratingSelected.subscribe((rating) => {
        console.log(rating);
        this.updateCourseByRating(rating);
      });
    }
  }

  // fetchCourses(page: number, size: number) {
  //   this.loadingMore = true;
  //   this.courseDataService.fetchCourses(page, size).subscribe((courses) => {
  //     this.courseService.setAllCourses(courses);
  //     this.updateCourses();
  //     this.loadingMore = false;
  //   });
  // }

  fetchCourses(page: number, size: number) {
    this.loadingMore = true;
    this.courseDataService.fetchCourses(page, size).subscribe((courses) => {
      this.courses = courses;
      this.updateCourses();
      this.loadingMore = false;
    });
  }

  // fetchCourses(page: number, size: number) {
  //   this.courseService.fetchCourses(page, size);
  // }

  updateCourseByRating(rating: number) {
    this.filteredCourse = this.filterService.filterCourses(
      this.courses,
      this.searchtext
    );

    console.log(this.filteredCourse);
  }

  onRatingSelect(rating: number) {
    this.filterService.setSelectedRating(rating);
    this.updateCourses();
    console.log(this.filteredCourse);
  }

  onSearchChange() {
    this.searchtext = this.searchInput.nativeElement.value;
    this.updateCourses();
  }

  // onCardClick(course: Course): void {
  //   this.selectedCourse = course;
  //   console.log(this.selectedCourse);
  //   this.navigateToCoursePage(course.name);
  // }

  // private navigateToCoursePage(courseName: string): void {
  //   // this.router.navigate(['/courses', courseName]);
  // }
  // loadMoreCourses() {
  //   this.currentPage++;
  //   this.fetchCourses(this.currentPage, this.pageSize);
  // }

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
    this.filteredCourse = this.courses.filter((course) => {
      return (
        course.name.toLowerCase().includes(this.searchtext.toLowerCase()) &&
        course.rating >= this.filterService.selectedRating
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
