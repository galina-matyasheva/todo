import React, {Component} from 'react'
import NoteList from './NoteList'
import "./App.css"
import Note from "./Note"
import Filter from "./Filter"
import api from '../api'



class Todo extends Component {

    state = {
        items: [],
        currentItem: {text: '', key: '', checked: false},
        allItems: [],
        activeElem: 'All',
        editableKey: '',
        rememberMe: false,
        userId: ''
    };

//вводим новое значение
    //получает значение из поля ввода и устанавливает состояние и объект currentItem
    handleInput = e => {
        const itemText = e.target.value;
        const currentItem = {text: itemText, key: ''};//входные данные
        this.setState({
            currentItem,
        })
    };

//добавляем элемент
    addItem = async e => {

        e.preventDefault();//не перезагружать приложение после ввода текста от addItem
        // "Hello Add Item", this.state.currentItem;
        const newItem = {...this.state.currentItem, checked:false}; //получение значения
        if (newItem.text !== '') {
            //newItem
            const allItems = [...this.state.allItems, newItem];//деструктуриз не пустого массива. добавляется новый элемент

            const userId = localStorage.getItem('userId');
            //userId

            const payload = { text: newItem.text, completed: newItem.checked, userId: userId};//передаем на сервер

            await api.createNote(payload).then(res => {
               // `note inserted successfully` + res.data.id
                newItem.key = res.data.id;
                this.setState ({
                    items: this.filter(allItems),
                    allItems: allItems,
                    currentItem: {text: '', key: '', checked: false},
                });
            }, error => window.alert("error" + error));

        }
    };


    //удаляем элемент
    deleteItem = async key => {
       // 'delete item with key: ' + key
        const filteredAllItems = this.state.allItems.filter(item => {
            return item.key !== key
        });
        this.setState({
            items: this.filter(filteredAllItems),
            allItems: filteredAllItems,
        });
        await api.deleteNote(key).then(res => {
           // `note deleted successfully`
        }, error => window.alert("error" + error));
    };

    //очищаем все выполненные задачи

    onClearClick = async items => {
       // 'delete all item'
        await api.deleteClearNotes(items).then(res => {
           // `note deleted all successfully`
            const filteredAllItems = this.state.allItems.filter(item => {
                return !item.checked;
            });

            this.setState({
                allItems: filteredAllItems,
                items: this.filter(filteredAllItems)
            });
        }, error => window.alert("error" + error));

    };

    //переключатель checkbox для вычеркивания выполненных задач
    handleOnClicked = async item => {
        item.checked = !item.checked;
       // 'handle on clicked checkbox'
        const foundItem = this.state.allItems.find((itemParam) => itemParam.key === item.key);
        foundItem.checked = item.checked;
        const payload = {
            text: foundItem.text,
            completed: foundItem.checked
        };
        this.setState({items: this.filter(this.state.allItems)});

        await api.updateNote(item.key, payload).then(res => {
            //`note updated successfully`

        }, error => window.alert("error" + error));
    };

    //выделить все
    toggleAll = async () => {
        // 'toggleAll'
        const checkedAll = this.state.allItems.every((element)=>{return element.checked === true});

        this.state.allItems.map((item) => {
            if(checkedAll){
                item.checked = false;
            }else {
                item.checked = true;
            }
        });

        const promises = [];
        this.state.allItems.forEach((eachItem) => {
            const payload = {
                text: eachItem.text,
                completed: eachItem.checked
            };
            const promise = api.updateNote(eachItem.key, payload).then(res => {
               // `note updated successfully`
            }, error => window.alert("error" + error));
            promises.push(promise);
        });
        this.setState({items: this.filter(this.state.allItems)});
        await Promise.all(promises);

    };

    // проверка всех элементов на вычеркивание (стрелка)
    toggleAllColor=()=> {
        const result =  this.state.allItems.every((item)=> item.checked);
        return result
    };


    //проверка на хотя бы один зачеркнутый элемент
    checkForOneThroughElement=()=> {
        const result =  this.state.allItems.some((item)=> item.checked);
        // console.log("-----result",result);
        return result
    };

    //закрытие поля для внесения изменений
    // Вызывается после удаления компонента из DOM
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

// Вызывается до рендера
    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }

    componentDidMount() {
        this.loadNotes();
    }

//появление возможности редактирования поля по двойному щелчку
    handleClickOutside = async (event) => {
        // console.log('--hjhjhh', event.target);
        if (this.state.editableKey !=='') {
            const foundItem = this.state.allItems.find((itemParam) => this.state.editableKey.includes(itemParam.key));
            const payload = {
                text: foundItem.text,
                completed: foundItem.checked
            };
            this.setState({items: this.filter(this.state.allItems)});
            await api.updateNote(foundItem.key, payload).then(res => {
               // `note updated successfully`

            }, error => window.alert("error" + error));
        }
        if (event.target.id !== this.state.editableKey) {
            this.onDoubleClickInput('', '');
        }
    };

    onDoubleClickInput = (e, key)=> {
        // key
        this.setState({
            editableKey: key,
        });
    };

    //изменить текст задачи
    handleEdit = async (key, value)=> {
       // this.state.editableKey + ' handle edit ' + key
        if (this.state.editableKey && this.state.editableKey.includes(key)) {
            const foundItem = this.state.allItems.find((itemParam) => itemParam.key === key);
            if (foundItem.text !== value) {
                foundItem.text = value;
                this.setState({items: this.filter(this.state.allItems)});

            }
        }

    };


    //ФИЛЬТР

    filter = (items) => {
        switch (this.state.activeElem) {
            case 'All':
                return items;

            case 'Active':
                return  items.filter(item => {
                    return !item.checked;
                });

            case 'Completed':
                return  items.filter(item => {
                    return item.checked;
                });
        }
    };

    //All
    onAllClick = async () => {
       // console.log("AllClick");

        await api.getNoteList(localStorage.getItem('userId')).then(res => {
           // `notes loaded successfully`
           // res.data.data
            const newAllItems = res.data.data.map((note) => {
                return {
                    key: note._id,
                    text: note.text,
                    checked: note.completed
                }
            });
          //  newAllItems
            this.setState({allItems: newAllItems, items: newAllItems, activeElem: 'All'});
        }, error => window.alert("error" + error));
    };

    onActiveClick= async () => {

        const completed = false;
        const userId = localStorage.getItem('userId');
        await api.getFilter(userId,completed).then(res => {
            //`notes loaded in Active filter`
          //  res.data.data
            const newItems = res.data.data.map((note) => {
                return {
                    key: note._id,
                    text: note.text,
                    checked: note.completed
                 }

            });

           // newItems
            this.setState({
                allItems: newItems,
                items: newItems,
                activeElem: 'Active'
            });
        }, error => window.alert("error" + error));
    };



    onCompletedClick= async () => {

        const completed = true;
        const userId = localStorage.getItem('userId');
        await api.getFilter(userId, completed).then(res => {
           // `notes loaded in Completed filter`
          //  res.data.data
            const newItems = res.data.data.map((note) => {
                return {
                    key: note._id,
                    text: note.text,
                    checked: note.completed
                }
            });
            //newItems
            this.setState({
                allItems: newItems,
                items: newItems,
                activeElem: 'Completed'});
        }, error => window.alert("error" + error));


    };


    loadNotes = async () => {
       // 'load notes'
       // window.location.href
        if (window.location.href.includes('#/active')) {
            await this.onActiveClick();
        } else if (window.location.href.includes('#/completed')) {
            await this.onCompletedClick();
        } else {
            await this.onAllClick();
        }
    };

    inputElement = React.createRef();//ссылка на элемент ввода для его получения

    onLogoutClick = () => {
       // '---------onLogoutClick'
        localStorage.setItem('token', undefined);
        localStorage.setItem('userId', undefined);
        this.props.history.push('/login');
    };

    render() {
       // localStorage.getItem('userId'), 'userId'
        if (localStorage.getItem('userId') == 'undefined'){
          //  'not authorized'
            alert("you are not authorized");
            this.props.history.push('/login');
            return null;
        }
        return (
            <div className='app'>
                <h1>todos</h1>
                <NoteList
                    addItem = {this.addItem} //добавить
                    inputElement={this.inputElement}//ссылка на элемент
                    handleInput={this.handleInput}//обработка данных в поле ввода при изменении
                    currentItem={this.state.currentItem}//отображение значения состояния
                    toggleAll = {this.toggleAll}//отметка всех задач как выполненных
                    toggleAllColor = {this.toggleAllColor} //замена цвета стрелки, если все эл-ты выбраны
                    allItems = {this.state.allItems}
                    deleteItem={this.deleteItem}
                />
                {/*отображение на экране*/}
                <ul className='note-list'>

                    {this.state.items.map((item, i )=> {
                        // item, 'ITEMSS'
                        return (
                            <Note
                                key ={`note--${i}`}
                                entry = {item}
                                deleteItem={this.deleteItem} //удаление элементов в списке
                                handleOnClicked = {this.handleOnClicked}//checkbox
                                handleEdit = {this.handleEdit}// изменение текста задачи
                                handleClickOutside = {this.handleClickOutside}//клик снаружи
                                onDoubleClickInput = {this.onDoubleClickInput}
                                focusElem = {this.state.focusElem}
                                editableKey ={this.state.editableKey}
                            />
                        )
                    }) }
                </ul>
                {/*{  console.log('----items----', this.state.items)}*/}
                {/*{console.log('----allitems----', this.state.allItems) }*/}

                {/*добавление фильтра когда появляется элемент в массиве*/}
                {this.state.allItems.length === 0 && this.state.activeElem === 'All'? null : <Filter

                    length = {this.state.allItems.filter((item)=>!item.checked).length}// количество элементов(задач) не вычеркнутых
                    onClearClick = {this.onClearClick}// очистить выделенное
                    onAllClick = {this.onAllClick}//показать все эл-ты
                    onActiveClick = {this. onActiveClick}// только активные задачи
                    onCompletedClick = {this. onCompletedClick}//только выполненные задачи
                    activeElem = {this.state.activeElem}//для активных кнопок
                    allItems = {this.state.allItems}
                    checkForOneThroughElement = {this.checkForOneThroughElement}//вычеркнутый элемент для появления кнопки completed
                /> }

                <button className='logout' onClick= {()=> this.onLogoutClick()}>LOGOUT</button>
            </div>
        )
    }
}

export default Todo