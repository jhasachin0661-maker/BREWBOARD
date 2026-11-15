import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import CoffeeDetails from './pages/CoffeeDetails';
import { VoteProvider } from './hooks/useVotes';
import { Coffee, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Scroll to top automatically when navigation changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// 404 Catch-All Page
function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-cream-card border border-cream-border flex items-center justify-center text-coffee mb-4 shadow-warm">
        <Coffee className="w-8 h-8" />
      </div>
      <h1 className="font-serif text-4xl font-bold text-espresso mb-2">
        Page Not Found
      </h1>
      <p className="text-sm text-espresso-muted max-w-md mb-6 leading-relaxed">
        The café page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-espresso text-cream-light font-medium text-sm hover:bg-espresso-soft transition-all shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <VoteProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-cream-warm text-espresso font-sans">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Page Body */}
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/coffee/:id" element={<CoffeeDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Toast Notification & Storage Alerts */}
          <Toast />

          {/* Editorial Footer */}
          <Footer />
        </div>
      </HashRouter>
    </VoteProvider>
  );
}

