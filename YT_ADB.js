// ==UserScript==
// @name         youtube去广告
// @namespace    http://tampermonkey.net/ 
// @version      0.1
// @description  Automate YouTube ad skipping
// @author       You
// @match        *://*.youtube.com/*    
// @grant        none
// ==/UserScript==

function removeAdsWorker(){
    function checkAds() {
        var video = document.querySelector(`.ad-showing video`) || document.querySelector(`video`); 
        var skipButton = document.querySelector(`.ytp-ad-skip-button`) || document.querySelector(`.ytp-skip-ad-button`) || document.querySelector(`.ytp-ad-skip-button-modern`); 
        var shortAdMsg = document.querySelector(`.video-ads.ytp-ad-module .ytp-ad-player-overlay`) || document.querySelector(`.ytp-ad-button-icon`);

        if(skipButton || shortAdMsg && window.location.href.indexOf("https://m.youtube.com/") === -1) {
            video.muted = true;
            video.playbackRate = 16;
        }

        if(skipButton){
            if(video.currentTime>0.5){
                video.currentTime = video.duration;
                console.log('已移除广告');
            }
            skipButton.click();
        }else if(shortAdMsg && video.currentTime>0.5) {
            video.currentTime = video.duration; //强制
            console.log('已移除广告');
        }
        setTimeout(checkAds, 1);
    }
    checkAds();
}

(function() {
    'use strict';
    removeAdsWorker();
})();
