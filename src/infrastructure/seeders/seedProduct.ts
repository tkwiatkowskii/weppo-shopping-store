import { Product } from '../models/index.js';

const sampleProducts = [
  {id: 0, name: 'Zielona kawa', category: 'Kawa', price: 58.99, stock: 10 },
  { id: 1, name: 'Kawa z Brazylii', category: 'Kawa', price: 39.99, stock: 50 },
  {id: 2, name: 'Kawa z Etiopii', category: 'Kawa', price: 39.99, stock: 100 },
  { id: 3, name: 'Kawa z Kolumbii', category: 'Kawa', price: 39.99, stock: 20 },
  { id: 4, name: 'Ziarnista kawa Arabica', category: 'Kawa', price: 41.00, stock: 200 },
  { id: 5, name: "Kawa Arabica", category: "Kawa", price: 39.99, stock: 10 },
  { id: 6, name: "Ekspres do kawy", category: "Sprzet", price: 540.98, stock: 5 },
  { id: 7, name: "Ziarnista kawa smakowa", category: "Kawa", price: 45, stock: 10 },
{ id: 8, name: "Rozpuszczalna kawa", category: "Kawa", price: 28.99, stock: 5 },
{ id: 9, name: "Ziarnista kawa bezkofeinowa", category: "Kawa", price: 41.00, stock: 10 },
{ id: 10, name: "Zielona herbata", category: "Herbata", price: 20.90, stock: 5 },
{ id: 11, name: "Biała Herbata", category: "Herbata", price: 20.90, stock: 10 },
{ id: 12, name: "Imbryk do herbaty", category: "Sprzet", price: 110.99, stock: 5 },
{ id: 13, name: "Filiżanka", category: "Sprzet", price: 45.00, stock: 10 },
{ id: 14, name: "Czarna Herbata", category: "Herbata", price: 20.90, stock: 5 },
{ id: 15, name: "Yerba", category: "Inne", price: 32.50, stock: 10 },
{ id: 16, name: "Kawiarka", category: "Sprzet", price: 58.99, stock: 5 },
{ id: 17, name: "Herbata owoce leśne", category: "Herbata", price: 26.00, stock: 10 },
{ id: 18, name: "Różana Herbata", category: "Herbata", price: 24.70, stock: 5 }
];

async function seedProducts() {
  try {
    await Product.bulkCreate(sampleProducts);
    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
export default seedProducts;
