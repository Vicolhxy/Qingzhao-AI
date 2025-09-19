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
    name: "微信头像"
  }
];

// Gender options
const genderOptions = [
  { id: "male", name: "男性", icon: "♂" },
  { id: "female", name: "女性", icon: "♀" }
];

export default function Home() {
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedCategory, setSelectedCategory] = useState(PhotoCategory.PROFESSIONAL);
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

  // Auto-rotate images every 2.5 seconds with 500ms crossfade transition
  useEffect(() => {
    let intervalRef: NodeJS.Timeout;
    let timeoutRef: NodeJS.Timeout;

    intervalRef = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % allSampleImages.length;
      setNextImageIndex(nextIndex);
      setIsTransitioning(true);
      
      // After 500ms crossfade, swap to the next image
      timeoutRef = setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        setStableImageIndex(nextIndex); // Update stable index after transition
        setIsTransitioning(false);
      }, 500);
    }, 2500);

    return () => {
      clearInterval(intervalRef);
      if (timeoutRef) clearTimeout(timeoutRef);
    };
  }, [currentImageIndex, allSampleImages.length]);

  return (
    <div className="min-h-screen bg-background overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
      <div style={{ marginLeft: '28px', marginRight: '28px' }}>
        
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
            
            {/* Large Sample Photo - Base 212x304, responsive */}
            <div style={{ marginBottom: '12px' }} data-testid="large-sample">
              <div 
                className="w-full bg-gray-100 rounded overflow-hidden relative"
                style={{ aspectRatio: '212/304' }}
              >
                {/* Current image */}
                <img 
                  src={samples.large} 
                  alt="大样片" 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                  style={{ opacity: isTransitioning ? 0 : 1 }}
                />
                {/* Next image for crossfade - always rendered */}
                <img 
                  src={allSampleImages[nextImageIndex]} 
                  alt="大样片" 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out z-10"
                  style={{ opacity: isTransitioning ? 1 : 0 }}
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
                      key={`${stableImageIndex}-${index}`}
                      className="flex-1 bg-gray-100 rounded overflow-hidden relative"
                      style={{ aspectRatio: '1/1.43' }}
                      data-testid={`small-sample-${index + 1}`}
                    >
                      {/* Current small image */}
                      <img 
                        src={sample} 
                        alt={`小样片${index + 1}`} 
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                        style={{ opacity: isTransitioning ? 0 : 1 }}
                      />
                      {/* Next small image for crossfade - always rendered */}
                      <img 
                        src={allSampleImages[nextSmallIndex]} 
                        alt={`小样片${index + 1}`} 
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out z-10"
                        style={{ opacity: isTransitioning ? 1 : 0 }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Call-to-Action Button */}
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

          </div>
        </div>

        {/* Bottom spacing to prevent fixed footer overlap */}
        <div style={{ paddingBottom: '80px' }}></div>
      </div>
      
      {/* Fixed Footer */}
      <div 
        className="fixed left-0 right-0 text-center bg-background" 
        style={{ bottom: '48px', paddingTop: '16px' }}
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