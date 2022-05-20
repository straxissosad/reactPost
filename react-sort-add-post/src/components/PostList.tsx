import React, {useState} from "react";
import PostItem from "./PostItem";

const PostList = ({posts, title, remove}:any) =>{
    return(
        <div>
            <h1 style={{textAlign: "center"}}>{title}</h1>
            {posts.map( (post: any, index: any) => 
                <PostItem remove={remove} number={index} post={post} key= {post.id}/>
            )}
        </div>
    )
}

export default PostList;