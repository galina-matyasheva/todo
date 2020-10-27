import React from 'react'

export const NoteList = ({allItems,toggleAllColor, toggleAll, addItem, inputElement, currentItem, handleInput }) => {

    return (
        <div className='note-list-main'>
            <div className='note-header'>

                {allItems.length === 0 ? null :
                    <button className={toggleAllColor() ? 'button-mark-false' : 'button-mark'}
                            onClick={() => {
                                toggleAll()
                            }}>mark</button>}
                <label htmlFor="button-mark">.</label>

                <form className='note-header-form' onSubmit={addItem}>

                    <input
                        className='note-header-task'
                        type='text'
                        placeholder='What needs to be done?'
                        ref={inputElement}
                        value={currentItem.text}
                        onChange={handleInput}
                    />
                </form>

            </div>
        </div>
    )
};

export default NoteList

