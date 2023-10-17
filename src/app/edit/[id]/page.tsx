"use client"

import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import {SubmitHandler} from 'react-hook-form'
import {useQuery,useMutation} from 'react-query'
import axios from 'axios'
import { useRouter } from "next/navigation";

interface EditPostPageProps {
    params:{
        id:string
    }
}
const EditPostPage:React.FC<EditPostPageProps> = ({params}) => {
        const {id} = params;
        const router = useRouter()

        const {data:postData, isLoading:isLoadingPost} = useQuery({
            queryKey:['posts',id],
            queryFn:async () => {
                const response = await axios.get(`/api/posts/${id}`);
                return response.data
            }
        });

        const {mutate:updatedPost, isLoading:isLoadingSubmit } = useMutation({
            mutationFn:(editedPost:FormInputPost) =>{
                return axios.patch(`/api/posts/${id}` , editedPost)
            },
            onError:(error) => {
                console.log(error)
            },
            onSuccess: () => {
                router.push('/');
                router.refresh()
            }
        })

       if(isLoadingPost){
        return (
            <div className="text-center">
                <span className="loading loading-spinner text-secondary"></span>
            </div>
        )
       }
    const handleEditPost:SubmitHandler<FormInputPost> = (data) => {
       updatedPost(data)
    }
    return(
        <div>
            <h1 className="text-2xl my-4 font-bold text-center">Edit  Post</h1>
            <FormPost
                isLoadingSubmit={isLoadingSubmit}
                submit={handleEditPost} 
                initialValue={postData}
                 isEditing/>
        </div>
    )
}

export default EditPostPage