import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const SignUpPage = () => {
  return (
    <div className='relative w-full h-screen md:h-[760px] bg-green-100 overflow-hidden'>
      <div className="min-h-screen flex flex-col tomuted/20">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className='text-3xl font-bold tracking-tight text-green-600'>Create your Account</h1>
              <p>Start organizing your thoughts and ideas today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage