"use client"
import React, { useCallback, useState } from 'react'
import {AiOutlineMenu} from "react-icons/ai"
import Image from 'next/image'
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { SafeUser } from "@/app/types";
import Avatar from './Avatar';
import RentModal from '../modals/RentModal';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

export default function UserMenu({currentUser}:UserMenuProps) {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal= useRentModal()
    const [isOpen , setIsOpen]= useState(false);
    const toggleOpen = useCallback(()=>{
        setIsOpen((value)=>!value)
    },[]);
  return (
    <div className='relative'>
    <div className='flex flex-row md:w-auto py-2 justify-center items-center gap-2 '>
        <div onClick={rentModal.onOpen}  className='text-sm  font-semibold px-6 hidden md:block text-center rounded-full hover:bg-neutral-100 py-3 px-4 transition-all cursor-pointer '> Airbnb your home</div>
        <div onClick={toggleOpen} className='bg-white md:py-2 md:px-3 rounded-full border-2 shadow-md flex flex-row gap-3 items-center hover:scale-110'>
            <div className='hidden md:block'> <AiOutlineMenu/> </div>
            <div className=''>
            <Avatar src={currentUser?.image} style="rounded-full block w-12 md:w-7" onClick={function (): void {
                          
                      } }/>
            </div>
        </div>
    </div>
        {
            isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vm] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                        <div className='flex flex-col cursor-pointer'>
                            {currentUser? (
                                <>
                                    <MenuItem label='My trips' onClick={()=>{router.push("/trips")}}/>
                                    <MenuItem label='My favorites'  onClick={() => router.push('/favorites')}/>
                                    <MenuItem label='My reservation'onClick={() => router.push('/reservations')}/>
                                    <MenuItem label='My properties' onClick={() => router.push('/properties')}/>
                                    <MenuItem label='Airbnb my home' onClick={rentModal.onOpen}/>
                                    <hr/>
                                    <MenuItem label='Logout' onClick={signOut}/>
                                </>
                            )
                            :(
                            <>
                                <MenuItem label='Login' onClick={loginModal.onOpen}/>
                                <MenuItem label='Sign up' onClick={registerModal.onOpen}/>
                            </>
                            )}
                        </div>
                </div>
            )
        }
</div>
)
}
