// ID Photo configuration and calculation utilities

export interface IdPhotoType {
  name: string;
  size_mm: {
    width: number;
    height: number;
  };
  default_dpi: number;
  background: 'white' | 'blue' | 'red';
}

export interface IdPhotoConfig {
  type: string;
  size_mm: {
    width: number;
    height: number;
  };
  dpi: number;
  background_color: string;
  pixels: {
    width: number;
    height: number;
  };
  file_size_kb: number;
}

export const ID_PHOTO_TYPES: IdPhotoType[] = [
  {
    name: "身份证",
    size_mm: { width: 26, height: 32 },
    default_dpi: 300,
    background: "white"
  },
  {
    name: "一寸证件照",
    size_mm: { width: 25, height: 35 },
    default_dpi: 300,
    background: "blue"
  },
  {
    name: "小一寸",
    size_mm: { width: 22, height: 32 },
    default_dpi: 300,
    background: "white"
  },
  {
    name: "大一寸",
    size_mm: { width: 33, height: 48 },
    default_dpi: 300,
    background: "white"
  },
  {
    name: "二寸证件照",
    size_mm: { width: 35, height: 49 },
    default_dpi: 300,
    background: "blue"
  },
  {
    name: "驾照/签证照",
    size_mm: { width: 33, height: 48 },
    default_dpi: 300,
    background: "white"
  },
  {
    name: "护照照片",
    size_mm: { width: 33, height: 48 },
    default_dpi: 300,
    background: "white"
  },
  {
    name: "自定义",
    size_mm: { width: 0, height: 0 },
    default_dpi: 300,
    background: "white"
  }
];

export const BACKGROUND_COLORS = {
  white: "#FFFFFF",
  blue: "#007BFF",
  red: "#FF4D4D"
};

export const DPI_OPTIONS = [150, 300, 400, 500, 600];

// Calculate pixels from mm and DPI
export function calculatePixels(width_mm: number, height_mm: number, dpi: number) {
  const width_px = Math.round((width_mm / 25.4) * dpi);
  const height_px = Math.round((height_mm / 25.4) * dpi);
  return { width: width_px, height: height_px };
}

// Calculate file size in KB
export function calculateFileSize(width_px: number, height_px: number): number {
  // color_depth = 24bit (RGB, 3 bytes per pixel)
  // compression ratio (JPEG) ≈ 15:1
  return Math.round((width_px * height_px * 3) / 15 / 1024);
}

// Create default config for a photo type
export function createDefaultConfig(photoType: IdPhotoType): IdPhotoConfig {
  const pixels = calculatePixels(photoType.size_mm.width, photoType.size_mm.height, photoType.default_dpi);
  const fileSize = calculateFileSize(pixels.width, pixels.height);
  
  return {
    type: photoType.name,
    size_mm: photoType.size_mm,
    dpi: photoType.default_dpi,
    background_color: BACKGROUND_COLORS[photoType.background],
    pixels,
    file_size_kb: fileSize
  };
}

// Update config when parameters change
export function updateIdPhotoConfig(
  type: string,
  size_mm: { width: number; height: number },
  dpi: number,
  background_color: string
): IdPhotoConfig {
  const pixels = calculatePixels(size_mm.width, size_mm.height, dpi);
  const fileSize = calculateFileSize(pixels.width, pixels.height);
  
  return {
    type,
    size_mm,
    dpi,
    background_color,
    pixels,
    file_size_kb: fileSize
  };
}