"use client"

import { ReactNode } from "react"

export const Center = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full flex justify-center items-center text-center">
            {children}
        </div>
    )
}