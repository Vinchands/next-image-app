import { type Image } from '@prisma/client'
import image1 from '@/public/sample/image1.jpg'
import image2 from '@/public/sample/image2.jpg'
import image3 from '@/public/sample/image3.jpg'
import image4 from '@/public/sample/image4.jpg'
import image5 from '@/public/sample/image5.jpg'
import image6 from '@/public/sample/image6.jpg'
import image7 from '@/public/sample/image7.jpg'
import image8 from '@/public/sample/image8.jpg'
import image9 from '@/public/sample/image9.jpg'
import image10 from '@/public/sample/image10.jpg'

export const images: Image[] = [
  {
    id: '1',
    url: image1.src,
    title: 'Sample Image 1',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '01JXZB2BQYMAT9YX4Q1MYKSMPS'
  },
  {
    id: '2',
    url: image2.src,
    title: 'Sample Image 2',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '01JXZB2BQYMAT9YX4Q1MYKSMPS'
  },
  {
    id: '3',
    url: image3.src,
    title: 'Sample Image 3',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '01JXZB2BQYMAT9YX4Q1MYKSMPS'
  },
  {
    id: '4',
    url: image4.src,
    title: 'Sample Image 4',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '01JXZB2BQYMAT9YX4Q1MYKSMPS'
  },
  {
    id: '5',
    url: image5.src,
    title: 'Sample Image 5',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '01JXZB2BQYMAT9YX4Q1MYKSMPS'
  },
  {
    id: '6',
    url: image6.src,
    title: 'Sample Image 6',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '01JXZB2BQYMAT9YX4Q1MYKSMPS'
  },
  {
    id: '7',
    url: image7.src,
    title: 'Sample Image 7',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '01JXZB2BQYMAT9YX4Q1MYKSMPS'
  },
  {
    id: '8',
    url: image8.src,
    title: 'Sample Image 8',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '01JXZB2BQYMAT9YX4Q1MYKSMPS'
  },
  {
    id: '9',
    url: image9.src,
    title: 'Sample Image 9',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '01JXZB2BQYMAT9YX4Q1MYKSMPS'
  },
  {
    id: '10',
    url: image10.src,
    title: 'Sample Image 10',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '01JXZB2BQYMAT9YX4Q1MYKSMPS'
  }
]
