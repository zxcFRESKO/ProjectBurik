const menu = document.querySelector('.logo-menu')
const menu_ul = document.querySelector('.menu_ul')
const titler = document.querySelector('.page_one_title_h1')
const search_input = document.querySelector('.search')
const cards_one = document.querySelector('.cards')
const cards_two = document.querySelector('.cards_two')
const cards_three = document.querySelector('.cards_three')
const btn_one = document.querySelector('.btn_one')
const btn_two = document.querySelector('.btn_two')
const btn_three = document.querySelector('.btn_three')          

let currentSlide = 0

function showSlide(index) {
    const slides = document.querySelectorAll('.slide')
    if (index >= slides.length) {   
        currentSlide = 0
        } else if (index < 0) {
            currentSlide = slides.length - 1
        } else {
            currentSlide = index    
        } 
    const slidesContainer = document.querySelector('.slides')
    slidesContainer.style.transform = 'translateX(' + (-currentSlide * 100) + '%)'
}

function changeSlide(n) {
    showSlide(currentSlide + n)
}

document.querySelector('.prev').addEventListener('click', function() {
    changeSlide(-1)
})

document.querySelector('.next').addEventListener('click', function() {
    changeSlide(1)
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        changeSlide(1)
    } else if (event.key === 'ArrowLeft') {
        changeSlide(-1)
    }
})
showSlide(currentSlide)
setInterval(() => changeSlide(1), 3000)

document.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('logo-menu')) {
        menu_ul.classList.add('_active')
    } else {
        menu_ul.classList.remove('_active')
    }
})

search_input.oninput = async function() {
    const loaderWrap = document.querySelector('.loader_wrap');
    loaderWrap.classList.remove('hide');
    try {
        let val = this.value.trim().toLowerCase() 
        const response = await fetch('https://6754592136bcd1eec850e8da.mockapi.io/api/attracs');
        const data = await response.json();
        let data_first = data.slice(0,6)
        for (i in data_first){
            let cards = document.querySelectorAll('.card')
        cards.forEach(card=>{
            let cardTitle = card.querySelector('.card_title').innerText.toLowerCase();
            if (cardTitle.includes(val)){
                card.classList.remove('hide')
            cards_one.insertAdjacentHTML = ('beforeend',`
                <div class="${data_first[i].class}">
                    <h1 class="card_title">${data_first[i].name}</h1>
                    <a href="?id=${data_first[i].id}#descriptions"><img src="${data_first[i].img}" alt="" class="page_two_img"></a>
                </div>
            `
            
        )}else{
            card.classList.add('hide')
        }})}
}catch(error){
    console.log('error', error)
}finally{
    loaderWrap.classList.add('hide');
}}
    

    // cards.forEach(function(card) {
    //     let cardTitle = card.querySelector('.card_title').innerText.toLowerCase(); 
    //     if (cardTitle.includes(val)) {
    //         card.classList.remove('hide')
    //     } else {
    //         card.classList.add('hide');
    //     }
    // });

btn_one.addEventListener('click', paginationOne)
btn_two.addEventListener('click', paginationTwo)
btn_three.addEventListener('click', paginationThree)




async function paginationOne(){
    const loaderWrap = document.querySelector('.loader_wrap');
    loaderWrap.classList.remove('hide');
    try {
        const response = await fetch('https://6754592136bcd1eec850e8da.mockapi.io/api/attracs');
        const data = await response.json();
        let data_first = data.slice(0,6)
        btn_one.classList.add('active')
        btn_two.classList.remove('active')
        btn_three.classList.remove('active')
        cards_two.classList.add('hide')
        cards_one.classList.remove('hide')
        cards_three.classList.add('hide')
        for (i in data_first){

            cards_one.insertAdjacentHTML = ('beforeend',`
                <div class="${data_first[i].class}">
                    <h1 class="card_title">${data_first[i].name}</h1>
                    <a href="?id=${data_first[i].id}#descriptions"><img src="${data_first[i].img}" alt="" class="page_two_img"></a>
                </div>
            `
        )}
}catch(error){
    console.log('error', error)
}finally{
    loaderWrap.classList.add('hide');
}}
async function paginationTwo(){
    const loaderWrap = document.querySelector('.loader_wrap');
    loaderWrap.classList.remove('hide');
    try {
    const response = await fetch('https://6754592136bcd1eec850e8da.mockapi.io/api/attracs')
    const data = await response.json()
    
    let data_second = data.slice(7,13)
    btn_one.classList.remove('active')
    btn_two.classList.add('active')
    btn_three.classList.remove('active')
    cards_two.classList.remove('hide')
    cards_one.classList.add('hide')
    cards_three.classList.add('hide')
    for (i in data_second){
        cards_two.insertAdjacentHTML = ('beforeend',
            `<div class="${data_second[i].class}">
                <h1 class="card_title">${data_second[i].name}</h1>
                <a href="?id=${data_second[i].id}#descriptions"><img src="${data_second[i].img}" alt="" class="page_two_img"></a>
            </div>
        `
    )}
}catch(error){
    console.log('error', error)
}finally{
    loaderWrap.classList.add('hide');
}
}
async function paginationThree(){
    const loaderWrap = document.querySelector('.loader_wrap');
    loaderWrap.classList.remove('hide');
    try {
    const response = await fetch('https://6754592136bcd1eec850e8da.mockapi.io/api/attracs')
    const data = await response.json()
    
    let data_third = data.slice(13,17)
    btn_one.classList.remove('active')
    btn_two.classList.remove('active')
    btn_three.classList.add('active')
    cards_two.classList.add('hide')
    cards_one.classList.add('hide')
    cards_three.classList.remove('hide')
    for (i in data_third){
        cards_three.insertAdjacentHTML = ('beforeend',
            `<div class="${data_third[i].class}">
                <h1 class="card_title">${data_third[i].name}</h1>
                <a href="?id=${data_third[i].id}#descriptions"><img src="${data_third[i].img}" alt="" class="page_two_img"></a>
            </div>
        `
    )}
}catch(error){
    console.log('error', error)
}finally{
    loaderWrap.classList.add('hide');
}
}

    const filtration_ul = document.querySelector('.filtration_ul')
    const filtration_li = document.querySelectorAll('.filtration_li')
    filtration_ul.addEventListener('click',filtration)

    async function filtration(event){
    const loaderWrap = document.querySelector('.loader_wrap');
    loaderWrap.classList.remove('hide');
    try {
    const targetId = event.target.dataset.id
    
    const response = await fetch('https://6754592136bcd1eec850e8da.mockapi.io/api/attracs');
    const data = await response.json();

    for (i in data){
        const card = document.querySelectorAll('.card')
        card.forEach( item =>{
            item.classList.remove('hide')
            if (!item.classList.contains(targetId) && targetId !== 'all') {
                item.classList.add('hide')
            }
        })
    cards.innerHTML += `
        <div class="${data_first[i].class}">
            <h1 class="card_title">${data_first[i].name}</h1>
            <a href="?id=${data_first[i].id}#descriptions"><img src="${data_first[i].img}" alt="" class="page_two_img"></a>
        </div>
    `
}
}catch(error){
    console.error('ошибка:', error)
}finally{
    loaderWrap.classList.add('hide');
}}
        // const targetId = event.target.dataset.id
        // const card = document.querySelectorAll('.card')
        // card.forEach( item =>{
        //     item.classList.remove('hide')
        //     if (!item.classList.contains(targetId) && targetId !== 'all') {
        //         item.classList.add('hide')
        //     }
        // })


async function fetching() {
    const loaderWrap = document.querySelector('.loader_wrap');
    loaderWrap.classList.remove('hide');
    try {
    const response = await fetch('https://6754592136bcd1eec850e8da.mockapi.io/api/attracs');
    const data = await response.json();
    let data_first = data.slice(0,6)
    let data_second = data.slice(7,13)
    let data_third = data.slice(14,19)

    for (i in data_first){

    cards_one.innerHTML += `
        <div class="${data_first[i].class}">
            <h1 class="card_title">${data_first[i].name}</h1>
            <a href="?id=${data_first[i].id}#descriptions"><img src="${data_first[i].img}" alt="" class="page_two_img"></a>
        </div>
    `
}
for (i in data_second){
    cards_two.innerHTML += `
        <div class="${data_second[i].class}">
            <h1 class="card_title">${data_second[i].name}</h1>
            <a href="?id=${data_second[i].id}#descriptions"><img src="${data_second[i].img}" alt="" class="page_two_img"></a>
        </div>
    `
}
for (i in data_third){

    cards_three.innerHTML += `
    <div class="card_first_line">
        <div class="${data_third[i].class}">
            <h1 class="card_title">${data_third[i].name}</h1>
            <a href="?id=${data_third[i].id}#descriptions"><img src="${data_third[i].img}" alt="" class="page_two_img"></a>
        </div>
    </div>
    `
}}catch(error){
    console.error('ошибка:', error)
}finally{
    loaderWrap.classList.add('hide');
}}
fetching();

async function descriptions() {
    const response = await fetch('https://6754592136bcd1eec850e8da.mockapi.io/api/descriptions')
    const data = await response.json()
    const currentUrl = window.location.href
    let url = new URL(currentUrl)
    const id = url.searchParams.get('id')
    const description_wrap = document.querySelector('.descriptions_wrap')
    
    for (i in data){
    if (data[i].id === id) {

        description_wrap.innerHTML += `
        <div class="description_wrapper">
        <h1 class = 'description_title'>${data[i].name}</h1>
        <img class = 'description_img' src="${data[i].img}">
        <p class="description_text">${data[i].info}</p>
         <div class="container">
            <div class="back_div">
                <a href="#page_two"><button class="back">Назад</button></a>
            </div>
        </div>
        </div>
        <iframe src="${data[i].map}" width="500" height="400" frameborder="0"></iframe>
        `
    }
}

}
descriptions()