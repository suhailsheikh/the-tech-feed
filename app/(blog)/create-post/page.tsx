"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '../../utils/firebase'
import { CollectionReference, DocumentData, addDoc, collection } from 'firebase/firestore'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePost() {

  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [post, setPost] = useState<string>('');

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const postsCollectionRef: CollectionReference<DocumentData> = collection(db, 'posts');
      
      await addDoc(postsCollectionRef, {
          author: { name: auth.currentUser?.displayName, id: auth.currentUser?.uid },
          title,
          description,
          thumbnail,
          post,
      });

      toast.success('Post has been created', {
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
      }, 3000)
    }

  return (
    <main className='text-center'>
      <article className='md:w-1/2 mx-auto p-5'>
          <h1 className='text-3xl font-semibold text-center'>Create Post</h1>
          <form onSubmit={createPost}
              className="bg-gray-100 h-[620px] rounded-lg shadow-lg mx-auto mt-5 p-5">
              <input type='text' className="w-full rounded-lg shadow-lg mt-5 p-5 bg-slate-800 text-gray-100" placeholder='Enter a title' value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} required />
              <input type='text' className="w-full rounded-lg shadow-lg mt-5 p-5 bg-slate-800 text-gray-100" placeholder='Enter a description' value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} required  />
              <input type='text' className="w-full rounded-lg shadow-lg mt-5 p-5 bg-slate-800 text-gray-100" placeholder='Thumbnail image' value={thumbnail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.value)} required  />
              <textarea className="w-full h-60 rounded-lg shadow-lg mt-5 mb-5 p-5 bg-slate-800 text-gray-100" placeholder='Type something 😊' value={post} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPost(e.target.value)} required></textarea>
              <button className="bg-teal-500 hover:bg-teal-400 transition ease-out p-2 text-white font-semibold rounded-lg shadow-lg w-24 block">Post</button>
          </form>
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
      </article>
    </main>
  )
}

export default CreatePost;