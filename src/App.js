import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from "axios"; 
import DataComp from "./dataComponent.js"

import './App.scss';

function App() {

  const [url, setUrl] = useState("")
  const [helperText, setHelperText] = useState("")
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || [])
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("")

  var sort_by = ["Most Frequent", "Least Frequent", "Word Length", "Alphabetically", "Only letters", "Words with length greater than 3", "Clear"]

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history)); 
  }, [])


  const handleSubmit = async (e) => {

    var mode = 0
    switch(filter) {
      case 'Most Frequent': mode = 1; break;
      case 'Word Length': mode = 2; break;
      case 'Alphabetically': mode = 3; break;
      case 'Only letters': mode = 4; break;
      case 'Words with length greater than 3': mode = 5; break;
      case 'Least Frequent': mode = 6; break;
    }

    const config = {
      method: "GET", 
      url: 'http://localhost:5000/url', 
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://localhost:3000/"
      }, 
      params: {
          url: url, 
          mode: mode
      }
    }
    try {
      var res = await axios(config)
      if (res.status === 200){
        const temp = [...history]
        var obj = {}; obj['url'] = url; obj['data'] = res.data; obj['mode'] = filter === "" ? "None" : filter
        temp.push(obj)
        setHistory(temp)
      }

    } catch(err) {
      console.log(err.response)
      if(err.response.status === 400 || err.response.status === 500){setHelperText(err.response.data)}
    }
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {

    if(e.currentTarget.id === "Clear"){setFilter("")}
    else{setFilter(e.currentTarget.id)}
    setAnchorEl(null);
  };
  

  return (
    <div className="App">
        <div className="top-elements" style={{display: "inline-block"}}> 
          <TextField style={{marginTop: '2vw'}} helperText={helperText} label="url" onChange={(e) => {setUrl(e.target.value)}}/>
          <Button style={{marginTop: '2vw'}} variant="contained" onClick={handleSubmit}> SUBMIT </Button> 
          <List component="nav" aria-label="sort-function" style={{width: '250px'}}>
            <ListItem button aria-haspopup="true" aria-controls="sort-menu" aria-label="sort word-count by" onClick={handleClick}>
              <ListItemText primary="SORT WORD COUNT BY" secondary={filter} />
            </ListItem>
          </List>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {sort_by.map((option, i) => (
              <MenuItem key={option} id={option} onClick={(e) => {handleClose(e)}} selected={option === filter}>{option}</MenuItem>
            ))}
          </Menu>
        </div>
        <div className="HistoryList"> 
        <p style={{marginTop: '2vw', textDecoration: 'underline'}}> History </p> <p> Click on a link to view / hide past data </p>
          {history.map((h, i) => (
            <DataComp key={i} dataObj={h} />
          ))} 
        </div>
    </div> 
  );
}

export default App;
