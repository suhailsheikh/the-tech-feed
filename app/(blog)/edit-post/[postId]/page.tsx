import { db } from '../../../utils/firebase'
import { DocumentReference, DocumentData, doc, getDoc } from 'firebase/firestore'

import { PostType } from '@/app/types/PostType';
import EditForm from '../../../components/EditForm';

export default async function EditPost({ params }: any) {

  const postId: string = params.postId;
  const postRef: DocumentReference<DocumentData> = doc(db, 'posts', postId);
  const docSnapshot = await getDoc(postRef);

  const postData = docSnapshot.data() as PostType;

  return (
    <main className='text-center'>
      <article className='md:w-1/2 mx-auto p-5'>
        <h1 className='text-3xl font-semibold text-center'>Edit Post</h1>
        <EditForm postData={postData} / >
      </article>
    </main>
  )
}