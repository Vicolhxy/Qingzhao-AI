import { useState } from "react";
import { useLocation } from "wouter";
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
    name: "专业职业照"
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

  // Sample images based on gender and category
  const getSampleImages = () => {
    // For now, use male samples as default
    return {
      large: sampleMale1,
      small: [sampleMale2, sampleMale3, sampleMale4]
    };
  };

  const samples = getSampleImages();

  return (
    <div className="min-h-screen bg-background">
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
          <div className="flex" style={{ gap: '4px' }}>
            {genderOptions.map((gender) => (
              <button
                key={gender.id}
                onClick={() => setSelectedGender(gender.id)}
                className={`flex-1 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  selectedGender === gender.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{ padding: '12px 16px', gap: '8px' }}
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
                  className={`w-full text-left text-sm border-l-2 transition-colors ${
                    selectedCategory === category.id
                      ? 'border-primary text-primary font-medium bg-primary/5'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                  style={{ padding: '12px' }}
                  data-testid={`category-${category.id}`}
                >
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
                className="w-full bg-gray-100 rounded overflow-hidden"
                style={{ aspectRatio: '212/304' }}
              >
                <img 
                  src={samples.large} 
                  alt="大样片" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Small Sample Photos Row - 24px margin bottom (4px grid: 6 * 4 = 24) */}
            <div style={{ marginBottom: '24px' }} data-testid="small-samples">
              <div 
                className="flex w-full" 
                style={{ gap: '8px' }}
              >
                {samples.small.map((sample, index) => (
                  <div 
                    key={index}
                    className="flex-1 bg-gray-100 rounded overflow-hidden"
                    style={{ aspectRatio: '1/1.43' }}
                    data-testid={`small-sample-${index + 1}`}
                  >
                    <img 
                      src={sample} 
                      alt={`小样片${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
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

        {/* Bottom spacing - 32px (4px grid: 8 * 4 = 32) */}
        <div style={{ paddingBottom: '32px' }}></div>
      </div>
    </div>
  );
}