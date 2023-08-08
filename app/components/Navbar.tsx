"use client"

import React from 'react'
import Link from 'next/link'
import MenuDropdown from './MenuDropdown'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'

export default function Navbar() {

  const [user, loading] = useAuthState(auth);

  return (
    <nav className='sticky p-5 flex justify-between items-center'>
      <div className='text-gray-600 hover:text-gray-500 transition ease-out text-2xl font-semibold cursor-pointer'>
        <Link href='/'>
          The Tech Feed
        </Link>
      </div>
      <div>
        {user ? 
          <MenuDropdown /> :
          <button className='inline-flex w-full justify-center rounded-md bg-teal-500 text-white px-4 py-2 text-sm font-medium hover:bg-teal-400 transition ease-out'>
            <Link href='/login'>Sign In</Link>
          </button>
        }
      </div>      
    </nav>
  )
}
