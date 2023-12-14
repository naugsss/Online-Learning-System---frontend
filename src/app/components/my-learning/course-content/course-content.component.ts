import { Component } from '@angular/core';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css'],
})
export class CourseContentComponent {
  selectedRating: number = 0;
  feedbackText: string = '';

  submitFeedback(): void {
    // Send the selected rating and feedback text to your backend using your desired service/method
    console.log(
      `Rating: ${this.selectedRating}, Feedback: ${this.feedbackText}`
    );
  }
}
