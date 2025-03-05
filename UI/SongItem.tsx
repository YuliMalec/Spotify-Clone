'use client'
import React from 'react'
import { Song } from '../types';
import useLoadImage from '../hooks/useLoadImage';

interface SongItemProps{
    data:Song;
    onClick:(id:string)=>void;
}

export const SongItem:React.FC<SongItemProps> = ({data,onClick}) =>{
    const imagePath = useLoadImage(data)
  return (
    <div>SongItem</div>
  )
}
