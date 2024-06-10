import React, { useEffect, useState } from "react";
import { db } from "@/db_connection";
import BlogsList from "@/components/BlogsList";

export default async function Page() {
    const blogsfromdb = await db.query.blog.findMany();


    return (
        <>
            <section>
                <h2>Blogs</h2>
                <ul>
                    <BlogsList blogsthatcomponentexcpects={blogsfromdb} />
                </ul>
            </section>
        </>
    )
}
