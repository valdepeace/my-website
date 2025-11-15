const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const inputImage = path.join(__dirname, 'static', 'img', 'profile.png');
  const outputDir = path.join(__dirname, 'static');
  
  console.log('🎨 Generando favicons desde profile.png...\n');

  try {
    // Verificar que existe la imagen
    if (!fs.existsSync(inputImage)) {
      console.error('❌ Error: No se encontró static/img/profile.png');
      return;
    }

    // Generar diferentes tamaños
    const sizes = [16, 32, 48, 64, 128, 256];
    
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `favicon-${size}x${size}.png`);
      
      await sharp(inputImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generado favicon-${size}x${size}.png`);
    }

    // Generar el favicon principal (32x32 es el estándar)
    const faviconPath = path.join(outputDir, 'img', 'favicon.png');
    await sharp(inputImage)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(faviconPath);
    
    console.log('✅ Generado img/favicon.png (32x32)\n');

    console.log('📋 Siguiente paso:');
    console.log('   1. Ve a https://favicon.io/favicon-converter/');
    console.log('   2. Sube el archivo: static/favicon-32x32.png');
    console.log('   3. Descarga el favicon.ico generado');
    console.log('   4. Reemplaza static/favicon.ico con el nuevo archivo\n');
    
    console.log('💡 O usa esta herramienta online:');
    console.log('   https://www.icoconverter.com/\n');

  } catch (error) {
    console.error('❌ Error al generar favicons:', error.message);
  }
}

generateFavicons();
