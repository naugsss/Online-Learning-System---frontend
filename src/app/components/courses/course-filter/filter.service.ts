import { Injectable } from '@angular/core';
import { Course } from '../course/course.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  selectedRating: number = 0;

  setSelectedRating(rating: number) {
    console.log(`Setting selected rating is ${rating}`);
    this.selectedRating = rating;
  }

  filterCourses(courses: Course[], searchtext: string): Course[] {
    if (this.selectedRating === 0) {
      return courses.filter((course) => {
        course.name.toLocaleLowerCase().includes(searchtext.toLowerCase());
      });
    }
    return courses.filter((course) => {
      return (
        course.name.toLocaleLowerCase().includes(searchtext.toLowerCase()) &&
        course.rating >= this.selectedRating
      );
    });
  }
}
