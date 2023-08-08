"use client"

import Link from 'next/link'
import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { auth } from '../utils/firebase'
import { removeCookies } from 'cookies-next'

import { AiOutlineDashboard } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { MdOutlineCreate } from 'react-icons/md'
import { GoSignOut } from 'react-icons/go'

import { useAuthState } from 'react-firebase-hooks/auth'
import getDisplayName from '../utils/helpers'

export default function MenuDropdown(): JSX.Element {

  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const signOut = (): void => {
    auth.signOut();
    removeCookies('loggedIn');
    
    router.push('/');
  }

  const userName: string = getDisplayName(user);

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-400 transition ease-out">
            {userName} <HiOutlineUserCircle className='ml-2 mt-1' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item >
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-teal-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Link className='w-full' href='/create-post'>
                      <div className='flex items-center'>
                        <MdOutlineCreate className='mr-2' /> Create post
                      </div>
                    </Link>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-teal-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Link className='w-full' href='/dashboard'>
                      <div className='flex items-center'>
                        <AiOutlineDashboard className='mr-2' /> Dashboard
                      </div>
                    </Link>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                   <button
                   className={`${
                     active ? 'bg-teal-500 text-white' : 'text-gray-900'
                   } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                   onClick={
                     () => signOut()
                   }>
                     <div className='flex items-center'>
                       <GoSignOut className='mr-2' /> Sign out
                     </div>
                   </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}