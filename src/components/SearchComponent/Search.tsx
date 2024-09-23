import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
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
            console.error('Error fetching search results:', error);
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
        <div style={{ padding: '20px' }}>
            {/* Search Input */}
            <input
                type="text"
                placeholder="What are you looking for .."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px', width: '100%', marginBottom: '20px', boxSizing: 'border-box' }}
            />

            {/* Table for displaying search results */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Category</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? (
                        results.map(product => (
                            <tr
                                key={product.id}
                                onClick={() => handleProductClick(product.id)}
                                style={{ cursor: 'pointer', backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                            >
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{product.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{product.category}</td>
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
                                    ${product.price.toFixed(2)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} style={{ padding: '10px', textAlign: 'center' }}>
                                No results found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Search;
