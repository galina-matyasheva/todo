import React, {Component} from 'react'
import NoteList from './NoteList'
import "./App.css"
import Note from "./Note"
import Filter from "./Filter"


class App extends Component {
    state = {
            items: [],
            currentItem: {text: '', key: '', checked: false},
            allItems: [],
            activeElem: "All"
        };

//вводим новое значение
    //получает значение из поля ввода и устанавливает состояние и объект currentItem
    handleInput = e => {
        // console.log('Hello Input')
        const itemText = e.target.value;
        const currentItem = {text: itemText, key: Date.now()};//входные данные
        this.setState({
            currentItem,
        })
    };

//добавляем элемент
    addItem = e => {
        e.preventDefault();//!перезагрузка приложения после рег.сообщения от addItem
        // console.log("Hello Add Item", this.state.currentItem);
        const newItem = {...this.state.currentItem, checked:false}; //получение значения
        if (newItem.text !== '') {
            // console.log(newItem);
            const items = [...this.state.items, newItem];//деструктуриз не пустого массива. добавляется новый элемент

            this.setState ({
                items: items,
                allItems: items,
                currentItem: {text: '', key: '', checked: false},
            });
        }
    };

    //удаляем элемент
    deleteItem = key => {
        const filteredItems = this.state.items.filter(item => {
            return item.key !== key
        });


        this.setState({
            items: filteredItems,
            allItems: filteredItems,

        });
    };

    //очищаем все выполненные задачи

    onClearClick = () => {
        console.log('jkjkjjkk');
        const filteredItems = this.state.allItems.filter(item => {
            return !item.checked;
        });

        this.setState({
            allItems: filteredItems,
            items: filteredItems
        });

      // switch (this.state.activeElem) {
      //     case 'All':
      //         // console.log('---All', this.state.allItems, this.state.items );
      //         return this.onAllClick();
      //
      //     case 'Active':
      //         // console.log('---Active', this.state.allItems, this.state.items );
      //         return this.onActiveClick();
      //
      //     case 'Completed':
      //         // console.log('---Completed', this.state.allItems, this.state.items );
      //         return this.onCompletedClick();
      // }

    };

    //переключатель checkbox для вычеркивания выполненных задач
    handleOnClicked = item => {
        // console.log('this checked');
        item.checked = !item.checked;
        this.forceUpdate();

    };

    //выделить все
    toggleAll = () => {
        // console.log('toggleAll');
        const checkedAll = this.state.items.every((element)=>{return element.checked === true});

        this.state.items.map((item) => {
            if(checkedAll){
                item.checked = false;
            }else {
                item.checked = true;
            }
        });

        this.setState({items: this.state.items});
    };

    // проверка всех элементов на вычеркивание (стрелка)
    toggleAllColor=()=> {
        const result =  this.state.items.every((item)=> item.checked);
        return result
    };


    //проверка на хотя бы один зачеркнутый элемент
    checkForOneThroughElement=()=> {
        const result =  this.state.allItems.some((item)=> item.checked);
        // console.log("-----result",result);
        return result
    };



    //ФИЛЬТР
    //All
    onAllClick = () => {

        this.setState({
            items: this.state.allItems,
            activeElem: 'All'

        })
    };

    onActiveClick= () => {
        const filteredItems = this.state.allItems.filter(item => {
            return !item.checked;
        });


        this.setState({
            items: filteredItems,
            activeElem: 'Active'
        })
    };

    onCompletedClick= () => {

        const filteredItems = this.state.allItems.filter(item => {
           return item.checked;
        });

        this.setState({
            items: filteredItems,
            activeElem: 'Completed'
        })
    };

    inputElement = React.createRef();//ссылка на элемент ввода для его получения

    render() {

        return (
            <div className='app'>
                <h1>todos</h1>
                <NoteList
                     addItem = {this.addItem} //добавить
                    inputElement={this.inputElement}//ссылка на элемент
                    handleInput={this.handleInput}//обработка данных в поле ввода при изменении
                    currentItem={this.state.currentItem}//отображение значения состояния
                     toggleAll = {this.toggleAll}//отметка всех задач как выполненных
                     toggleAllColor = {this.toggleAllColor} //мена цвета стрелки, если все эл-ты выбраны
                     allItems = {this.state.allItems}
                     deleteItem={this.deleteItem}
                />
                {/*отображение на экране*/}
                <ul className='noteList'>

                {this.state.items.map((item, i )=> {
                    // console.log(item, 'ITEMSS')
                    return (
                        <Note
                            key ={`note--${i}`}
                            entry = {item}
                            deleteItem={this.deleteItem} //удаление элементов в списке
                            handleOnClicked = {this.handleOnClicked}//checkbox
                        />
                    )
                }) }
                </ul>
                {/*{  console.log('----items----', this.state.items)}*/}
                {/*{console.log('----allitems----', this.state.allItems) }*/}

                {/*добавление фильтра когда появляется элемент в массиве*/}
                {this.state.allItems.length === 0 ? null : <Filter

                    length = {this.state.allItems.filter((item)=>!item.checked).length}// количество элементов(задач) не вычеркнутых
                    onClearClick = {this.onClearClick}// очистить выделенное
                    onAllClick = {this.onAllClick}//показать все эл-ты
                    onActiveClick = {this. onActiveClick}// только активные задачи
                    onCompletedClick = {this. onCompletedClick}//только выполненные задачи
                    activeElem = {this.state.activeElem}//для активных кнопок
                    allItems = {this.state.allItems}
                    checkForOneThroughElement = {this.checkForOneThroughElement}//вычеркнутый элемент для появления кнопки completed
                /> }

            </div>
        )
    }
}

export default App