import React from 'react'

export const Note = ({entry, editableKey, handleOnClicked, handleEdit, onDoubleClickInput, deleteItem}) => {

    return (
        <li key={entry.key} style={{
            textDecoration: entry.checked && (editableKey !== `${entry.key}-border-elem`) ? 'line-through #D9D9D9' : 'none'
        }}>

            <div className="checkbox-round">

                <input
                    className={editableKey === `${entry.key}-border-elem` ? 'checkbox-none checkbox' : 'checkbox-block checkbox'}
                    type="checkbox" id={`${entry.key}-checkbox`} defaultChecked={entry.checked}
                    onClick={() => handleOnClicked(entry)}/>
                <label htmlFor={`${entry.key}-checkbox`}> </label>

                <input
                    id={`${entry.key}-border-elem`}
                    type='textarea'
                    className={editableKey === `${entry.key}-border-elem` ? 'list-input edit-note' : 'list-input read-only-note'}
                    style={{
                        color: entry.checked && (editableKey !== `${entry.key}-border-elem`) ? '#D9D9D9' : '#4d4d57',
                        height: '50px',
                    }}
                    value={entry.text}
                    onChange={(event) => handleEdit(entry.key, event.target.value)}
                    onDoubleClick={(event) => onDoubleClickInput(event, `${entry.key}-border-elem`)}
                />
                <button type="button"
                        className={editableKey === `${entry.key}-border-elem` ? 'close-none' : 'close'}
                        onClick={() => deleteItem(entry.key)}>&times;</button>
            </div>
        </li>
    )
};

export default Note

