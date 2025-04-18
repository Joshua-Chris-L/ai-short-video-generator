import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
import { Textarea } from "@/components/ui/textarea";
function SelectDuration({onUserSelect}) {
    return (
        <div className="mt-7"> 
            <h2 className="font-bold text-2xl text-primary"> Duration  </h2>
            <p className="text-gray-500"> Select the duration of your video </p>
            <Select onValueChange={(value)=>{ 
                value!='Custom Prompt'&&onUserSelect('duration', value)}
                }>
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='30 Secounds'> 30 Secounds  </SelectItem>
                    <SelectItem value='60 Secounds'> 60 Secounds  </SelectItem>
                </SelectContent>
            </Select>
        
        </div>
    )
    
}

export default SelectDuration;