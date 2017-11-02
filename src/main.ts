import * as $ from 'jquery'
import { Paj } from './paj'

class Handler {

    static todos = [
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
    page_list() {
        let body = $('body')
        body.empty();
        $(`<h1>Things to do</h1>`).appendTo(body);
        let list = $('<ul/>').appendTo(body);
        for (let todo of Handler.todos) {
            $(`<li><a href="#task?id=${todo.id}">${todo.text}</a></li>`).appendTo(list);
        }
    }

    page_task() {
        let id = parseInt(Paj.hashParam('id'));
        let todo = Handler.todos.find((t) => {return t.id == id});
        let body = $('body')
        body.empty();
        $(`<h1>${todo.text}</h1>`).appendTo(body);
        $(`<div>${todo.when}</div><br/>`).appendTo(body);
        $(`<a href="#list">Back to list</a>`).appendTo(body);
    }


}


$(function () {
    Paj.handler = new Handler();
    Paj.gotoInitialPage('list');
})

