import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import { useProductData } from './hooks/useProductData';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // Hook para gerenciar dados dos produtos
  const { products, isLoading, updateProducts } = useProductData();

  // Gerenciar roteamento simples
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      // Suportar tanto pathname quanto hash routing
      if (path === '/admin' || hash === '#/admin') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('home');
      }
    };

    // Verificar rota inicial
    handleRouteChange();

    // Escutar mudanças na URL e no hash
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleAdminLogin = (success) => {
    setIsAdminAuthenticated(success);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    // Redirecionar para home
    window.history.pushState({}, '', '/');
    setCurrentRoute('home');
  };

  const handleUpdateProducts = (newProducts) => {
    updateProducts(newProducts);
  };

  // Navegação para admin
  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setCurrentRoute('admin');
  };

  // Navegação para home
  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentRoute('home');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Renderizar área administrativa
  if (currentRoute === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return (
      <AdminPanel 
        onLogout={handleAdminLogout}
        products={products}
        onUpdateProducts={handleUpdateProducts}
      />
    );
  }

  // Renderizar site principal
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header onAdminClick={navigateToAdmin} />
      <Hero />
      <Products products={products} addToCart={addToCart} />
      <About />
      <Contact />
      <Footer />
      <Cart 
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        isOpen={isCartOpen}
        toggleCart={toggleCart}
      />
    </div>
  );
}

export default App;
