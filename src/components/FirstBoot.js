import React from 'react'
export default props => {
    return (
        <div className="firstboot-container">
            <div className="firstboot-content">
                <p className="title">Welcome to <span>Palette</span></p>
                <p className="subtitle">A minimalistic Color Manager, made by utopy </p>
                <br/>
                <p style={{textAlign:"center", marginBottom: 40}}>this app has a simple workflow: </p>
                <p>_click on the palette title to  open the sidebar</p>
                <p>_double click on a color to remove it</p>
                <p>_single click on a color to copy to clipboard</p>
                <p>_you can create a new palette from the sidebar</p>
                <div className="confirm" onClick={()=>props.confirm()}>
                    confirm
                </div>
            </div>
        </div>
    )
}