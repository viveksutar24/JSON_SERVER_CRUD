import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  myForm: any
  datas: any
  editedid: any;

  constructor(private api: ApiService) { }


  ngOnInit(): void {
    this.load();
  }


  load() {
    this.myForm = new FormGroup({
      id: new FormControl(""),
      name: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl("")
    })
    this.api.get("posts").subscribe((result) => {
      // console.log(result);
      this.datas = result;
    })
  }



  submit(data: any) {
    alert("Data Submitted !!!");
    if (data.id == "") {
      this.api.post("posts", data).subscribe((result) => {
        this.load()

      })
    } else {
      this.api.put("posts/"+this.editedid,data).subscribe((result) => {
        this.load()
      })
    }
    this.load();
  }


  delete(data: any) {

    if (confirm("Sure To Delete")) {
      this.api.delete("posts", data).subscribe((result: any) => {
        this.load()
      })
    }
  }

  edit(data: any) {
    console.log(data);
    this.editedid = data.id;
    console.log(this.editedid);

    this.myForm = new FormGroup({
      name: new FormControl(data.name),
      email: new FormControl(data.email),
      password: new FormControl(data.password)
    });
  }

}






