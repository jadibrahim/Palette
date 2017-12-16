import React from 'react'
export default class extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            createNew : false,
        }
    }



    onEnter(event){
        let exists = false
        if(event.key === "Enter") {
            let obj = {
                name: event.target.value,
                colors: [],
            }
            this.props.palettes.forEach(palette =>{
                if(palette.name === obj.name){
                    exists = true
                    
                }
            })

            if(!exists){
                this.props.addPalette(obj)
                event.target.value = ""
                this.setState({createNew: false})
            }
            
        }
    }

    render(){
        
        return (
            <div className={this.props.toggled ? "sidebar-container animate toggled" : "sidebar-container animate"}>
                <ul>
                     <li><input 
                            placeholder="new palette"
                            onKeyPress={(evt)=> this.onEnter(evt)}
                            onBlur={() => this.setState({createNew: false})}
                            type="text"/></li> 
                        
                     {this.props.palettes.map((el, i)=> 
                        <li 
                            key={i}
                            onClick={()=> {
                                this.setState({createNew: false})
                                this.props.changeCurrentPalette(el)}
                            }>{el.name}</li>
                    )}
                </ul>
                <div className="infos">
                    © Sasha Petra, 2017
                    sasha.petra96@gmail.com
                </div>
            </div>
            )
    }
}