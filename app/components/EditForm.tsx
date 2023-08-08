"use client"

import React, { FC, ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PostType } from '../types/PostType'

import { auth, db } from '../utils/firebase'
import { doc, DocumentData, DocumentReference, updateDoc } from 'firebase/firestore'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type PageProps = {
  postData: PostType
}

const EditForm: FC<PageProps> = ({ postData }): JSX.Element => {

    const router = useRouter();

    const [title, setTitle] = useState<string>(postData?.title)
    const [description, setDescription] = useState<string>(postData?.description)
    const [thumbnail, setThumbnail] = useState<string>(postData?.thumbnail)
    const [post, setPost] = useState<string>(postData?.post)

    const editPost = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const postDoc: DocumentReference<DocumentData> = doc(db, 'posts', postData?.id);

      const updatedPost: PostType = {
        id: postData?.id,
        title,
        description,
        thumbnail,
        post,
        author: {
          id: auth.currentUser?.uid as string,
          name: auth.currentUser?.displayName as string
        }
      };

      await updateDoc(postDoc, updatedPost);

      toast.success('Post has been updated!', {
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
    <form onSubmit={editPost}
      className="bg-gray-100 h-[620px] rounded-lg shadow-lg mx-auto mt-5 p-5">
      <input type='text' className="w-full rounded-lg shadow-lg mt-5 p-5 bg-slate-800 text-gray-100" placeholder='Enter a title' onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} value={title} />
      <input type='text' className="w-full rounded-lg shadow-lg mt-5 p-5 bg-slate-800 text-gray-100" placeholder='Enter a description' onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} value={description} />
      <input type='text' className="w-full rounded-lg shadow-lg mt-5 p-5 bg-slate-800 text-gray-100" placeholder='Thumbnail image' onChange={(e: ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.value)} value={thumbnail} />
      <textarea className="w-full h-60 rounded-lg shadow-lg mt-5 mb-5 p-5 bg-slate-800 text-gray-100" placeholder="Type something 😊" onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPost(e.target.value)} value={post}></textarea>
      <button className="bg-teal-500 hover:bg-teal-400 transition ease-out p-2 text-white font-semibold rounded-lg shadow-lg w-24 block">Post</button>
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
    </form>
  )
}

export default EditForm;