import React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent
} from "@/components/ui/navigation-menu"
import Image from 'next/image'


export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 p-2 backdrop-blur dark:border-zinc-800">
      <div className="container flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Image src="/vercel.svg" alt="logo" width={60} height={60} />
        </div>
        
        {/* Navigation Menu */}
        <div className="flex justify-center flex-1 ">
          <NavigationMenu>
            <NavigationMenuList className="space-x-5">
              {/* Converter Menu Item with Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Converter
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="bg-white shadow-md rounded-md p-4 space-y-2 dark:bg-zinc-800">
                    <li>
                      <NavigationMenuLink href="/converter/audio" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700">
                        Audio Converter
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="/converter/video" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700">
                        Video Converter
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="/converter/image" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700">
                        Image Converter
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pricing Menu Item */}
              <NavigationMenuItem>
                <NavigationMenuLink href="/pricing">
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  )
}
