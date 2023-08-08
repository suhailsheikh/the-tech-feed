"use client"

import React from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../utils/firebase'

export default function Login(): JSX.Element {

  const router = useRouter();
  const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);

        if (result.user) {
          setCookie('loggedIn', true);
          router.push('/');
        }
        else {
            router.push('/login');
        }
      }
      catch (error) {
          console.log(error);
      }
    }

    return (
      <div className="flex h-screen justify-center items-center">
        <div className="bg-gray-100 p-5 shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold p-2 mb-2">Hey there!</h1>
            <p className='p-2 mb-5'>Sign in with one of these providers:</p>
            <button onClick={GoogleLogin}
            className="bg-red-400 w-96 mx-auto p-5 mb-5 rounded-lg 
            shadow-lg text-white font-semibold flex items-center
            hover:bg-red-500 transition ease-out"><FcGoogle className='mr-5' />Sign in with Google</button>
            <button className='bg-blue-400 w-96 mx-auto p-5 mb-5 rounded-lg
            shadow-lg text-white font-semibold flex items-center
            hover:bg-blue-500 transition ease-out'><FaFacebookF className='mr-5' />Sign in with Facebook</button>
        </div>
      </div>
    )
}