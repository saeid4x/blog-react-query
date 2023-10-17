import Link from "next/link"
import {Tag} from '@prisma/client'

interface PostCardProps {
    post:{
        id:string,
        title:string,
        content:string,
        tag:Tag
    }
}
const PostCard:React.FC<PostCardProps> = ({post}) => {
    const {title, content, tag, id} = post;
    return(
        <div className="card w-full bg-base-100 shadow-xl border">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content.slice(0,90)}</p>
                <div className="card-actions justify-end">
                <div className="badge badge-primary">{tag.name}</div>
                   <Link href={`/blog/${id}`} className="hover:underline">React more...</Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard