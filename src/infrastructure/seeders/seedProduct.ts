import { Product } from '../models/index.js';

const sampleProducts = [
  { name: 'Laptop', category: 'Electronics', price: 1200.99, stock: 10 },
  { name: 'Headphones', category: 'Electronics', price: 199.99, stock: 50 },
  { name: 'Coffee Mug', category: 'Home', price: 12.5, stock: 100 },
  { name: 'Desk Chair', category: 'Furniture', price: 150, stock: 20 },
  { name: 'Notebook', category: 'Stationery', price: 5, stock: 200 },
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

export default seedProducts;
