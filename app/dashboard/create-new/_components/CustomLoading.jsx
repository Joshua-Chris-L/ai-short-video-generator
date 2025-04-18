import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from "next/image";
  

function CustomLoading({loading}) {
    return (
        <AlertDialog open={loading}>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogContent>
                <div className="bg-white flex  flex-col items-center my-10 justify-center"> 
                    <Image src={'/loading.gif'}  width={100} height = {100} alt="loading_image"/>
                    <h2> Generating your video. Do not refresh </h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomLoading;