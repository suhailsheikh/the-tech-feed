import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostType } from '../types/PostType'

export const Post: FC<PostType> = ({ id, title, description, thumbnail, author }) => {
    return (
        <div className="bg-gray-100 max-w-sm h-[450px] box-border rounded-lg shadow-lg cursor-pointer mr-10 mb-12 hover:scale-105 transition transform duration-200 ease-out">
            <Link href={`/posts/${id}`}>
                <div>
                    <Image src={thumbnail} alt='post-img' width={500} height={300} className='post-img rounded-t-lg'/>
                    <div className='post-details p-5 max-w-sm'>
                        <h1 className="text-2xl font-semibold sm:text-lg md:text-2xl">{title}</h1>
                        <p className="mt-2">{description}</p>
                        <div className="flex items-center pt-5 w-[22rem] fixed left-4 bottom-5">
                            <div className="bg-teal-500 rounded-full w-10 h-10 text-center text-white font-semibold flex items-center justify-center">S</div>
                            <p className="ml-4 text-gray-600">{author.name}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}