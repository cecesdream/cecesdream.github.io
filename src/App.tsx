/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import PageMetaSync from "./seo/PageMetaSync";
import Footer from "./components/Footer";
import NewsletterSignup from "./components/NewsletterSignup";
import Home from "./pages/Home";

// Home is the landing page and stays in the main bundle; the rest load on demand.
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Story = lazy(() => import("./pages/Story"));
const Donate = lazy(() => import("./pages/Donate"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageMetaSync />
      <div className="flex flex-col min-h-screen overflow-x-clip">
        <Navbar />
        <main className="flex-grow pt-24">
          <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Story />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </main>
        <NewsletterSignup />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
