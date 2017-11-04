import * as $ from 'jquery'
import { Pages, Page } from './pages'

const TODOS = [
    {
        id: 1,
        text: 'Walk the dog',
        when: 'Every day'
    },
    {
        id: 2,
        text: 'Submit tax return',
        when: 'Next Tuesday'
    },
    {
        id:3,
        text: 'Mow the lawn',
        when: 'Every fortnight'
    }
]

class ListPage extends Page {

    enter(){
        let body = $('body')
        body.empty();
        $(`<h1>Things to do</h1>`).appendTo(body);
        let list = $('<ul/>').appendTo(body);
        for (let todo of TODOS) {
            $(`<li><a href="#task?id=${todo.id}">${todo.text}</a></li>`).appendTo(list);
        }
    }    

}

class TaskPage extends Page {


    enter(){
        let id = parseInt(Pages.hashParam('id'));
        let todo = TODOS.filter((t) => {return t.id == id})[0]
        let body = $('body')
        body.empty();
        $(`<h1>${todo.text}</h1>`).appendTo(body);
        $(`<div>${todo.when}</div><br/>`).appendTo(body);
        $(`<a href="#list">Back to list</a>`).appendTo(body);
    }

}


$(function () {
    Pages.routes['list'] = new ListPage();
    Pages.routes['task'] = new TaskPage();
    Pages.gotoInitialPage('list');
})

