import React from 'react'

export const Filter = ({length, onAllClick, onActiveClick, onCompletedClick, activeElem, checkForOneThroughElement, onClearClick}) => {

    return (
        <div className="footer">
                <span className="todo-count">
                    <strong>{length + ' item left'}</strong>
                </span>
            <ul className="filters">
                <li onClick={onAllClick}><a className={activeElem === 'All' ? 'active' : ''} href="#">All</a></li>
                <li onClick={onActiveClick}><a className={activeElem === 'Active' ? 'active' : ''}
                                               href="#/active">Active</a></li>
                <li onClick={onCompletedClick}><a className={activeElem === 'Completed' ? 'active' : ''}
                                                  href="#/completed">Completed</a></li>
            </ul>
            {!checkForOneThroughElement() ? null :
                <button className="button-clear" type="button" onClick={() => onClearClick()}> Clear completed</button>}
        </div>
    )
};

export default Filter

