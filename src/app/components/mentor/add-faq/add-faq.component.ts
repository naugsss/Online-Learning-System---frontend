import { Component, ViewChild } from '@angular/core';

import { CourseDataService } from 'src/app/shared/courseData.service';
import * as constants from '../../../shared/constants/mentor.constants';

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
  constants = constants.default;
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
    const faqs = this.faqs;
    for (const faq of faqs) {
      this.courseDataService.addFaq(faq, this.inputText.value);
    }
    this.faqs = [{ question: '', answer: '' }];
    this.name = '';
  }
}
