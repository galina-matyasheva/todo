import React, {Component} from "react"


class Filter extends Component {

    render() {

        return (
            <div className="footer">
                <span className="todo-count">
                    <strong>{this.props.length + ' item left'}</strong>
                </span>
                <ul className="filters">
                    <li  onClick={this.props.onAllClick} ><a  className={this.props.activeElem === 'All' ? 'active' : ''} href="#">All</a></li>
                    <li onClick={this.props.onActiveClick}><a className={this.props.activeElem === 'Active' ? 'active' : ''} href="#">Active</a></li>
                    <li onClick={this.props.onCompletedClick}><a className={this.props.activeElem === 'Completed' ? 'active' : ''} href="#">Completed</a></li>
                </ul>
                {!this.props.checkForOneThroughElement() ? null: <button className="button-clear" type="button" onClick={()=>this.props.onClearClick()}> Clear completed</button>}
            </div>
        )
    }
}

 export default Filter