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
  const size = large ? "h-64 w-48" : "h-24 w-20";
  return (
    <div 
      className={`bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center ${size} ${className}`}
      data-testid={`placeholder-${large ? 'large' : 'small'}`}
    >
      <span className="text-gray-500 dark:text-gray-400 text-sm">样品照片</span>
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
      <div className="container mx-auto px-4 py-6">
        <Tabs 
          value={selectedCategory} 
          onValueChange={(value) => setSelectedCategory(value as PhotoCategory)}
          className="w-full"
          data-testid="photo-category-tabs"
        >
          {/* Tab Navigation */}
          <div className="mb-6">
            <TabsList className="grid w-full grid-cols-2 gap-2 h-auto p-1">
              {photoCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-left p-4 h-auto flex-col items-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid={`tab-${category.id}`}
                >
                  <span className="font-medium text-base">{category.name}</span>
                  <span className="text-sm opacity-70 mt-1">{category.description}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          {photoCategories.map((category) => (
            <TabsContent 
              key={category.id} 
              value={category.id} 
              className="mt-0"
              data-testid={`content-${category.id}`}
            >
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  {/* Large Sample Photo */}
                  <div className="mb-6 flex justify-center">
                    <PhotoPlaceholder large className="mx-auto" />
                  </div>

                  {/* Small Sample Photos */}
                  <div className="flex justify-center gap-3 mb-6">
                    <PhotoPlaceholder data-testid={`small-sample-1-${category.id}`} />
                    <PhotoPlaceholder data-testid={`small-sample-2-${category.id}`} />
                    <PhotoPlaceholder data-testid={`small-sample-3-${category.id}`} />
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    <Link to={`/upload?category=${category.id}`}>
                      <Button 
                        size="lg" 
                        className="w-full max-w-sm bg-primary hover:bg-primary/90 text-primary-foreground"
                        data-testid={`button-make-same-${category.id}`}
                      >
                        我要做同款
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}