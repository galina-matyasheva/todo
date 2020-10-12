import React, {Component} from 'react'

class NoteList extends Component {


    //для фокус. на поле ввода
    componentDidUpdate() {
        this.props.inputElement.current.focus()
    }


    render() {

        // console.log(this.props.allItems);

        return (
            <div className='noteListMain'>
                <div className='note-header'>

                    {this.props.allItems.length === 0 ? null : <button className= {this.props.toggleAllColor() ? 'button-mark-false': 'button-mark'}  onClick={()=>{this.props.toggleAll()}}>mark</button>}
                    <label for="button-mark">.</label>

                    <form className='note-header-form' onSubmit={this.props.addItem}>

                        <input
                            className='note-header-task'
                            type='text'
                            placeholder='What needs to be done?'
                            ref={this.props.inputElement}
                            value = {this.props.currentItem.text}
                            onChange={this.props.handleInput}
                        />
                    </form>

                </div>
            </div>
    )
    }
}

export default NoteList