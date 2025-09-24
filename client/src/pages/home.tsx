import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PhotoCategory } from "@shared/schema";

// Import new assets
import bannerImage from "@assets/Banner_1758161866737.png";
import sampleMale1 from "@assets/Sample-Male-1_1758161866744.png";
import sampleMale2 from "@assets/Sample-Male-2_1758161866744.png";
import sampleMale3 from "@assets/Sample-Male-3_1758161866745.png";
import sampleMale4 from "@assets/Sample-Male-4_1758161866744.png";
import wechatMaleImage from "@assets/wechat-male_1758738002915.png";
import wechatFemaleImage from "@assets/wechat-female_1758738002920.png";

// Import WeChat frame images
import wechatFrame1 from "@assets/WechatFrame-1_1758491861092.png";
import wechatFrame2 from "@assets/WechatFrame-2_1758491861090.png";
import wechatFrame3 from "@assets/WechatFrame-3_1758491861092.png";
import wechatFrame4 from "@assets/WechatFrame-4_1758491861090.png";
import wechatFrame5 from "@assets/WechatFrame-5_1758491861091.png";
import wechatFrame6 from "@assets/WechatFrame-6_1758491861088.png";

// Photo categories data
const photoCategories = [
  {
    id: PhotoCategory.PROFESSIONAL,
    name: "专业职场照"
  },
  {
    id: PhotoCategory.BLACK_WHITE_ART, 
    name: "黑白艺术照"
  },
  {
    id: PhotoCategory.ID_PHOTO,
    name: "证件照"
  },
  {
    id: PhotoCategory.WECHAT_PORTRAIT,
    name: "微信头像框"
  }
];

// Gender options
const genderOptions = [
  { id: "male", name: "男性", icon: "♂" },
  { id: "female", name: "女性", icon: "♀" }
];

export default function Home() {
  const [selectedGender, setSelectedGender] = useState("male");
  
  // Read category from URL parameters if available, otherwise default to PROFESSIONAL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get('category') as PhotoCategory | null;
  const initialCategory = categoryFromUrl && Object.values(PhotoCategory).includes(categoryFromUrl) 
    ? categoryFromUrl 
    : PhotoCategory.PROFESSIONAL;
    
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // All sample images in rotation order
  const allSampleImages = [sampleMale1, sampleMale2, sampleMale3, sampleMale4];

  // Keep stable image sources during transitions to prevent flicker
  const [stableImageIndex, setStableImageIndex] = useState(0);
  
  // Sample images based on stable index (only updates after transition completes)
  const getSampleImages = () => {
    const totalImages = allSampleImages.length;
    
    // Current large image uses stable index during transitions
    const large = allSampleImages[stableImageIndex];
    
    // Small images are the next 3 in rotation
    const small = [
      allSampleImages[(stableImageIndex + 1) % totalImages],
      allSampleImages[(stableImageIndex + 2) % totalImages], 
      allSampleImages[(stableImageIndex + 3) % totalImages]
    ];
    
    return { large, small };
  };

  const samples = getSampleImages();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-rotate images every 2.5 seconds with 500ms fade in/out transition
  useEffect(() => {
    let intervalRef: NodeJS.Timeout;
    let timeoutRef: NodeJS.Timeout;

    intervalRef = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % allSampleImages.length;
      
      // Start fade out
      setIsTransitioning(true);
      
      // After 250ms fade out, change image and fade in
      timeoutRef = setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        setStableImageIndex(nextIndex);
        setNextImageIndex((nextIndex + 1) % allSampleImages.length);
        
        // End transition after a brief moment
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 250);
    }, 2500);

    return () => {
      clearInterval(intervalRef);
      if (timeoutRef) clearTimeout(timeoutRef);
    };
  }, [currentImageIndex, allSampleImages.length]);

  return (
    <div className="min-h-screen bg-background overflow-y-auto scrollbar-hide flex flex-col" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* Full-width Banner */}
      <div className="w-full" data-testid="banner-section">
        <img 
          src={bannerImage} 
          alt="专业标准 严选风格" 
          className="w-full h-auto object-cover"
          data-testid="banner-image"
        />
      </div>

      {/* Main Content Container with fixed 28px margins (4px grid: 7 * 4 = 28) */}
      <div className="flex-grow" style={{ marginLeft: '28px', marginRight: '28px' }}>
        
        {/* Gender Selector Section - 24px padding (4px grid: 6 * 4 = 24) */}
        <div style={{ paddingTop: '24px', paddingBottom: '24px' }} data-testid="gender-selector">
          <div 
            className="flex border rounded-full overflow-hidden"
            style={{ 
              borderColor: '#E5E7EB',
              borderWidth: '1px'
            }}
          >
            {genderOptions.map((gender) => (
              <button
                key={gender.id}
                onClick={() => setSelectedGender(gender.id)}
                className={`flex-1 flex items-center justify-center text-sm font-medium transition-colors ${
                  selectedGender === gender.id
                    ? (gender.id === 'male' ? 'text-blue-600' : 'text-pink-600')
                    : 'text-gray-600'
                }`}
                style={{ 
                  padding: '10px 16px', 
                  gap: '8px',
                  backgroundColor: selectedGender === gender.id 
                    ? (gender.id === 'male' ? '#DBEAFE' : '#FCE7F3') 
                    : 'transparent'
                }}
                data-testid={`gender-${gender.id}`}
              >
                <span className="text-base">{gender.icon}</span>
                <span>{gender.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Section - Left Nav + Right Content - 16px gap (4px grid: 4 * 4 = 16) */}
        <div className="flex" style={{ gap: '16px' }}>
          
          {/* Left Navigation - Fixed 114px width */}
          <div className="flex-shrink-0" style={{ width: '114px' }} data-testid="category-nav">
            <div className="flex flex-col" style={{ gap: '4px' }}>
              {photoCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'text-primary font-medium'
                      : 'text-gray-600'
                  }`}
                  style={{ 
                    padding: '12px',
                    position: 'relative'
                  }}
                  data-testid={`category-${category.id}`}
                >
                  {selectedCategory === category.id && (
                    <div 
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '4px',
                        height: '60%',
                        backgroundColor: 'hsl(148 65% 45%)',
                        borderRadius: '0 2px 2px 0'
                      }}
                    />
                  )}
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area - Responsive */}
          <div className="flex-1 min-w-0 w-full max-w-[300px]" data-testid="content-area">
            
            {selectedCategory === PhotoCategory.WECHAT_PORTRAIT ? (
              /* WeChat Portrait Grid - 2x3 layout */
              <div style={{ marginBottom: '24px' }} data-testid="wechat-grid">
                <div className="grid grid-cols-2" style={{ gap: '15px' }}>
                  
                  {/* 样品1 */}
                  <div className="flex flex-col items-center" data-testid="wechat-frame-1">
                    {/* Avatar with frame overlay */}
                    <div 
                      className="relative bg-gray-100 overflow-hidden mb-2"
                      style={{ 
                        borderRadius: '8px',
                        width: 'clamp(80px, 94px, 94px)',
                        height: 'clamp(80px, 94px, 94px)',
                        aspectRatio: '1 / 1'
                      }}
                    >
                      {/* Base avatar image */}
                      <img 
                        src={selectedGender === 'male' ? wechatMaleImage : wechatFemaleImage} 
                        alt="头像底图1" 
                        className="w-full h-full object-cover"
                      />
                      {/* Frame overlay */}
                      <img 
                        src={wechatFrame1} 
                        alt="微信头像框1" 
                        className="absolute inset-0 w-full h-full object-fill"
                      />
                    </div>
                    
                    {/* "做同款" button */}
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1 rounded-lg"
                      style={{ width: 'clamp(80px, 94px, 94px)' }}
                      onClick={() => setLocation(`/upload?category=${PhotoCategory.WECHAT_PORTRAIT}&frameIndex=0&gender=${selectedGender}`)}
                      data-testid="button-make-same-1"
                    >
                      做同款
                    </Button>
                  </div>

                  {/* 样品2 */}
                  <div className="flex flex-col items-center" data-testid="wechat-frame-2">
                    {/* Avatar with frame overlay */}
                    <div 
                      className="relative bg-gray-100 overflow-hidden mb-2"
                      style={{ 
                        borderRadius: '8px',
                        width: 'clamp(80px, 94px, 94px)',
                        height: 'clamp(80px, 94px, 94px)',
                        aspectRatio: '1 / 1'
                      }}
                    >
                      {/* Base avatar image */}
                      <img 
                        src={selectedGender === 'male' ? wechatMaleImage : wechatFemaleImage} 
                        alt="头像底图2" 
                        className="w-full h-full object-cover"
                      />
                      {/* Frame overlay */}
                      <img 
                        src={wechatFrame2} 
                        alt="微信头像框2" 
                        className="absolute inset-0 w-full h-full object-fill"
                      />
                    </div>
                    
                    {/* "做同款" button */}
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1 rounded-lg"
                      style={{ width: 'clamp(80px, 94px, 94px)' }}
                      onClick={() => setLocation(`/upload?category=${PhotoCategory.WECHAT_PORTRAIT}&frameIndex=1&gender=${selectedGender}`)}
                      data-testid="button-make-same-2"
                    >
                      做同款
                    </Button>
                  </div>

                  {/* 样品3 */}
                  <div className="flex flex-col items-center" data-testid="wechat-frame-3">
                    {/* Avatar with frame overlay */}
                    <div 
                      className="relative bg-gray-100 overflow-hidden mb-2"
                      style={{ 
                        borderRadius: '8px',
                        width: 'clamp(80px, 94px, 94px)',
                        height: 'clamp(80px, 94px, 94px)',
                        aspectRatio: '1 / 1'
                      }}
                    >
                      {/* Base avatar image */}
                      <img 
                        src={selectedGender === 'male' ? wechatMaleImage : wechatFemaleImage} 
                        alt="头像底图3" 
                        className="w-full h-full object-cover"
                      />
                      {/* Frame overlay */}
                      <img 
                        src={wechatFrame3} 
                        alt="微信头像框3" 
                        className="absolute inset-0 w-full h-full object-fill"
                      />
                    </div>
                    
                    {/* "做同款" button */}
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1 rounded-lg"
                      style={{ width: 'clamp(80px, 94px, 94px)' }}
                      onClick={() => setLocation(`/upload?category=${PhotoCategory.WECHAT_PORTRAIT}&frameIndex=2&gender=${selectedGender}`)}
                      data-testid="button-make-same-3"
                    >
                      做同款
                    </Button>
                  </div>

                  {/* 样品4 */}
                  <div className="flex flex-col items-center" data-testid="wechat-frame-4">
                    {/* Avatar with frame overlay */}
                    <div 
                      className="relative bg-gray-100 overflow-hidden mb-2"
                      style={{ 
                        borderRadius: '8px',
                        width: 'clamp(80px, 94px, 94px)',
                        height: 'clamp(80px, 94px, 94px)',
                        aspectRatio: '1 / 1'
                      }}
                    >
                      {/* Base avatar image */}
                      <img 
                        src={selectedGender === 'male' ? wechatMaleImage : wechatFemaleImage} 
                        alt="头像底图4" 
                        className="w-full h-full object-cover"
                      />
                      {/* Frame overlay */}
                      <img 
                        src={wechatFrame4} 
                        alt="微信头像框4" 
                        className="absolute inset-0 w-full h-full object-fill"
                      />
                    </div>
                    
                    {/* "做同款" button */}
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1 rounded-lg"
                      style={{ width: 'clamp(80px, 94px, 94px)' }}
                      onClick={() => setLocation(`/upload?category=${PhotoCategory.WECHAT_PORTRAIT}&frameIndex=3&gender=${selectedGender}`)}
                      data-testid="button-make-same-4"
                    >
                      做同款
                    </Button>
                  </div>

                  {/* 样品5 */}
                  <div className="flex flex-col items-center" data-testid="wechat-frame-5">
                    {/* Avatar with frame overlay */}
                    <div 
                      className="relative bg-gray-100 overflow-hidden mb-2"
                      style={{ 
                        borderRadius: '8px',
                        width: 'clamp(80px, 94px, 94px)',
                        height: 'clamp(80px, 94px, 94px)',
                        aspectRatio: '1 / 1'
                      }}
                    >
                      {/* Base avatar image */}
                      <img 
                        src={selectedGender === 'male' ? wechatMaleImage : wechatFemaleImage} 
                        alt="头像底图5" 
                        className="w-full h-full object-cover"
                      />
                      {/* Frame overlay */}
                      <img 
                        src={wechatFrame5} 
                        alt="微信头像框5" 
                        className="absolute inset-0 w-full h-full object-fill"
                      />
                    </div>
                    
                    {/* "做同款" button */}
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1 rounded-lg"
                      style={{ width: 'clamp(80px, 94px, 94px)' }}
                      onClick={() => setLocation(`/upload?category=${PhotoCategory.WECHAT_PORTRAIT}&frameIndex=4&gender=${selectedGender}`)}
                      data-testid="button-make-same-5"
                    >
                      做同款
                    </Button>
                  </div>

                  {/* 样品6 */}
                  <div className="flex flex-col items-center" data-testid="wechat-frame-6">
                    {/* Avatar with frame overlay */}
                    <div 
                      className="relative bg-gray-100 overflow-hidden mb-2"
                      style={{ 
                        borderRadius: '8px',
                        width: 'clamp(80px, 94px, 94px)',
                        height: 'clamp(80px, 94px, 94px)',
                        aspectRatio: '1 / 1'
                      }}
                    >
                      {/* Base avatar image */}
                      <img 
                        src={selectedGender === 'male' ? wechatMaleImage : wechatFemaleImage} 
                        alt="头像底图6" 
                        className="w-full h-full object-cover"
                      />
                      {/* Frame overlay */}
                      <img 
                        src={wechatFrame6} 
                        alt="微信头像框6" 
                        className="absolute inset-0 w-full h-full object-fill"
                      />
                    </div>
                    
                    {/* "做同款" button */}
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1 rounded-lg"
                      style={{ width: 'clamp(80px, 94px, 94px)' }}
                      onClick={() => setLocation(`/upload?category=${PhotoCategory.WECHAT_PORTRAIT}&frameIndex=5&gender=${selectedGender}`)}
                      data-testid="button-make-same-6"
                    >
                      做同款
                    </Button>
                  </div>

                </div>
              </div>
            ) : (
              <>
                {/* Default layout for other categories */}
                {/* Large Sample Photo - Base 212x304, responsive */}
                <div style={{ marginBottom: '12px' }} data-testid="large-sample">
                  <div 
                    className="w-full bg-gray-100 rounded overflow-hidden relative"
                    style={{ aspectRatio: selectedCategory === PhotoCategory.ID_PHOTO ? '3/4' : '212/304' }}
                  >
                    <img 
                      src={samples.large} 
                      alt="大样片" 
                      className="w-full h-full object-cover transition-opacity duration-300"
                      style={{ 
                        opacity: isTransitioning ? 0.3 : 1,
                        transitionTimingFunction: 'ease-in-out'
                      }}
                    />
                  </div>
                </div>

                {/* Small Sample Photos Row - 24px margin bottom (4px grid: 6 * 4 = 24) */}
                <div style={{ marginBottom: '24px' }} data-testid="small-samples">
                  <div 
                    className="flex w-full" 
                    style={{ gap: '8px' }}
                  >
                    {samples.small.map((sample, index) => {
                      const nextSmallIndex = (stableImageIndex + index + 2) % allSampleImages.length;
                      return (
                        <div 
                          key={`small-${index}`}
                          className="flex-1 bg-gray-100 rounded overflow-hidden relative"
                          style={{ aspectRatio: selectedCategory === PhotoCategory.ID_PHOTO ? '3/4' : '1/1.43' }}
                          data-testid={`small-sample-${index + 1}`}
                        >
                          <img 
                            src={sample} 
                            alt={`小样片${index + 1}`} 
                            className="w-full h-full object-cover transition-opacity duration-300"
                            style={{ 
                              opacity: isTransitioning ? 0.3 : 1,
                              transitionTimingFunction: 'ease-in-out'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Call-to-Action Button - Hide for WeChat Portrait */}
            {selectedCategory !== PhotoCategory.WECHAT_PORTRAIT && (
              <div data-testid="cta-section">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full"
                  style={{ 
                    width: '100%', 
                    padding: '12px 0' 
                  }}
                  onClick={() => setLocation(`/upload?category=${selectedCategory}&gender=${selectedGender}`)}
                  data-testid="cta-button"
                >
                  我也要同款 (4张)
                </Button>
              </div>
            )}

          </div>
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