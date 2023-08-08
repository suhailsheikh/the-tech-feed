"use client"

import React, { FC } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { db } from '../utils/firebase'
import { doc, DocumentData, DocumentReference, deleteDoc } from 'firebase/firestore'

import { PostType } from '../types/PostType'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IPosts {
    posts: PostType[];
}

const UserPosts: FC<IPosts> = ({ posts }): JSX.Element => {

  const router = useRouter();

  const deletePost = async (postId: string) => {
    
    const postDoc: DocumentReference<DocumentData> = doc(db, 'posts', postId);
    await deleteDoc(postDoc);

    toast.success('Post deleted', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      router.push('/');
    }, 3000);
  }

    return (
        <div>
            {posts.map((post: PostType) => {
            return (
              <div key={post.id} className='bg-gray-100 w-3/4 h-42 mx-auto mt-10 mb-5 p-5 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-semibold'>{post.title}</h1>
                <h3 className='mt-5'>{post.description}</h3>
                <div className='flex justify-center mt-5'>
                  <Link className='mr-10 text-blue-500' href={`/edit-post/${post.id}`}>
                    Edit
                  </Link>
                  <button className='text-red-500' onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
    )
}

export default UserPosts;