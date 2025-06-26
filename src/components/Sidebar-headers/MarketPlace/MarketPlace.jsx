import React, { useState, useCallback } from "react";
import "./MarketPlace.css";
import HomePage from "../../Home/HomePage";

const CATEGORY_OPTIONS = ["Electronics", "Organic", "Plastic", "Metal"];
const PRICE_RANGES = ["0-50", "51-150", "151+"];
const QUANTITIES = ["0-50", "51-150", "151+"];

const MarketPlace = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    category: [],
    priceRange: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    specs: "",
    price: "",
    image: "",
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddProduct = useCallback(
    (e) => {
      e.preventDefault();
      const newEntry = {
        ...newProduct,
        id: Date.now(),
        price: parseFloat(newProduct.price),
        image: newProduct.image || "https://via.placeholder.com/250",
      };

      setProducts((prev) => [...prev, newEntry]);

      setNewProduct({ name: "", specs: "", price: "", image: "" });
      e.target.reset();
    },
    [newProduct]
  );

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch =
      filters.category.length === 0 ||
      filters.category.includes(product.category?.toLowerCase());

    return nameMatch && categoryMatch;
  });

  return (
    <div className="marketplace">
      <HomePage />

      {/* Sidebar */}
      <aside className="left-panel">
        {/* Search Filters */}
        <section className="search-section">
          <h2>Search For Deals</h2>
          <input
            type="text"
            placeholder="Search by name..."
            aria-label="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="suggestion">
            {["Electronics", "Organic", "Plastic", "Metal"].map((cat) => {
              const key = cat.toLowerCase();
              const isSelected = filters.category.includes(key);

              return (
                <div
                  key={cat}
                  className={`choice ${isSelected ? "selected" : ""}`}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      category: isSelected
                        ? prev.category.filter((c) => c !== key)
                        : [...prev.category, key],
                    }))
                  }
                >
                  {cat}
                </div>
              );
            })}
          </div>

          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
          >
            <option value="">Price Range</option>
            <option value="0-10000">0 FCFA - 10,000 FCFA</option>
            <option value="11000-30000">11,000FCFA - 30,000 FCFA</option>
            <option value="30000+">30,000 FCFA</option>
          </select>

          <button className="find" onClick={() => console.log(filters)}>
            Find
          </button>
        </section>

        <hr className="divider" />

        {/* Sell Form */}
        <section className="sell-section">
          <h2>Request For Waste</h2>
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="specs"
              placeholder="Specifications"
              value={newProduct.specs}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              min="0"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={handleInputChange}
            />
            <button type="submit">List Product</button>
          </form>
        </section>
      </aside>

      {/* Product Grid */}
      <main className="product-grid">
        {filteredProducts.length === 0 ? (
          <p className="empty-state">No products match your search.</p>
        ) : (
          filteredProducts.map((product) => (
            <article key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/250";
                }}
              />
              <div className="card-body">
                <h3>{product.name}</h3>
                <p>{product.specs}</p>
                <div className="price">${product.price.toFixed(2)}</div>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
};

export default MarketPlace;
