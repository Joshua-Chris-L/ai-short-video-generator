import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function EmptyState() {
    return(
        <div className="p-5 flex item-center py-24 flex-col mt-10 border-2 border-dashed "> 
            <h2> You dont have any short video created </h2>
            <Link href={'dashboard/create-new '}>
                <Button > Create new short videos </Button>
            </Link>
        </div>
    )
}

export default EmptyState;