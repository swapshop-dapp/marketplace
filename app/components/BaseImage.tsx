"use client"

import Image, { ImageProps } from 'next/image'
import React from 'react'

export const BaseImage = (props: ImageProps) => {
  return (
    <Image
        width={'100'}
        height={'100'}
        className={`size-full object-contain ${props.className}`}
        {...props}
        alt={props.alt}
        loading='lazy'
    />
  )
}

BaseImage