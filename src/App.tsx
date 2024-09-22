import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/SearchComponent/Search';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Search />} />
            </Routes>
        </Router>
    );
};

export default App;
