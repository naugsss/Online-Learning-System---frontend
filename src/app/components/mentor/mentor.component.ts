import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseDataService } from 'src/app/shared/courseData.service';
import { Course } from '../courses/course/course.model';
import { Subject, Subscription } from 'rxjs';

interface Faq {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css'],
})
export class MentorComponent {
  mentorEarnings: any = [];
  changeComponent: boolean = true;

  constructor(private courseDataService: CourseDataService) {}
  private courseAddedSubject = new Subject<Course>();
  subscription: Subscription;
  // courseAdded = this.courseAddedSubject.asObservable();

  ngOnInit(): void {
    this.courseDataService.fetchMentorEarning().subscribe((earning) => {
      this.mentorEarnings = earning;
    });

    this.subscription = this.courseDataService.updateEarnings.subscribe(() => {
      this.courseDataService.fetchMentorEarning().subscribe((earning) => {
        this.mentorEarnings = earning;
      });
    });
  }

  addCourseButtonClicked() {
    this.changeComponent = true;
  }

  addFaqButtonClicked() {
    this.changeComponent = false;
  }
}
