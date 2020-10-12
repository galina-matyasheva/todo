import React, {Component} from "react"

class Note extends Component {
//     constructor(){
//     super()
//     // this.createTasks = this.createTasks.bind(this)
// }


    render() {
        const { entry} = this.props;
        // console.log(entry);


        return (

            <li key={entry.key} style={{
                textDecoration: entry.checked ? 'line-through #D9D9D9' : 'none'}} >

                    <div className="checkbox-round">
                    <label>
                        <input type="checkbox" id="checkbox"  checked={entry.checked} onClick={()=> this.props.handleOnClicked(entry)}/>
                    </label>
                    </div>

                <label className='text-note' style={{
                    color: entry.checked ? '#D9D9D9' : '#000',
                }}>
                    {entry.text}
                </label>
                <button type="button" className="close" onClick={() => this.props.deleteItem(entry.key)}>&times;</button>
            </li>
        )
    }
}

export default Note

