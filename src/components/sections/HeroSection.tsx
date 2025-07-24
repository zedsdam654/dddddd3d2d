import { useState, useEffect } from "react";
import { Download, Star, Gamepad2, Smartphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "اكتشف عالم التطبيقات",
      subtitle: "آلاف التطبيقات والألعاب المذهلة في انتظارك",
      icon: Smartphone,
      gradient: "from-primary to-accent"
    },
    {
      title: "ألعاب رائعة",
      subtitle: "أحدث الألعاب والمغامرات الشيقة",
      icon: Gamepad2,
      gradient: "from-accent to-primary-glow"
    },
    {
      title: "تطبيقات مميزة",
      subtitle: "أفضل التطبيقات المختارة بعناية",
      icon: Star,
      gradient: "from-primary-glow to-primary"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-glow/10 rounded-full blur-3xl animate-rotate-slow" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Animated Icon */}
          <div className="flex justify-center mb-8">
            <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${currentSlideData.gradient} flex items-center justify-center animate-bounce-in shadow-2xl`}>
              <IconComponent className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="hero-text animate-slide-up">
            {currentSlideData.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground animate-slide-up max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            {currentSlideData.subtitle}
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card px-4 py-2 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm">تطبيقات مجانية</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center space-x-2">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-sm">تقييمات عالية</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center space-x-2">
              <Download className="w-5 h-5 text-primary-glow" />
              <span className="text-sm">تحميل سريع</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="glow-button bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-white px-8 py-4 text-lg animate-pulse-glow"
            >
              <Download className="w-6 h-6 mr-2" />
              استكشف التطبيقات
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="glass-card border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              <Gamepad2 className="w-6 h-6 mr-2" />
              تصفح الألعاب
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-primary to-accent shadow-glow' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 animate-float">
          <div className="w-8 h-8 bg-primary/30 rounded-lg rotate-45" />
        </div>
        <div className="absolute top-1/3 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-6 h-6 bg-accent/30 rounded-full" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '4s' }}>
          <div className="w-4 h-4 bg-primary-glow/30 rounded-sm rotate-12" />
        </div>
      </div>
    </section>
  );
};