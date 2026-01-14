const productsData = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Books", "Home"][i % 4],
  price: Math.floor(Math.random() * 200) + 20,
  inStock: Math.random() > 0.3,
}));

import { useState } from "react";

export default function ProductFilter() {
  const [products] = useState(productsData);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories = ["Electronics", "Clothing", "Books", "Home"];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const minPriceMatch =
      minPrice === "" || product.price >= Number(minPrice);

    const maxPriceMatch =
      maxPrice === "" || product.price <= Number(maxPrice);

    const stockMatch = !inStockOnly || product.inStock;

    return categoryMatch && minPriceMatch && maxPriceMatch && stockMatch;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Advanced Product Filter</h2>

      <div style={{ marginBottom: "20px" }}>
        <h4>Category</h4>
        {categories.map((category) => (
          <label key={category} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}

        <h4>Price Range</h4>
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        {" - "}
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <h4>
          <label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            In Stock Only
          </label>
        </h4>

        <button onClick={clearFilters}>Clear All Filters</button>
      </div>


      <h3>Results: {filteredProducts.length}</h3>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} | {product.category} | ₹{product.price} |{" "}
            {product.inStock ? "In Stock" : "Out of Stock"}
          </li>
        ))}
      </ul>
    </div>
  );
}
