const moon = document.querySelector('.moon')
const sun = document.querySelector('.sun')
const menu = document.querySelector('.logo-menu')
const menu_ul = document.querySelector('.menu_ul')
const open_btn = document.querySelector('.open_modal')
const close_btn = document.querySelector('.close_modal')
const modal = document.querySelector('.modal')
const modal_wrap = document.querySelector('.modal_wrap')
const send_btn = document.querySelector('.send')
const inputs = document.querySelectorAll('.input')

moon.addEventListener('click', Moon)

function Moon(){
    let body = document.querySelector('body') 
    moon.classList.add('hide');
    sun.classList.remove('hide')
    body.classList.add('night')
}
sun.addEventListener('click', Sun)

function Sun(){
    let body = document.querySelector('body') 
    sun.classList.add('hide')
    moon.classList.remove('hide')
    body.classList.remove('night')
    
}
document.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('logo-menu')) {
        menu_ul.classList.add('_active');
    } else {
        menu_ul.classList.remove('_active');
    }
});
open_btn.addEventListener('click', najatie)
close_btn.addEventListener('click', najatie)
function najatie(){
    modal.classList.toggle('hide')
    modal_wrap.classList.toggle('abs')
}
send_btn.addEventListener('click', send)

function send(){
    modal.classList.add('hide')
    modal_wrap.classList.remove('abs')
    alert('ваше сообщение отправлено')
}