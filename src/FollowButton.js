import React from 'react';
import {getHeaders} from './utils';

class FollowButton extends React.Component {  

    constructor(props) {
        super(props);
        this.toggleFollow = this.toggleFollow.bind(this);
        this.followUser = this.followUser.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
    }

    toggleFollow = ev => {
        const elem = ev.currentTarget;
        if (elem.innerHTML === 'follow') {
            this.followUser(elem.dataset.userId, elem);
        } else {
            this.unfollowUser(elem.dataset.followingId, elem);
        }
        
    };

    followUser(userId, elem) {
        const postData = {
            "user_id": userId
        };
        
        fetch(`/api/following`, {
                headers: getHeaders(),
                method: 'POST',
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                elem.innerHTML = 'unfollow';
                // in the event we want to unfollow
                elem.setAttribute('data-following-id', data.id);
                elem.setAttribute('aria-checked', 'true');
            })
    }


    unfollowUser = (followingId, elem) => {
        const deleteURL = `/api/following/${followingId}`;
        fetch(deleteURL, {
            method: "DELETE",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            elem.innerHTML = 'follow';
            elem.removeAttribute('data-following-id');
            elem.setAttribute('aria-checked', 'false');
        });
    };


    render () {
        const followingId = this.props.followingId;
        return (
            <button 
            role="switch"
            className="link following" 
            aria-label={"Follow" + this.props.username}
            aria-checked="false"
            data-user-id={followingId}
            onClick={this.toggleFollow}>follow</button>

        ) 
    }
}

export default FollowButton;