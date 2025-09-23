import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ArrowLeft, User, Sun, Building, X, ChevronDown } from "lucide-react";
import { PhotoCategory } from "@shared/schema";
import { ID_PHOTO_TYPES, BACKGROUND_COLORS, DPI_OPTIONS, IdPhotoConfig, createDefaultConfig, updateIdPhotoConfig, IdPhotoType } from "@/data/idPhotoConfig";

// Import sample images (same as home page)
import sampleMale1 from "@assets/Sample-Male-1_1758161866744.png";
import sampleMale2 from "@assets/Sample-Male-2_1758161866744.png";
import sampleMale3 from "@assets/Sample-Male-3_1758161866745.png";
import sampleMale4 from "@assets/Sample-Male-4_1758161866744.png";

// Import outline human image
import outlineHuman from "@assets/Outline-human_1758207634258.png";
import wechatTestImage from "@assets/Wechat-test_1758491664457.png";

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

export default function Upload() {
  const [, setLocation] = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [aigcModalOpen, setAigcModalOpen] = useState(false);
  const [wechatPermissionModalOpen, setWechatPermissionModalOpen] = useState(false);
  const [idPhotoConfig, setIdPhotoConfig] = useState<IdPhotoConfig | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});
  
  // Bottom sheet states for ID photo parameter selectors
  const [photoTypeSheetOpen, setPhotoTypeSheetOpen] = useState(false);
  const [sizeSheetOpen, setSizeSheetOpen] = useState(false);
  const [dpiSheetOpen, setDpiSheetOpen] = useState(false);
  const [backgroundSheetOpen, setBackgroundSheetOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Parse category and gender from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const category = (urlParams.get('category') || PhotoCategory.PROFESSIONAL) as PhotoCategory;
  const gender = urlParams.get('gender') || 'male';
  const frameIndex = parseInt(urlParams.get('frameIndex') || '0', 10);
  const openModal = urlParams.get('openModal');
  const categoryName = categoryNames[category];
  
  // WeChat frame images array
  const wechatFrames = [wechatFrame1, wechatFrame2, wechatFrame3, wechatFrame4, wechatFrame5, wechatFrame6];
  const selectedWechatFrame = wechatFrames[frameIndex] || wechatFrame1;

  // Category flags
  const isIdPhoto = category === PhotoCategory.ID_PHOTO;
  const isWechatPortrait = category === PhotoCategory.WECHAT_PORTRAIT;

  // Check if we should open modals (returning from terms/privacy pages)
  useEffect(() => {
    if (openModal === 'wechatPermission' && isWechatPortrait) {
      setWechatPermissionModalOpen(true);
      // Clean up the URL by removing the openModal parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('openModal');
      window.history.replaceState({}, '', newUrl.toString());
    } else if (openModal === 'aigc') {
      setAigcModalOpen(true);
      // Clean up the URL by removing the openModal parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('openModal');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [openModal, isWechatPortrait]);

  // Sample images (using same as home page)
  const sampleImages = [sampleMale1, sampleMale2, sampleMale3, sampleMale4];
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Initialize ID photo config with default values
  useEffect(() => {
    if (category === PhotoCategory.ID_PHOTO && !idPhotoConfig) {
      const defaultType = ID_PHOTO_TYPES[0];
      setIdPhotoConfig(createDefaultConfig(defaultType));
    }
  }, [category, idPhotoConfig]);

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
      
      // Store the uploaded image in sessionStorage for result page access
      sessionStorage.setItem('uploadedImage', imageUrl);
      sessionStorage.setItem('uploadedImageFile', JSON.stringify({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      // Only navigate to result page immediately for WeChat portraits
      if (isWechatPortrait) {
        const params = new URLSearchParams();
        params.set('category', category);
        params.set('gender', gender);
        params.set('frameIndex', frameIndex.toString());
        setLocation(`/result?${params.toString()}`);
      }
      // For other photo types, stay on upload page to show uploaded photo and generate button
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Validate custom ID photo fields if it's a custom type
      if (isIdPhoto && idPhotoConfig && idPhotoConfig.type === '自定义') {
        const errors: { [key: string]: boolean } = {};
        
        if (idPhotoConfig.size_mm.width === 0) {
          errors['width'] = true;
        }
        if (idPhotoConfig.size_mm.height === 0) {
          errors['height'] = true;
        }
        
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          return;
        }
      }
      
      // Clear any existing validation errors
      setValidationErrors({});
      
      // Show AIGC service agreement modal first
      setAigcModalOpen(true);
    }
  };

  const handleAigcAgreement = () => {
    setAigcModalOpen(false);
    
    // Store ID photo config in localStorage if it's an ID photo
    if (isIdPhoto && idPhotoConfig) {
      localStorage.setItem('idPhotoConfig', JSON.stringify(idPhotoConfig));
    }
    
    // Navigate to generating page for AI processing (except WeChat portraits which go directly to result)
    if (isWechatPortrait) {
      setLocation(`/result?category=${category}&gender=${gender}&frameIndex=${frameIndex}`);
    } else {
      setLocation(`/generating?category=${category}&gender=${gender}`);
    }
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setDialogOpen(true);
  };
  
  // ID Photo config handlers
  const handlePhotoTypeChange = (typeName: string) => {
    const selectedType = ID_PHOTO_TYPES.find(type => type.name === typeName);
    if (selectedType) {
      // Clear validation errors when changing type
      setValidationErrors({});
      
      if (typeName === '自定义') {
        // For custom type, create empty config with placeholders
        setIdPhotoConfig({
          type: '自定义',
          size_mm: { width: 0, height: 0 },
          dpi: 300,
          background_color: '#FFFFFF',
          pixels: { width: 0, height: 0 },
          file_size_kb: 0
        });
      } else {
        setIdPhotoConfig(createDefaultConfig(selectedType));
      }
    }
  };
  
  const handleConfigChange = (field: string, value: string | number) => {
    if (!idPhotoConfig) return;
    
    let newConfig = { ...idPhotoConfig };
    
    switch (field) {
      case 'size':
        const [width, height] = (value as string).split('x').map(Number);
        newConfig = updateIdPhotoConfig(
          idPhotoConfig.type,
          { width, height },
          idPhotoConfig.dpi,
          idPhotoConfig.background_color
        );
        break;
      case 'width':
        newConfig = updateIdPhotoConfig(
          idPhotoConfig.type,
          { width: Number(value), height: idPhotoConfig.size_mm.height },
          idPhotoConfig.dpi,
          idPhotoConfig.background_color
        );
        break;
      case 'height':
        newConfig = updateIdPhotoConfig(
          idPhotoConfig.type,
          { width: idPhotoConfig.size_mm.width, height: Number(value) },
          idPhotoConfig.dpi,
          idPhotoConfig.background_color
        );
        break;
      case 'dpi':
        newConfig = updateIdPhotoConfig(
          idPhotoConfig.type,
          idPhotoConfig.size_mm,
          Number(value),
          idPhotoConfig.background_color
        );
        break;
      case 'background_color':
        newConfig = updateIdPhotoConfig(
          idPhotoConfig.type,
          idPhotoConfig.size_mm,
          idPhotoConfig.dpi,
          value as string
        );
        break;
    }
    
    setIdPhotoConfig(newConfig);
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
    <div className="min-h-screen bg-background overflow-y-auto scrollbar-hide flex flex-col" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* Header */}
      <div className="flex items-center p-4 border-b" data-testid="upload-header">
        <Link href={`/?category=${category}`}>
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="ml-3 text-lg font-medium" data-testid="text-category-title">{categoryName}</h1>
      </div>
      {/* Main Content Container with fixed 20px margins */}
      <div className="flex-grow" style={{ marginLeft: '20px', marginRight: '20px' }}>
        
        {/* First div: Sample Photos Display */}
        <div style={{ paddingTop: '24px', paddingBottom: '24px' }} data-testid="section-samples">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: '3px', height: '16px', backgroundColor: 'hsl(148 65% 45%)', borderRadius: '2px' }}></div>
              <h2 className="text-lg font-medium">样片展示</h2>
            </div>
            
            {/* Sample Photos Display */}
            {isWechatPortrait ? (
              <>
                {/* WeChat Portrait - Single large sample */}
              <div className="flex justify-center" data-testid="wechat-sample">
                <div 
                  className="relative bg-gray-100 rounded-lg overflow-hidden"
                  style={{ 
                    width: '300px',
                    height: '300px',
                    aspectRatio: '1 / 1'
                  }}
                >
                  {/* Base avatar image */}
                  <img 
                    src={wechatTestImage} 
                    alt="微信头像框样片" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* Frame overlay */}
                  <img 
                    src={selectedWechatFrame} 
                    alt="选中的微信头像框" 
                    className="absolute inset-0 w-full h-full object-fill rounded-lg"
                  />
                </div>
              </div>
              
              {/* WeChat Portrait Preview - Frame + Avatar combination display */}
              <div className="flex justify-center mt-6" data-testid="wechat-preview">
                <div 
                  className="flex items-center justify-between"
                  style={{ width: '300px' }}
                >
                  {/* Selected WeChat Frame */}
                  <div 
                    className="bg-gray-100 overflow-hidden"
                    style={{ 
                      width: '110px',
                      height: '110px',
                      aspectRatio: '1 / 1',
                      borderRadius: '8px'
                    }}
                  >
                    <img 
                      src={selectedWechatFrame} 
                      alt="选中的头像框" 
                      className="w-full h-full object-fill"
                    />
                  </div>
                  
                  {/* Plus Sign */}
                  <div className="text-gray-400 text-2xl font-bold">+</div>
                  
                  {/* User Avatar Placeholder */}
                  <div 
                    className="border-2 border-dashed border-gray-300 flex items-center justify-center"
                    style={{ 
                      width: '110px',
                      height: '110px',
                      borderRadius: '8px'
                    }}
                  >
                    <span className="text-base text-gray-500 text-center leading-tight">
                      您的<br />微信头像
                    </span>
                  </div>
                </div>
              </div>
              </>
            ) : (
              /* Other categories - 4 Sample Photos Horizontal Strip */
              (<div className="flex flex-nowrap gap-[6px]" data-testid="grid-samples">
                {sampleImages.map((sample, index) => (
                  <div 
                    key={index}
                    className="flex-1 bg-gray-100 rounded-[6px] overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                    style={{ 
                      aspectRatio: isIdPhoto ? '3 / 4' : '86 / 126' 
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
              </div>)
            )}
          </div>
        </div>

        {/* Second div: Upload Photo Area or WeChat Action Buttons */}
        <div data-testid="section-upload">
          {isWechatPortrait ? (
            /* WeChat Portrait - Action Buttons */
            (<div className="space-y-4" data-testid="wechat-actions">
              {/* Main Action Button */}
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full"
                style={{ padding: '16px 0', fontSize: '16px' }}
                onClick={() => setWechatPermissionModalOpen(true)}
                data-testid="button-wechat-one-click"
              >
                一键做同款
              </Button>
              {/* Alternative Upload Option */}
              <div className="text-center space-y-2">
                <div className="text-sm text-gray-500">或者</div>
                <button
                  className="text-primary text-sm hover:text-primary/80 transition-colors underline"
                  onClick={handleUploadClick}
                  data-testid="button-wechat-upload"
                >
                  点击上传/拍照
                </button>
              </div>
              {/* Generate Button - Only show when file is selected for WeChat portraits */}
              {selectedFile && (
                <div className="mt-4">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full"
                    style={{ padding: '12px 0' }}
                    onClick={handleSubmit}
                    data-testid="button-wechat-generate"
                  >
                    开始生成我的头像（4张）
                  </Button>
                </div>
              )}
            </div>)
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: '3px', height: '16px', backgroundColor: 'hsl(148 65% 45%)', borderRadius: '2px' }}></div>
                <h2 className="text-lg font-medium">上传照片</h2>
              </div>
              
              {/* Upload Area - Left and Right sections */}
          <div className="flex gap-4" data-testid="area-upload" style={{ backgroundColor: '#F9F9F9', padding: '16px', borderRadius: '8px' }}>
            {/* Left: Photo display area */}
            <div 
              className={`bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-400 transition-colors ${isIdPhoto ? '' : 'flex-1'}`}
              onClick={handleUploadClick}
              data-testid="area-photo"
              style={isIdPhoto ? { width: '171px', height: '228px' } : { aspectRatio: '86 / 126' }}
            >
              <div className="w-full h-full flex items-center justify-center">
                {uploadedImageUrl ? (
                  <img 
                    src={uploadedImageUrl} 
                    alt="已上传照片" 
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  isIdPhoto ? (
                    <div className="text-gray-400 text-center">
                      <span className="text-sm">点击上传 / 拍照</span>
                    </div>
                  ) : (
                    <img 
                      src={outlineHuman} 
                      alt="人物轮廓" 
                      className="max-w-full max-h-full object-contain opacity-30"
                      style={{ filter: 'invert(0.5)' }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Right: Photo tips */}
            <div className="w-32 flex flex-col justify-center" data-testid="area-tips">
              {isIdPhoto ? (
                <div className="space-y-4">
                  <div className="text-left pt-[8px] pb-[8px]">
                    <h3 className="text-sm font-medium text-gray-800 mb-2 whitespace-nowrap">请<span className="text-red-500">不要</span>穿戴</h3>
                    <p className="text-gray-600 whitespace-nowrap text-[13px]">帽子、墨镜、围巾等</p>
                  </div>
                  <div className="text-left pt-[8px] pb-[8px]">
                    <h3 className="text-sm font-medium text-gray-800 mb-2 whitespace-nowrap">请尽量确保</h3>
                    <p className="text-gray-600 whitespace-nowrap text-[13px]">光线充足，背景简单</p>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
              </div>
            </>
          )}
        </div>
        
        {/* ID Photo Parameters Section - Only show for ID photos after upload */}
        {isIdPhoto && selectedFile && idPhotoConfig && (
          <div style={{ marginTop: '24px' }} data-testid="section-id-config">
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: '3px', height: '16px', backgroundColor: 'hsl(148 65% 45%)', borderRadius: '2px' }}></div>
              <h2 className="text-lg font-medium">证件照参数</h2>
            </div>
            
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              {/* Photo Type Selector */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">证件照类型</span>
                <Button
                  variant="outline"
                  className="w-44 justify-between h-10 px-3 py-2"
                  onClick={() => setPhotoTypeSheetOpen(true)}
                  data-testid="button-photo-type"
                >
                  <span className="text-sm">{idPhotoConfig.type}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </div>
              
              {/* Size Selector */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">尺寸(mm)</span>
                <Button
                  variant="outline"
                  className={`w-44 justify-between h-10 px-3 py-2 ${
                    validationErrors.width || validationErrors.height ? 'border-red-500' : ''
                  }`}
                  onClick={() => setSizeSheetOpen(true)}
                  data-testid="button-size"
                >
                  <span className="text-sm">
                    {idPhotoConfig.size_mm.width === 0 || idPhotoConfig.size_mm.height === 0
                      ? '请选择'
                      : `${idPhotoConfig.size_mm.width}×${idPhotoConfig.size_mm.height}`
                    }
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </div>
              
              {/* DPI Selector */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">分辨率(DPI)</span>
                <Button
                  variant="outline"
                  className="w-44 justify-between h-10 px-3 py-2"
                  onClick={() => setDpiSheetOpen(true)}
                  data-testid="button-dpi"
                >
                  <span className="text-sm">{idPhotoConfig.dpi}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </div>
              
              {/* Background Color Selector */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">背景色</span>
                <Button
                  variant="outline"
                  className="w-44 justify-between h-10 px-3 py-2"
                  onClick={() => setBackgroundSheetOpen(true)}
                  data-testid="button-background"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {Object.entries(BACKGROUND_COLORS).find(([_, color]) => color === idPhotoConfig.background_color)?.[0] === 'white'
                        ? '白色'
                        : Object.entries(BACKGROUND_COLORS).find(([_, color]) => color === idPhotoConfig.background_color)?.[0] === 'blue'
                        ? '蓝色'
                        : '红色'
                      }
                    </span>
                    <div className="w-4 h-4 rounded border" style={{ backgroundColor: idPhotoConfig.background_color }}></div>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </div>
              
              {/* Calculated Values */}
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">像素及文件大小</span>
                  <span className="font-mono">{idPhotoConfig.pixels.width}×{idPhotoConfig.pixels.height}px, 约{idPhotoConfig.file_size_kb}KB</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          data-testid="input-file"
        />

        {/* WeChat Permission Modal */}
        <Sheet open={wechatPermissionModalOpen} onOpenChange={setWechatPermissionModalOpen}>
          <SheetContent side="bottom" className="rounded-t-xl border-0 p-0">
            <div className="px-6 pt-6 pb-0">
              <SheetTitle className="text-lg font-semibold mb-4 text-center">获取权限</SheetTitle>
              <SheetDescription className="sr-only">WeChat permission request</SheetDescription>
              
              <div className="text-sm text-gray-700 leading-relaxed mb-8 text-left">
                为了生成您的微信头像框，我们需要获取您的微信头像。<br/>
                请确认是否同意使用您的头像信息。<br/>
                点击"同意"即表示您已阅读并同意
                <Link href={`/terms?returnTo=/upload&category=${category}&frameIndex=${frameIndex}&openModal=wechatPermission`} className="font-bold text-primary underline mx-1">《用户服务协议》</Link>
                和
                <Link href={`/privacy?returnTo=/upload&category=${category}&frameIndex=${frameIndex}&openModal=wechatPermission`} className="font-bold text-primary underline mx-1">《隐私政策》</Link>
                。
              </div>
              
              <div style={{ paddingBottom: '48px' }} className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full"
                  onClick={() => {
                    setWechatPermissionModalOpen(false);
                    setLocation(`/result?category=${category}&gender=${gender}&frameIndex=${frameIndex}`);
                  }}
                  data-testid="button-agree"
                  style={{ 
                    padding: '12px 0' 
                  }}
                >
                  同意并继续
                </Button>
                
                <div className="text-center">
                  <button
                    className="text-primary text-sm hover:text-primary/80 transition-colors"
                    onClick={() => setWechatPermissionModalOpen(false)}
                    data-testid="button-disagree"
                  >
                    不同意
                  </button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Third div: Button (24px gap from ID config, 48px from upload area) - Hidden for WeChat portraits */}
        {!isWechatPortrait && (
          <div style={{ marginTop: isIdPhoto && selectedFile && idPhotoConfig ? '24px' : '48px' }} data-testid="section-button">
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
              {selectedFile ? (
                isIdPhoto ? '开始生成我的证件照（4张）' : '开始生成我的照片（4张）'
              ) : '点击上传 / 拍照'}
            </Button>
          </div>
        )}

        
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
      <Sheet open={aigcModalOpen} onOpenChange={setAigcModalOpen}>
        <SheetContent side="bottom" className="rounded-t-xl border-0 p-0">
          <div className="px-6 pt-6 pb-0">
            <SheetTitle className="text-lg font-semibold mb-4 text-center" data-testid="text-aigc-title">
              AIGC服务协议
            </SheetTitle>
            
            <SheetDescription className="sr-only">
              AIGC服务协议说明
            </SheetDescription>
            
            <div className="text-sm text-gray-700 leading-relaxed mb-8" data-testid="text-aigc-content">
              <p>
                欢迎使用轻照AI，您将上传照片用于AIGC服务，您需要在取得照片权利人的同意后再进行操作。
                <span className="font-bold">您上传的照片仅用于制作AI生图，不会被存储、传播或用于其他用途，</span>
                相关规则请您仔细阅读
                <Link href={`/terms?returnTo=/upload&category=${category}&frameIndex=${frameIndex}&openModal=aigc`} className="font-bold text-primary underline mx-1">《用户服务协议》</Link>
                和
                <Link href={`/privacy?returnTo=/upload&category=${category}&frameIndex=${frameIndex}&openModal=aigc`} className="font-bold text-primary underline mx-1">《隐私政策》</Link>
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
        </SheetContent>
      </Sheet>

      {/* Photo Type Bottom Sheet */}
      <Sheet open={photoTypeSheetOpen} onOpenChange={setPhotoTypeSheetOpen}>
        <SheetContent 
          side="bottom" 
          className="rounded-t-xl border-0 p-0 max-h-[80vh] overflow-hidden"
        >
          <div className="px-6 pt-6">
            <SheetTitle className="text-lg font-semibold mb-4 text-center">
              选择证件照类型
            </SheetTitle>
            <SheetDescription className="sr-only">选择证件照类型</SheetDescription>
            
            <div 
              className="overflow-y-auto scrollbar-hide"
              style={{ 
                maxHeight: 'calc(80vh - 120px)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div className="space-y-1">
                {ID_PHOTO_TYPES.map((type) => (
                  <button
                    key={type.name}
                    onClick={() => {
                      handlePhotoTypeChange(type.name);
                      setPhotoTypeSheetOpen(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      idPhotoConfig?.type === type.name
                        ? 'bg-primary/10 text-primary border border-primary'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                    data-testid={`option-photo-type-${type.name}`}
                  >
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ paddingBottom: '32px' }} className="pt-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setPhotoTypeSheetOpen(false)}
              >
                取消
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Size Bottom Sheet */}
      <Sheet open={sizeSheetOpen} onOpenChange={setSizeSheetOpen}>
        <SheetContent 
          side="bottom" 
          className="rounded-t-xl border-0 p-0 max-h-[80vh] overflow-hidden"
        >
          <div className="px-6 pt-6">
            <SheetTitle className="text-lg font-semibold mb-4 text-center">
              选择尺寸
            </SheetTitle>
            <SheetDescription className="sr-only">选择证件照尺寸</SheetDescription>
            
            <div 
              className="overflow-y-auto scrollbar-hide"
              style={{ 
                maxHeight: 'calc(80vh - 120px)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div className="space-y-4">
                {/* Common sizes */}
                <div>
                  <h3 className="text-xs text-gray-500 mb-2 font-medium">常用尺寸</h3>
                  <div className="space-y-1">
                    {[
                      { w: 26, h: 32, name: '身份证' },
                      { w: 25, h: 35, name: '一寸证件照' },
                      { w: 22, h: 32, name: '小一寸' },
                      { w: 33, h: 48, name: '大一寸' },
                      { w: 35, h: 49, name: '二寸证件照' },
                      { w: 33, h: 48, name: '护照照片' }
                    ].map((size, index) => {
                      const sizeValue = `${size.w}x${size.h}`;
                      const currentValue = idPhotoConfig && idPhotoConfig.size_mm.width !== 0 && idPhotoConfig.size_mm.height !== 0 
                        ? `${idPhotoConfig.size_mm.width}x${idPhotoConfig.size_mm.height}` 
                        : '';
                      
                      return (
                        <button
                          key={`common-${sizeValue}-${index}`}
                          onClick={() => {
                            handleConfigChange('size', sizeValue);
                            setSizeSheetOpen(false);
                          }}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            currentValue === sizeValue
                              ? 'bg-primary/10 text-primary border border-primary'
                              : 'hover:bg-gray-50 border border-transparent'
                          }`}
                          data-testid={`option-size-${sizeValue}`}
                        >
                          <span className="text-sm font-medium">
                            {size.w}×{size.h} ({size.name})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Custom sizes */}
                <div>
                  <h3 className="text-xs text-gray-500 mb-2 font-medium">自定义尺寸</h3>
                  <div className="space-y-1">
                    {[20, 22, 25, 26, 30, 33, 35, 40].flatMap(width =>
                      [25, 30, 32, 35, 40, 45, 48, 49, 50].map(height => `${width}x${height}`)
                    ).filter((size, index, self) => 
                      self.indexOf(size) === index &&
                      !['26x32', '25x35', '22x32', '33x48', '35x49'].includes(size)
                    ).map((size) => {
                      const currentValue = idPhotoConfig && idPhotoConfig.size_mm.width !== 0 && idPhotoConfig.size_mm.height !== 0 
                        ? `${idPhotoConfig.size_mm.width}x${idPhotoConfig.size_mm.height}` 
                        : '';
                      
                      return (
                        <button
                          key={`custom-${size}`}
                          onClick={() => {
                            handleConfigChange('size', size);
                            setSizeSheetOpen(false);
                          }}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            currentValue === size
                              ? 'bg-primary/10 text-primary border border-primary'
                              : 'hover:bg-gray-50 border border-transparent'
                          }`}
                          data-testid={`option-size-${size}`}
                        >
                          <span className="text-sm font-medium">
                            {size.replace('x', '×')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ paddingBottom: '32px' }} className="pt-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setSizeSheetOpen(false)}
              >
                取消
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* DPI Bottom Sheet */}
      <Sheet open={dpiSheetOpen} onOpenChange={setDpiSheetOpen}>
        <SheetContent 
          side="bottom" 
          className="rounded-t-xl border-0 p-0 max-h-[80vh] overflow-hidden"
        >
          <div className="px-6 pt-6">
            <SheetTitle className="text-lg font-semibold mb-4 text-center">
              选择分辨率
            </SheetTitle>
            <SheetDescription className="sr-only">选择分辨率DPI</SheetDescription>
            
            <div 
              className="overflow-y-auto scrollbar-hide"
              style={{ 
                maxHeight: 'calc(80vh - 120px)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div className="space-y-1">
                {DPI_OPTIONS.map((dpi) => (
                  <button
                    key={dpi}
                    onClick={() => {
                      handleConfigChange('dpi', dpi.toString());
                      setDpiSheetOpen(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      idPhotoConfig?.dpi === dpi
                        ? 'bg-primary/10 text-primary border border-primary'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                    data-testid={`option-dpi-${dpi}`}
                  >
                    <span className="text-sm font-medium">{dpi}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ paddingBottom: '32px' }} className="pt-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setDpiSheetOpen(false)}
              >
                取消
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Background Color Bottom Sheet */}
      <Sheet open={backgroundSheetOpen} onOpenChange={setBackgroundSheetOpen}>
        <SheetContent 
          side="bottom" 
          className="rounded-t-xl border-0 p-0 max-h-[80vh] overflow-hidden"
        >
          <div className="px-6 pt-6">
            <SheetTitle className="text-lg font-semibold mb-4 text-center">
              选择背景色
            </SheetTitle>
            <SheetDescription className="sr-only">选择背景颜色</SheetDescription>
            
            <div 
              className="overflow-y-auto scrollbar-hide"
              style={{ 
                maxHeight: 'calc(80vh - 120px)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div className="space-y-1">
                {Object.entries(BACKGROUND_COLORS).map(([key, color]) => (
                  <button
                    key={key}
                    onClick={() => {
                      handleConfigChange('background_color', color);
                      setBackgroundSheetOpen(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      idPhotoConfig?.background_color === color
                        ? 'bg-primary/10 text-primary border border-primary'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                    data-testid={`option-background-${key}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded border" style={{ backgroundColor: color }}></div>
                      <span className="text-sm font-medium">
                        {key === 'white' ? '白色' : key === 'blue' ? '蓝色' : '红色'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ paddingBottom: '32px' }} className="pt-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setBackgroundSheetOpen(false)}
              >
                取消
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

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