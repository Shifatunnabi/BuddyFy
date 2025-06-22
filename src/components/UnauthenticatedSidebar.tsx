import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { Separator } from './ui/separator'


async function UnauthenticatedSidebar(){
  return (
    <div className='sticky top-20'>
        <Card>
            <CardHeader>
                <CardTitle className='text-center text-xl font-semibold'>Welcome to BuddyFy!</CardTitle>
            </CardHeader>
            
            <Separator/>

            <CardContent>
                <p className='text-center text-muted-foreground mb-4'> Login to access your profile and connect with your buddies.</p>

                <SignInButton mode='modal'>
                    <Button className='w-full' variant={'outline'}> 
                        Login
                    </Button>
                </SignInButton>

                 <SignUpButton mode='modal'>
                    <Button className='w-full mt-2' variant={'default'}> 
                        Sign Up
                    </Button>
                </SignUpButton>
                
            </CardContent>
        </Card>

    </div>
  )
}

export default UnauthenticatedSidebar