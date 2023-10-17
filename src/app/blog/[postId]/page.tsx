import BackButton from "@/components/BackButton"
import ButtonAction from "@/components/ButtonAction"
import { db } from "@/lib/db"



interface BlogDetailsPageProps {
    params: {
        postId: string
    }
}

const getPost = async (postId:string) => {
    const response = await db.post.findFirst({
        where:{
            id:postId
        },
        select:{
            id:true,
            title:true,
            content:true,
            tag:true
        }
    });

    return response 
}

// @ts-ignore
const BlogDetailsPage: React.FC<BlogDetailsPageProps> = async ({params}) => {
     const post = await getPost(params.postId);
     
    return(
        <div>
            <BackButton />
            <div className="mb-8">
              <h2 className="text-2xl font-bold my-4">{post?.title}</h2>
              <ButtonAction id={params.postId} />
            </div>
            <div className="badge badge-primary">{post?.tag.name}</div>
            <p className="text-slate-700">{post?.content}</p>
        </div>
    )
}

export default BlogDetailsPage