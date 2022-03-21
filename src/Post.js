import React from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import {getHeaders} from './utils';

class Post extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.model
        };
        this.requeryPost = this.requeryPost.bind(this);
        // console.log('this.state.post:',this.state.post);
    }

    requeryPost() {
        fetch(`https://photo-app-secured.herokuapp.com/api/posts/${this.state.post.id}`, {
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    post: data,
                    isModalShowing: false // no idea why I have to set this to false
                });                
            });
    }

    componentDidUpdate() {
        console.log('fires after the render() method is invoked');
    }
    
    render () {
        // console.log('re-rendering the post', this.state);
        const post = this.state.post;
        const comments = post.comments;
        const numLikes = this.state.post.likes.length;
        const numComments = this.state.post.comments.length;
        const lastComment = (numComments > 0) ? comments[comments.length - 1] : false;
        if (!post) {
            return (
                <section className="card"></section>
            );
        }
        return (
            <section className="card">
                <div className="header">
                    <h3>{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                <img 
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username } 
                    width="300" 
                    height="300" />
                <div className="info">
                    <div className="buttons">
                        <div>
                            <LikeButton 
                                postId={post.id} 
                                likeId={post.current_user_like_id}
                                requeryPost={this.requeryPost} />
                            <i className="far fa-comment"></i>
                            <i className="far fa-paper-plane"></i>
                        </div>
                        <div>
                            <BookmarkButton 
                                postId={post.id}
                                bookmarkId={post.current_user_bookmark_id}
                                requeryPost={this.requeryPost} />
                        </div>
                    </div>
                    <p className='likes'>
                        <strong>{numLikes} like{numLikes === 1 ? '' : 's'}</strong>
                    </p>      
                    <div className='caption'>
                        <p className='timestamp'>{post.display_time}</p>
                        <p>
                            <strong>{post.user.username}</strong>
                            {post.caption}
                        </p>
                    </div>  
                    {numComments > 1 &&
                        <button className='link' onClick={() => console.log('modal event triggered')}>
                            View all {numComments} comments
                        </button>
                    }
                    {numComments > 0 &&
                        <div className='comments'>
                            <div>
                                <p><strong>{lastComment.user.username}</strong>
                                {lastComment.text}</p>
                            </div>
                            <p className='timestamp'>{lastComment.display_time}</p>
                        </div>
                    }      
                    <AddComment 
                        postId={post.id}
                        requeryPost={this.requeryPost} />
                </div>
            </section> 
        );     
    }
}
export default Post;