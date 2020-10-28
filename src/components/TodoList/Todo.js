import React, {useState, useEffect} from 'react'
import NoteList from './NoteList'
import './Todo.css'
import Note from './Note'
import Filter from './Filter'
import api from '../../api'

export const Todo = ({history}) => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({text: '', key: '', checked: false});
    const [activeElem, setActiveElem] = useState('All');
    const [allItems, setAllItems] = useState([]);
    const [editableKey, setEditableKey] = useState('');
    //вводим новое значение
    //получает значение из поля ввода и устанавливает состояние и объект currentItem
    const handleInput = e => {
        const itemText = e.target.value;
        const currentItem = {text: itemText, key: ''};//входные данные
        setCurrentItem(currentItem)
    };
//добавляем элемент
    const addItem = async e => {
        e.preventDefault();//не перезагружать приложение после ввода текста от addItem
        const newItem = {...currentItem, checked: false}; //получение значения
        if (newItem.text !== '') {
            const userId = localStorage.getItem('userId');
            const payload = {text: newItem.text, completed: newItem.checked, userId: userId};//передаем на сервер
            await api.createNote(payload).then(res => {
                newItem.key = res.data.id;
                setFilteredItems(filterItems([...allItems, newItem]));
                setAllItems([...allItems, newItem]);
                setCurrentItem({
                    ...currentItem,
                    text: '',
                    key: '',
                     checked: false
                });

            }, error => ("error" + error));
        }
    };
    //удаляем элемент
    const deleteItem = async key => {
        const filteredAllItems = allItems.filter(item => {
            return item.key !== key
        });
        setFilteredItems(filterItems(filteredAllItems));
        setAllItems(filteredAllItems);
        await api.deleteNote(key).then(res => {
        }, error => ("error" + error));
    };
    //очищаем все выполненные задачи
    const onClearClick = async filteredItems => {
        await api.deleteClearNotes(filteredItems).then(res => {
            const filteredAllItems = allItems.filter(item => {
                return !item.checked;
            });
            setFilteredItems(filterItems(filteredAllItems));
            setAllItems(filteredAllItems);
        }, error => ("error" + error));

    };
    //переключатель checkbox для вычеркивания выполненных задач
    const handleOnClicked = async item => {
        // item.checked = !item.checked;
        const foundItem = allItems.find((itemParam) => itemParam.key === item.key);
        foundItem.checked = !item.checked;
        const payload = {
            text: foundItem.text,
            completed: foundItem.checked
        };
        setFilteredItems([...filterItems(allItems)]);
        await api.updateNote(item.key, payload).then(res => {
        }, error => ("error" + error));
    };
    //выделить все
    const toggleAll = async () => {
        const checkedAll = allItems.every((element) => {
            return element.checked
        });
        allItems.map((item) => {
            if (checkedAll) {
                item.checked = false;
            } else {
                item.checked = true;
            }
        });
        const promises = [];
        allItems.forEach((eachItem) => {
            const payload = {
                text: eachItem.text,
                completed: eachItem.checked
            };
            const promise = api.updateNote(eachItem.key, payload).then(res => {
            }, error => window.alert("error" + error));
            promises.push(promise);
        });
        setFilteredItems([...filterItems(allItems)]);
        await Promise.all(promises);
    };
    // проверка всех элементов на вычеркивание (стрелка)
    const toggleAllColor = () => {
        const result = allItems.every((item) => item.checked);
        return result
    };
    //проверка на хотя бы один зачеркнутый элемент
    const checkForOneThroughElement = () => {
        const result = allItems.some((item) => item.checked);
        return result
    };

    const handleClickOutside = async (event) => {
        // console.log({id: event.target.id, editableKey})
        if (editableKey !== '') {
            const foundItem = allItems.find((itemParam) => editableKey.includes(itemParam.key));
            const payload = {
                text: foundItem.text,
                completed: foundItem.checked
            };
            setFilteredItems([...filterItems(allItems)]);
            await api.updateNote(foundItem.key, payload).then(res => {
            }, error => ("error" + error));
        }
        if (event.target.id !== editableKey) {
            onDoubleClickInput('', '');
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);
        return () => {
            document.removeEventListener('click', handleClickOutside, false)
        }
    }, []);

    useEffect(() => {
        loadNotes()
    }, []);


//появление возможности редактирования поля по двойному щелчку


    const onDoubleClickInput = (e, key) => {
        // console.log(key,'key on double')
        setEditableKey(key)
    };
    //изменить текст задачи
    const handleEdit = async (key, value) => {
        if (editableKey && editableKey.includes(key)) {
            const foundItem = allItems.find((itemParam) => itemParam.key === key);
            if (foundItem.text !== value) {
                foundItem.text = value;
                setFilteredItems([...filterItems(allItems)])
            }
        }
    };
    //ФИЛЬТР
    const filterItems = (items) => {
        switch (activeElem) {
            case 'All':
                return items;
            case 'Active':
                return items.filter(item => {
                    return !item.checked;
                });
            case 'Completed':
                return items.filter(item => {
                    return item.checked;
                });
            default:
                break;
        }
    };
    //All
    const onAllClick = async () => {
        await api.getNoteList(localStorage.getItem('userId')).then(res => {
            const newAllItems = res.data.data.map((note) => {
                return {
                    key: note._id,
                    text: note.text,
                    checked: note.completed
                }
            });
            setAllItems(newAllItems);
            setFilteredItems(newAllItems);
            setActiveElem('All')
        }, error => ("error" + error));
    };
    const onActiveClick = async () => {
        const completed = false;
        const userId = localStorage.getItem('userId');
        await api.getFilter(userId, completed).then(res => {
            const newItems = res.data.data.map((note) => {
                return {
                    key: note._id,
                    text: note.text,
                    checked: note.completed
                }
            });
            setAllItems(newItems);
            setFilteredItems(newItems);
            setActiveElem('Active')
        }, error => ("error" + error));
    };
    const onCompletedClick = async () => {
        const completed = true;
        const userId = localStorage.getItem('userId');
        await api.getFilter(userId, completed).then(res => {
            const newItems = res.data.data.map((note) => {
                return {
                    key: note._id,
                    text: note.text,
                    checked: note.completed
                }
            });
            setAllItems(newItems);
            setFilteredItems(newItems);
            setActiveElem('Completed')
        }, error => ("error" + error));
    };
    const loadNotes = async () => {
        if (window.location.href.includes('#/active')) {
            await onActiveClick();
        } else if (window.location.href.includes('#/completed')) {
            await onCompletedClick();
        } else {
            await onAllClick();
        }
    };
    const inputElement = React.createRef();//ссылка на элемент ввода для его получения
    const onLogoutClick = () => {
        localStorage.setItem('token', undefined);
        localStorage.setItem('userId', undefined);
        history.push('/login');
    };
    if (localStorage.getItem('userId') === 'undefined') {
        history.push('/login');
        return null;
    }
    return (
        <div className='app'>
            <h1>todos</h1>
            <NoteList
                addItem={addItem} //добавить
                inputElement={inputElement}//ссылка на элемент
                handleInput={handleInput}//обработка данных в поле ввода при изменении
                currentItem={currentItem}//отображение значения состояния
                toggleAll={toggleAll}//отметка всех задач как выполненных
                toggleAllColor={toggleAllColor} //замена цвета стрелки, если все эл-ты выбраны
                allItems={allItems}
                deleteItem={deleteItem}
            />
            {/*отображение на экране*/}
            <ul className='note-list'>
                {filteredItems.map((item, i) => {
                    return (
                        <Note
                            key={`note--${i}`}
                            entry={item}
                            deleteItem={deleteItem} //удаление элементов в списке
                            handleOnClicked={handleOnClicked}//checkbox
                            handleEdit={handleEdit}// изменение текста задачи
                            // handleClickOutside={handleClickOutside}//клик снаружи
                            onDoubleClickInput={onDoubleClickInput}
                            // focusElem={focusElem}
                            editableKey={editableKey}
                        />
                    )
                })}
            </ul>
            {/*добавление фильтра когда появляется элемент в массиве*/}
            {allItems.length === 0 && activeElem === 'All' ? null :
                <Filter
                    length={allItems.filter((item) => !item.checked).length}// количество элементов(задач) не вычеркнутых
                    onClearClick={onClearClick}// очистить выделенное
                    onAllClick={onAllClick}//показать все эл-ты
                    onActiveClick={onActiveClick}// только активные задачи
                    onCompletedClick={onCompletedClick}//только выполненные задачи
                    activeElem={activeElem}//для активных кнопок
                    allItems={allItems}
                    checkForOneThroughElement={checkForOneThroughElement}//вычеркнутый элемент для появления кнопки completed
                />
            }

            <button className='logout btn-all' onClick={() => onLogoutClick()}>LOGOUT</button>
        </div>
    )
};

export default Todo


