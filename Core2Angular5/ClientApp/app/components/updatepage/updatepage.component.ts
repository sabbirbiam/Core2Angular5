import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Router, Route } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { StudentService } from "../../../../Services/stdservice.service";


@Component({
    selector: 'app-updatepage',
    templateUrl: './updatepage.component.html',
    styleUrls: ['./updatepage.component.css']
})
export class UpdatepageComponent implements OnInit {
     
    dpt: string[] = [
        'CSE',
        'BBA',
        'EEE',
        'Arch',
        'CSSE'
    ];
    myform: FormGroup;
    firstname: FormControl;
    lastname: FormControl;
    department: FormControl;

    flag = false;
    id: number;
    exist = false;
    Data: object = {};
    obj: object = {};
    //private headers = new Headers({ 'content-Type': 'application/json' });
    public stdlist: StudentData[];

    constructor(private router: Router, private route: ActivatedRoute, private http: Http, private studentservice:StudentService) { }

    ngOnInit() {
        this.createFormControls();
        this.createForm();

        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.studentservice.getStudents().subscribe((data) => {
            this.stdlist = data;
            for (var i = 0; i < this.stdlist.length; i++){
                if (this.stdlist[i].id=== this.id) {
                    this.exist = true;
                    this.Data = this.stdlist[i];
                    console.log(this.Data);
                    break;
                }
                else {
                    this.exist = false;
                }
            }
       
        })
        //console.log(this.stdlist);
    }




    createFormControls() {
        this.firstname = new FormControl('', Validators.required);
        this.lastname = new FormControl('', Validators.required);
        this.department = new FormControl('', Validators.required);
    }
    createForm() {
        this.myform = new FormGroup({
            firstname: this.firstname,
            lastname: this.lastname,
            department: this.department
        });
    }
    update(std: any) {
        if (this.myform.valid) {
            console.log(std);
            this.studentservice.updateStudent(this.id, std)
                .toPromise()
                .then(() => {
                    //this.http.post(url,this.obj).subscribe((res:Response)=>{
                    //  this.is_add=true;
                    console.log("successfull updated");
                    this.router.navigate(['/spage']);
                    //})
                })  ;
        }
    }
    
}
interface StudentData {
    id: number;
    firstname: string;
    lastname: string;
    department: string;
}