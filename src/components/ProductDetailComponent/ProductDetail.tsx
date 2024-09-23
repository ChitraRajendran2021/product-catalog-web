import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail-container">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
