// ==UserScript==
// @name         通用 yt-dlp 下载按钮
// @namespace    local.ytdlp.button
// @version      1.0.0
// @description  在视频网站页面添加按钮，点击后调用本地 yt-dlp + aria2 下载当前 URL
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @connect      127.0.0.1
// ==/UserScript==

(function () {
  'use strict';

  const server = 'http://127.0.0.1:8765/download?url=';
  const button = document.createElement('button');

  button.textContent = '下载视频';
  Object.assign(button.style, {
    position: 'fixed',
    right: '16px',
    bottom: '16px',
    zIndex: 2147483647,
    padding: '10px 14px',
    border: '0',
    borderRadius: '8px',
    background: '#1677ff',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,.25)',
  });

  button.addEventListener('click', () => {
    button.textContent = '已发送';
    GM_xmlhttpRequest({
      method: 'GET',
      url: server + encodeURIComponent(location.href),
      onload: () => setTimeout(() => (button.textContent = '下载视频'), 1500),
      onerror: () => {
        button.textContent = '本地服务未启动';
        setTimeout(() => (button.textContent = '下载视频'), 2500);
      },
    });
  });

  document.body.appendChild(button);
})();
