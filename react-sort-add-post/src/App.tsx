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
import {getPageCount, getPagesArray} from "./utils/page";
import Pagination from "./pagination/Pagination";

function App() {
    const initPost: {id: number, title: string, body: string}[] = [];
    const [posts, setPosts] = useState(initPost)
    const [filter, setFilter] = useState({sort:'', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count']
        // @ts-ignore
        setTotalPages(getPageCount(totalCount, limit))
    });

    useEffect(() =>{
        fetchPosts()
    },[page])

    const createPost = (newPost: any) => {
        setPosts([...posts, newPost]);
        setModal(false)
    }


    //получаем пост из дочернего элемента
    const removePost = (post: any) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page: any) => {
      setPage(page);
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
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    )
}

export default App;
