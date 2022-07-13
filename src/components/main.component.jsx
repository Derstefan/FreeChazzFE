import React, { Component } from 'react'
import mainService from '../services/main.service';
import { Button, TextField, ThemeProvider, Typography } from '@mui/material';
import Design from '../game/themes/Design';
import pic1 from '../pics/1.png';
import pic2 from '../pics/5.png';
import pic3 from '../pics/3.png';


class MainComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
        this.newGame = this.newGame.bind(this);
    }

    newGame() {
        const { history } = this.props;
        history.push("/newgame")
    }

    render() {
        return (
            <div>
                <div class="m-5" >

                    <ThemeProvider theme={Design.theme1}>
                        <Typography><h2>Free Chazz</h2></Typography>
                        <Typography>a chess-like game with random pieces, random movement patterns and random positions</Typography>
                        <div class="row">
                            <img class="p-3" width={320} src={pic1} />
                            <img class="p-3" width={320} height={240} src={pic3} />
                            <img class="p-3" width={400} height={275} src={pic2} />

                        </div>
                        <br /> <br />

                        <Button color="neutral" variant="outlined" onClick={this.newGame}>Start a New Game</Button>

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />     <br />
                        <br />
                        <br />     <br />
                        <br />
                        <br />     <br />
                        <br />
                        <br />
                        <Typography>if you are interested, just write me</Typography>
                        <Typography variant="subtitle1">freechazz42[at..]gmail[dot]com</Typography>
                    </ThemeProvider>
                </div>
            </div>
        )
    }
}

export default MainComponent