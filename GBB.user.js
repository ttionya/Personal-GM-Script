// ==UserScript==
// @name         gbb
// @namespace    https://blog.ttionya.com
// @version      3.0.0
// @description  Google、Baidu、Bing搜索切换
// @copyright    2018, TTIONYA
// @author       TTIONYA

// @include      https://www.google.com/search?*
// @include      https://www.google.com.*/search?*
// @include      https://www.baidu.com/
// @include      https://www.baidu.com/s?*
// @include      https://www.bing.com/search?*
// @include      https://cn.bing.com/search?*
// @updateURL    https://raw.githubusercontent.com/ttionya/Personal-GM-Script/master/GBB.user.js
// @downloadURL  https://raw.githubusercontent.com/ttionya/Personal-GM-Script/master/GBB.user.js

// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

let urlData = new URL(location.href);

// Google
if (~urlData.host.indexOf('www.google.com') && !urlData.searchParams.get('tbm')) {
    (function () {
        let $searchBox = document.querySelector('input[name="q"]');
        let $button = document.querySelector('.hdtb-tl');
        const init = function() {
            let domBaidu, domBing;

            GM_addStyle('a.gbb-change { padding-right: 5px; padding-left: 5px; font-weight: bold; text-decoration: none; }');

            domBaidu = document.createElement('a');
            domBaidu.className = 'hdtb-tl gbb-change';
            domBaidu.id = 'search-baidu';
            domBaidu.setAttribute('role', 'button');
            domBaidu.setAttribute('tabindex', '0');
            domBaidu.setAttribute('target', '_blank');
            domBaidu.innerText = '百度搜索';
            $button.parentNode.appendChild(domBaidu);

            domBing = document.createElement('a');
            domBing.className = 'hdtb-tl gbb-change';
            domBing.id = 'search-bing';
            domBing.setAttribute('role', 'button');
            domBing.setAttribute('tabindex', '0');
            domBing.setAttribute('target', '_blank');
            domBing.innerText = '必应搜索';
            $button.parentNode.appendChild(domBing);

            // 绑定事件
            domBaidu.addEventListener('mouseover', function () {
                document.getElementById('search-baidu').href = 'https://www.baidu.com/s?wd=' + encodeURIComponent($searchBox.value);
            });

            domBing.addEventListener('mouseover', function () {
                document.getElementById('search-bing').href = 'https://www.bing.com/search?q=' + encodeURIComponent($searchBox.value);
            });
        };

        init();
    })();
}

// Baidu
if (urlData.host === 'www.baidu.com') {
    (function () {
        let $searchBox = document.getElementById('kw');
        let $button = document.querySelector('.bg.s_btn_wr');

        const init = function() {
            let domGoogle, domBing;

            domBing = document.createElement('span');
            domBing.className = 'bg s_btn_wr';
            domBing.style.marginLeft = '16px';
            domBing.innerHTML = '<a id="search-bing" target="_blank"><input type="button" class="bg s_btn" value="必应搜索">';
            $button.parentNode.insertBefore(domBing, $button.nextSibling);

            domGoogle = document.createElement('span');
            domGoogle.className = 'bg s_btn_wr';
            domGoogle.style.marginLeft = '16px';
            domGoogle.innerHTML = '<a id="search-google" target="_blank"><input type="button" class="bg s_btn" value="谷歌搜索">';
            $button.parentNode.insertBefore(domGoogle, $button.nextSibling);

            // 绑定事件
            domBing.addEventListener('mouseover', function () {
                document.getElementById('search-bing').href = 'https://www.bing.com/search?q=' + encodeURIComponent($searchBox.value);
            });

            domGoogle.addEventListener('mouseover', function () {
                document.getElementById('search-google').href = 'https://www.google.com/search?q=' + encodeURIComponent($searchBox.value);
            });

            // 只初始化一次
            $searchBox.removeEventListener('keydown', init);
        };

        urlData.pathname === '/s' ? window.onload = init : $searchBox.addEventListener('keydown', init);
    })();
}

// Bing
if (urlData.host === 'cn.bing.com' || urlData.host === 'www.bing.com') {
    (function () {
        let $searchBox = document.getElementById('sb_form_q');
        let $button = document.getElementById('sb_form_go');

        const init = function() {
            let domGoogle, domBaidu;

            GM_addStyle('input.gbb-change { width: auto; text-indent: 0; background-image: none; outline: 0; }');

            domBaidu = document.createElement('a');
            domBaidu.id = 'search-baidu';
            domBaidu.setAttribute('target', '_blank');
            domBaidu.innerHTML = '<input type="button" class="b_searchboxSubmit gbb-change" title="百度搜索" tabindex="0" name="go" value="百度搜索">';
            $button.parentNode.insertBefore(domBaidu, $button.nextSibling);

            domGoogle = document.createElement('a');
            domGoogle.id = 'search-google';
            domGoogle.setAttribute('target', '_blank');
            domGoogle.innerHTML = '<input type="button" class="b_searchboxSubmit gbb-change" title="谷歌搜索" tabindex="0" name="go" value="谷歌搜索">';
            $button.parentNode.insertBefore(domGoogle, $button.nextSibling);

            // 绑定事件
            domBaidu.addEventListener('mouseover', function () {
                document.getElementById('search-baidu').href = 'https://www.baidu.com/s?wd=' + encodeURIComponent($searchBox.value);
            });

            domGoogle.addEventListener('mouseover', function () {
                document.getElementById('search-google').href = 'https://www.google.com/search?q=' + encodeURIComponent($searchBox.value);
            });
        };

        init();
    })();
}