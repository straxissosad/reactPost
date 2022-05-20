import React, { useRef, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    {id:1, title:"JavaScript 1", body:"Description"},
    {id:2, title:"JavaScript 2", body:"Description"},
    {id:3, title:"JavaScript 3", body:"Description"}
  ])

  const[selectedSort, setSelectedSort] = useState('')

  const createPost = (newPost: any) =>{
    setPosts([...posts, newPost]);
  }

  //получаем пост из дочернего элемента
  const removePost = (post:any) =>{
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort:any) =>{
    setSelectedSort(sort);
    setPosts([...posts.sort((a:any,b:any) => a[sort].localeCompare(b[sort]))]);
  }

  return (
    <div className='App'>
      <PostForm create = {createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="сортировка"
          options= {[
            {value:'title', name: "По названию"},
            {value:'body', name: "По описанию"}
          ]}
        />
      </div>
      {posts.length
        ? <PostList  remove={removePost} posts={posts} title="Посты про JS"/>
        : <h1 style={{textAlign: 'center'}}>Посты не были найдены</h1>
      }
    </div>
  )
}
 
export default App;
