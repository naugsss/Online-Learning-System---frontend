import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Course } from '../../courses/course/course.model';
import { CourseService } from '../../courses/course.service';
import { CourseDataService } from 'src/app/shared/courseData.service';

interface Video {
  title: string;
  sourceUrl: string;
}

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css'],
})
export class CourseContentComponent implements OnInit {
  selectedRating: number = 0;
  feedbackText: string = '';
  isLoadingVideo: boolean = false;
  selectedVideo: Video;
  course: Course;

  constructor(
    private courseService: CourseService,
    private courseDataService: CourseDataService
  ) {}

  videoClickedSubject = new BehaviorSubject<Video>({
    title: 'Lecture 1: Intro to Programming',
    sourceUrl: '../../../../assets/videos/Promises-js.mp4',
  });

  ngOnInit(): void {
    this.videoClickedSubject.subscribe((v) => {
      this.selectedVideo = v;
    });

    this.course = this.courseService.getSelectedCourse();
  }

  videos: Video[] = [
    {
      title: 'Lecture 1: Intro to Programming',
      sourceUrl: '../../../../assets/videos/Promises-js.mp4',
    },
    {
      title: 'Lecture 2: Intro to Programming',
      sourceUrl: '../../../../assets/videos/Promises-js.mp4',
    },
    {
      title: 'Lecture 3: Intro to Programming',
      sourceUrl: '../../../../assets/videos/Promises-js.mp4',
    },
  ];

  onVideoClick(video: Video) {
    this.isLoadingVideo = true;
    this.videoClickedSubject.next(video);
    console.log(this.selectedVideo);
    this.isLoadingVideo = false;
  }

  submitFeedback(): void {
    this.courseDataService.addFeedback(
      this.course.name,
      this.feedbackText,
      this.selectedRating
    );

    this.selectedRating = 0;
    this.feedbackText = '';
  }
}
