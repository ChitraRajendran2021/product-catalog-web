import React, { useState, useEffect } from 'react';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.category} - ${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
