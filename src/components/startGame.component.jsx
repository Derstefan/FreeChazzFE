import React, { Component } from 'react'
import mainService from '../services/main.service';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material';
import Design from '../game/themes/Design';

class StartComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "player1",
            seed: "",
            size: "small",
            type: "sp",
            isActive: false
        }
        this.changeName = this.changeName.bind(this);
        this.changeSeed = this.changeSeed.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.changeType = this.changeType.bind(this);
        this.startGame = this.startGame.bind(this);
    }


    startGame() {
        const { name, seed, size, type } = this.state;
        const { history } = this.props;

        const realSize = size !== "" ? size : null;


        const params = { seed: seed, size: realSize, type: type };
        mainService.startNewGameWithParams(name, params).then((res) => {
            console.log(res.data);
            localStorage.setItem("auth", JSON.stringify(res.data))
            history.push("/game");
        });
    }




    changeName(event) {
        this.setState({ name: event.target.value });
    }

    changeSeed(event) {
        this.setState({ seed: event.target.value });
    }

    changeSize(event) {
        this.setState({ size: event.target.value });
    }
    changeType(event) {
        this.setState({ type: event.target.value });
    }

    handleShow = () => {
        this.setState({ isActive: true });
    };

    handleHide = () => {
        this.setState({ isActive: false });
    };

    render() {
        const { name, seed, size, type } = this.state;
        return (
            <div>
                <div class="m-5">
                    <TextField id="filled-basic" label="name" variant="standard" value={name} onChange={this.changeName} />
                </div>
                {this.state.isActive !== true && (<label onClick={this.handleShow}>more details?</label>)}
                {this.state.isActive && <div id="params">

                    <div class="m-5" >
                        <TextField id="filled-basic" label="Seed" variant="standard" value={seed} onChange={this.changeSeed} />
                    </div>

                    <div class="m-5" >

                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={size}
                                label="Size"
                                onChange={this.changeSize}
                            >
                                <MenuItem value="tiny">tiny</MenuItem>
                                <MenuItem value="small">small</MenuItem>
                                <MenuItem value="medium">medium</MenuItem>
                                <MenuItem value="big">big</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div class="m-5" >
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="type"
                                onChange={this.changeType}
                            >
                                <MenuItem value="sp">singleplayer</MenuItem>
                                <MenuItem value="mp">multiplayer</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                </div>}

                <div class="m-5" >
                    <ThemeProvider theme={Design.theme1}>
                        <Button color="neutral" variant="outlined" type="button" onClick={this.startGame}>new Game</Button>
                    </ThemeProvider>
                </div>
            </div>
        )
    }
}

export default StartComponent