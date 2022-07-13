import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import icon from '../icon.png';



class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
        }


    }

    render() {

        return (
            <div>
                <header>
                    <nav class="navbar navbar-expand-md sidebar navbar-dark bg-dark">
                        <img src={icon} />
                        <div class="pl-3"><Link style={{ color: 'white' }} to='/'>Free Chazz</Link></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent