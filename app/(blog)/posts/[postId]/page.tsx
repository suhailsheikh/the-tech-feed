import React from 'react'
import { db } from '../../../utils/firebase'
import { doc, DocumentData, DocumentReference, getDoc } from 'firebase/firestore'

export default async function Post({ params }: any) {
  const postId: string = params.postId;

  const docRef: DocumentReference<DocumentData> = doc(db, 'posts', postId);
  const docSnapshot = await getDoc(docRef);

  const post: DocumentData | undefined = docSnapshot.data();

  return (
    <main className='text-center'>
      <article className='md:w-3/4 mx-auto p-5'>
        <h1 className='text-3xl font-semibold'>{post?.title}</h1>
        <p className='mt-5 font-semibold text-xl text-gray-600'>{post?.description}</p>
        <p className='my-5 text-xl'>{post?.post}</p>
      </article>
    </main>
  )
}