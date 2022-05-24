import React, {useRef, useState, useMemo} from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "JavaScript 1", body: "Description"},
        {id: 2, title: "JavaScript 2", body: "Description"},
        {id: 3, title: "JavaScript 3", body: "Description"}
    ])

    const [filter, setFilter] = useState({sort:'', query: ''})

    const sortedPosts = useMemo(() =>{
        if (filter.sort)
            return [...posts.sort((a: any, b: any) => a[filter.sort].localeCompare(b[filter.sort]))]
        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(()=>{
        return sortedPosts.filter((post:any) => post.title.toLowerCase().includes(filter.query))
    }, [filter.query,sortedPosts])

    const createPost = (newPost: any) => {
        setPosts([...posts, newPost]);
    }

    //получаем пост из дочернего элемента
    const removePost = (post: any) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='App'>
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
        </div>
    )
}

export default App;
