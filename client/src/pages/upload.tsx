import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Camera, Upload as UploadIcon } from "lucide-react";
import { PhotoCategory } from "@shared/schema";

// Category display names
const categoryNames = {
  [PhotoCategory.PROFESSIONAL]: "专业职业照",
  [PhotoCategory.BLACK_WHITE_ART]: "黑白艺术照", 
  [PhotoCategory.ID_PHOTO]: "证件照",
  [PhotoCategory.WECHAT_PORTRAIT]: "微信头像",
};

// Placeholder component for large sample photo
function PhotoPlaceholder({ className }: { className?: string }) {
  return (
    <div 
      className={`bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center h-64 w-48 ${className}`}
      data-testid="large-sample-placeholder"
    >
      <span className="text-gray-500 dark:text-gray-400 text-sm">样品照片</span>
    </div>
  );
}

// Small stacked placeholders
function StackedPlaceholders() {
  return (
    <div className="relative flex justify-center mt-4">
      <div className="absolute h-16 w-14 bg-gray-200 rounded border transform -rotate-12 translate-x-4 translate-y-2" />
      <div className="absolute h-16 w-14 bg-gray-300 rounded border transform rotate-6 -translate-x-2" />
      <div className="h-16 w-14 bg-gray-400 rounded border" data-testid="stacked-placeholders" />
    </div>
  );
}

export default function Upload() {
  const [, setLocation] = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Parse category from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const category = (urlParams.get('category') || PhotoCategory.PROFESSIONAL) as PhotoCategory;
  const categoryName = categoryNames[category];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    // For now, just trigger file picker (camera will be available on mobile)
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'camera');
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          // Navigate to results page after processing
          setTimeout(() => {
            setLocation('/result?category=' + category);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b" data-testid="upload-header">
        <Link to="/">
          <Button variant="ghost" size="icon" data-testid="back-button">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="ml-3 text-lg font-medium" data-testid="category-title">{categoryName}</h1>
      </div>

      <div className="container mx-auto px-3 py-4 max-w-md">
        {/* Large Sample Display */}
        <div className="text-center mb-6">
          <PhotoPlaceholder className="mx-auto mb-4" />
          <StackedPlaceholders />
        </div>

        {/* Upload Section */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6 text-center">
            {!isProcessing ? (
              <>
                {!selectedFile ? (
                  <div>
                    <div className="mb-6">
                      <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <p className="text-muted-foreground mb-4">上传您的照片开始制作</p>
                    </div>
                    
                    <div className="space-y-3">
                      <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={handleUploadClick}
                        data-testid="upload-button"
                      >
                        <UploadIcon className="mr-2 h-4 w-4" />
                        选择照片
                      </Button>
                      
                      <Button
                        size="lg" 
                        variant="outline"
                        className="w-full"
                        onClick={handleCameraClick}
                        data-testid="camera-button"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        拍照
                      </Button>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      data-testid="file-input"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-3">
                        <UploadIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="font-medium mb-1">照片已选择</p>
                      <p className="text-sm text-muted-foreground" data-testid="selected-filename">
                        {selectedFile.name}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={handleSubmit}
                        data-testid="submit-button"
                      >
                        开始制作
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => setSelectedFile(null)}
                        data-testid="reselect-button"
                      >
                        重新选择
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="py-8" data-testid="processing-section">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <h3 className="font-medium mb-2">正在制作中...</h3>
                <p className="text-sm text-muted-foreground mb-4">AI 正在为您生成专业照片</p>
                <Progress value={progress} className="w-full" data-testid="processing-progress" />
                <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="text-center">
          <div className="inline-flex items-center text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            <span data-testid="privacy-notice">请先阅读并同意隐私协议</span>
          </div>
        </div>
      </div>
    </div>
  );
}