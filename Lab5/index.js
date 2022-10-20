let buttonElems = document.querySelectorAll('button');
const newsText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet asperiores aut nihil! Corporis debitis labore fugiat id, eligendi ratione veritatis!';
const c = document.getElementById('background');
const mess_news = document.getElementById('mess_news');

buttonElems.forEach((el) => {
    el.setAttribute('title', `Открыть новость ${Array.from(buttonElems).indexOf(el)+1}`);

    el.addEventListener('click', () => {
        const text = `Новость ${Array.from(buttonElems).indexOf(el)+1}`;
        mess_news.style.display='block';
        background.style.display='block';
        
        mess_news.querySelector('h2').textContent=`${text}`;
        mess_news.querySelectorAll('p')[0].textContent=`${text}: ${newsText}`
    });
})
background.addEventListener('click', () => {
    mess_news.style.display='none';
        background.style.display='none';
});

const panel = document.getElementById('mess_news');