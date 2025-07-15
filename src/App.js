import React, { useState } from "react";
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
  const itemsPerPage = 9;

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
          {displayedProducts.map(({ id, img, title, description, price }) => (
            <div key={id} className="product-card">
              <img src={img} alt={title} />
              <h3>{title}</h3>
              <p className="product-desc">{description}</p>
              <p className="product-price">{price}</p>
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
    </>
  );
}
