import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

@Input() address: FormGroup;
@Input() extractTemplateObj;
  constructor() { }

  ngOnInit() {
  	console.log(this.extractTemplateObj)
  }

}
