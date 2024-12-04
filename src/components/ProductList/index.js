import React, { useEffect } from 'react';

const ProductList = ({ products, setProducts, searchTerm }) => {

    useEffect(() => {
        // Retrieve the saved product order from session storage or fallback to initial order
        const savedOrder = sessionStorage.getItem('productOrder');
        const initialOrder = savedOrder ? JSON.parse(savedOrder) : products;

        setProducts(initialOrder)
    }, [products]);


    // Handle drag start
    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index); // Save the dragged item's index in the transfer data
    };

    // Handle drag over to enable drop
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Handle the drop event to reorder the items
    const handleDrop = (e, index) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData('text/plain'); // Get the index of the dragged item
        const draggedProduct = products[draggedIndex];

        // Reorder the products array
        const newProducts = [...products];
        newProducts.splice(draggedIndex, 1);
        newProducts.splice(index, 0, draggedProduct);

        setProducts(newProducts);

        // Save the new order to sessionStorage
        sessionStorage.setItem('productOrder', JSON.stringify(newProducts));
    };

    // Filter products based on search term in title or description
    const filteredProducts = products.filter(product =>
        (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Highlight search term in the title or the description
    const highlightText = (text) => {
        if (!searchTerm) return text;
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: '#F9DC5C' }}>{part}</span>
            ) : (
                part
            )
        );
    };

    return (
        <>
            {filteredProducts.length > 0 ? <p className="count"><b>{filteredProducts.length} products</b> were found.</p> : null}
            <ul>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <li key={product.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            <h2>{highlightText(product.title)}</h2>
                            <span className="category"><b>{product.category}</b></span>
                            <p>{highlightText(product.description)}</p>
                            <div className="rating">Rated:  <b>{product.rating.rate}</b> out of <b>5</b> By <b>{product.rating.count}</b> Persons | <span className="price">Price: <b>${product.price}</b></span></div>
                        </li>
                    ))
                ) : (
                    <li className="count"><b>No products</b> found.</li>
                )}
            </ul>
        </>
    );
};

export default ProductList;