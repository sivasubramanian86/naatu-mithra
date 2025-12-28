import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SlangTranslator from './pages/SlangTranslator';
import TravelPredictor from './pages/TravelPredictor';
import FoodMood from './pages/FoodMood';
import Soundboard from './pages/Soundboard';
import HeritageCards from './pages/HeritageCards';
import AdminReview from './pages/AdminReview';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [city, setCity] = useState('all');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home setActivePage={setActivePage} setCity={setCity} />;
      case 'slang': return <SlangTranslator currentCity={city} />;
      case 'travel': return <TravelPredictor currentCity={city} />;
      case 'food': return <FoodMood currentCity={city} />;
      case 'sounds': return <Soundboard currentCity={city} />;
      case 'heritage': return <HeritageCards currentCity={city} />;
      case 'admin': return <AdminReview />;
      default: return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="h-screen w-screen flex bg-[var(--body-bg)] font-nunito transition-colors duration-300 overflow-hidden">
      {/* Sidebar Navigation - Fixed */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area - Fixed Shell */}
      <div className="flex-grow flex flex-col ml-24 lg:ml-72 h-full overflow-hidden">
        {/* Top Header - Fixed */}
        <TopBar
          theme={theme}
          toggleTheme={toggleTheme}
          currentCity={city}
          setCity={setCity}
        />

        {/* Scrollable Dynamic Page Content */}
        <main className="flex-grow custom-scroll bg-[var(--body-bg)]">
          <div className="p-10 max-w-[1600px] mx-auto min-h-full flex flex-col">
            <div className="flex-grow">
              {renderPage()}
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
