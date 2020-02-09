import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios'

class Blog extends Component {
    state = {
        posts: [],
        selectedPost: null
    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response=>{
            const posts = response.data.slice(0,6)
            const modifiedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'lakith'
                }
            })
            this.setState({
                posts : modifiedPosts
            })
        })
    }

    postClickHandler = (id) => {
        this.setState({
            selectedPost : id
        })
    }

    render () {

        // const {posts} = this.state
        // console.log(posts)

        const displayPost = this.state.posts.map(post => (
            <Post
                key = {post.id}
                title = {post.title}
                author = {post.author}
                click = {()=>this.postClickHandler(post.id)}
            />
        ))
        return (
            <div>
                <section className="Posts">
                   {displayPost}
                </section>
                <section>
                    <FullPost 
                       id = {this.state.selectedPost}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;