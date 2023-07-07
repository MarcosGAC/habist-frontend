import React from 'react'
interface HabitProps{
    completed:number
}

export default function Habit(props:HabitProps) {
  return (
    <div className='text-violet-700 h-10 w-10 m-2 flex justify-center items-center  bg-black'>{props.completed}</div>
  )
}
