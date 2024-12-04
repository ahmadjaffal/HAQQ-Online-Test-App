import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import SearchBox from './components/SearchBox';
import './App.scss';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    // Get products data from fakestoreapi
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    }

    const savedOrder = sessionStorage.getItem('productOrder');
    if (savedOrder) {
      const initialOrder = savedOrder ? JSON.parse(savedOrder) : products;
      setProducts(initialOrder)
    }
    else {
      fetchProducts();
    };

  }, []);

  // Handle the change on the search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="main-container">
      <h1>Products List</h1>
      <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
      <ProductList products={products} setProducts={setProducts} searchTerm={searchTerm} />
    </div>
  );
};

export default App;