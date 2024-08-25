export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  items: InvoiceItem[];
}
