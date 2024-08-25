import 'zone.js';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importation de HttpClient et HttpClientModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],  // Ajout du HttpClientModule et du FormsModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App {
  invoice = {
    items: []
  };
  editableItem: any = null;

  constructor(private http: HttpClient) {}  // Utilisation de HttpClient pour les requêtes HTTP

  ngOnInit() {
    this.http.get<{ items: any[] }>('assets/invoice-data.json').subscribe(data => {
      this.invoice.items = data.items;
    });
  }

  editItem(item: any) {
    this.editableItem = item;
  }

  saveItem() {
    this.editableItem = null;
  }

  calculateTotal() {
    return this.invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }

  downloadInvoice() {
    console.log('Téléchargement de la facture');
  }
}

bootstrapApplication(App);
