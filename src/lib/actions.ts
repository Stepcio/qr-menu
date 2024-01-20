'use server';
import prisma from './prisma';
import slugify from 'slugify';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? '',
    secretAccessKey: process.env.S3_SECRET_KEY ?? '',
  },
})

async function uploadImageToS3(image: File) {
  try {
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: image.name,
      Body: imageBuffer,
      ContentType: image.type
    };

    const command = new PutObjectCommand(params);

    await client.send(command);
    
    return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${image.name}`;
  } catch (error) {
    return false;
  }
}

export async function createRestaurant(prevState: any, formData: FormData) {
  let restaurant;

  try {
    const logo = formData.get('logo');
    if(!(logo && logo instanceof File && logo.size !== 0)) return {message: 'There has been an error while uploading image.'};

    const logoUrl = await uploadImageToS3(logo);

    if(!logoUrl) return {message: 'There has been an error while uploading image.'};

    restaurant = {
      name: formData.get('name') as string,
      url: slugify(formData.get('name') as string, { lower: true }),
      logo: logoUrl
    };
    
    await prisma.restaurant.create({
      data: restaurant,
    });
  } catch (error) {
    return {message: 'There has been an error while adding restaurant.'};
  }
  
  revalidatePath('/restaurants');
  redirect('/restaurants/' + restaurant.url);
}