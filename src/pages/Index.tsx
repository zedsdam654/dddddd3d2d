import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedApps } from "@/components/sections/FeaturedApps";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { SearchSection } from "@/components/sections/SearchSection";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Add scroll animation observer
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all scroll-fade-in elements
    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [searchQuery]); // Re-run when search query changes

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
    // Scroll to search section if there's a query
    if (query) {
      setTimeout(() => {
        const searchSection = document.getElementById('search-section');
        searchSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(categoryId); // Use category as search term
    setTimeout(() => {
      const searchSection = document.getElementById('search-section');
      searchSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onSearch={handleSearch}
        onMenuToggle={handleMenuToggle}
      />

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="absolute top-20 left-4 right-4 glass-card border border-white/20 p-6 rounded-2xl">
            <nav className="space-y-4">
              <a href="#apps" className="block text-foreground hover:text-primary transition-colors">
                التطبيقات
              </a>
              <a href="#games" className="block text-foreground hover:text-accent transition-colors">
                الألعاب
              </a>
              <a href="#top" className="block text-foreground hover:text-primary-glow transition-colors">
                الأفضل
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        {!searchQuery && <HeroSection />}

        {/* Search Results Section */}
        <div id="search-section">
          <SearchSection 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Featured Apps - Only show when not searching */}
        {!searchQuery && (
          <>
            <FeaturedApps />
            <CategoriesSection onCategorySelect={handleCategorySelect} />
          </>
        )}
      </main>

      {/* Background particles for visual effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary-glow/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
    </div>
  );
};

export default Index;
