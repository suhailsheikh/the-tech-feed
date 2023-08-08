import { db } from '../utils/firebase'
import { collection, CollectionReference, DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore'
import { Post } from '../components/Post'
import { PostType } from '../types/PostType'

export default async function Home() {

  const postCollectionRef: CollectionReference<DocumentData> = collection(db, 'posts');
  const data: QuerySnapshot<DocumentData> = await getDocs(postCollectionRef);

  const posts = data.docs.map((doc) => (
    { ...doc.data() as PostType, 
      id: doc.id 
    }
  ));

  return (
    <main className='grid place-items-center mb-12'>
      <h1 className='text-3xl font-semibold text-center p-5'>Welcome to The Tech Feed!</h1>
      <section className='grid mt-5 sm:grid-cols-2 ml-10 lg:grid-cols-4 xl:grid-cols-4'>
        {posts.map((post: PostType) => {
          return <Post key={post.id} {...post} />
        })}
      </section>
    </main>
  )
}