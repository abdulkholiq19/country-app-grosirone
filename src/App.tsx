import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './pages/CountryList/CountryList';
import CountryDetailPage from './pages/CountryDetailPage/CountryDetailPage';
import CooperationPage from './pages/CooperationPage/CooperationPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen p-4 bg-cover bg-center h-scree" >
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:id" element={<CountryDetailPage />} />
          <Route path="/cooperation" element={<CooperationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
