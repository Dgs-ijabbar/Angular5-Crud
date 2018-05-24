import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  studentForm: FormGroup;
  constructor(public studentService: StudentService) { }

  ngOnInit() {
    this.studentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      fatherName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    })
  }
  async submit() {
    try{
      await this.studentService.save(this.studentForm.value as Student);
      this.studentForm.reset();
    }
    catch(err){
      console.log(err);
    }
  }
}