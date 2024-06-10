import React from "react";
import { Blog } from "../schema";

type Props = {
   blogsthatcomponentexcpects:Blog[]
}

export default function BlogsList({blogsthatcomponentexcpects}:Props) {
  return (
    <div>
      {blogsthatcomponentexcpects.map((blog) => {
        return (
          <li>
            <a href={`/blogs/${blog.title}`}>{blog.title}</a>
          </li>
        );
      })}
    </div>
  );
}
