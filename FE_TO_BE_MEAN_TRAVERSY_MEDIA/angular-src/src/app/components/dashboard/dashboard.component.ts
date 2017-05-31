import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import {FlashMessagesService} from  'angular2-flash-messages';

import {TemplateInterface, selectedVal} from '../../interfaces/template-interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  user:Object;
  templates:Object;
  ShowAccountCreationForm:Boolean= false;
  selectedTemplate= Object;
  externalId:String;

  allTemplates: TemplateInterface;
  theVal:selectedVal;

  constructor(private authService:AuthService, 
    private router:Router, 
    public modal: Modal,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
    // this.authService.getProfile().subscribe(profile => {
    //   this.user = profile.user;
    // },
    // err => {
    //   console.log(err);
    //   return false;
    // });
    this.getTemplates();
  }
  getTemplates(){
    this.authService.getRecords('http://10.60.100.73:8081/tv/GetAccountTemplatesByTenant/1').subscribe(res => {
      this.templates = res;
      debugger;
      this.allTemplates= res;
      this.theVal= this.selectedTemplate= this.templates[0].templateName;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onChange(newValue){
    this.selectedTemplate= newValue;
    console.log(this.selectedTemplate)
    this.theVal= newValue;
    this.ShowAccountCreationForm= true;
  }

  showModal(){
    this.modal.alert().showClose(true)
        .title('Enter external Id')
        .body(`
           <p>somethiosd</p>`)
        .open()
  }
  onAccountCreationSubmit(){
    const extrnalId= this.externalId;
    var url= 'http://10.60.100.73:8081/tv/GetAccountTemplate/'+extrnalId
    this.authService.getRecords(url).subscribe(res => {
       this.flashMessage.show("Id already exists. Please use unique id",
        {
          cssClass:'alert-danger',
          timeout: 5000
        });
    },
    err => {
     this.ShowAccountCreationForm= true;
      document.getElementById('closeModal').click();
      //this.hideModal= true;
      return false;
    });
  }

}
