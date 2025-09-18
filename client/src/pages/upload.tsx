import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Sun, Building } from "lucide-react";
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
  [PhotoCategory.PROFESSIONAL]: "专业职业照",
  [PhotoCategory.BLACK_WHITE_ART]: "黑白艺术照", 
  [PhotoCategory.ID_PHOTO]: "证件照",
  [PhotoCategory.WECHAT_PORTRAIT]: "微信头像",
};

export default function Upload() {
  const [, setLocation] = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Parse category and gender from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const category = (urlParams.get('category') || PhotoCategory.PROFESSIONAL) as PhotoCategory;
  const gender = urlParams.get('gender') || 'male';
  const categoryName = categoryNames[category];

  // Sample images (using same as home page)
  const sampleImages = [sampleMale1, sampleMale2, sampleMale3, sampleMale4];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Navigate to result page
      setLocation(`/result?category=${category}&gender=${gender}`);
    }
  };

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
                  className="bg-gray-100 rounded-[6px] overflow-hidden"
                  style={{ 
                    width: 'clamp(60px, calc((100% - 18px)/4), 86px)', 
                    aspectRatio: '86 / 126' 
                  }}
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
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: '3px', height: '16px', backgroundColor: 'hsl(148 65% 45%)', borderRadius: '2px' }}></div>
              <h2 className="text-lg font-medium">上传照片</h2>
            </div>
            
            {/* Upload Area - Left and Right sections */}
            <div className="flex gap-4" data-testid="area-upload">
              {/* Left: Outline human image area */}
              <div 
                className="flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-400 transition-colors"
                style={{ marginTop: '12px', marginLeft: '12px', marginBottom: '12px' }}
                onClick={handleUploadClick}
                data-testid="area-outline"
              >
                <div className="w-full h-full flex items-center justify-center min-h-[300px]">
                  <img 
                    src={outlineHuman} 
                    alt="人物轮廓" 
                    className="max-w-full max-h-full object-contain opacity-30"
                    style={{ filter: 'invert(0.5)' }}
                  />
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
        <div style={{ marginTop: '48px', paddingBottom: '32px' }} data-testid="section-button">
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
            {selectedFile ? '点击上传 / 生成' : '点击上传 / 自拍'}
          </Button>
          
          {selectedFile && (
            <p className="text-center text-sm text-gray-500 mt-2" data-testid="text-selected-file">
              已选择: {selectedFile.name}
            </p>
          )}
        </div>

        {/* Fourth div: Footer (same as homepage) */}
        <div 
          className="text-center border-t pt-6" 
          style={{ marginBottom: '24px' }}
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
            <span>|</span>
            <Link 
              href="/children-protection" 
              className="hover:text-primary transition-colors"
              data-testid="link-children-protection"
            >
              儿童保护规则
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}