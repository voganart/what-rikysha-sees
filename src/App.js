import React, { useState, useEffect } from "react";
import guineapigImg from "./assets/Guineapig_1.jpg";
import rikyshaImg from "./assets/Rikysha_1.jpg";
import "./App.css";


const allProducts = [
  { id: 1, category: "Свечи", img: rikyshaImg, title: "Свеча Лаванда", description: "Аромат лаванды, 100% воск", price: "1200 ARS" },
  { id: 2, category: "Скрабы", img: rikyshaImg, title: "Скраб Кофе", description: "Скраб с кофе и маслом", price: "900 ARS" },
  { id: 3, category: "Мисты", img: rikyshaImg, title: "Мист Роза", description: "Увлажнение и свежесть", price: "600 ARS" },
  { id: 4, category: "Бомбочки для ванны", img: rikyshaImg, title: "Бомбочка Цитрус", description: "Эффервесцентная", price: "700 ARS" },
  { id: 5, category: "Мыло", img: rikyshaImg, title: "Мыло Олива", description: "Натуральное мыло", price: "500 ARS" },
  { id: 6, category: "Духи", img: rikyshaImg, title: "Духи Лето", description: "Лёгкий аромат", price: "1500 ARS" },
  { id: 7, category: "Антисептики", img: rikyshaImg, title: "Антисептик Лаванда", description: "С ароматом лаванды", price: "450 ARS" },
  { id: 8, category: "Свечи", img: rikyshaImg, title: "Свеча Ваниль", description: "Тёплый аромат", price: "1100 ARS" },
  { id: 9, category: "Свечи", img: rikyshaImg, title: "Свеча Кофе", description: "Аромат кофе", price: "1150 ARS" },
  { id: 10, category: "Скрабы", img: rikyshaImg, title: "Скраб Сахар", description: "Скраб с сахаром", price: "850 ARS" },
];

const categories = [
  "Все",
  "Свечи",
  "Скрабы",
  "Мисты",
  "Бомбочки для ванны",
  "Мыло",
  "Духи",
  "Антисептики",
];

export default function App() {
  const [filter, setFilter] = useState("Все");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedProduct, setSelectedProduct] = useState(null);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      setItemsPerPage(16); // 4x4
    } else if (window.innerWidth >= 768) {
      setItemsPerPage(9); // 3x3
    } else {
      setItemsPerPage(4); // меньше для мобил
    }
  };

  handleResize(); // вызов при старте
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

useEffect(() => {
  const filtered = filter === "Все" ? allProducts : allProducts.filter((p) => p.category === filter);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  if (page > totalPages) setPage(totalPages || 1);
}, [itemsPerPage, filter]);

  const filteredProducts =
    filter === "Все" ? allProducts : allProducts.filter((p) => p.category === filter);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="title">What Rikysha Sees</h1>
          <p className="subtitle">Авторская косметика и свечи ручной работы с любовью</p>
          <img className="header-image" src={guineapigImg} alt="Морская свинка" />
        </div>
      </header>

      <section className="products-section">
        <h2>Товары</h2>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="products-grid">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => setSelectedProduct(product)}
              style={{ cursor: "pointer" }}
            >
              <img src={product.img} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">{product.price}</p>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              {"<"}
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
              {">"}
            </button>
          </div>
        )}
      </section>

      {selectedProduct && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedProduct(null)}
  >
    <div
      className="modal-card"
      onClick={e => e.stopPropagation()}
    >
      <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
      <img src={selectedProduct.img} alt={selectedProduct.title} className="modal-img" />
      <h3>{selectedProduct.title}</h3>
      <p className="modal-desc">{selectedProduct.description}</p>
      <p className="modal-price">{selectedProduct.price}</p>
    </div>
  </div>
)}
    </>
  );
}
