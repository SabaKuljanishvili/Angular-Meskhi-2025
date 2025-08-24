#!/usr/bin/env node

/**
 * Image Optimization Script for Meskhi 2000 Gallery
 * 
 * This script helps optimize images for better performance.
 * 
 * Prerequisites:
 * 1. Install Node.js
 * 2. Install ImageMagick: https://imagemagick.org/script/download.php
 * 3. Install WebP tools: https://developers.google.com/speed/webp/download
 * 
 * Usage:
 * node optimize-images.js [input-folder] [output-folder]
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Image sizes configuration
const IMAGE_SIZES = {
  thumb: { width: 150, height: 150, quality: 80 },
  small: { width: 300, height: 300, quality: 85 },
  medium: { width: 600, height: 600, quality: 90 },
  large: { width: 1200, height: 1200, quality: 95 },
  xlarge: { width: 1920, height: 1920, quality: 95 }
};

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff'];

class ImageOptimizer {
  constructor(inputFolder, outputFolder) {
    this.inputFolder = inputFolder;
    this.outputFolder = outputFolder;
    this.stats = {
      processed: 0,
      optimized: 0,
      errors: 0,
      totalSizeBefore: 0,
      totalSizeAfter: 0
    };
  }

  /**
   * Check if required tools are installed
   */
  async checkDependencies() {
    try {
      await execAsync('magick --version');
      console.log('✅ ImageMagick is installed');
    } catch (error) {
      console.error('❌ ImageMagick is not installed. Please install it first.');
      console.error('Download from: https://imagemagick.org/script/download.php');
      process.exit(1);
    }

    try {
      await execAsync('cwebp -version');
      console.log('✅ WebP tools are installed');
    } catch (error) {
      console.error('❌ WebP tools are not installed. Please install them first.');
      console.error('Download from: https://developers.google.com/speed/webp/download');
      process.exit(1);
    }
  }

  /**
   * Get all image files from input folder
   */
  getImageFiles() {
    const files = [];
    
    const readDir = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          readDir(fullPath);
        } else if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase();
          if (SUPPORTED_FORMATS.includes(ext)) {
            files.push({
              path: fullPath,
              name: item,
              size: stat.size,
              relativePath: path.relative(this.inputFolder, fullPath)
            });
          }
        }
      });
    };

    readDir(this.inputFolder);
    return files;
  }

  /**
   * Create output directory structure
   */
  createOutputStructure() {
    if (!fs.existsSync(this.outputFolder)) {
      fs.mkdirSync(this.outputFolder, { recursive: true });
    }

    // Create category folders
    const categories = ['frezebi', 'cirkuli', 'lenturi', 'fuganebi'];
    categories.forEach(category => {
      const categoryPath = path.join(this.outputFolder, category);
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
      }
      
      const optimizedPath = path.join(categoryPath, 'optimized');
      if (!fs.existsSync(optimizedPath)) {
        fs.mkdirSync(optimizedPath, { recursive: true });
      }
    });
  }

  /**
   * Optimize a single image
   */
  async optimizeImage(imageFile) {
    const category = this.getCategoryFromPath(imageFile.relativePath);
    const nameWithoutExt = path.parse(imageFile.name).name;
    
    console.log(`🔄 Processing: ${imageFile.name}`);
    
    try {
      // Process each size
      for (const [size, config] of Object.entries(IMAGE_SIZES)) {
        const outputPath = path.join(
          this.outputFolder, 
          category, 
          'optimized', 
          `${nameWithoutExt}_${size}`
        );

        // Create JPEG version
        await this.resizeImage(imageFile.path, `${outputPath}.jpg`, config);
        
        // Create WebP version
        await this.convertToWebP(`${outputPath}.jpg`, `${outputPath}.webp`, config.quality);
        
        // Get file sizes
        const jpegSize = fs.statSync(`${outputPath}.jpg`).size;
        const webpSize = fs.statSync(`${outputPath}.webp`).size;
        
        this.stats.totalSizeAfter += jpegSize + webpSize;
        
        console.log(`  ✅ ${size}: ${(jpegSize / 1024).toFixed(1)}KB (JPEG), ${(webpSize / 1024).toFixed(1)}KB (WebP)`);
      }
      
      this.stats.processed++;
      this.stats.optimized++;
      
    } catch (error) {
      console.error(`  ❌ Error processing ${imageFile.name}:`, error.message);
      this.stats.errors++;
    }
  }

  /**
   * Resize image using ImageMagick
   */
  async resizeImage(inputPath, outputPath, config) {
    const command = `magick "${inputPath}" -resize ${config.width}x${config.height}^ -gravity center -extent ${config.width}x${config.height} -quality ${config.quality} "${outputPath}"`;
    
    try {
      await execAsync(command);
    } catch (error) {
      throw new Error(`Failed to resize image: ${error.message}`);
    }
  }

  /**
   * Convert JPEG to WebP
   */
  async convertToWebP(inputPath, outputPath, quality) {
    const command = `cwebp -q ${quality} "${inputPath}" -o "${outputPath}"`;
    
    try {
      await execAsync(command);
    } catch (error) {
      throw new Error(`Failed to convert to WebP: ${error.message}`);
    }
  }

  /**
   * Get category from file path
   */
  getCategoryFromPath(relativePath) {
    const parts = relativePath.split(path.sep);
    return parts[0] || 'unknown';
  }

  /**
   * Print optimization statistics
   */
  printStats() {
    console.log('\n📊 Optimization Complete!');
    console.log('========================');
    console.log(`Processed: ${this.stats.processed} images`);
    console.log(`Optimized: ${this.stats.optimized} images`);
    console.log(`Errors: ${this.stats.errors} images`);
    console.log(`Total size before: ${(this.stats.totalSizeBefore / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total size after: ${(this.stats.totalSizeAfter / 1024 / 1024).toFixed(2)} MB`);
    
    if (this.stats.totalSizeBefore > 0) {
      const reduction = ((this.stats.totalSizeBefore - this.stats.totalSizeAfter) / this.stats.totalSizeBefore * 100).toFixed(1);
      console.log(`Size reduction: ${reduction}%`);
    }
  }

  /**
   * Run the optimization process
   */
  async run() {
    console.log('🚀 Starting image optimization...\n');
    
    try {
      // Check dependencies
      await this.checkDependencies();
      
      // Create output structure
      this.createOutputStructure();
      
      // Get all image files
      const imageFiles = this.getImageFiles();
      console.log(`📁 Found ${imageFiles.length} images to process\n`);
      
      if (imageFiles.length === 0) {
        console.log('No images found to process.');
        return;
      }
      
      // Calculate total size before
      this.stats.totalSizeBefore = imageFiles.reduce((sum, file) => sum + file.size, 0);
      
      // Process each image
      for (const imageFile of imageFiles) {
        await this.optimizeImage(imageFile);
      }
      
      // Print statistics
      this.printStats();
      
    } catch (error) {
      console.error('❌ Optimization failed:', error.message);
      process.exit(1);
    }
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: node optimize-images.js [input-folder] [output-folder]');
    console.log('');
    console.log('Example:');
    console.log('  node optimize-images.js ./public ./public/assets/images');
    console.log('');
    console.log('This will:');
    console.log('  1. Read images from ./public');
    console.log('  2. Create optimized versions in ./public/assets/images');
    console.log('  3. Generate multiple sizes and WebP formats');
    process.exit(1);
  }
  
  const [inputFolder, outputFolder] = args;
  
  // Validate input folder
  if (!fs.existsSync(inputFolder)) {
    console.error(`❌ Input folder does not exist: ${inputFolder}`);
    process.exit(1);
  }
  
  // Create optimizer and run
  const optimizer = new ImageOptimizer(inputFolder, outputFolder);
  await optimizer.run();
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = ImageOptimizer;
