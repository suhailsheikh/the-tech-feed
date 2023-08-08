"use client"

import React from 'react'
import { db } from '../../utils/firebase'
import { PostType } from '../../types/PostType'
import { collection, CollectionReference, DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import getDisplayName from '../../utils/helpers'

// Lazy loading the list of posts to prevent the ChunkLoadError!
const UserPosts = React.lazy(() => import('../../components/UserPosts'));

const Dashboard = async () => {

  const [user, loading] = useAuthState(auth);

  const userName: string = getDisplayName(user);
  const postCollectionRef: CollectionReference<DocumentData> = collection(db, 'posts');
  const data: QuerySnapshot<DocumentData> = await getDocs(postCollectionRef);

  const posts = data.docs.map((doc) => (
    { ...doc.data() as PostType, 
      id: doc.id
    }
  ));

  return (
    <main className='text-center'>
      <article className='sm:w-full md:w-3/4 mx-auto p-5 mb-10'>
        <h1 className='text-3xl font-semibold'>Welcome to your Dashboard, {userName}</h1>
        <UserPosts posts={posts} />
      </article>
    </main>
  )
}

export default Dashboard;