import React, { useEffect, useState } from "react";

export default function ProductGrid({ lang, filter, page, itemsPerPage, onSelect }) {
  const [products, setProducts] = useState([]);

useEffect(() => {
  console.log("Подключение данных напрямую");
  setProducts([
    {
      id: 1,
      category: "soap",
      img: "/assets/soap_1.jpg",
      titles: { ru: "Мыло", en: "Soap", es: "Jabón" },
      descriptions: { ru: "Состав: мыло на основе кокоса, краситель, отдушка.", en: "Ingredients: coconut-based soap, colorant, fragrance.", es: "Ingredientes: jabón a base de coco, colorante, fragancia." },
      price: "$5000+"
    }
  ]);
}, []);


  const filteredProducts = filter === "all" ? products : products.filter((p) => p.category === filter);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="products-grid">
      {displayedProducts.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => onSelect(product)}
          style={{ cursor: "pointer" }}
        >
          <img src={product.img} alt={product.titles[lang]} />
          <h3>{product.titles[lang]}</h3>
          <p className="product-desc">{product.descriptions[lang]}</p>
          <p className="product-price">{product.price}</p>
        </div>
      ))}
    </div>
  );
}
