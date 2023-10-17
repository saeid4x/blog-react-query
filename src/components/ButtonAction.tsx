"use client"

import { Pencil,Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import {useMutation} from 'react-query';
import axios from 'axios';
import { useRouter } from "next/navigation";

interface ButtonActionProps {
    id:string
}

const ButtonAction:React.FC<ButtonActionProps> = ({id}) => {
    const router = useRouter()

    const {mutate:deletePostMutate, isLoading} = useMutation({
        mutationFn:async () => {
            return axios.delete(`/api/posts/${id}`)
        },
        onError:(error) => {
            console.log(error);
            
        },
        onSuccess: () => {
            router.push('/');
            router.refresh()
        }

    })
    return(
        <div>
            <Link href={`/edit/${id}`} className="btn mr-2"><Pencil />Edit</Link>
            <button className="btn btn-error" onClick={() => deletePostMutate()}> 
                {isLoading && <span className="loading loading-dots loading-lg"></span>}
                {isLoading ? 'Loading...' : (
                    <>
                        <Trash2 />
                        Delete                    
                    </>
                )}
             </button>
        </div>
    )
}

export default ButtonAction;