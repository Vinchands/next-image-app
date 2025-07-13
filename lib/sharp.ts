import sharp from 'sharp'

type ResizeOptions = {
  width: number
  format?: 'jpeg' | 'png' | 'webp'
  quality?: number
}

// Resize image
export async function resizeImage(buffer: Buffer, { width, format = 'jpeg', quality = 80 }: ResizeOptions): Promise<Buffer> {
  return await sharp(buffer)
    .resize({ width })[format]({ quality })
    .toBuffer()
}


type BlurDataOptions = {
  width?: number
  quality?: number
}

// Generate blur data
export async function generateBlurDataUrl(buffer: Buffer, options?: BlurDataOptions): Promise<string> {
  const w = options?.width ?? 10
  const q = options?.quality ?? 30

  const blurBuffer = await sharp(buffer)
    .resize({ width: w })
    .blur()
    .jpeg({ quality: q })
    .toBuffer()

  const base64 = blurBuffer.toString('base64')
  return `data:image/jpeg;base64,${base64}`
}


// Get metadata
export async function getImageMetadata(buffer: Buffer) {
  return await sharp(buffer).metadata()
}
