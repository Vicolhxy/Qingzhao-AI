import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import { PhotoCategory } from "@shared/schema";
import { ID_PHOTO_TYPES, createDefaultConfig, IdPhotoConfig } from "@/data/idPhotoConfig";
import { useState, useEffect } from "react";

// Category display names
const categoryNames = {
  [PhotoCategory.PROFESSIONAL]: "专业职场照",
  [PhotoCategory.BLACK_WHITE_ART]: "黑白艺术照", 
  [PhotoCategory.ID_PHOTO]: "证件照",
  [PhotoCategory.WECHAT_PORTRAIT]: "微信头像",
};

// Typewriter animation component for privacy text
function TypewriterText({ isGenerating }: { isGenerating: boolean }) {
  const text = "在您支付成功并下载照片后，我们会立即删除。我们承诺不会存储或转播您的个人照片，请放心。";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isGenerating) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= text.length) {
          // Reset to start for looping
          setDisplayedText("");
          return 0;
        }
        const newIndex = prevIndex + 1;
        setDisplayedText(text.slice(0, newIndex));
        return newIndex;
      });
    }, 200); // 0.2 seconds per character

    return () => clearInterval(timer);
  }, [isGenerating, text]);

  // Reset when generation stops
  useEffect(() => {
    if (!isGenerating) {
      setDisplayedText("");
      setCurrentIndex(0);
    }
  }, [isGenerating]);

  if (!isGenerating) return null;

  return (
    <div className="text-center mt-4 mb-6">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
}

// Generating photo placeholder with loading animation
function GeneratingPhotoPlaceholder({ index, isGenerating, isCompleted, aspectRatio }: { index: number; isGenerating: boolean; isCompleted: boolean; aspectRatio: string }) {
  const generatingText = `正在生成第${['一', '二', '三', '四'][index]}张...`;
  
  return (
    <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden" style={{ aspectRatio }} data-testid={`generating-photo-${index}`}>
      {/* Photo content */}
      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
        <div className="text-center px-2">
          {!isCompleted ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin text-gray-500 dark:text-gray-400 mx-auto mb-2" />
              <span className="text-gray-500 dark:text-gray-400 text-xs block">{generatingText}</span>
            </>
          ) : (
            <>
              <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-xs block">已完成</span>
            </>
          )}
        </div>
      </div>
      
      {/* Metallic shine animation */}
      {isGenerating && (
        <div className="absolute top-0 bottom-0 left-[-100%] w-1/3 opacity-60">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shine" />
        </div>
      )}
    </div>
  );
}

export default function Generating() {
  const [, setLocation] = useLocation();
  const [generatingStates, setGeneratingStates] = useState([true, true, true, true]);
  const [completedStates, setCompletedStates] = useState([false, false, false, false]);
  const [completedCount, setCompletedCount] = useState(0);
  const [idPhotoConfig, setIdPhotoConfig] = useState<IdPhotoConfig | null>(null);
  
  // Parse category and gender from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const category = (urlParams.get('category') || PhotoCategory.PROFESSIONAL) as PhotoCategory;
  const gender = urlParams.get('gender') || 'male';
  const categoryName = categoryNames[category];
  const isIdPhoto = category === PhotoCategory.ID_PHOTO;
  const aspectRatio = isIdPhoto ? '3/4' : '212/304';

  // Simulate photo generation process
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    
    // Simulate each photo completing at different times
    [3000, 5000, 7000, 9000].forEach((delay, index) => {
      const timeout = setTimeout(() => {
        setGeneratingStates(prev => {
          const newStates = [...prev];
          newStates[index] = false;
          return newStates;
        });
        setCompletedStates(prev => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
        setCompletedCount(prev => prev + 1);
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Redirect to result page when all photos are complete
  useEffect(() => {
    if (completedCount === 4) {
      setTimeout(() => {
        setLocation(`/result?category=${category}&gender=${gender}`);
      }, 1000);
    }
  }, [completedCount, category, gender, setLocation]);
  
  // Load ID photo config from localStorage if available
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
      }
    }
  }, [isIdPhoto, idPhotoConfig]);

  const handleBackToUpload = () => {
    setLocation(`/upload?category=${category}&gender=${gender}`);
  };

  const isGenerating = generatingStates.some(state => state);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b" data-testid="generating-header">
        <Link href="/">
          <Button variant="ghost" size="icon" data-testid="back-button">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="ml-3 flex items-center">
          <h1 className="text-lg font-medium" data-testid="category-title">{categoryName}</h1>
          <Badge variant="secondary" className="ml-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
            生成中
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-5 py-6 max-w-md flex-grow">

        {/* Photo Title */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <div style={{ width: '3px', height: '16px', backgroundColor: 'hsl(148 65% 45%)', borderRadius: '2px' }}></div>
            <h3 className="text-lg font-medium" data-testid="photo-title">生成照片</h3>
            <span className="text-sm text-gray-500 ml-3" data-testid="text-generating-status">
              已完成 {completedCount}/4 张
            </span>
          </div>
        </div>
        
        {/* Results Grid - 2x2 Layout */}
        <div className="grid grid-cols-2 gap-3 mb-6" data-testid="generating-grid">
          {[0, 1, 2, 3].map((index) => (
            <GeneratingPhotoPlaceholder 
              key={index} 
              index={index} 
              isGenerating={generatingStates[index]}
              isCompleted={completedStates[index]}
              aspectRatio={aspectRatio}
            />
          ))}
        </div>

        {/* Typewriter Animation for Privacy Text */}
        <TypewriterText isGenerating={isGenerating} />

        {/* Pricing Section */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">价格</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground line-through">¥99.9</span>
                <span className="text-lg font-bold text-primary">¥19.9</span>
              </div>
            </div>
            
            <Button
              size="lg"
              className="w-full bg-gray-400 hover:bg-gray-400 text-white cursor-not-allowed"
              disabled
              data-testid="generating-button"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              正在生成中，请稍候...
            </Button>
            
            {/* Agreement Notice */}
            <div className="text-center mt-3">
              <p className="text-xs text-muted-foreground">
                生成完成后即可购买下载
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
            onClick={handleBackToUpload}
            data-testid="back-to-upload-button"
          >
            重新上传照片
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