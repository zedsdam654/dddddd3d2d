import { useState } from "react";
import { Star, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { App } from "@/types/app";
import { cn } from "@/lib/utils";

interface AppCardProps {
  app: App;
  variant?: "default" | "featured" | "compact";
  className?: string;
  style?: React.CSSProperties;
}

export const AppCard = ({ app, variant = "default", className, style }: AppCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDownload = () => {
    window.open(app.url, '_blank');
  };

  if (variant === "compact") {
    return (
      <div 
        className={cn(
          "luxury-card p-4 group hover:shadow-luxury transition-all duration-500",
          className
        )}
        style={style}
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={app.icon}
              alt={app.title}
              className="w-12 h-12 rounded-xl shadow-lg"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-muted animate-pulse rounded-xl" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{app.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{app.developer}</p>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-muted-foreground ml-1">
                {app.rating ? app.rating.toFixed(1) : 'N/A'}
              </span>
            </div>
          </div>

          <Button 
            size="sm" 
            onClick={handleDownload}
            className="glow-button bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-white"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div 
        className={cn(
          "luxury-card p-6 group hover:shadow-luxury transition-all duration-500 animate-scale-in",
          className
        )}
        style={style}
      >
        <div className="relative mb-4">
          <img
            src={app.icon}
            alt={app.title}
            className="w-20 h-20 rounded-2xl shadow-2xl mx-auto floating-animation"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl w-20 h-20 mx-auto" />
          )}
          <div className="absolute -top-2 -right-2">
            <Badge className="bg-gradient-to-r from-accent to-primary text-white">
              مميز
            </Badge>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
            {app.title}
          </h3>
          <p className="text-muted-foreground">{app.developer}</p>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm text-muted-foreground ml-1">
                {app.rating ? app.rating.toFixed(1) : 'N/A'}
              </span>
            </div>
            <Badge variant="secondary">{app.category}</Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {app.summary || app.description}
          </p>

          <div className="flex space-x-2">
            <Button 
              className="flex-1 glow-button bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-white"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              تحميل
            </Button>
            <Button variant="outline" size="icon" className="glass-card border-white/20">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "luxury-card p-5 group hover:shadow-luxury transition-all duration-500",
        className
      )}
      style={style}
    >
      <div className="flex space-x-4">
        <div className="relative flex-shrink-0">
          <img
            src={app.icon}
            alt={app.title}
            className="w-16 h-16 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded-xl" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground group-hover:gradient-text transition-all duration-300 truncate">
            {app.title}
          </h3>
          <p className="text-muted-foreground text-sm truncate">{app.developer}</p>
          
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-muted-foreground ml-1">
                {app.rating ? app.rating.toFixed(1) : 'N/A'}
              </span>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              {app.category}
            </Badge>
            {app.price === "Free" && (
              <Badge className="bg-success text-success-foreground">مجاني</Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {app.summary || app.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              {app.installs && (
                <span>تحميلات: {app.installs}</span>
              )}
            </div>
            <Button 
              size="sm"
              onClick={handleDownload}
              className="glow-button bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              تحميل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};