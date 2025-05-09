/* import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId, onClose }) {
  const [videoData, setVideoData] = useState(null);
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (videoId) {
      GetVideoData();
    }
  }, [videoId]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));
    setVideoData(result[0]);
  };

  const handleCancel = () => {
    // Close dialog and navigate
    if (onClose) {
      onClose();  // Ensure onClose is called to close the dialog
    }
    router.push("/dashboard");
  };

  const handleExport = () => {
    // Handle export logic (add your logic here)
    console.log("Exporting video...");
  };

  return (
    <Dialog open={playVideo} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your Video Is Ready
          </DialogTitle>
          <DialogDescription />

          {videoData && (
            <Player
              component={RemotionVideo}
              durationInFrames={Math.round(durationInFrame)}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls
              inputProps={{
                ...videoData,
                setDurationInFrame: (frameValue) =>
                  setDurationInFrame(frameValue),
              }}
            />
          )}

          <div className="flex gap-10 mt-10">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleExport}>Export</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog; */



import React, { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {Player} from '@remotion/player';
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({playVideo, videoId}) {

    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState()
    const [durationInFrame, setDurationInFrame ] = useState(100)
    const router = useRouter()

    useEffect(()=> {
        setOpenDialog(!openDialog)
        videoId && GetVideoData();
    }, [playVideo])

    const GetVideoData = async()=> {
        const result = await db.select().from(VideoData)
        .where(eq(VideoData.id, videoId ))

        //console.log(result)
        setVideoData(result[0])
    }

    return(
        <Dialog open={openDialog}>
            <DialogContent className="bg-white flex flex-col items-center" >
                <DialogHeader>
                </DialogHeader>
                    <DialogTitle className="text-3xl font-bold my-5"> Your Video Is ready</DialogTitle>
                    <Player component={RemotionVideo} 
                        durationInFrames= {Math.round(durationInFrame)}
                        compositionWidth={300} 
                        compositionHeight={450} 
                        fps={30} 
                        controls = {true}
                        inputProps={{ 
                            ...videoData,
                            setDurationInFrame:(frameValue)=>setDurationInFrame(frameValue)
                            }}
                     />
                    <div className="flex gap-10 mt-10">
                        <Button variant="ghost" onClick={()=> {setOpenDialog(false); router.replace('/dashboard') }}> Cancel </Button>
                        <Button> Export </Button>
                    </div>
               
            </DialogContent>
      </Dialog>
      
    )
}

export default PlayerDialog;