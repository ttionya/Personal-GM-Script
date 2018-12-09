// ==UserScript==
// @name         TTIONYA-ACG
// @namespace    https://blog.ttionya.com
// @version      1.0.0
// @description  ACG相关
// @copyright    2018, TTIONYA
// @author       TTIONYA

// @include      https://anime1.me/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/ttionya/Personal-GM-Script/master/ACG.user.js
// @downloadURL  https://raw.githubusercontent.com/ttionya/Personal-GM-Script/master/ACG.user.js

// @grant        none
// @run-at       document-end
// ==/UserScript==

let urlData = new URL(location.href);

// 自动放大 anime1 播放器尺寸
if (urlData.host === 'anime1.me') {
    $('#main iframe')
        .attr('width', 1280)
        .attr('height', 720);
    $('#primary').css('width', '100%');
}
