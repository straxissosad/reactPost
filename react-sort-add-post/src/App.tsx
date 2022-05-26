import React, {useState, useMemo, useEffect} from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {
    const initPost: {id: number, title: string, body: string}[] = [];
    const [posts, setPosts] = useState(initPost)
    const [filter, setFilter] = useState({sort:'', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
        const posts = await PostService.getAll();
        setPosts(posts);
    })

    useEffect(() =>{
        fetchPosts()
    },[])

    const createPost = (newPost: any) => {
        setPosts([...posts, newPost]);
        setModal(false)
    }


    //получаем пост из дочернего элемента
    const removePost = (post: any) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='App'>
            <MyButton style={{marginTop:'30px'}} onClick={()=>setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}><Loader /></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>

            }
        </div>
    )
}

export default App;
