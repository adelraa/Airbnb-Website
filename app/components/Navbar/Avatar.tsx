import React from 'react'
import Image from 'next/image'
interface Avatarprops{
  src :string |null |undefined;
  style :string;
  onClick: ()=> void;
}

export default function Avatar({src,style,onClick}:Avatarprops) {
  return (
    <Image src={src || "/placeholder.jpg"} onClick={onClick} className={style} alt="pho" width={100} height={100}></Image>
  )
}
