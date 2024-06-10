import { db } from "@/db_connection"
import { redirect } from "next/navigation"


type Props = {
    params: {
        title: string
    }
}

export default async function Page({params}:Props) {
    const blog = await db.query.blog.findFirst({where:(blog, {eq}) => {
        return eq(blog.title, params.title)
    }})

    if (!blog) {
        redirect("/blogs")
    }
    return <>
        <h1>{params.title} {blog?.content}</h1>
    </>
}