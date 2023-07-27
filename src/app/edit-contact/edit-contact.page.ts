import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  name:string ="";
  phone:string ="";
  contact:{} ={}
   

  constructor(
    
    private modalCtrl: ModalController,
    
  ) { 

  }
  ngOnInit() {
    console.log('${name}')
  }
  cancel(){

    // remove from stack
    return this.modalCtrl.dismiss(null,'cancel')
  }

  confirm(){
    

  }

  


}
