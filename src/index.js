import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



import './style.css';

const Storage = window.require("electron-json-storage")



Storage.get("palettes", (err, data)=>{
  let palettes = []
  let firstBoot = true

  if(data.length === undefined){
    console.log("no stored file found")
    palettes = [{name:"first palette", colors: ["#e11c7b", "#67D5C4", "#EEEC7B"]}]
  } else {
    console.log("data found")
    palettes = [...data]
    firstBoot = false
  }

  ReactDOM.render(
    <App initialState={palettes} confirm={()=>{console.log("yo")}} firstBoot={firstBoot}/>,
    document.getElementById('root')
  );

})
