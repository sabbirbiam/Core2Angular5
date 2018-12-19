import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from "../../../../Services/stdservice.service";

@Component({
    selector: 'app-fpage',
    templateUrl: './fpage.component.html',
    styleUrls: ['./fpage.component.css']
})
export class FpageComponent implements OnInit {

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
    id: number;
    
  public constructor(private http: Http,
      private studentservice: StudentService) {
     
    }
    coment: string = "Item has been successfully inserted";



    ngOnInit(){
        this.createFormControls();
        this.createForm();
       
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


    is_add: boolean = false;
    addNew(std: any){  
        console.log(std);
        this.studentservice.saveStudent(std).subscribe((data) => {
            this.is_add = true;
            console.log("successfully inserted");
        });
        this.myform.reset();  
    }




}