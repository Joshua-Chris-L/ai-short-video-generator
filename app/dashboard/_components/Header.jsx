import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

function Header() {
    return (
        <div className="flex p-3 px-5 items-center justify-between shadow-md">
            <div className="flex gap-3 item-center">
                <Image src={'/Logo.png'} alt="Logo.png" 
                width={40} height={40}
                /> 
            </div>
            
            <div className="flex gap-3 flex  items-center">
                <h2 className="font-bold text-xl "> Ai Short Video </h2>
                <Button> Dashboard </Button>
                <UserButton />
                
            </div>
        </div>
    )
}

export default Header;