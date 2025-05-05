"use client"
import React, { useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { useContext } from "react";
import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import { Users, VideoData } from "@/configs/schema";
import PlayerDialog from "../_components/PlayerDialog";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const VideoSCRIPT = [
    {
      "imagePrompt": "A cave painting depicting early hominids hunting mammoths, realistic style, vibrant colors",
      "ContentText": "3-5 million years ago: The earliest hominids emerge in Africa, developing basic tools and hunting in groups."
    },
    {
      "imagePrompt": "A bustling Neolithic village with people farming and building structures, warm lighting, detailed scene",
      "ContentText": "10,000 BC: The Neolithic Revolution – agriculture and settled life lead to population growth and the development of villages."
    }
  ]
const scriptData = `Once upon a time, in a land far away... 
    There lived a princess named Lucy who loved adventure. One day, she decided to go on a quest to find 
    a magical flower. On her journey she encountered a fearsome dragon guarding the flower. But with courage and kindness, 
    she befriended the dragon. Together they shared the flower's magic. And Lucy, with a heart full of joy, fell fast asleep.
    The End `
const FILEURL = 'https://firebasestorage.googleapis.com/v0/b/newp-f68bc.firebasestorage.app/o/ai-short-videos-files%2F02ebfe6f-af34-4b91-9331-00d9792ef9be.mp3?alt=media&token=073d23c8-6035-4cf3-bf63-5e3790d5378b'
function CreateNew() {


    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [videoScript, setVideoScript] = useState()
    const [audioFileUrl, setAudioFileUrl] = useState()
    const [captions, setCaptions] = useState()
    const [imageList, setImageList]=useState()
    const [playVideo, setPlayVideo] = useState(true)
    const [videoId, setVideoId] = useState()
    const {videoData, setVideoData} = useContext(VideoDataContext)
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    const {user} = useUser()
    const onHandleInputChange = (fieldName, fieldValue)=> {
        console.log(fieldName, fieldValue)

        setFormData(prev=> ({
            ...prev,
            [fieldName]:fieldValue
        }))
    }

    const onCreateClickHandler=()=> {

      /*   if (!userDetail?.credits>=0) {
            toast("You dont have enough Credits")

            return;
        } */
        GetVideoScript();

        //GenerateAudioFile(scriptData)
        //GenerateAudioCaption(FILEURL)
        //GenerateImage();
    }

    // Get Video Script
    const GetVideoScript = async () => {
        const prompt = `Write a script to generate ${formData.duration} video on the topic: ${formData.topic} along
        with AI image prompt in ${formData.imageStyle} format for each scene and give me results in JSON format with 
        ImagePrompt and ContentText as fields, No Plain text`;
        console.log(prompt)
        const resp = await axios.post('/api/get-video-script', {
        prompt:prompt
       })
       if(resp.data.result) {
            setVideoData(prev => ({
                ...prev,
                'videoScript':resp.data.result
            }))
            console.log(resp.data.result)
            setVideoScript(resp.data.result)
            resp.data.result && await GenerateAudioFile(resp.data.result)
       }
    }

    // Generate the Audio File and save to firebase storage
    const GenerateAudioFile = async(videoScriptData) => {
        let script = ''
        const id = uuidv4()
        const dynamicKey = Object.keys(videoScriptData)[0]

         videoScriptData[dynamicKey].forEach(scene => {
            script = script+scene.ContentText+' ';
          })  

        const resp = await axios.post('/api/generate-audio', {
            text:script,
            id:id
        })
        setVideoData(prev => ({
            ...prev,
            'audioFileUrl':resp.data.Result
        }))
        // setAudioFileUrl(resp.data.Result)
       resp.data.Result&&GenerateAudioCaption(resp.data.Result, videoScriptData)
    }

    //Used to generate Caption from audio file
    const GenerateAudioCaption=async(fileUrl, videoScriptData)=> {
       const resp =  await axios.post('/api/generate-caption', {
            audioFileUrl:fileUrl
        })  
        
        setCaptions(resp?.data?.result)
        setVideoData(prev => ({
            ...prev,
            'captions':resp.data.result
        }))
       resp.data.result && await GenerateImage(videoScriptData)
    }  

    // Used to generate Ai Images real is videoScript from useState above 
   const GenerateImage = async(videoScriptData)=> {
    let images = []
    const dynamicKey = Object.keys(videoScriptData)[0]
    videoScriptData[dynamicKey].forEach( async(scene) => {
        const resp= await axios.post('/api/generate-image', {
            prompt:scene.ImagePrompt
        })
        images.push(resp.data.result)
        setVideoData(prev => ({
        ...prev,
        'imageList':images
         }))  
     })  
   
    }

    useEffect(()=> {
        console.log(videoData)
        if (Object.keys(videoData).length==4){
            SaveVideoData(videoData);
        }
    }, [videoData])

    const SaveVideoData = async (videoData)=> {
        setLoading(true)
        const result = await db.insert(VideoData).values({
            script:videoData?.videoScript,
            audioFileUrl: videoData?.audioFileUrl,
            captions:videoData?.captions,
            imageList:videoData?.imageList,
            createdBy:user?.primaryEmailAddress?.emailAddress
        }).returning({id: VideoData?.id })
        //console.log(result)
        await UpdateUserCredits()
        setVideoId(result[0].id)
        setPlayVideo(true)
        setLoading(false)
    }

    /* Used to update user credits */
    const UpdateUserCredits=async()=> {
        const result = await db.update(Users).set({
            credits:userDetail?.credits-10
        }).where(eq(Users?.email, user?.primaryEmailAddress?.emailAddress))

        console.log(result)

        setUserDetail(prev =>({
             ...prev,
             "credits": userDetail?.credits-10
        }))
    }
    
    return (
        <div className="md:px-20">
            <h2 className="font-bold text-4xl text-primary text-center"> Create New </h2>
            <div className="mt-10 shadow-md p-10 "> 
                {/* Select Topic */} 
                <SelectTopic  onUserSelect={onHandleInputChange}/>
                {/* Select Style */}
                <SelectStyle onUserSelect={onHandleInputChange} />
                {/* Duration */ }
                <SelectDuration onUserSelect={onHandleInputChange}/>
                {/*Create Button */}
                <Button className='mt-10 w-full' onClick={onCreateClickHandler}> Create Short Video </Button>
            </div>

            <CustomLoading loading={loading} />
            <PlayerDialog playVideo={playVideo} videoId={videoId} />
        </div> 
    )
}

export default CreateNew;