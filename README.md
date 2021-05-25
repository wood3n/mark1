# rc-music

<div align=center><img width="150" height="150" src="https://github.com/wood3n/icodex/blob/master/docs/images/rcmusic-logo.png"/></div>

## V1.0 开发计划

V1.0 版本待支持以下功能

### Recommend

- [ ] 个人每日推荐（轮播）以当日日期命名菜单栏

![image-20210227193237971](../blog/docs/images/image-20210227193237971.png)

- [ ] 私人 FM

![image-20210227193457197](../blog/docs/images/image-20210227193457197.png)

- [ ] 我的歌单

卡片大图

![image-20210227193533347](../blog/docs/images/image-20210227193533347.png)

- [ ] 收藏 MV（视频播放）

卡片形式，支持 Hover 播放

![image-20210227193616481](../blog/docs/images/image-20210227193616481.png)

### Treasure

- [ ] 收藏专辑

![image-20210227195530795](../blog/docs/images/image-20210227195530795.png)

- [ ] 订阅电台

![image-20210227195432503](../blog/docs/images/image-20210227195432503.png)

- [ ] 收藏歌手

上方采用循环滚动列表

![image-20210227194741859](../blog/docs/images/image-20210227194741859.png)

点击某个歌手后，下方展示歌手信息和专辑列表

![image-20210227194839001](../blog/docs/images/image-20210227194839001.png)

![image-20210227194849778](../blog/docs/images/image-20210227194849778.png)

- [ ] 音乐云盘

![image-20210227194919045](../blog/docs/images/image-20210227194919045.png)

- [ ] 历史播放记录（保存七日）

同上图云盘设计

### Mine

- [ ] 账户登录及退出登录
- [ ] 用户个人信息展示
- [ ] 修改用户资料
- [ ] 主题换肤

## 开发日志

### 2021-01-19

基于 CRA 初始化项目，并添加`less`支持

### 2021-02-27

配置`http-proxy-middleware`开启本地跨域

## Q&A

### electron 安装失败

在项目根目录新建`.npmrc`文件，也就是`npm`的配置文件，然后写入如下配置：

```
registry=https://registry.npm.taobao.org
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
```

## reference

- create-react-app
- electron
- classnames
