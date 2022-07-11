import React, { Component } from 'react'
import servcerService from '../services/server.service';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            gameNumber: 0
        }
        this.goHome = this.goHome.bind(this);
    }

    componentDidMount() {
        servcerService.getServerData().then((res) => {
            console.log(res.data);
            this.setState({ gameNumber: res.data.gameNumber });

        }).catch((err) => console.log(err));
    }

    goHome() {
        this.props.history.push('/')
    }

    render() {
        const { gameNumber } = this.state;

        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">

                        <div ><a onClick={() => this.goHome()} className="navbar-brand">FreeChazz</a></div>
                        <div><a href="piecesymbol" className="navbar-brand">Piece</a></div>
                        <div><a href="piecesymbols" className="navbar-brand">Pieces</a></div>
                        <div><a href="chesspiecesymbol" className="navbar-brand">ChessPiece</a></div>
                        <div><a href="chesspiecessymbol" className="navbar-brand">ChessPieces</a></div>
                        <small>Number of Games:{gameNumber}</small>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent