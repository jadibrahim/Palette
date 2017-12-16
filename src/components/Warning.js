import React from 'react'
export default props =>{
    return (
        <div className="warning-container">
            <div className="message">
                _Do you want to remove {props.paletteName}?<br/>
                this action can't be undone
            </div>
            <div className="buttons">
                <div className="button confirm" onClick={()=> props.removePalette()}>
                    yes
                </div>
                <div className="button" onClick={()=> props.undoRemove()}>
                    no
                </div>
            </div>
        </div>
    )
}