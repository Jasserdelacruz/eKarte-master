import { Platform } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { StorageService, Item } from '../../servicios/storage.service';







@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.page.html',
  styleUrls: ['./cartera.page.scss'],
})
export class CarteraPage implements OnInit {

  items: Item[] = [];
  newItem: Item = <Item>{};

  constructor(private storageService: StorageService, private ptl: Platform) {
      this.ptl.ready().then(() => {
        this.loadItems();
      });
     }

     loadItems(){
      this.storageService.getItems().then(items => {
        this.items = items;
      });
    }

  ngOnInit() {

  }




  /*
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }
*/


  }





