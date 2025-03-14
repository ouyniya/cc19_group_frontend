import React from 'react'
import { Loader } from 'lucide-react';

function Buttons({ isSubmitting, label }) {
  return (
    <button 
    type='submit'
    // className='bg-blue-700 text-amber-50 p-3 rounded-xl cursor-pointer'
    className="btn border-0 rounded-xl text-2xl text-white w-80 h-15 bg-[#086BAF]"
  >{
    isSubmitting ? <div className='flex gap-2'><Loader className='animate-spin'/>Loading...</div> : <p>{label}</p> 
  }</button>
  )
}

export default Buttons;