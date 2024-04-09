import "./style.css";
import products from "./api/products.json";
console.log(products);
import { showProductContainer } from "./homeProductCards";

// Define a function named `showProductContainer` that takes an array of products as input.
showProductContainer(products);

