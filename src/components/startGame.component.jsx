import React, { Component } from 'react'
import mainService from '../services/main.service';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

class StartComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "player1",
            seed: "",
            size: "small",
            isActive: false
        }
        this.changeName = this.changeName.bind(this);
        this.changeSeed = this.changeSeed.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.startGame = this.startGame.bind(this);
    }


    startGame() {
        const { name, seed, size } = this.state;
        const { history } = this.props;

        const realSize = size !== "" ? size : null;


        const params = { seed: seed, size: realSize };
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

    handleShow = () => {
        this.setState({ isActive: true });
    };

    handleHide = () => {
        this.setState({ isActive: false });
    };

    render() {
        const { name, seed, size } = this.state;
        return (
            <div>
                <div className="m-5">
                    <TextField id="filled-basic" label="name" variant="standard" value={name} onChange={this.changeName} />
                </div>
                {this.state.isActive !== true && (<label onClick={this.handleShow}>more details...</label>)}
                {this.state.isActive && <div id="params">

                    <div className="m-5" >
                        <TextField id="filled-basic" label="Seed" variant="standard" value={seed} onChange={this.changeSeed} />
                    </div>
                    <label>

                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={size}
                                label="Size"
                                onChange={this.changeSize}
                            >
                                <MenuItem value="small">small</MenuItem>
                                <MenuItem value="medium">medium</MenuItem>
                                <MenuItem value="big">big</MenuItem>
                            </Select>
                        </FormControl>

                    </label>
                </div>}

                <div className="m-5" >
                    <Button type="button" onClick={this.startGame}>new Game</Button>
                </div>
            </div>
        )
    }
}

export default StartComponent