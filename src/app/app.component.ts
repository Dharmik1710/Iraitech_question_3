import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { strict } from 'assert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  contactForm: FormGroup;
  delButtonEnabled: Boolean = false;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }
  
  createForm(){
    this.contactForm = this.fb.group({
      phoneNumbers: this.fb.array([
        this.fb.control('')
      ])
    })
  }

  get phoneNumbers(){
    return this.contactForm.get('phoneNumbers') as FormArray;
  }

  addNumber(){
    this.delButtonEnabled = true;
    this.phoneNumbers.push(this.fb.control(''));
  }

  removeNumber(index: number){
    this.phoneNumbers.removeAt(this.phoneNumbers.value.indexOf(index));
    if(this.phoneNumbers.length==1){
      this.delButtonEnabled = false;
      return;
    }
  }

  onSubmit(){
    let array = [];
    for(let i=0; i< this.phoneNumbers.length; i++){
      array.push({ ['PhoneNumber'+i]: this.phoneNumbers.value[i]});
    }
    console.log(array);
  }


}
