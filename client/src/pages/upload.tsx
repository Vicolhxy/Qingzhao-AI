import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, User, Sun, Building, X } from "lucide-react";
import { PhotoCategory } from "@shared/schema";

// Import sample images (same as home page)
import sampleMale1 from "@assets/Sample-Male-1_1758161866744.png";
import sampleMale2 from "@assets/Sample-Male-2_1758161866744.png";
import sampleMale3 from "@assets/Sample-Male-3_1758161866745.png";
import sampleMale4 from "@assets/Sample-Male-4_1758161866744.png";

// Import outline human image
import outlineHuman from "@assets/Outline-human_1758207634258.png";

// Category display names
const categoryNames = {
  [PhotoCategory.PROFESSIONAL]: "专业职场照",
  [PhotoCategory.BLACK_WHITE_ART]: "黑白艺术照", 
  [PhotoCategory.ID_PHOTO]: "证件照",
  [PhotoCategory.WECHAT_PORTRAIT]: "微信头像",
};

export default function Upload() {
  const [, setLocation] = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [aigcModalOpen, setAigcModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Parse category and gender from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const category = (urlParams.get('category') || PhotoCategory.PROFESSIONAL) as PhotoCategory;
  const gender = urlParams.get('gender') || 'male';
  const categoryName = categoryNames[category];

  // Sample images (using same as home page)
  const sampleImages = [sampleMale1, sampleMale2, sampleMale3, sampleMale4];

  const handleUploadClick = () => {
    // Clear input value to allow re-selecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Use single file input to show native system options (camera/album/files)
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clean up previous URL to prevent memory leaks
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl);
      }
      
      setSelectedFile(file);
      
      // Create preview URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Show AIGC service agreement modal first
      setAigcModalOpen(true);
    }
  };

  const handleAigcAgreement = () => {
    setAigcModalOpen(false);
    // Navigate to result page after agreement
    setLocation(`/result?category=${category}&gender=${gender}`);
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setDialogOpen(true);
  };

  // Cleanup blob URL on component unmount
  useEffect(() => {
    return () => {
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl);
      }
    };
  }, [uploadedImageUrl]);

  return (
    <div className="min-h-screen bg-background overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* Header */}
      <div className="flex items-center p-4 border-b" data-testid="upload-header">
        <Link href="/">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="ml-3 text-lg font-medium" data-testid="text-category-title">{categoryName}</h1>
      </div>

      {/* Main Content Container with fixed 20px margins */}
      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        
        {/* First div: Sample Photos Display */}
        <div style={{ paddingTop: '24px', paddingBottom: '24px' }} data-testid="section-samples">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: '3px', height: '16px', backgroundColor: 'hsl(148 65% 45%)', borderRadius: '2px' }}></div>
              <h2 className="text-lg font-medium">样片展示</h2>
            </div>
            
            {/* 4 Sample Photos Horizontal Strip */}
            <div className="flex flex-nowrap gap-[6px]" data-testid="grid-samples">
              {sampleImages.map((sample, index) => (
                <div 
                  key={index}
                  className="bg-gray-100 rounded-[6px] overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                  style={{ 
                    width: 'clamp(60px, calc((100% - 18px)/4), 86px)', 
                    aspectRatio: '86 / 126' 
                  }}
                  onClick={() => handleImageClick(sample)}
                  data-testid={`img-sample-${index + 1}`}
                >
                  <img 
                    src={sample} 
                    alt={`样片${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second div: Upload Photo Area */}
        <div data-testid="section-upload">
          <div className="flex items-center gap-2 mb-3">
            <div style={{ width: '3px', height: '16px', backgroundColor: 'hsl(148 65% 45%)', borderRadius: '2px' }}></div>
            <h2 className="text-lg font-medium">上传照片</h2>
          </div>
          
          {/* Upload Area - Left and Right sections */}
          <div className="flex gap-4" data-testid="area-upload" style={{ backgroundColor: '#F9F9F9', padding: '16px', borderRadius: '8px' }}>
            {/* Left: Photo display area */}
            <div 
              className="flex-1 bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-400 transition-colors"
              onClick={handleUploadClick}
              data-testid="area-photo"
            >
              <div className="w-full h-full flex items-center justify-center min-h-[300px]">
                {uploadedImageUrl ? (
                  <img 
                    src={uploadedImageUrl} 
                    alt="已上传照片" 
                    className="max-w-full max-h-full object-contain mx-auto"
                  />
                ) : (
                  <img 
                    src={outlineHuman} 
                    alt="人物轮廓" 
                    className="max-w-full max-h-full object-contain opacity-30"
                    style={{ filter: 'invert(0.5)' }}
                  />
                )}
              </div>
            </div>

            {/* Right: Photo tips */}
            <div className="w-24 flex flex-col justify-center" data-testid="area-tips">
              <div className="space-y-6">
                {/* Tip 1: Single Person */}
                <div className="text-center" data-testid="tip-single">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <p className="text-xs text-gray-600">单人照片</p>
                </div>

                {/* Tip 2: Good Lighting */}
                <div className="text-center" data-testid="tip-lighting">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                    <Sun className="w-6 h-6 text-gray-600" />
                  </div>
                  <p className="text-xs text-gray-600">光线充足</p>
                </div>

                {/* Tip 3: Simple Background */}
                <div className="text-center" data-testid="tip-background">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-gray-600" />
                  </div>
                  <p className="text-xs text-gray-600">背景简单</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          data-testid="input-file"
        />

        {/* Third div: Button (48px gap from upload area) */}
        <div style={{ marginTop: '48px' }} data-testid="section-button">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full"
            style={{ 
              width: '100%', 
              padding: '12px 0' 
            }}
            onClick={selectedFile ? handleSubmit : handleUploadClick}
            data-testid="button-upload"
          >
            {selectedFile ? '开始生成我的照片（4张）' : '点击上传 / 拍照'}
          </Button>
        </div>

        {/* Bottom spacing - 32px (4px grid: 8 * 4 = 32) */}
        <div style={{ paddingBottom: '32px' }}></div>

        {/* Footer - Fixed distance from bottom 48px (4px grid: 12 * 4 = 48) */}
        <div 
          className="text-center" 
          style={{ marginBottom: '48px' }}
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

      {/* Image Preview Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-screen-sm mx-auto p-6 [&>button]:hidden">
          <DialogTitle className="sr-only">样片预览</DialogTitle>
          <div className="flex flex-col items-center">
            <img 
              src={selectedImage} 
              alt="样片预览" 
              className="w-full h-auto object-contain"
              data-testid="img-dialog-preview"
            />
            <Button
              variant="outline"
              size="lg"
              onClick={() => setDialogOpen(false)}
              className="mt-6 px-8 py-3 text-base"
              data-testid="button-close-preview"
            >
              <X className="w-5 h-5 mr-2" />
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AIGC Service Agreement Modal - Bottom Drawer */}
      <Dialog open={aigcModalOpen} onOpenChange={setAigcModalOpen}>
        <DialogContent className="max-w-full mx-0 p-0 rounded-t-xl rounded-b-none translate-y-0 animate-in slide-in-from-bottom-0 duration-300 bottom-0 top-auto border-0 [&>button]:hidden">
          <div className="px-6 pt-6 pb-0">
            <DialogTitle className="text-lg font-semibold mb-4 text-center" data-testid="text-aigc-title">
              AIGC服务协议
            </DialogTitle>
            
            <div className="text-sm text-gray-700 leading-relaxed mb-8" data-testid="text-aigc-content">
              <p>
                欢迎使用轻照AI，您将上传照片用于AIGC服务，您需要在取得照片权利人的同意后再进行操作。
                <span className="font-bold">您上传的照片仅用于制作AI生图，不会被存储、传播或用于其他用途，</span>
                相关规则请您仔细阅读
                <Link href="/terms" className="font-bold text-primary underline mx-1">《用户服务协议》</Link>
                和
                <Link href="/privacy" className="font-bold text-primary underline mx-1">《隐私政策》</Link>
                。
              </p>
            </div>

            <div style={{ paddingBottom: '48px' }}>
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-full"
                onClick={handleAigcAgreement}
                data-testid="button-aigc-agree"
                style={{ 
                  padding: '12px 0' 
                }}
              >
                我知道了
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}