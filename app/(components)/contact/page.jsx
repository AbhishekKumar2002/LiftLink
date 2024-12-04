"use client"
import React from 'react'
import { SignupFormDemo } from './SignupFormDemo'
import { LampDemo } from '@/components/ui/lamp'
import { Vortex } from '@/components/ui/vortex'


const page = () => {
  return (
    <div className="mt-3 mx-auto rounded-md  h-full overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10  w-full h-full"
      >
    <div className='mt-20 mb-20'>
      {/* <LampDemo/> */}
      <SignupFormDemo/>
    </div>
    </Vortex>
    </div>
  )
}

export default page