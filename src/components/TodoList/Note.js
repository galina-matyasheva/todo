import React, {Component} from "react"

class Note extends Component {

    render() {
        const { entry} = this.props;


        return (

            <li key={entry.key} style={{
                textDecoration: entry.checked && (this.props.editableKey !== `${entry.key}-border-elem`) ? 'line-through #D9D9D9' : 'none'}} >

                    <div className="checkbox-round">

                        <input className={this.props.editableKey === `${entry.key}-border-elem` ? 'checkbox-none checkbox':'checkbox-block checkbox'}  type="checkbox" id={`${entry.key}-checkbox`}  checked={entry.checked}  onClick={()=> this.props.handleOnClicked(entry)}/>
                    <label for={`${entry.key}-checkbox`}></label>

                        <input
                            id = {`${entry.key}-border-elem`}
                            type='textarea'
                            className= {this.props.editableKey === `${entry.key}-border-elem` ? 'list-input edit-note': 'list-input read-only-note'}
                            style={{color: entry.checked && (this.props.editableKey !== `${entry.key}-border-elem`)? '#D9D9D9' : '#4d4d57', height: '50px',}}
                            value={entry.text}
                            onChange={(event) => this.props.handleEdit(entry.key, event.target.value)}
                            onDoubleClick={(event) => this.props.onDoubleClickInput(event,`${entry.key}-border-elem`)}
                        />
                        <button type="button" className={this.props.editableKey === `${entry.key}-border-elem` ? 'close-none':'close'} onClick={() => this.props.deleteItem(entry.key)}>&times;</button>
                    </div>
            </li>
        )
    }
}

export default Note

