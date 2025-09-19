import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { PhotoCategory } from "@shared/schema";

// Category display names
const categoryNames = {
  [PhotoCategory.PROFESSIONAL]: "专业职场照",
  [PhotoCategory.BLACK_WHITE_ART]: "黑白艺术照", 
  [PhotoCategory.ID_PHOTO]: "证件照",
  [PhotoCategory.WECHAT_PORTRAIT]: "微信头像",
};

// Result photo placeholder with watermark
function ResultPhotoPlaceholder({ index }: { index: number }) {
  return (
    <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden" style={{ aspectRatio: '212/304' }} data-testid={`result-photo-${index}`}>
      {/* Photo content */}
      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400 text-xs">生成照片 {index + 1}</span>
      </div>
      
      {/* Watermark overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full text-xs font-medium transform -rotate-12 opacity-60">
          DEMO
        </div>
      </div>
      
      {/* Preview button */}
      <Button
        size="icon"
        variant="secondary"
        className="absolute top-2 right-2 h-7 w-7 bg-white/80 hover:bg-white"
        data-testid={`preview-button-${index}`}
      >
        <Eye className="h-3 w-3" />
      </Button>
    </div>
  );
}

export default function Result() {
  const [, setLocation] = useLocation();
  
  // Parse category from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const category = (urlParams.get('category') || PhotoCategory.PROFESSIONAL) as PhotoCategory;
  const categoryName = categoryNames[category];

  const handlePayment = () => {
    // TODO: Implement Stripe payment integration
    alert('支付功能即将开放，敬请期待！');
  };

  const handleNewPhoto = () => {
    setLocation('/upload?category=' + category);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" data-testid="result-header">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="back-button">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="ml-3">
            <h1 className="text-lg font-medium" data-testid="category-title">{categoryName}</h1>
          </div>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          已完成
        </Badge>
      </div>

      <div className="container mx-auto px-3 py-6 max-w-md">

        {/* Results Grid - 2x2 Layout */}
        <div className="grid grid-cols-2 gap-3 mb-6" data-testid="results-grid">
          {Array.from({ length: 4 }, (_, i) => (
            <ResultPhotoPlaceholder key={i} index={i} />
          ))}
        </div>

        {/* Pricing Card */}
        <Card className="mb-6 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold" data-testid="pricing-title">高清无水印原片（4张）</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary" data-testid="price">¥19.9</div>
                <div className="text-sm text-muted-foreground line-through">¥39.8</div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-muted-foreground">
                在您支付成功并下载照片后，我们会立即删除。<br />
                我们承诺不会存储或转播您的个人照片，请放心。
              </p>
            </div>
            
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handlePayment}
              data-testid="payment-button"
            >
              <Download className="mr-2 h-4 w-4" />
              立即购买下载
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleNewPhoto}
            data-testid="new-photo-button"
          >
            制作新照片
          </Button>
          
          <div className="text-center">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="back-home-button">
                返回首页
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            点击购买即表示同意服务条款和隐私政策
          </p>
        </div>
        
        {/* Bottom spacing to prevent fixed footer overlap */}
        <div style={{ paddingBottom: '80px' }}></div>
      </div>
      
      {/* Fixed Footer */}
      <div 
        className="fixed left-0 right-0 text-center bg-background" 
        style={{ bottom: '24px', paddingTop: '16px' }}
        data-testid="footer"
      >
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Link 
            href="/terms" 
            className="hover:text-primary transition-colors"
            data-testid="link-terms"
          >
            用户服务协议
          </Link>
          <span>|</span>
          <Link 
            href="/privacy" 
            className="hover:text-primary transition-colors"
            data-testid="link-privacy"
          >
            隐私政策
          </Link>
        </div>
      </div>
    </div>
  );
}