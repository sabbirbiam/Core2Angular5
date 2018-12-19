import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { StudentService } from "../../../../Services/stdservice.service";
@Component({
    selector: 'app-spage',
    templateUrl: './spage.component.html',
    styleUrls: ['./spage.component.css']
})
export class SpageComponent implements OnInit {

    constructor(private http: Http, private studentservice: StudentService) { }

   // id: number;
    private headers = new Headers({ 'content-Type': 'application/json' });
    public stdlist : StudentData[];  


    fetchData() {
        this.studentservice.getStudents().subscribe(data => this.stdlist = data)
            console.log("fetch successfully");  
    }

    delete(id: number) {
        
        if (confirm("Are you Sure?")) {
            this.studentservice.deleteStudent(id).subscribe((data) => { this.fetchData() })
            console.log("delete successfully");
        }
    }

    /*
    getbyid(id: number) {
        this.studentservice.getStudentById(id).subscribe(data => {
        this.stdlist = data
        })
        console.log(id);
        console.log(this.stdlist);
    }
    */


    ngOnInit() {
       this.fetchData();
    }

    
}
 interface StudentData {
    id: number;
    firstname: string;
    lastname: string;
    department: string;

}