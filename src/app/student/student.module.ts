import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { StudentService } from './student.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterializeModule,
    PaginationModule.forRoot()
  ],
  declarations: [StudentCreateComponent, StudentListComponent, StudentUpdateComponent],
  providers: [StudentService]
})
export class StudentModule { }
