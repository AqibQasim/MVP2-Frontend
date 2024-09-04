import React from 'react'
import Heading from './Heading'
import "@/styles/globals.css";

export default function GradientText({children}) {
  return (
    <Heading>{
      <span className='gradient-text'>
        {children}
      </span>
    }</Heading>
  )
}
