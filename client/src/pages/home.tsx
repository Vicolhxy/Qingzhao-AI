import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    ? "h-56 w-44 md:h-64 md:w-48 lg:h-72 lg:w-56" 
    : "h-16 w-14 md:h-20 md:w-16";
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
      <div className="container mx-auto px-3 py-8">
        <Tabs 
          value={selectedCategory} 
          onValueChange={(value) => setSelectedCategory(value as PhotoCategory)}
          className="w-full"
          data-testid="photo-category-tabs"
        >
          {/* Left Navigation and Right Content Layout */}
          <div className="flex gap-3">
            {/* Left Navigation */}
            <div className="w-20 sm:w-24 md:w-28 shrink-0">
              <TabsList className="flex-col gap-1 p-0 bg-transparent">
                {photoCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="w-full rounded-none justify-start px-4 py-3 text-sm text-foreground/80 hover:bg-muted border-l-2 border-transparent data-[state=active]:border-[#28BE6F] data-[state=active]:text-[#28BE6F] data-[state=active]:bg-transparent"
                    data-testid={`tab-${category.id}`}
                  >
                    <span className="font-medium">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 max-w-[640px] w-full">
              {photoCategories.map((category) => (
                <TabsContent 
                  key={category.id} 
                  value={category.id} 
                  className="mt-0"
                  data-testid={`content-${category.id}`}
                >
                  <div className="bg-transparent">
                    <div className="p-4 sm:p-5 md:p-6">
                      {/* Large Sample Photo */}
                      <div className="mb-4 flex justify-center">
                        <PhotoPlaceholder large className="mx-auto" />
                      </div>

                      {/* Small Sample Photos - align width with large photo */}
                      <div className="flex justify-center mb-4">
                        <div className="w-44 md:w-48 lg:w-56 flex justify-between">
                          <PhotoPlaceholder data-testid={`small-sample-1-${category.id}`} />
                          <PhotoPlaceholder data-testid={`small-sample-2-${category.id}`} />
                          <PhotoPlaceholder data-testid={`small-sample-3-${category.id}`} />
                        </div>
                      </div>

                      {/* Action Button - match large photo width */}
                      <div className="flex justify-center">
                        <Link to={`/upload?category=${category.id}`}>
                          <Button 
                            size="lg" 
                            className="w-44 md:w-48 lg:w-56 bg-primary hover:bg-primary/90 text-primary-foreground"
                            data-testid={`button-make-same-${category.id}`}
                          >
                            我要做同款
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}