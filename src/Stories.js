import React from 'react';
import {getHeaders} from './utils.js';

class Stories extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        this.state = {
            stories: []
        }
        console.log('Stories component created');
        this.getStories();
    }

    componentDidMount() {
        // fetch posts
        console.log('Stories component mounted');
    }

    getStories() {
        fetch("https://photo-app-secured.herokuapp.com/api/stories/", {
            method: "GET",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log('stories loaded');
            // console.log(data);

            this.setState({
                stories: data
            });
        });
    }

    render () {
        return (
            <header className="stories">
                {this.state.stories.map(story => {
                    return (<div key={story.id}>
                                <img src={story.user.thumb_url}
                                    className='pic' 
                                    alt={'profile pic for '+story.user.username}></img>
                                <p>{story.user.username}</p>
                            </div>);
                    })
                }
            </header>  
        );
    }
}

export default Stories;