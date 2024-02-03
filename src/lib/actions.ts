'use server';
import prisma from './prisma';
import slugify from 'slugify';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import pusher from './pusher';

const client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? '',
    secretAccessKey: process.env.S3_SECRET_KEY ?? '',
  },
})

async function uploadImageToS3(image: File) {
  try { 
    if(!validateFile(image)) return false;
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

function validateFile(file: any){
  return (file && file instanceof File && file.size !== 0);
}

export async function createRestaurant(prevState: any, formData: FormData) {
  const backgroundImage = await uploadImageToS3(formData.get('background-image') as File);
  if(!backgroundImage) return {message: 'There has been an error while uploading image.'};
  
  const data = {
    name: formData.get('name') as string,
    // description: formData.get('description') as string,
    description: '',
    url: slugify(formData.get('name') as string, { lower: true }),
    backgroundImage: backgroundImage
  };
  
  const restaurant = await prisma.restaurant.create({
    data: data,
  });

  if(restaurant){
    revalidatePath('/restaurants');
    redirect('/restaurants/' + restaurant.url);
  }else{
    return {message: 'There has been an error while adding restaurant.'};
  }
}

export async function createOrder(order: number[]) {
  await pusher.trigger('kitchen', 'order-added', {
    order: order
  })
}