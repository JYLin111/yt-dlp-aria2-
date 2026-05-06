# yt-dlp aria2 下载按钮

一个简单的油猴脚本 + 本地 Python 服务，用于在视频网站页面添加下载按钮，并通过本地 `yt-dlp` 下载当前页面视频。

## 功能

- 在网页右下角显示“下载视频”按钮
- 点击后自动获取当前页面 URL
- 调用本地 `yt-dlp` 下载视频
- 默认启用 `aria2c` 加速
- 下载目录使用本机 `yt-dlp` 配置文件设置，例如 `~/Videos`
- 适用于 Bilibili、YouTube、抖音等多数 `yt-dlp` 支持的网站

## 依赖

需要提前安装：

- Python 3
- yt-dlp
- aria2
- Tampermonkey / Violentmonkey

## 使用方法

1. 运行本地服务：

```bash
python yt-dlp-local-server.py
```

2. 将 `video-download.user.js` 导入油猴扩展。

3. 打开视频网站页面，点击右下角“下载视频”。

## systemd 用户服务

Linux 用户可以将本地服务配置为用户级 systemd 服务，实现登录后自动启动。

```ini
[Unit]
Description=Local yt-dlp download bridge
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/python /path/to/yt-dlp-local-server.py
Restart=on-failure
RestartSec=3
WorkingDirectory=/path/to

[Install]
WantedBy=default.target
```

启用：

```bash
systemctl --user daemon-reload
systemctl --user enable --now yt-dlp-local-server.service
```

## 注意

浏览器脚本不能直接执行本地命令，所以需要本地 Python 服务作为桥接。服务只监听 `127.0.0.1`，用于接收油猴脚本发送的当前页面 URL。
