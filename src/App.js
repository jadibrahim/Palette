import React, { Component } from 'react';
import {Sidebar, MainView, Warning, FirstBoot} from './components'
const Storage = window.require("electron-json-storage")

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPalette: this.props.initialState[0],
      palettes: this.props.initialState,
      showSidebar: false,
      showColorInput: false,
      newColorValue: "",
      toggleWarning: false,
      firstBoot: this.props.firstBoot
    }
  }


  addPalette(obj){
    let palettes = this.state.palettes
    palettes.unshift(obj)
    this.setState({...this.state, palettes: palettes})
  }


  changeCurrentPalette(obj){
    this.setState({currentPalette: obj, showSidebar: false})
  }


  toggleSidebar(){
    this.setState({showSidebar: !this.state.showSidebar})
  }


  addColor(){
    let obj = this.state.currentPalette
    obj.colors.push(this.state.newColorValue)
    this.setState({currentPalette: obj})
  }

  removePalette(){
    console.log(this.state.currentPalette)
    let palettes = this.state.palettes;
    if(confirm){
      palettes.forEach((palette, i)=>{
        if(palette.name === this.state.currentPalette.name){
          palettes.splice(i, 1)
        }
      })
      this.setState({palettes: palettes, currentPalette: palettes[0], toggleWarning:false})
    }
  }

  removeColor(c){
    let colors = this.state.currentPalette.colors;
    colors.forEach((color, i)=>{
      if(color === c){
        colors.splice(i, 1)
      } 
    })
    this.setState({...this.state, currentPalette: {...this.state.currentPalette, colors: colors}})
  }


  render() {

    window.onbeforeunload = evt => {
      Storage.set("palettes", this.state.palettes)
    }


    return (
      <div className={this.state.toggleWarning || this.state.firstBoot ? "no-scroll animate" : "no-scroll animate "}>
        {this.state.firstBoot &&
          <FirstBoot confirm={()=>this.setState({firstBoot: false})}/>
        }
        <div className="drag-bar"></div>
        <div 
          className="alert animate"
          style={{top: (this.state.toggleWarning ? "0px" : "-150px")}}
        >
            <Warning 
              paletteName={this.state.currentPalette.name}
              removePalette={()=> this.removePalette()}
              undoRemove={()=> this.setState({toggleWarning: false})}
              />
        </div>
        <div 
          style={{top: (this.state.toggleWarning ? "0px" : "-150px")}}
          className="app-container animate">

        <Sidebar 
          toggled={this.state.showSidebar}
          palettes={this.state.palettes}
          addPalette={(obj)=>this.addPalette(obj)}
          changeCurrentPalette={obj => this.changeCurrentPalette(obj)}
          />


        <MainView
          hideSidebar={()=> this.setState({showSidebar: false})}
          numPalettes={this.state.palettes.length}
          move={this.state.showSidebar}
          toggleSidebar={()=> this.toggleSidebar()} 
          currentPalette={this.state.currentPalette} 
          toggleInput={()=> this.setState({showColorInput: !this.state.showColorInput})} 
          showColorInput={this.state.showColorInput}
          newColorValue={this.state.newColorValue}
          addColor={()=> this.addColor()}
          removeColor={color => this.removeColor(color)}
          valueChange={evt => this.setState({newColorValue: evt})}
          removePalette={()=> this.setState({toggleWarning: true})}
          />

      </div>
      </div>
    );
  }
}

export default App;
