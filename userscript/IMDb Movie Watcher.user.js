// ==UserScript==
// @name         Movie Watcher
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Watch movies for free with IMDB
// @author       You
// @match        https://www.imdb.com/title/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const $ = document.querySelector.bind(document);
    $('body').insertAdjacentHTML('beforeend', init_css() );
    let currentURL = window.location.href;
    let ImdbId = extractImdbId(currentURL)
    let redirectUrl = `https://vidfast.pro/movie/${ImdbId}?poster=true`
    let redirectUrl1 = `https://vidfast.pro/tv/${ImdbId}/1/1?poster=true`
    setTimeout(() => {
        //setTimeout needed to allow a few ms for the new Btn to be injected onto page
        $('#mybutton').addEventListener('click', () => {
            window.open(redirectUrl);
        });
        $('#mybutton1').addEventListener('click', () => {
            window.open(redirectUrl1);
        });
    },500);
})();

function extractImdbId(url) {
    const regex = /\/title\/(tt[0-9a-zA-Z]+)/;
    const match = url.match(regex);

    if (match) {
        return match[1];
    } else {
        return null; // Return null if no ID found
}};

function init_css(){
    return `
    <div id="richous">
    <button id="mybutton">Watch Now</button>
    <style>
        #mybutton{position:absolute;top:90px;left:45%;height:30px;width:120px;}
        #mybutton{background:#0073ea;color:white;padding-top:5px;text-align:center;}
        #mybutton{z-index:99999;}
    </style>
    <button id="mybutton1">(Click me if this is a Series)</button>
    <style>
        #mybutton1{position:absolute;top:140px;left:45%;height:30px;width:240px;}
        #mybutton1{background:#0073ea;color:white;padding-top:5px;text-align:center;}
        #mybutton1{z-index:99999;}
    </style>
    </div>
    <style>
        .richous{
            display: flex;
            justify-content: center; /* Centers horizontally */
            align-items: center;
        }
    </style>
    `;
};