import * as $ from 'jquery'
import {Greeter} from './lib'

$(function(){
    let greeting = new Greeter().sayHello('world')        
    $('body').html(`<h1>${greeting}</h1>`);
})

