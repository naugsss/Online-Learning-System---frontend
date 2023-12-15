import { Component } from '@angular/core';

interface Faq {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css'],
})
export class AddFaqComponent {
  faq: string = '';
  faqAnswer: string = '';
  faqs: Faq[] = [{ question: '', answer: '' }];

  addFaq(): void {
    this.faqs.push({ question: '', answer: '' });
  }

  removeFaq(): void {
    this.faqs.splice(this.faqs.length - 1, 1);
  }
  onSubmitFaq(): void {
    this.faqs = [];
    // this.isCourseDetailsVisible = true;
  }
}
