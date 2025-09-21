import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ArrowLeft, Download, Eye, X } from "lucide-react";
import { PhotoCategory } from "@shared/schema";
import { useState, useEffect, useRef } from "react";
import { ID_PHOTO_TYPES, createDefaultConfig, IdPhotoConfig, BACKGROUND_COLORS } from "@/data/idPhotoConfig";

// Import WeChat frame images
import wechatFrame1 from "@assets/WechatFrame-1_1758491861092.png";
import wechatFrame2 from "@assets/WechatFrame-2_1758491861090.png";
import wechatFrame3 from "@assets/WechatFrame-3_1758491861092.png";
import wechatFrame4 from "@assets/WechatFrame-4_1758491861090.png";
import wechatFrame5 from "@assets/WechatFrame-5_1758491861091.png";
import wechatFrame6 from "@assets/WechatFrame-6_1758491861088.png";

// Category display names
const categoryNames = {
  [PhotoCategory.PROFESSIONAL]: "专业职场照",
  [PhotoCategory.BLACK_WHITE_ART]: "黑白艺术照", 
  [PhotoCategory.ID_PHOTO]: "证件照",
  [PhotoCategory.WECHAT_PORTRAIT]: "微信头像框",
};

// WeChat Avatar Frame Composer
function WechatAvatarComposer({ frameIndex }: { frameIndex: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [composedImageUrl, setComposedImageUrl] = useState<string>('');
  
  // WeChat frame images array
  const wechatFrames = [wechatFrame1, wechatFrame2, wechatFrame3, wechatFrame4, wechatFrame5, wechatFrame6];
  const selectedFrame = wechatFrames[frameIndex] || wechatFrame1;
  
  useEffect(() => {
    const composeImage = async () => {
      const uploadedImageUrl = sessionStorage.getItem('uploadedImage');
      if (!uploadedImageUrl) return;
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas size
      canvas.width = 512;
      canvas.height = 512;
      
      try {
        // Load user uploaded image
        const userImg = new Image();
        userImg.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          userImg.onload = resolve;
          userImg.onerror = reject;
          userImg.src = uploadedImageUrl;
        });
        
        // Load frame image
        const frameImg = new Image();
        frameImg.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          frameImg.onload = resolve;
          frameImg.onerror = reject;
          frameImg.src = selectedFrame;
        });
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw user image (background) - scaled to fit canvas
        ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height);
        
        // Draw frame overlay
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
        
        // Convert to blob and create URL
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setComposedImageUrl(url);
          }
        }, 'image/png');
        
      } catch (error) {
        console.error('Error composing image:', error);
      }
    };
    
    composeImage();
  }, [frameIndex, selectedFrame]);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" style={{ aspectRatio: '1 / 1' }} data-testid="wechat-result-photo">
          {composedImageUrl ? (
            <img 
              src={composedImageUrl} 
              alt="合成的微信头像"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-xs">正在生成...</span>
            </div>
          )}
          
          {/* Watermark overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="text-white font-bold transform -rotate-12 opacity-70"
              style={{ 
                fontSize: '48px',
                width: '66.67%',
                textAlign: 'center'
              }}
            >
              轻照AI
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-screen-sm mx-auto p-6 [&>button]:hidden">
        <DialogTitle className="sr-only">微信头像预览</DialogTitle>
        <div className="flex flex-col items-center">
          <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden w-full" style={{ aspectRatio: '1 / 1', maxWidth: '300px' }}>
            {composedImageUrl ? (
              <img 
                src={composedImageUrl} 
                alt="合成的微信头像"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-lg">正在生成...</span>
              </div>
            )}
            
            {/* Large watermark overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div 
                className="text-white font-bold transform -rotate-12 opacity-70"
                style={{ 
                  fontSize: '64px',
                  width: '66.67%',
                  textAlign: 'center'
                }}
              >
                轻照AI
              </div>
            </div>
          </div>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="lg"
              className="mt-6 px-8 py-3 text-base"
              data-testid="button-close-preview-wechat"
            >
              <X className="w-5 h-5 mr-2" />
              关闭
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
      
      {/* Hidden canvas for image composition */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Dialog>
  );
}

// Result photo placeholder with watermark and click to view
function ResultPhotoPlaceholder({ index, aspectRatio }: { index: number; aspectRatio: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" style={{ aspectRatio }} data-testid={`result-photo-${index}`}>
          {/* Photo content */}
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-xs">生成照片 {index + 1}</span>
          </div>
          
          {/* Watermark overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="text-white font-bold transform -rotate-12 opacity-70"
              style={{ 
                fontSize: '32px',
                width: '66.67%',
                textAlign: 'center'
              }}
            >
              轻照AI
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-screen-sm mx-auto p-6 [&>button]:hidden">
        <DialogTitle className="sr-only">生成照片预览</DialogTitle>
        <div className="flex flex-col items-center">
          <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden w-full" style={{ aspectRatio, maxWidth: '300px' }}>
            {/* Large photo content */}
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-lg">生成照片 {index + 1}</span>
            </div>
            
            {/* Large watermark overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div 
                className="text-white font-bold transform -rotate-12 opacity-70"
                style={{ 
                  fontSize: '64px',
                  width: '66.67%',
                  textAlign: 'center'
                }}
              >
                轻照AI
              </div>
            </div>
          </div>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="lg"
              className="mt-6 px-8 py-3 text-base"
              data-testid={`button-close-preview-${index}`}
            >
              <X className="w-5 h-5 mr-2" />
              关闭
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Result() {
  const [, setLocation] = useLocation();
  const [idPhotoConfig, setIdPhotoConfig] = useState<IdPhotoConfig | null>(null);
  
  // Parse category and gender from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const category = (urlParams.get('category') || PhotoCategory.PROFESSIONAL) as PhotoCategory;
  const gender = urlParams.get('gender') || 'male';
  const frameIndex = parseInt(urlParams.get('frameIndex') || '0', 10);
  const categoryName = categoryNames[category];
  const isIdPhoto = category === PhotoCategory.ID_PHOTO;
  const isWechatPortrait = category === PhotoCategory.WECHAT_PORTRAIT;
  const aspectRatio = isIdPhoto ? '3/4' : '212/304';
  
  // Initialize ID photo config for display (load from localStorage if available)
  useEffect(() => {
    if (isIdPhoto && !idPhotoConfig) {
      const savedConfig = localStorage.getItem('idPhotoConfig');
      if (savedConfig) {
        try {
          setIdPhotoConfig(JSON.parse(savedConfig));
        } catch (error) {
          // Fall back to default if parsing fails
          const defaultType = ID_PHOTO_TYPES[0];
          setIdPhotoConfig(createDefaultConfig(defaultType));
        }
      } else {
        // Use default if no saved config
        const defaultType = ID_PHOTO_TYPES[0];
        setIdPhotoConfig(createDefaultConfig(defaultType));
      }
    }
  }, [isIdPhoto, idPhotoConfig]);

  const handlePayment = () => {
    // TODO: Implement Stripe payment integration
    alert('支付功能即将开放，敬请期待！');
  };

  const handleNewPhoto = () => {
    setLocation(`/upload?category=${category}&gender=${gender}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b" data-testid="result-header">
        <Link href={`/?category=${category}`}>
          <Button variant="ghost" size="icon" data-testid="back-button">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="ml-3 flex items-center">
          <h1 className="text-lg font-medium" data-testid="category-title">{categoryName}</h1>
          <Badge variant="secondary" className="ml-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            已完成
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-5 py-6 max-w-md flex-grow">

        {/* Photo Title */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <div style={{ width: '3px', height: '16px', backgroundColor: 'hsl(148 65% 45%)', borderRadius: '2px' }}></div>
            <h3 className="text-lg font-medium" data-testid="photo-title">生成照片</h3>
          </div>
        </div>
        
        {/* Results Display */}
        {isWechatPortrait ? (
          /* WeChat Portrait - Single 1:1 photo */
          <div className="flex justify-center mb-6" data-testid="wechat-result">
            <div className="w-64 h-64">
              <WechatAvatarComposer frameIndex={frameIndex} />
            </div>
          </div>
        ) : (
          /* Other categories - 2x2 Grid Layout */
          <div className="grid grid-cols-2 gap-3 mb-6" data-testid="results-grid">
            {Array.from({ length: 4 }, (_, i) => (
              <ResultPhotoPlaceholder key={i} index={i} aspectRatio={aspectRatio} />
            ))}
          </div>
        )}
        
        {/* ID Photo Parameters - Only show for ID photos */}
        {isIdPhoto && idPhotoConfig && (
          <div className="mb-6" data-testid="id-photo-params">
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: '3px', height: '16px', backgroundColor: 'hsl(148 65% 45%)', borderRadius: '2px' }}></div>
              <h3 className="text-lg font-medium">证件照参数</h3>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                {idPhotoConfig.type}，{idPhotoConfig.size_mm.width}×{idPhotoConfig.size_mm.height}mm，{idPhotoConfig.dpi}dpi，{(() => {
                  const colorName = Object.entries(BACKGROUND_COLORS).find(([_, color]) => color === idPhotoConfig.background_color)?.[0];
                  return colorName === 'white' ? '白色背景' : colorName === 'blue' ? '蓝色背景' : colorName === 'red' ? '红色背景' : '背景色';
                })()}，{idPhotoConfig.pixels.width}×{idPhotoConfig.pixels.height}px，约{idPhotoConfig.file_size_kb}kb
              </p>
            </div>
          </div>
        )}

        {/* Pricing Card */}
        <Card className="mb-6 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold" data-testid="pricing-title">
                  {isWechatPortrait ? '高清无水印原片（1张）' : '高清无水印原片（4张）'}
                </h3>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    {isWechatPortrait ? '¥9.9' : '¥99.9'}
                  </span>
                  <span className="text-2xl font-bold text-primary" data-testid="price">
                    {isWechatPortrait ? '¥1.9' : '¥19.9'}
                  </span>
                </div>
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
            
            {/* Agreement Notice */}
            <div className="text-center mt-3">
              <p className="text-xs text-muted-foreground">
                点击购买即表示同意服务条款和隐私政策
              </p>
            </div>
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
        </div>
        
      </div>
      
      {/* Footer at page bottom */}
      <div 
        className="text-center bg-background mt-auto mb-6 pt-4"
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