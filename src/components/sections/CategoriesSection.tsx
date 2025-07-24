import { useState } from "react";
import { Gamepad2, Music, Camera, Book, ShoppingBag, Dumbbell, Car, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: 'GAME', name: 'الألعاب', icon: Gamepad2, color: 'from-red-500 to-orange-500', count: '1000+' },
  { id: 'MUSIC_AND_AUDIO', name: 'الموسيقى', icon: Music, color: 'from-purple-500 to-pink-500', count: '500+' },
  { id: 'PHOTOGRAPHY', name: 'التصوير', icon: Camera, color: 'from-blue-500 to-cyan-500', count: '300+' },
  { id: 'BOOKS_AND_REFERENCE', name: 'الكتب', icon: Book, color: 'from-green-500 to-emerald-500', count: '800+' },
  { id: 'SHOPPING', name: 'التسوق', icon: ShoppingBag, color: 'from-yellow-500 to-orange-500', count: '200+' },
  { id: 'HEALTH_AND_FITNESS', name: 'الصحة', icon: Dumbbell, color: 'from-indigo-500 to-purple-500', count: '400+' },
  { id: 'AUTO_AND_VEHICLES', name: 'السيارات', icon: Car, color: 'from-gray-600 to-gray-800', count: '150+' },
  { id: 'LIFESTYLE', name: 'نمط الحياة', icon: Heart, color: 'from-pink-500 to-rose-500', count: '600+' },
];

interface CategoriesSectionProps {
  onCategorySelect: (categoryId: string) => void;
}

export const CategoriesSection = ({ onCategorySelect }: CategoriesSectionProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            استكشف الفئات
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            اكتشف آلاف التطبيقات والألعاب في جميع الفئات المختلفة
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 scroll-fade-in">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "h-auto p-6 glass-card border border-white/10 hover:border-white/20 transition-all duration-500 group animate-scale-in",
                  hoveredCategory === category.id && "scale-105 shadow-2xl"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => onCategorySelect(category.id)}
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  {/* Icon Container */}
                  <div className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                    category.color,
                    hoveredCategory === category.id && "animate-pulse-glow shadow-2xl"
                  )}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Category Info */}
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:gradient-text transition-all duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.count} تطبيق
                    </p>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className={cn(
                    "w-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300",
                    hoveredCategory === category.id && "w-12"
                  )} />
                </div>
              </Button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 scroll-fade-in">
          <p className="text-muted-foreground mb-6">
            لا تجد ما تبحث عنه؟ جرب البحث المتقدم
          </p>
          <Button 
            size="lg"
            variant="outline"
            className="glass-card border-white/20 text-white hover:bg-white/10 px-8"
          >
            عرض جميع الفئات
          </Button>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/3 left-8 animate-float opacity-30">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg rotate-45" />
        </div>
        <div className="absolute bottom-1/3 right-12 animate-float opacity-30" style={{ animationDelay: '3s' }}>
          <div className="w-4 h-4 bg-gradient-to-br from-accent to-primary-glow rounded-full" />
        </div>
      </div>
    </section>
  );
};