import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { Invoice, InvoiceItem } from './invoice.model';  // Assurez-vous que ce chemin est correct

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClient, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App {
  invoice: Invoice = { items: [] };
  editableItem: InvoiceItem | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Invoice>('assets/invoice-data.json').subscribe(data => {
      this.invoice = data;
    });
  }

  editItem(item: InvoiceItem) {
    this.editableItem = item;
  }

  saveItem() {
    this.editableItem = null;
  }

  calculateTotal(): number {
    return this.invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }

  downloadInvoice() {
    console.log('Téléchargement de la facture');
  }
}

bootstrapApplication(App);
