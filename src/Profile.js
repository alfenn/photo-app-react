import React from 'react';

class Profile extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('Profile component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('Profile component mounted');
    }

    render () {
        const user = this.props.user;
        return (
            <header>
                <div>
                    <img src={user.thumb_url} className="pic" alt={"Profile pic for " + user.username}/>
                    <h2>{ user.username }</h2>  
                </div>
            </header>
        );
    }
}

export default Profile;