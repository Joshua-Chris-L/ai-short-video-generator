import React, { useState } from "react";
import Image from "next/image";

function SelectStyle({onUserSelect}) {
    const styleOptions = [

        {
            name:'Realistic',
            image: '/real.png'
        },
        {
            name:'Cartoon',
            image: '/Cartoon.png'
        },
        {
            name:'Comic',
            image: '/Comic.jpg'
        },
        {
            name:'WaterColor',
            image: '/WaterColor.png'
        },
        {
            name:'GTA',
            image: '/GTA.png'
        },
    ]

    const [selectedOption, setSelectedOption] = useState();
    return (
        <div> 
             <h2 className="font-bold text-2xl text-primary"> Style </h2>
             <p className="text-gray-500"> Select your video style </p>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-3">
                {styleOptions.map((items, index)=> ( 
                    <div key={index} 
                    className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl
                    ${selectedOption==items.name&&'border-4 border-primary'}
                    `}> 
                        <Image src={items.image} width={100} height={100} alt="AI Images"
                        className="h-48 object-cover rounded-lg w-full"
                        onClick={()=> {
                            setSelectedOption(items.name)
                            onUserSelect('imageStyle', items.name)
                        }}
                        />
                        <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg"> 
                            { items.name} 
                        </h2>
                    </div>
                ))}
             </div>
        </div>
    )
}

export default SelectStyle;
