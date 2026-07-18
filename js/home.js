// ==========================================
// V3 Group of Business
// home.js
// Version 1.0
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initScrollTop();

    initHeader();

    initFAQ();

    initCounter();

});

// ==========================================
// Mobile Menu
// ==========================================

function initMobileMenu(){

const menu=document.querySelector(".mobile-menu");

const nav=document.querySelector(".navbar");

if(!menu || !nav) return;

menu.addEventListener("click",()=>{

nav.classList.toggle("active");

});

}

// ==========================================
// Sticky Header
// ==========================================

function initHeader(){

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

header.classList.add("sticky");

}else{

header.classList.remove("sticky");

}

});

}

// ==========================================
// Scroll To Top
// ==========================================

function initScrollTop(){

const btn=document.getElementById("scrollTop");

if(!btn) return;

btn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

window.addEventListener("scroll",()=>{

btn.style.display=window.scrollY>300?"flex":"none";

});

}

// ==========================================
// FAQ Accordion
// ==========================================

function initFAQ(){

const faq=document.querySelectorAll(".faq-item");

faq.forEach(item=>{

const answer=item.querySelector("p");

if(answer){

answer.style.display="none";

}

item.addEventListener("click",()=>{

if(!answer) return;

const open=answer.style.display==="block";

document.querySelectorAll(".faq-item p").forEach(p=>{

p.style.display="none";

});

answer.style.display=open?"none":"block";

});

});

}

// ==========================================
// Counter Animation
// ==========================================

function initCounter(){

const counters=document.querySelectorAll("[data-count]");

counters.forEach(counter=>{

let target=parseInt(counter.dataset.count);

let current=0;

const speed=Math.max(1,Math.floor(target/100));

const timer=setInterval(()=>{

current+=speed;

if(current>=target){

current=target;

clearInterval(timer);

}

counter.innerText=current.toLocaleString();

},20);

});

}

// ==========================================
// Reveal Animation
// ==========================================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".service-card,.why-card,.testimonial,.step").forEach(el=>{

observer.observe(el);

});

// ==========================================
// Welcome Message
// ==========================================

console.log("Welcome to V3 Group of Business");
