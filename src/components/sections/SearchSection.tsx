import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppCard } from "@/components/apps/AppCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { appService } from "@/services/appService";
import { App } from "@/types/app";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchSection = ({ searchQuery, onSearchChange }: SearchSectionProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'rating' | 'installs' | 'name'>('rating');

  const { data: searchResults = [], isLoading, error } = useQuery({
    queryKey: ['searchApps', searchQuery],
    queryFn: () => appService.searchApps(searchQuery),
    enabled: searchQuery.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const sortedResults = [...searchResults].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'installs':
        const getInstallNumber = (installs: string) => {
          if (!installs) return 0;
          const num = parseFloat(installs.replace(/[^0-9.]/g, ''));
          if (installs.includes('M')) return num * 1000000;
          if (installs.includes('K')) return num * 1000;
          return num;
        };
        return getInstallNumber(b.installs) - getInstallNumber(a.installs);
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  if (!searchQuery) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Search className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-4">
              ابحث عن تطبيقاتك المفضلة
            </h2>
            <p className="text-muted-foreground mb-8">
              اكتب في مربع البحث أعلاه للعثور على التطبيقات والألعاب المذهلة
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-2">
              نتائج البحث عن "{searchQuery}"
            </h2>
            {!isLoading && (
              <p className="text-muted-foreground">
                تم العثور على {searchResults.length} نتيجة
              </p>
            )}
          </div>

          {/* Filters & View Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-lg glass-card border border-white/20 text-foreground bg-transparent"
            >
              <option value="rating" className="bg-card text-foreground">الأعلى تقييماً</option>
              <option value="installs" className="bg-card text-foreground">الأكثر تحميلاً</option>
              <option value="name" className="bg-card text-foreground">الاسم</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg glass-card border border-white/20 p-1">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <LoadingSpinner size="lg" />
            <p className="text-muted-foreground mt-4">جاري البحث...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-destructive/20 flex items-center justify-center">
              <Search className="w-12 h-12 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              حدث خطأ في البحث
            </h3>
            <p className="text-muted-foreground">
              يرجى المحاولة مرة أخرى لاحقاً
            </p>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && searchResults.length === 0 && searchQuery.length > 2 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-muted/20 flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              لم يتم العثور على نتائج
            </h3>
            <p className="text-muted-foreground">
              جرب استخدام كلمات بحث مختلفة
            </p>
          </div>
        )}

        {/* Results Grid/List */}
        {!isLoading && !error && sortedResults.length > 0 && (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {sortedResults.map((app, index) => (
              <AppCard
                key={app.appId || index}
                app={app}
                variant={viewMode === 'list' ? 'default' : 'featured'}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};