// ===============================
// SCROLL SUAVE
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

link.addEventListener('click', e => {

e.preventDefault();

const targetID = link.getAttribute('href');
const target = document.querySelector(targetID);

if(target){
target.scrollIntoView({
behavior:'smooth',
block:'start'
});
}

});

});
