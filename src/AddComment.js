import React from 'react';
import {getHeaders} from './utils';

class AddComment extends  React.Component {  

    constructor(props) {
        super(props);        
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.requeryPost = this.props.requeryPost.bind(this);        
        this.add = this.add.bind(this);

        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    focusTextInput() {
        this.textInput.current.focus();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    add (ev) {
        console.log(ev.target.type);
        ev.preventDefault();
        const elem = ev.currentTarget;
        const commentId = 'comment-for-' + elem.dataset.postId;
        const postData = {
            "post_id": this.props.postId,
            "text": this.state.value
        };
        fetch("/api/comments", {
            method: "POST",
            headers:  getHeaders(),
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('post button add event triggered');
            this.requeryPost();
            this.setState({
                value: ""
            });
            this.focusTextInput();
        });
        
    }

    _handleKeyDown = (ev) => {
        if (ev.key === 'Enter') {
            this.add(ev);
        }
    }

    render () {
        return (
            <form className='add-comment'>
                <div className="input-holder">
                     <input className="comment-textbox" aria-label="Add a comment" 
                            placeholder="Add a comment..."
                            value={this.state.value} 
                            onChange={this.handleChange}
                            ref={this.textInput}
                            onKeyDown={this._handleKeyDown}></input>
                </div>
                <button className="link" onClick={this.add}>Post</button>
          
            </form>
        ) 
    }
}

export default AddComment;