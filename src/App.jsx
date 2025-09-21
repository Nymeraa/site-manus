import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import CustomBlend from './pages/CustomBlend'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'

import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Accessories from './pages/Accessories'
import Account from './pages/Account'
import TeaCategory from './pages/TeaCategory'
import FAQ from './pages/FAQ'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <AnnouncementBar />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/thes-et-infusions" element={<Catalog />} />
                <Route path="/thes-et-infusions/:category" element={<TeaCategory />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/custom-blend" element={<CustomBlend />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/account" element={<Account />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

