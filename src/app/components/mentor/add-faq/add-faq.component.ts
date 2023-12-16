import { Component, ElementRef, ViewChild } from '@angular/core';
import { CourseDataService } from 'src/app/shared/courseData.service';

export interface Faq {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css'],
})
export class AddFaqComponent {
  constructor(private courseDataService: CourseDataService) {}
  @ViewChild('courseName') inputText: HTMLInputElement;
  faq: string = '';
  faqAnswer: string = '';
  name: string = '';
  faqs: Faq[] = [{ question: '', answer: '' }];

  addFaq(): void {
    this.faqs.push({ question: '', answer: '' });
  }

  removeFaq(): void {
    this.faqs.splice(this.faqs.length - 1, 1);
  }
  onSubmitFaq(): void {
    console.log(this.inputText.value);
    console.log(this.faqs);
    const faqs = this.faqs;
    for (const faq of faqs) {
      this.courseDataService.addFaq(faq, this.inputText.value);
    }
    this.faqs = [{ question: '', answer: '' }];
    // this.isCourseDetailsVisible = true;
  }
}
