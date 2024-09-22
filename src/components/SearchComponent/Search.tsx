import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import throttle from 'lodash.throttle';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
}

const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<Product[]>([]);
    const navigate = useNavigate(); // Create a navigate instance

    const fetchSearchResults = async (query: string) => {
        try {
            const response = await fetch(`http://localhost:8080/products/search?query=${query}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setResults([]); // Clear results if an error occurs
        }
    };

    // Throttled version of the fetchSearchResults function
    const throttledSearch = useCallback(
        throttle((query: string) => fetchSearchResults(query), 300),
        []
    );

    useEffect(() => {
        if (searchTerm.length > 0) {
            throttledSearch(searchTerm);
        } else {
            setResults([]); // Clear results when searchTerm is empty
        }
    }, [searchTerm, throttledSearch]);

    const handleProductClick = (id: number) => {
        navigate(`/products/${id}`); // Navigate to Product Detail view
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
                {results.map(product => (
                    <div key={product.id} onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                        <h3>{product.name}</h3>
                        <p>{product.category} - ${product.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
