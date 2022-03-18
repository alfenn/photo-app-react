import React from 'react';
import {getHeaders} from './utils.js';
import Post from './Post.js';

class Posts extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        // constructor logic
        console.log('Posts component created');
        this.getPosts();
    }

    getPosts() {
        fetch('/api/posts', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            // console.log(data);
            // when you update the state, you trigger the 
            // render()
            this.setState({
                posts: data
            })
        })
    }

    render () {
        // console.log('Posts rendering...', this.state);
        return (
            <div id="posts">
                {
                    this.state.posts.map(post => {
                        return <Post model={post} key={'post-' + post.id}/>
                    })
                }
            </div>
        )
    }
}

export default Posts;