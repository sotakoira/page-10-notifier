// ==UserScript==
// @name         Page 10 notifier
// @namespace    sufferkino
// @version      0.1.1
// @description  Annoys you once the thread you have currently open hits the page 10 and is currently bumpable
// @author       https://github.com/sotakoira/
// @match        https://boards.4chan.org/*/thread/*
// @match        https://boards.4channel.org/*/thread/*
// @icon         https://4channel.org/favicon.ico
// @run-at       document-idle
// @grant        GM.notification
// ==/UserScript==

var warned = false;
var interval = 15000; // 15 secs in miliseconds

function handler() {

let bumpable = !document.getElementById("post-count").classList.contains("warning");
let page_ten = document.getElementById("page-count").classList.contains("warning");
let alive = !document.getElementById("update-status").classList.contains("warning");

    if (warned === false && alive && bumpable && page_ten) {
        let subject = document.querySelector( ".subject" ).innerText;

        //4chan-x doesn't seem to fire desktop notification with this
        let content = 'Thread ' + (subject || document.title) + ' has hit page 10.'
        let detail = {type: 'warning', content: content, lifetime: 15};
        let notif = new CustomEvent('CreateNotification', {bubbles: true, detail: detail});
        document.dispatchEvent(notif);

        GM.notification({title: 'Thread on page 10!', image: 'https://raw.githubusercontent.com/ccd0/4chan-x/master/src/meta/icon128.png', text: content, highlight: true});

        warned = true;
    }
    if (warned === true && !page_ten) {
        warned = false;
    }

}

setInterval(handler, interval);



