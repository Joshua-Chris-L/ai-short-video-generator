import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useContext } from "react";
import { UserDetailContext } from "@/app/_context/UserDetailContext";

function Header() {
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    return (
        <div className="flex p-3 px-5 items-center justify-between shadow-md">
            <div className="flex gap-3 item-center">
                <Image src={'/Logo.png'} alt="Logo.png" 
                width={40} height={40}
                /> 
                <h2 className="font-bold text-xl "> Ai Short Video </h2>
            </div>
            
            <div className="flex gap-3 flex  items-center">
                <div className="flex gap-2 items-center"> 
                    <Image src={'/star.png'} alt="coin" width={20} height={20}   />
                    <h2>{userDetail?.credits} </h2>
                </div>
                <Button> Dashboard </Button>
                <UserButton />
                
            </div>
        </div>
    )
}

export default Header;