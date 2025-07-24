import { useState } from "react";
import { Search, Menu, Download, Star, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuToggle: () => void;
}

export const Header = ({ onSearch, onMenuToggle }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="lg:hidden text-white hover:bg-white/10"
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold gradient-text">AppVault</h1>
                <p className="text-xs text-muted-foreground">متجر التطبيقات الفخم</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="ابحث عن التطبيقات والألعاب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card border-white/20 text-white placeholder:text-muted-foreground focus:border-primary/50"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a 
              href="#apps" 
              className="text-foreground hover:text-primary transition-colors duration-300 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>التطبيقات</span>
            </a>
            <a 
              href="#games" 
              className="text-foreground hover:text-accent transition-colors duration-300 flex items-center space-x-2"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>الألعاب</span>
            </a>
            <a 
              href="#top" 
              className="text-foreground hover:text-primary-glow transition-colors duration-300 flex items-center space-x-2"
            >
              <Star className="w-4 h-4" />
              <span>الأفضل</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};