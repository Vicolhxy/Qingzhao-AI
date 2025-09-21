import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ArrowLeft, User, Sun, Building, X, ChevronDown } from "lucide-react";
import { PhotoCategory } from "@shared/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ID_PHOTO_TYPES, BACKGROUND_COLORS, DPI_OPTIONS, IdPhotoConfig, createDefaultConfig, updateIdPhotoConfig, IdPhotoType } from "@/data/idPhotoConfig";

// Import sample images (same as home page)
import sampleMale1 from "@assets/Sample-Male-1_1758161866744.png";
import sampleMale2 from "@assets/Sample-Male-2_1758161866744.png";
import sampleMale3 from "@assets/Sample-Male-3_1758161866745.png";
import sampleMale4 from "@assets/Sample-Male-4_1758161866744.png";

// Import outline human image
import outlineHuman from "@assets/Outline-human_1758207634258.png";
import idOutlineDotted from "@assets/ID-Outline_1758484243114.png";

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
  const [idPhotoConfig, setIdPhotoConfig] = useState<IdPhotoConfig | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Parse category and gender from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const category = (urlParams.get('category') || PhotoCategory.PROFESSIONAL) as PhotoCategory;
  const gender = urlParams.get('gender') || 'male';
  const categoryName = categoryNames[category];

  // Sample images (using same as home page)
  const sampleImages = [sampleMale1, sampleMale2, sampleMale3, sampleMale4];
  
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
    
    // Navigate to generating page after agreement
    setLocation(`/generating?category=${category}&gender=${gender}`);
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
  
  const isIdPhoto = category === PhotoCategory.ID_PHOTO;

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
        <Link href="/">
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
              <span className="text-sm text-gray-500 ml-3" data-testid="text-hint-preview">点击可查看大图</span>
            </div>
            
            {/* 4 Sample Photos Horizontal Strip */}
            <div className="flex flex-nowrap gap-[6px]" data-testid="grid-samples">
              {sampleImages.map((sample, index) => (
                <div 
                  key={index}
                  className="bg-gray-100 rounded-[6px] overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                  style={{ 
                    width: 'clamp(60px, calc((100% - 18px)/4), 86px)', 
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
              <div className="w-full h-full flex items-center justify-center min-h-[300px]" style={isIdPhoto ? { width: '171px', height: '228px', margin: '0 auto' } : {}}>
                {uploadedImageUrl ? (
                  <img 
                    src={uploadedImageUrl} 
                    alt="已上传照片" 
                    className="max-w-full max-h-full object-contain mx-auto"
                  />
                ) : (
                  isIdPhoto ? (
                    <img 
                      src={idOutlineDotted} 
                      alt="证件照轮廓" 
                      className="max-w-full max-h-full object-contain opacity-30"
                      style={{ filter: 'invert(0.5)' }}
                    />
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
            <div className="w-24 flex flex-col justify-center" data-testid="area-tips">
              {isIdPhoto ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">请<span className="text-red-500">不要</span>穿戴</h3>
                    <p className="text-xs text-gray-600">帽子、墨镜、围巾等</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">请保持端正</h3>
                    <p className="text-xs text-gray-600">光线充足，背景简单</p>
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
                <Select value={idPhotoConfig.type} onValueChange={handlePhotoTypeChange}>
                  <SelectTrigger className="w-32" data-testid="select-photo-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ID_PHOTO_TYPES.map((type) => (
                      <SelectItem key={type.name} value={type.name}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Size Selectors */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">宽度(mm)</span>
                  <Select value={idPhotoConfig.size_mm.width === 0 ? '' : idPhotoConfig.size_mm.width.toString()} onValueChange={(value) => handleConfigChange('width', value)} disabled={idPhotoConfig.type !== '自定义'}>
                    <SelectTrigger className={`w-20 ${validationErrors.width ? 'border-red-500' : ''} ${idPhotoConfig.type === '自定义' ? '' : 'text-gray-400'}`}>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      {[20, 22, 25, 26, 30, 33, 35, 40].map((size) => (
                        <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">高度(mm)</span>
                  <Select value={idPhotoConfig.size_mm.height === 0 ? '' : idPhotoConfig.size_mm.height.toString()} onValueChange={(value) => handleConfigChange('height', value)} disabled={idPhotoConfig.type !== '自定义'}>
                    <SelectTrigger className={`w-20 ${validationErrors.height ? 'border-red-500' : ''} ${idPhotoConfig.type === '自定义' ? '' : 'text-gray-400'}`}>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      {[25, 30, 32, 35, 40, 45, 48, 49, 50].map((size) => (
                        <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* DPI Selector */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">分辨率(DPI)</span>
                <Select value={idPhotoConfig.dpi.toString()} onValueChange={(value) => handleConfigChange('dpi', value)} disabled={idPhotoConfig.type !== '自定义'}>
                  <SelectTrigger className={`w-24 ${idPhotoConfig.type === '自定义' ? '' : 'text-gray-400'}`}>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    {DPI_OPTIONS.map((dpi) => (
                      <SelectItem key={dpi} value={dpi.toString()}>{dpi}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Background Color Selector */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">背景色</span>
                <Select value={idPhotoConfig.background_color} onValueChange={(value) => handleConfigChange('background_color', value)} disabled={idPhotoConfig.type !== '自定义'}>
                  <SelectTrigger className={`w-24 ${idPhotoConfig.type === '自定义' ? '' : 'text-gray-400'}`}>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BACKGROUND_COLORS).map(([key, color]) => (
                      <SelectItem key={key} value={color}>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border" style={{ backgroundColor: color }}></div>
                          {key === 'white' ? '白色' : key === 'blue' ? '蓝色' : '红色'}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Calculated Values */}
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">像素及文件大小</span>
                  <span className="font-mono">{idPhotoConfig.pixels.width} × {idPhotoConfig.pixels.height}px, 约{idPhotoConfig.file_size_kb}KB</span>
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
            {selectedFile ? (
              isIdPhoto ? '开始生成我的证件照（4张）' : '开始生成我的照片（4张）'
            ) : '点击上传 / 拍照'}
          </Button>
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