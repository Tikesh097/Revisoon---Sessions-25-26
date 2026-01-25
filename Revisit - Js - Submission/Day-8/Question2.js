/*### Q2: Dynamic Filter Builder (15 mins)
Create a function that accepts multiple filter criteria and applies them dynamically.

**Input:**
*/

const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 999,
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: "Shirt",
    category: "Clothing",
    price: 29,
    rating: 4.0,
    inStock: true,
  },
  {
    id: 3,
    name: "Phone",
    category: "Electronics",
    price: 699,
    rating: 4.7,
    inStock: false,
  },
  {
    id: 4,
    name: "Pants",
    category: "Clothing",
    price: 49,
    rating: 3.8,
    inStock: true,
  },
  {
    id: 5,
    name: "Tablet",
    category: "Electronics",
    price: 499,
    rating: 4.3,
    inStock: true,
  },
];

const filters = {
  category: "Electronics",
  minPrice: 400,
  minRating: 4.0,
  inStock: true,
};

function applyFilters(items, criteria) {
  return items.filter((product) => {
    // Dynamic category filter
    if (criteria.category && product.category !== criteria.category) {
      return false;
    }
    //Minimum price filter
    if (criteria.minPrice && product.price < criteria.minPrice) {
      return false;
    }
    //Minimum rating filter
    if (criteria.minRating && product.rating < criteria.minRating) {
      return false;
    }
    //Stock availability filter
    if (
      criteria.inStock !== undefined &&
      product.inStock !== criteria.inStock
    ) {
      return false;
    }
    return true;
  });
}

const filteredProducts = applyFilters(products, filters);
console.log("Filtered Products:");
console.log(filteredProducts);
