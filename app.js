let playernameEl=document.getElementById('playername')
let btn1El=document.getElementById('btn1')
let btn2El=document.getElementById('btn2')
let name1El=document.getElementById('name1')
let btn3El=document.getElementById('btn3')
let name2El=document.getElementById('name2')
let btn4El=document.getElementById('btn3')
let newgameEl=document.getElementById('newgame')
let playernamegEl=document.getElementById('playernameg')
let resultEl=document.getElementById('result')
let modalEl=document.getElementById('modal')
let entireEl=document.getElementById('entire')
let backdropEl=document.getElementById('backdrop')



function details(){
    modalEl.style.display='block';
    backdropEl.style.display='block';
}
btn3El.addEventListener('click',details)