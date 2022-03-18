import React from 'react';
import NavBar from './NavBar';
import Profile from './Profile';
import Stories from './Stories';
import Suggestions from './Suggestions';
import Posts from './Posts';
import {getHeaders} from './utils.js';

class App extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            user: []
        }
        // constructor logic
        console.log('App component created');
        this.getUser();
    }

    getUser() {
        fetch('/api/profile/', {
            method: "GET",          // TODO: unnecessary?
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            console.log('userprofile loaded');
            // console.log(data);
            // when you update the state, you trigger the 
            // render()
            this.setState({
                user: data
            })
        })
    }

    render () {
        return (
            <div>
                <NavBar title="Photo App" username={this.state.user.username} />
                <aside>
                    <Profile user={this.state.user}/>
                    <Suggestions />
                </aside>

                <main className="content">
                    <Stories />
                    <Posts />
                </main>
            </div>
        );
    }
}

export default App;