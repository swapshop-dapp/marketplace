"use client"

import Image, { ImageProps } from 'next/image'
import React from 'react'

export const BaseImage = (props: ImageProps) => {
  return (
    <Image
        {...props}
        width={'100'}
        height={'100'}
        alt={props.alt}
        loading='lazy'
        className={`object-contain w-full h-full ${props.className}`}
    />
  )
}

BaseImage