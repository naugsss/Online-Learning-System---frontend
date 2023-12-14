export class Course {
  constructor(
    public name: string,
    public price: number,
    public duration: number,
    public rating: number
  ) {}
}

export class CourseFeedback {
  constructor(public rating: number, public comment: string) {}
}

export class CourseFaq {
  constructor(public question: string, public answer: string) {}
}

export class CourseStatus {
  constructor(
    public course_name: string,
    public status: string,
    public approval_status: string
  ) {}
}
