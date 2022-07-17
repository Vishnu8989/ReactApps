import './index.css'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import MyCard from "../inputCard";
import axios from "axios";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

function TopBar(props) {
    const [accessibility, setAccessibility] = React.useState(-1);
    const [participants, setParticipants] = React.useState(-1);
    const [price, setPrice] = React.useState(-1);
    let [type, setType] = React.useState("");
    const [activity, setActivity] = React.useState("");
    const [myimg, setMyimg] = React.useState("");
    const [myalt, setMyalt] = React.useState("");
    const choices=["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]

    function resetHandler(event) {
        setAccessibility(-1);
        setParticipants(-1);
        setPrice(-1);
        setType("");
        setActivity("");
        setMyimg("");
        setMyalt("");
    }

    async function submitHandler(event) {
        console.log(accessibility, participants, price, type);
        let response
        let url = "http://www.boredapi.com/api/activity"
        if(accessibility>-1){
            if(url.includes("?")) {
                url += "&accessibility=" + accessibility/100
            }
            else{
                url += "?accessibility=" + accessibility/100
            }
        }
        if(participants>-1){
            if(url.includes("?")) {
                url += "&participants=" + participants
            }
            else{
                url += "?participants=" + participants
            }
        }
        if(price>-1){
            if(url.includes("?")) {
                url += "&price=" + price/100
            }
            else{
                url += "?price=" + price/100
            }
        }
        if(type!==""){
            if(url.includes("?")) {
                url += "&type=" + type
            }
            else{
                url += "?type=" + type
            }
        }
        response = await axios.get(url);
        setActivity(response.data['activity']);
        setMyalt(response.data['type']);
        if (response.data['type'] === "busywork") {
            response.data['type'] = "work"
        }
        setMyimg("https://source.unsplash.com/1440x1080/?" + response.data['type']);
        setOpen(true);
        // alert(url+","+response.data['type'])
    }
    const [open, setOpen] = React.useState(false);
    function handleCloseDialog() {
        setOpen(false);
        resetHandler();
    }

    return(
        <>
        <header className="jumbotron">
            <div className="container">
                <div className="row row-header justify-content-center">
                    <div className="col-6 text-center" >
                        <h1>Bored ??</h1>
                        <p>Lets Assign You A Task</p>
                        <p>Dont Change the Slider for a Random Activity</p>
                        <p>Lesser the parameters you use better will be the result</p>
                    </div>
                </div>
            </div>
        </header>
            <div>
                <div className="container">
                    <div className="row">
                        <MyCard topic="Accessibility" min={-1} max={100} data={accessibility} setData={setAccessibility}/>
                        <MyCard topic="Participants" min={-1} max={10} step={1} data={participants} setData={setParticipants}/>
                        <MyCard topic="Price" min={-1} max={100} data={price} setData={setPrice}/>
                    </div>
                    <FormControl fullWidth className="mt-3">
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Age"
                            onChange={(event) => setType(event.target.value)}
                            onClick={(event) => console.log(type)}
                        >
                            {choices.map((choice, index) => (
                                <MenuItem key={index} value={choice}>{choice.toUpperCase()}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className="row justify-content-around">
                        <Button variant="contained" color="success" className="col-3 mt-3" onClick={submitHandler}>
                            Submit
                        </Button>
                        <Button variant="outlined" color="error" className="col-3 mt-3" onClick={resetHandler}>
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                fullWidth
                style={{backgroundColor: 'transparent', backgroundImage: `url(${myimg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
            >
                <DialogTitle>Here is Your Activity</DialogTitle>
                <DialogContent>
                    {/*<img src={myimg} alt={myalt}/>*/}
                    <DialogContentText>
                        Activity : {activity}
                    </DialogContentText>
                    <DialogContentText>
                        Activity type : {myalt}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="outlined" color="primary" fullWidth>
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
    </>
    )

}

export default TopBar;