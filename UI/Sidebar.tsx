'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import {HiHome} from 'react-icons/hi2'
import { IoSearch } from "react-icons/io5";
import { Box } from './Box';
import {SideBarItem} from './SideBarItem';
import { Library } from './Library';
import { Song } from '../types';
interface SidebarProps {
    children:React.ReactNode;
    songs:Song[];
}
export const Sidebar:React.FC<SidebarProps> = ({children,songs}) => {
    const pathname = usePathname()
    const routes = React.useMemo(()=>[
        {    
            icon:HiHome,
            label:'Home',
            active:pathname !== '/search',
            href:'/'
        },
        {
            icon:IoSearch,
            label:'Search',
            active:pathname === '/search',
            href:'/search' 
        }
    ],[pathname])
  return (
    <div className="flex h-full">
    <div className='hidden
    md:flex
    flex-col
    gap-y-2 
    h-full 
    w-[300px]
    p-2
     '>
        <Box>
            <div className='
            flex
            flex-col
            gap-y-4
            px-5
            py-4
            '>
                {routes.map((item)=>(
                    <SideBarItem key={item.label} {...item}/>
                ))}
            </div>
        </Box>
        <Box className='overflow-y-auto h-full'> 
        <Library songs={songs}/>
        </Box>
     </div>
     <main className='
     h-full
     flex-1
     overflow-y-auto
     py-2
     '>
        {children}
     </main>
    </div>
  )
}
