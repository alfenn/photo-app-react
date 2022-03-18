import React from 'react';
import FollowButton from './FollowButton';

class Suggestion extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            suggestion: this.props.model
        };
    }

    componentDidUpdate() {
        console.log('fires after the render() method is invoked');
    }
    
    render () {
        // console.log('re-rendering the Suggestion', this.state);
        const suggestion = this.state.suggestion;
        return (
            <section id={"suggestion-" + suggestion.id}>
                <img src={suggestion.thumb_url} className="pic" alt={"Profile pic for " + suggestion.username} />
                <div>
                        <p>{suggestion.username}</p>
                        <p>suggested for you</p>
                </div>
                <div>
                    <FollowButton 
                                followingId={suggestion.id}
                                username={suggestion.username}/>
                </div>
            </section>
        );     
    }
}
export default Suggestion;