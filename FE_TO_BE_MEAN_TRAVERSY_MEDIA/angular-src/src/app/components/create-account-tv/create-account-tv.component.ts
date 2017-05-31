import { Component, OnInit, Input } from '@angular/core';
import {TemplateInterface, selectedVal} from '../../interfaces/template-interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AccountTvInterface } from '../../interfaces/account-tv-interface';

// import { extractedTemplate } from '../../interfaces/template-interface';
@Component({
  selector: 'app-create-account-tv',
  templateUrl: './create-account-tv.component.html',
  styleUrls: ['./create-account-tv.component.css']
})
export class CreateAccountTvComponent implements OnInit {
  @Input('data') value: TemplateInterface;
  @Input('selectedVal') selectedVal: selectedVal;


	public myForm: FormGroup; // our model driven form
	public submitted: boolean;

  extractedTemplate: object;
  

  constructor(private _fb: FormBuilder) { }

	 save(model: AccountTvInterface, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }

  ngOnInit() {
  	console.log(this.value);
  	console.log(this.selectedVal);

   this.extractTemplateObj();
	 this.myForm = this._fb.group({
            name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            address: this._fb.group({
                street: ['', <any>Validators.required],
                zip: ['']
            })
        });
  }

  extractTemplateObj(){
   var a= <any>this.value;

    for(var i=0;i<a.length;i++){
      if(a[i].templateName===this.selectedVal){
        this.extractedTemplate=a[i];
        break;
      }
    }
  }

}
