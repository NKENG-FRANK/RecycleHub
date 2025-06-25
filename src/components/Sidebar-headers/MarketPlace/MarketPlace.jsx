import React, { useState } from "react";
import "./MarketPlace.css";
import HomePage from "../../Home/HomePage";
import { useNavigate } from "react-router-dom";

const MarketPlace = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    quantity: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    specs: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      image: newProduct.image || "https://via.placeholder.com/250",
    };
    setProducts([...products, product]);
    setNewProduct({ name: "", specs: "", price: "", image: "" });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // Additional filter logic can go here
    return nameMatch;
  });

  return (
    <div className="marketplace">
      <HomePage />
      <aside className="left-panel">
        <section className="search-section">
          <h2>Find a Deal</h2>
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="organic">Organic</option>
            <option value="plastic">Plastic</option>
            <option value="metal">Metalic</option>
          </select>
          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
          >
            <option value="">Price Range</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-150">$51 - $150</option>
            <option value="151+">$151+</option>
          </select>

          <select
            name="quantity"
            value={filters.quantity}
            onChange={handleFilterChange}
          >
            <option value="">quantity</option>
            <option value="0-50">0kg - 50kg</option>
            <option value="51-150">51kg - 150kg</option>
            <option value="151+">kg151+</option>
          </select>
        </section>

        <hr className="divider" />

        <section className="sell-section">
          <h2>Sell Your Product</h2>
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              placeholder="Product name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Specifications"
              value={newProduct.specs}
              onChange={(e) =>
                setNewProduct({ ...newProduct, specs: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Price ($)"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
              min="0"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <button type="submit">List Product</button>
          </form>
        </section>
      </aside>

      <main className="product-grid">
        {filteredProducts.map((product) => (
          <article key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/250")
              }
              loading="lazy"
            />
            <div className="card-body">
              <h3>{product.name}</h3>
              <p>{product.specs}</p>
              <div className="price">${product.price.toFixed(2)}</div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default MarketPlace;
