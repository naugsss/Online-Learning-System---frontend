import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseDataService } from 'src/app/shared/courseData.service';

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

  ngOnInit(): void {
    this.courseDataService.fetchMentorEarning().subscribe((earning) => {
      this.mentorEarnings = earning;
    });
  }

  addCourseButtonClicked() {
    this.changeComponent = true;
  }

  addFaqButtonClicked() {
    this.changeComponent = false;
  }
}
