'use client'
import { FC } from 'react'

type ButtonProps = {
  onClick: any;
  message: string;
  extraStyles?: string;
}

const Button: FC<ButtonProps> = ({onClick, message, extraStyles}) => {

  const style = `lg:max-w-[70%] border border-indigo-900 bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full ${extraStyles}`
  return(
    <button className={style} onClick={onClick}>{message}</button>
  )

}
export default Button