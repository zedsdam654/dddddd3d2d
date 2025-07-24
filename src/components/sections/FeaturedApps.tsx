import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AppCard } from "@/components/apps/AppCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { appService } from "@/services/appService";
import { Star, TrendingUp } from "lucide-react";

export const FeaturedApps = () => {
  const [visibleItems, setVisibleItems] = useState(3);

  const { data: topApps, isLoading } = useQuery({
    queryKey: ['topApps'],
    queryFn: () => appService.getTopApps(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: topGames } = useQuery({
    queryKey: ['topGames'],
    queryFn: () => appService.getTopGames(),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleItems(4);
      else if (window.innerWidth >= 768) setVisibleItems(3);
      else setVisibleItems(2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-4">التطبيقات المميزة</h2>
            <LoadingSpinner size="lg" className="mt-8" />
          </div>
        </div>
      </section>
    );
  }

  const featuredApps = topApps?.slice(0, 8) || [];
  const featuredGames = topGames?.slice(0, 6) || [];

  return (
    <section className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">التطبيقات المميزة</h2>
            <Star className="w-8 h-8 text-accent ml-3" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            اكتشف أفضل التطبيقات والألعاب المختارة بعناية لتجربة استثنائية
          </p>
        </div>

        {/* Featured Apps Carousel */}
        <div className="mb-20 scroll-fade-in">
          <div className="flex items-center mb-8">
            <TrendingUp className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-2xl font-bold text-foreground">أفضل التطبيقات</h3>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredApps.map((app, index) => (
                <CarouselItem key={app.appId || index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <AppCard 
                    app={app} 
                    variant="featured"
                    className="h-full animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="glass-card border-white/20 text-white hover:bg-white/10" />
            <CarouselNext className="glass-card border-white/20 text-white hover:bg-white/10" />
          </Carousel>
        </div>

        {/* Featured Games Carousel */}
        <div className="scroll-fade-in">
          <div className="flex items-center mb-8">
            <div className="w-6 h-6 mr-3">
              <div className="w-full h-full bg-gradient-to-r from-accent to-primary rounded-sm" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">أفضل الألعاب</h3>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredGames.map((game, index) => (
                <CarouselItem key={game.appId || index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <AppCard 
                    app={game} 
                    variant="featured"
                    className="h-full animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="glass-card border-white/20 text-white hover:bg-white/10" />
            <CarouselNext className="glass-card border-white/20 text-white hover:bg-white/10" />
          </Carousel>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-4 animate-float">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl opacity-20 rotate-12" />
        </div>
        <div className="absolute top-3/4 right-8 animate-float" style={{ animationDelay: '3s' }}>
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary-glow rounded-full opacity-30" />
        </div>
      </div>
    </section>
  );
};