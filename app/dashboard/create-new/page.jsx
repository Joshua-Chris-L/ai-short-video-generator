"use client"
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';

const scriptData = `Once upon a time, in a land far away... 
    There lived a princess named Lucy who loved adventure. One day, she decided to go on a quest to find 
    a magical flower. On her journey she encountered a fearsome dragon guarding the flower. But with courage and kindness, 
    she befriended the dragon. Together they shared the flower's magic. And Lucy, with a heart full of joy, fell fast asleep.
    The End `
function CreateNew() {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [videoScript, setVideoScript] = useState()
    const onHandleInputChange = (fieldName, fieldValue)=> {
        console.log(fieldName, fieldValue)

        setFormData(prev=> ({
            ...prev,
            [fieldName]:fieldValue
        }))
    }

    const onCreateClickHandler=()=> {
        //GetVideoScript();
        GenerateAudioFile(scriptData)
    }

    // Get Video Script
    const GetVideoScript = async () => {
        setLoading(true)
        const prompt = `Write a script to generate ${formData.duration} video on the topic: ${formData.topic} along
        with AI image prompt in ${formData.imageStyle} format for each scene and give me results in JSON format with 
        ImagePrompt and ContentText as fields, No Plain text`;
        console.log(prompt)
        const result = await axios.post('/api/get-video-script', {
        prompt:prompt
       }).then(resp=> {
        console.log(resp.data.result);
        setVideoScript(resp.data.result);
        GenerateAudioFile(resp.data.result);
       })
       setLoading(false)
    }

    const GenerateAudioFile = async(videoScriptData) => {
        setLoading(true)
        let script = ''
        const id = uuidv4()
/*         const dynamicKey = Object.keys(videoScriptData)[0]

         videoScriptData[dynamicKey].forEach(scene => {
            script = script+scene.ContentText+' ';
          })   */

          
         
        await axios.post('/api/generate-audio', {
            text:videoScriptData,
            id:id
        }).then( resp => {
            console.log(resp.data)
        })
        setLoading(false)
        
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
        </div> 
    )
}

export default CreateNew;