// ==UserScript==
// @name         TypeRacer Cheat
// @namespace    https://www.madcaped.com/
// @version      2.0
// @description  Auto Typing on play.typeracer.com
// @author       Prabhakar Rai
// @match        https://play.typeracer.com/
// @require https://code.jquery.com/jquery-3.5.1.min.js
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_registerMenuCommand
// @grant GM_listValues
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_log
// @grant GM_info
// ==/UserScript==

function triggerKeyboardEvent(el, keyCode, type){
    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");

    if(eventObj.initEvent){
        eventObj.initEvent(type, true, true);
    }

    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;

    el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj);
}

var typeClear;

function scanner(){
    var a = document.getElementsByClassName('txtInput');
    if(a.length != 0 && a[0].disabled == false){
        clearInterval(lp);
        var content = document.querySelector("table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div").textContent.split('');
        var i = 0;
        function a () {
            if (i == content.length - 1){
                clearInterval(lp);
                return;
            }
            var input = document.querySelector("table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > input");
            input.focus();
            input.value += content[i++];
            triggerKeyboardEvent(input, input.value.charCodeAt(0), "keydown");
            input.click();
            triggerKeyboardEvent(input, input.value.charCodeAt(0), "keypress");
            triggerKeyboardEvent(input, input.value.charCodeAt(0), "keyup");
            setTimeout(a, 200 * Math.random());
        }
        a();
    }
}
var startOver;
function nextRace(){
    startOver = document.getElementsByClassName('raceAgainLink')[0];
    if(startOver != undefined){
        clearInterval(lp2);
        startOver.addEventListener("click", function(){
            lp = setInterval(scanner, 2000);
        });
    }
    startOver = undefined;
}

var lp = setInterval(scanner, 2000);
var lp2 = setInterval(nextRace, 1500);
