"use client"
import React from 'react';
import { FormInputPost } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form"
import { useQuery,useMutation } from 'react-query';
import axios from 'axios';
import {Tag} from '@prisma/client'
import { useRouter } from 'next/navigation';

interface FormPostProps {
    submit: SubmitHandler<FormInputPost>;
    isEditing: boolean;
    initialValue?:FormInputPost;
    isLoadingSubmit:boolean
}
const FormPost:React.FC<FormPostProps> = ({submit,isEditing,initialValue,isLoadingSubmit}) => {
    const router = useRouter()
    const {register, handleSubmit} = useForm<FormInputPost>({
        defaultValues:initialValue
    });

    // fetch list tags     
    const {data: dataTags, isLoading: isLoadingTags} = useQuery<Tag[]>({
        queryKey:['tags'],
        queryFn:async () => {
            const response = await axios.get('/api/tags');
            return response.data;
        }
    });



    return(
       <form 
           onSubmit={handleSubmit(submit)}
           className="flex flex-col items-center justify-center gap-5 mt-10">
        <input
            {...register("title",{required:true})}
            type="text" 
            placeholder="post title..." 
            className="input input-bordered w-full max-w-lg"             
            />
        <textarea 
             {...register("content",{required:true})}
             className="textarea textarea-bordered w-full max-w-lg " 
             placeholder="post content..."></textarea>

        {isLoadingTags ? (<span className="loading loading-infinity loading-lg"></span> ): 
            ( <select 
                {...register("tagId",{required:true})}
                defaultValue=""
                className="select select-bordered w-full max-w-lg">
                <option disabled value=''>Select Tags</option>
                {dataTags?.map((item) => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                ))}
            
            </select>) 
        }    

        <button type="submit" className="btn btn-primary w-full max-w-lg">
             {isLoadingSubmit && <span className="loading loading-infinity loading-lg"></span>}
             {isEditing ? (isLoadingSubmit ? 'Updating...' : 'Update') : (isLoadingSubmit ? 'Creating...' : 'Create')}
             </button>
       </form>
    )
}

export default FormPost