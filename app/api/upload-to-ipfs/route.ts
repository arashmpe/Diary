import axios from 'axios';
import FormData from 'form-data';
import { NextResponse } from 'next/server';

function dataURLToBuffer(dataURL: string): Buffer {
  const base64 = dataURL.split(',')[1];
  if (!base64) {
    throw new Error('Invalid data URL');
  }
  return Buffer.from(base64, 'base64');
}

export async function POST(request: Request) {
  if (!process.env.PINATA_JWT) {
    return NextResponse.json({ error: 'PINATA_JWT is not set' }, { status: 500 });
  }
  try {
    const { image, title, caption } = await request.json();
    if (!image || !title || !caption) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const imageBuffer = dataURLToBuffer(image);
    const imageFormData = new FormData();
    imageFormData.append('file', imageBuffer, 'image.png');
    const imageUploadResponse = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      imageFormData,
      {
        headers: {
          ...imageFormData.getHeaders(),
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      }
    );
    const imageIpfsHash = imageUploadResponse.data.IpfsHash;
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageIpfsHash}`;
    const metadata = { name: title, description: caption, image: imageUrl };
    const metadataUploadResponse = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        pinataContent: metadata,
        pinataMetadata: { name: `${title.replace(/\s/g, '-')}-metadata.json` },
      },
      {
        headers: { Authorization: `Bearer ${process.env.PINATA_JWT}` },
      }
    );
    const metadataIpfsHash = metadataUploadResponse.data.IpfsHash;
    return NextResponse.json({ metadataUri: `ipfs://${metadataIpfsHash}` });
  } catch (error) {
    // <-- تغییر در این بخش
    console.error('Error uploading to Pinata:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to upload to IPFS.', details: errorMessage },
      { status: 500 }
    );
  }
}
