import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  perPageCount = 10;
  students = [];
  searchString = '';
  searchFrom: FormGroup;

  constructor(public studentService: StudentService,
    public router: Router
  ) {
    this.getPageItems();
  }


  ngOnInit() {
    this.searchFrom = new FormGroup({
      search: new FormControl('', Validators.required)
    })
  }
  pageChanged(pagObj) {
    this.currentPage = pagObj.page;
    this.getPageItems();
  }
  getPageItems() {
    const pagObj = this.studentService.get(this.searchString, this.currentPage, this.perPageCount)
    this.totalItems = pagObj.totalCount;
    this.students = pagObj.students;
  }
  delete(studentId: number) {
    this.studentService.delete(studentId);
    this.currentPage = 1;
    this.getPageItems();
  }
  edit(studentId: number) {
    this.router.navigate(['/student/update', studentId]);
  }
  search(){
    this.searchString = this.searchFrom.value.search;
    this.getPageItems();
  }
}
