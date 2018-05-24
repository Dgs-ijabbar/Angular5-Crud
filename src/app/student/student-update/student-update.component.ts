import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit, OnDestroy {
  student: Student;
  studentForm: FormGroup;
  studentId = 0;
  sub: any;
  constructor(public studentService: StudentService,private route: ActivatedRoute, public router: Router){ }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.studentId = +params['id'];
      this.student = this.studentService.getByid(+params['id']) as Student; 
      this.studentForm = new FormGroup({
        name: new FormControl(this.student.name, Validators.required),
        fatherName: new FormControl(this.student.fatherName, Validators.required),
        dob: new FormControl(this.student.dob, Validators.required),
        gender: new FormControl(this.student.gender, Validators.required),
      })
    })
  }
  async submit() {
    try{
      const student = this.studentForm.value as Student;
      student.id = this.studentId;
      await this.studentService.update(this.studentForm.value as Student);
      this.router.navigate(['/student/list'])
    }
    catch(err){
    console.log(err);
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
