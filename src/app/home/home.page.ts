import { Component} from '@angular/core';
import { ContactsDbService } from '../contacts-db.service';
import { ModalController,ActionSheetController } from '@ionic/angular';
import { AddContactPage } from '../add-contact/add-contact.page';
import { EditContactPage } from '../edit-contact/edit-contact.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //declare arrays 

  contacts:{ name: string; id: string; phone:string }[]=[];

  
  constructor(
    // db connection service
    public contactsDb : ContactsDbService,
    // ui features
    private modalCtrl : ModalController,
    private actionSheetCtrl:ActionSheetController
  
  ) { 


  }

  ngOnInit(){

    // Load the contacts list as the view initializes
    this.contactsDb.getContacts().subscribe(res=>{
      this.contacts = res;
    },err=>{
      alert(err.message)
    });
 
  }

  findContact(event:any){
    // event handler on keydown
    const query:string = event.target.value.toLowerCase();

    if (query ! == '' || query == null) {
        this.contactsDb.getContacts().subscribe(res=>{
          this.contacts = res;
        }) 
    } else {
      this.contactsDb.getFilteredList(query).subscribe(res=>{

        this.contacts = res;
      },
      err=>{
        alert(err.message);
      });
    }

  }

  async addContact() {
    // open modal
    const modal = await this.modalCtrl.create({
      component: AddContactPage,
    });
    modal.present();

    // the data will be returned here
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // add the send the data to the database
      this.contactsDb.addContact(data);

    }

  }

  async editContactModal(contact:{"name":string,"phone":string,"id":string}) {
    // open modal
    const modal = await this.modalCtrl.create({
      component: EditContactPage,
      componentProps:{
        data:contact
      }
    });

    modal.present();

    // the data will be returned here
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // add the send the data to the database
      this.contactsDb.editContact(data);

    }
  }

  async deleteContact(contact:{"name":string,"phone":string,"id":string},index:number) {
    
    // create action sheet control
    const actionSheet = await this.actionSheetCtrl.create({
      header: contact.name,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler : ()=>{
            // call remove contact function
            this.removeContact(contact.id,index)
          },
          data: {
            action: 'delete',
          }
        },
        {
          text: 'Edit',
          handler() {
            // call edit contact function
            // this.editContactModal(contact)
          },
          data: {
            action: 'edit',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        }
      ],
    });

    await actionSheet.present();
  }

  removeContact(contactId:string,index:number) {

    // send request to server
    this.contactsDb.deleteContact(contactId)

    // remove from contact list in view
    this.contacts.splice(index,1);
  }

  editContact(contact:{"name":string,"phone":string,"id":string}){

    // send request to server
    this.contactsDb.editContact(contact);

  }

  

  

  
  
}
