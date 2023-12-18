"use client"
import Container from "../container";
import Avatar from "./Avatar";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import { useRouter } from 'next/navigation';


interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  const router = useRouter();

  return ( 
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          
          <Avatar src={"/logo.png"} onClick={() => router.push('/')} style=' md:block cursor-pointer '/>
        
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
  </div>
  );
}


export default Navbar;