// Products.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../RTK/Slices/ProductSlice';
import '../../MainStyle.css';
import './product.css';
import ProductCard from './ProductCard';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items); // Access products from `items`
  // console.log("products ",products )
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilter(products); // Update filter whenever products change
  }, [products]);

  const filterProduct = (category) => {
    if (category === 'all') {
      setFilter(products);
    } else {
      const updatedList = products.filter((x) => x.category === category);
      setFilter(updatedList);
    }
  };

  const ShowProducts = () => {
    return (
      <>
            <div
      className="buttons mb-3 fs-3"
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}
    >
      <button className="btn btn-outline-dark" onClick={() => filterProduct('all')}>
        All
      </button>
      <button className="btn btn-outline-dark" onClick={() => filterProduct("men's clothing")}>
        Men's Clothing
      </button>
      <button className="btn btn-outline-dark" onClick={() => filterProduct("women's clothing")}>
        Women's Clothing
      </button>
      <button className="btn btn-outline-dark" onClick={() => filterProduct('jewelery')}>
        Jewelry
      </button>
      <button className="btn btn-outline-dark" onClick={() => filterProduct('electronics')}>
        Electronics
      </button>
    </div>
        <div className="row">
          {filter.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div style={{ backgroundColor: "#D5E0F4" }}>
      <div className="container py-2 ">
        <div className="row">
          <div className="col-12">
            <h2 className="py-1" style={{ display: 'flex', justifyContent: 'center' }}>
              Most Popular Products
            </h2>
          </div>
          <hr />
        </div>
      </div>
      <div className="container">
        <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
          <ShowProducts />
        </div>
      </div>
    </div>
  );
}

export default Products;
