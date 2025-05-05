import React, { useEffect, useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  setDurationInFrame,
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Compute total duration in frames safely
  const durationFrame = useMemo(() => {
    if (!captions || captions.length === 0) return 0;
    return (captions[captions.length - 1].end / 1000) * fps;
  }, [captions, fps]);

  // Set the total duration once computed
  useEffect(() => {
    if (durationFrame > 0) {
      setDurationInFrame(durationFrame);
    }
  }, [durationFrame, setDurationInFrame]);

  // Return computed duration (used in mapping images)
  const getDurationFrame = () => {
    return durationFrame;
  };

  // Get the current caption based on current frame
  const getCurrentCaptions = () => {
    const currentTime = (frame / fps) * 1000; // frame to ms
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption ? currentCaption.text : "";
  };

  return script && (
    <AbsoluteFill className="bg-black">
      {imageList?.map((item, index) => 
     { 
        const startTime = (index * getDurationFrame()) / imageList.length
        const duration = getDurationFrame()

        const scale=(index)=> interpolate(
            frame, 
            [startTime, startTime+duration/2, startTime+duration], //Zoom in and Zoom out Logic
            index%2==0 ?[1,1.8,1]:[1.8,1,1.8] ,
            {extrapolateLeft:'clamp', extrapolateRight:'clamp'}
        )
        return (
        <Sequence
          key={index}
          from={startTime}
          durationInFrames={getDurationFrame()}
        >
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <Img
              src={item}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform:`scale(${scale(index)})`
              }}
            />
            <AbsoluteFill
              style={{
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                bottom: 50,
                height: 150,
                textAlign: "center",
                width: "100%",
              }}
            >
              <h2 className="text-2xl">{getCurrentCaptions()}</h2>
            </AbsoluteFill>
          </AbsoluteFill>
        </Sequence>
      ) } )}

      {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
  );
}

export default RemotionVideo;




/* import React, { useEffect, useMemo } from "react"
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

function RemotionVideo({ script, imageList, audioFileUrl, captions, setDurationInFrame }) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame()


  const durationFrame = useMemo(() => {
    if (!captions || captions.length === 0) return 0;
    return (captions[captions?.length - 1]?.end / 1000) * fps;
  }, [captions, fps]);

  useEffect(() => {
    setDurationInFrame(durationFrame);
  }, [durationFrame, setDurationInFrame]);

  const getDurationFrame = () => {
    return durationFrame;
  };
   const getDurationFrame = () => {
    setDurationInFrame((captions[captions?.length - 1]?.end/1000)*fps)
    return (captions[captions.length - 1].end/1000)*fps;
  };
 

  const getCurrentCaptions = ()=> {
    const currentTime = frame/30*100 //Convert frame number to milisecounds
    const currentCaption = captions.find((word)=>currentTime>=word.start && currentTime<=word.end )
    return currentCaption?currentCaption?.text:'';
  }

  return (
    <AbsoluteFill className="bg-black">
      
      {imageList?.map((item, index) => (
        <Sequence
          key={index}
          from={(index * getDurationFrame()) / imageList?.length}
          durationInFrames={getDurationFrame()}
        >   
        <AbsoluteFill style={{justifyContent:'center', alighItems:'center'}}>
          <Img
            src={item}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <AbsoluteFill style={{color:'white', justifyContent:'center', top:undefined, 
            bottom:50, height:150, textAlign:'center', width:'100%'}}> 
            <h2 className="text-2xl "> {getCurrentCaptions()} </h2>
          </AbsoluteFill>
          </AbsoluteFill>
        </Sequence>
      ))}

    {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
   
  );
}

export default RemotionVideo;
 */