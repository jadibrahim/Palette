import React from 'react'
import removeIcon from '../assets/delete-button.svg'
const clipboard = window.require("electron").clipboard
export default props =>{
    let prevent = false
    let timer = null;
    const capitalize = string => string[0].toUpperCase() + string.slice(1)
    const copyColorToClipboard = color => {
        timer = setTimeout(function() {
          if (!prevent) {
            console.log(color)
            clipboard.writeText(color)
            new Notification("color copied!", {
                body: color
            }) 
          }
          prevent = false;
        }, 200);
        
    }
    const onEnter = evt => {
        console.log(evt)
        if(evt.key === "Enter"){
            evt.target.value = ""
            if(/^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(props.newColorValue)){
                props.addColor()
                props.toggleInput()             
            }
            props.valueChange(evt.target.value)
        }
    }
    return(
        <div onDoubleClick={()=> props.hideSidebar()}className={props.move ? "mainview-container animate move" : "mainview-container animate"}>

            <div className="title">
                
                <span 
                    onClick={()=> props.toggleSidebar()}>
                    {capitalize(props.currentPalette.name)}
                </span>
                <span 
                    onClick={()=> props.removePalette()}>
                    {props.numPalettes > 1 &&
                        <img src={removeIcon} alt=""/>
                    }
                </span>
            </div>
            <div className="mainview-content" >
                {props.currentPalette.colors.map((color, i)=>
                    <div className="color-container" key={i} >
                        <div className="color"
                             onClick={() =>copyColorToClipboard(color)}
                             onDoubleClick={()=> {
                                clearTimeout(timer)
                                prevent = true
                                props.removeColor(color)
                             }}
                             style={{backgroundColor: color}}
                             />
                    </div>
                )}
                {!props.showColorInput ? 
                    <div className="new-color" onClick={()=>props.toggleInput()}>add color</div>
                    :
                    <div className="new-color">
                        <input 
                            placeholder="#fffff" 
                            type="text"
                            value={props.newColorValue}
                            autoFocus
                            onChange={evt=>props.valueChange(evt.target.value)}
                            onKeyPress={(evt)=> onEnter(evt)}
                            onBlur={()=> props.toggleInput()}/>

                        <div className="preview"
                             style={{backgroundColor: props.newColorValue}}>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}