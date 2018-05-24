import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";



@Injectable()
export class StudentService {
    save(student: Student) {
        return new Promise((resolve, reject) => {
            try {
                const students = JSON.parse(window.localStorage.getItem('students')) || [];
                students.sort((firstStudent: Student, secondStudent: Student) => {
                    return firstStudent.id - secondStudent.id;
                });
                student.id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
                students.unshift(student);
                window.localStorage.setItem('students', JSON.stringify(students));
                return resolve();
            }
            catch (err) {
                reject(err);
            }
        }
        )
    }

    delete(id) {
        let students = JSON.parse(window.localStorage.getItem('students')) || [];
        students = students.filter(function (obj: Student) {
            return obj.id !== id;
        });
        window.localStorage.setItem('students', JSON.stringify(students));
    }
    get(searchString = '', page: number, perPageStudent = 10) {
        let students = JSON.parse(window.localStorage.getItem('students')) || [];
        if (searchString !== '') {
            students = students.filter((student: Student) => {
                return (student.name.includes(searchString) ||
                    student.fatherName.includes(searchString) ||
                    student.gender.includes(searchString) ||
                    student.dob.includes(searchString));
            });
        }
        students.sort((firstStudent: Student, secondStudent: Student) => {
            return firstStudent.id - secondStudent.id;
        });
        return {
            students: this.getListPage(students, page, perPageStudent),
            totalCount: students.length
        }
    }

    private getListPage(students: Student[], page: number, perPageStudent) {
        const startIndex = ((page - 1) * perPageStudent) < students.length ? (page - 1) * perPageStudent : students.length;
        const endIndex = (((page - 1) * perPageStudent) + perPageStudent) < students.length ? ((page - 1) * perPageStudent) + 10 : students.length;
        return students.slice(startIndex, endIndex);
    }

    getTotalCount() {
        return JSON.parse(window.localStorage.getItem('students')) || [];
    }

    getByid(id: number) {
        const students = JSON.parse(window.localStorage.getItem('students')) || [];
        return students.find((student: Student) => {
            return student.id === id;
        });
    }
    update(student: Student) {
        return new Promise((resolve, reject) => {
            try {
                this.delete(student.id);
                const students = JSON.parse(window.localStorage.getItem('students')) || [];
                students.push(student);
                window.localStorage.setItem('students', JSON.stringify(students));
                return resolve();
            }
            catch (err) {
                reject(err);
            }
        }
        )
    }
}
