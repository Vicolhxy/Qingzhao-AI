import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PhotoCategory } from "@shared/schema";
import bannerImage from "@assets/Banner_1757964490417.png";

// Photo category data with Chinese names
const photoCategories = [
  {
    id: PhotoCategory.PROFESSIONAL,
    name: "专业职业照",
    description: "高质量的商务职业照片"
  },
  {
    id: PhotoCategory.BLACK_WHITE_ART, 
    name: "黑白艺术照",
    description: "优雅的黑白风格艺术照片"
  },
  {
    id: PhotoCategory.ID_PHOTO,
    name: "证件照", 
    description: "标准的证件照片格式"
  },
  {
    id: PhotoCategory.WECHAT_PORTRAIT,
    name: "微信头像",
    description: "适合社交媒体的头像照片"
  }
];

// Placeholder component for photo samples
function PhotoPlaceholder({ className, large = false }: { className?: string; large?: boolean }) {
  const size = large 
    ? "h-64 w-48 md:h-72 md:w-54 lg:h-80 lg:w-60" 
    : "h-16 w-14";
  return (
    <div 
      className={`bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center ${size} ${className}`}
      data-testid={`placeholder-${large ? 'large' : 'small'}`}
    >
      <span className="text-gray-500 dark:text-gray-400 text-xs">样品照片</span>
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(PhotoCategory.PROFESSIONAL);

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Section */}
      <div className="w-full relative" data-testid="banner-section">
        <img 
          src={bannerImage} 
          alt="专业团队精选，肖像隐私安全" 
          className="w-full h-48 object-cover"
          data-testid="banner-image"
        />
      </div>

      {/* Content Section */}
      <div className="px-3 py-8">
        <div className="flex items-start gap-3">
          {/* Left Navigation */}
          <div className="w-20 sm:w-24 md:w-28 shrink-0">
            <div className="flex flex-col gap-1">
              {photoCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 text-sm border-l-2 transition-colors ${
                    selectedCategory === category.id
                      ? 'border-[#28BE6F] text-[#28BE6F] font-medium'
                      : 'border-transparent text-foreground/80 hover:bg-muted'
                  }`}
                  data-testid={`tab-${category.id}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 pr-3">
            {(() => {
              const category = photoCategories.find(c => c.id === selectedCategory)!;
              return (
                <div data-testid={`content-${category.id}`}>
                  {/* Large Sample Photo */}
                  <div className="mb-4">
                    <PhotoPlaceholder large />
                  </div>

                  {/* Small Sample Photos - align width with large photo */}
                  <div className="mb-4">
                    <div className="w-48 md:w-54 lg:w-60 flex justify-between">
                      <PhotoPlaceholder data-testid={`small-sample-1-${category.id}`} />
                      <PhotoPlaceholder data-testid={`small-sample-2-${category.id}`} />
                      <PhotoPlaceholder data-testid={`small-sample-3-${category.id}`} />
                    </div>
                  </div>

                  {/* Action Button - match large photo width */}
                  <div>
                    <Link to={`/upload?category=${category.id}`}>
                      <Button 
                        size="lg" 
                        className="w-48 md:w-54 lg:w-60 bg-primary hover:bg-primary/90 text-primary-foreground"
                        data-testid={`button-make-same-${category.id}`}
                      >
                        我要做同款
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}