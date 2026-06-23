import { normalizeAssetPaths } from './utils/assetPath.js';

const config = {
	//网页元数据
	metaData: {
		title: 'SuZec的个人主页🎉',
		description: '欢迎来到SuZec的奇妙世界！',
		keywords: 'suze,czw,个人主页,个人网站',
		icon: '/favicon.ico'   //网页图标，支持外链
	},

	avatar: "/img/author.jpg", // 头像
	welcometitle: "Hi, I'm SUZE", // 标题

	// 颜色配置
	color: {
		themecolor: "#FFFFFF", // 主题颜色，推荐趋于亮白可带有轻微色调，例： #D1FFEC
		welcometitlecolor: "#FFFFFF", // 标题颜色 例： #7BFFC9
		turntablecolor1: "#FFFF00",  // 转盘渐变色一
		turntablecolor2: "#00FFFF"   // 转盘渐变色二
	},

	brightness: 85, // 背景亮度 --%
	blur: 5, // 毛玻璃模糊效果

	// 我的标签
	tags: ['乐观开朗', '温柔体贴', '随和亲切', '冷静沉着', '才思敏捷', '风趣幽默', '刚正不阿', '善解人意'],

	// 壁纸配置
	wallpaperConfig: {
		enableRandom: false  // 是否启用随机壁纸功能
	},

	// 默认背景壁纸
	background: {
		"pc": {   //pc端
			"type": "video",   //"pic":静态壁纸;"video":动态壁纸
			"datainfo": {
				"title": "吉罗",
				"preview": "/img/wallpaper/dynamic/吉罗/Wallpaper.Cut.00'03-00'05.webm",
				"url": "/img/wallpaper/dynamic/吉罗/Wallpaper.Cut.00'00-00'08.webm"
			},
		},
		"mobile": {   //移动端
			"type": "video",
			"datainfo": {
				"title": "吉罗",
				"preview": "/img/wallpaper/dynamic-mobile/吉罗/Wallpaper.Cut.00'03-00'05.webm",
				"url": "/img/wallpaper/dynamic-mobile/吉罗/Wallpaper.Cut.00'00-00'09.webm"
			}
		}
	},

	//极坐标图数据
	polarChart: {
		skills: ['Vue.js', 'React', 'JavaScript', 'Node', 'Java', 'Python', 'linux', 'Docker', 'MySQL', 'MongoDB', 'AWS'],
		skillPoints: [85, 78, 88, 90, 80, 78, 85, 65, 82, 78, 70],
	},

	//社交按钮
	socialPlatformIcons: [
		{ icon: "mdi-github", link: "https://www.github.com/leleo886" },
		{ icon: "mdi-email", link: "mailto:leleo886@foxmail.com" },
		{ icon: "mdi-qqchat", link: "https://im.qq.com/" },
		{ icon: "mdi-wechat", link: "https://wx.qq.com/" },
		{ icon: "mdi-youtube", link: "https://www.youtube.com" },
		{ icon: "mdi-facebook", link: "https://www.facebook.com" }
	],

	//打字机
	typeWriterStrings: [
		"如果你看到了这行字，说明我已经成功吸引到了你的注意力。",
		"顶峰的少年，给了你所有细节，你却说我不是迪迦，给不了你想要的光。",
		"心简单，世界就简单，幸福才会生长；心自由，生活就自由，到哪都有快乐。",
		"生命太短，没有时间留给遗憾，若不是终点，请微笑一直向前。"
	],

	//音乐播放配置，采用MetingJS Api(https://github.com/metowolf/MetingJS)
	musicPlayer: {
		server: 'netease',  //服务提供商 --网易云音乐
		type: 'playlist',   //歌单类型
		id: '2028178887'  //歌单id ---> music.163.com/#/playlist?id=2028178887
	},
	
	// 音乐播放配置
	musicConfig: {
		autoPlayMuted: true,  // 是否启用静音自动播放
		requireUserInteraction: true,  // 是否需要用户交互才能取消静音播放
		preload: true,  // 是否预加载音乐
		initialVolume: 0.7,  // 初始音量 (0-1)
		initialMusicIndex: 0  // 初始播放的音乐索引
	},
	
	// 本地音乐文件配置
	localMusic: [
		{
			title: "PASSO BEM SOLTO(Club House)",
			author: "Atlxs",
			url: "/music/111.mp3",  // 音乐文件路径
			pic: "/img/author.jpg"  // 专辑封面图片
		},
		{
			title: "I Really Want to Stay at Your House",
			author: "Coggins",
			url: "/music/222.mp3",  // 音乐文件路径
			pic: "/img/author.jpg"  // 专辑封面图片
		},
		{
			title: "Mars",
			author: "Veezy",
			url: "/music/Mars.mp3",  // 音乐文件路径
			pic: "/img/author.jpg"  // 专辑封面图片
		}
	],

	//壁纸数据 -----可以将壁纸文件上传到图床获取网络直链。若想调用api，请前往脚本自行修改逻辑
	wallpaper: {
		pic: [
			{ "title": "海洋女孩", "preview": "/img/wallpaper/static/海洋女孩/image-pre.webp", "url": "/img/wallpaper/static/海洋女孩/image.png" },
			{ "title": "海洋女孩", "preview": "/img/wallpaper/static/白发男主/preview.webp", "url": "/img/wallpaper/static/白发男主/preview.jpg" },
			{ "title": "书房夜晚", "preview": "/img/wallpaper/static/书房夜晚/image-pre.webp", "url": "/img/wallpaper/static/书房夜晚/image.png" },
			{ "title": "安逸舒适", "preview": "/img/wallpaper/static/安逸舒适/image-pre.webp", "url": "/img/wallpaper/static/安逸舒适/image.png" },
			{ "title": "jswcMaMj", "preview": "https://s21.ax1x.com/2025/07/23/pVGli59.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGli59.jpg" },
			{ "title": "pgtTqoqq", "preview": "https://s21.ax1x.com/2025/07/23/pVGlmDO.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGlmDO.jpg" },
			{ "title": "cvKMKhue", "preview": "https://s21.ax1x.com/2025/07/23/pVGlNqS.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGlNqS.jpg" },
			{ "title": "XpxvQVoP", "preview": "https://s21.ax1x.com/2025/07/23/pVGlfIJ.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGlfIJ.jpg" },
			{ "title": "fVEEjEOA", "preview": "https://s21.ax1x.com/2025/07/23/pVGlEgx.md.webp", "url": "https://s21.ax1x.com/2025/07/23/pVGlEgx.webp" },
			{ "title": "jgnIKMpd", "preview": "https://s21.ax1x.com/2025/07/23/pVGldaQ.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGldaQ.jpg" },
			{ "title": "mgqyySeh", "preview": "https://s21.ax1x.com/2025/07/23/pVGl82t.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGl82t.jpg" },
			{ "title": "dSXZfZp", "preview": "https://s21.ax1x.com/2025/07/23/pVGlaVg.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGlaVg.jpg" },
		],
		picMobile: [
			{ "title": "0001", "preview": "/img/wallpaper/static-mobile/0001/image-pre.webp", "url": "/img/wallpaper/static-mobile/0001/image.png" },
			{ "title": "0002", "preview": "/img/wallpaper/static-mobile/0002/image-pre.webp", "url": "/img/wallpaper/static-mobile/0002/image.png" },
			{ "title": "0003", "preview": "/img/wallpaper/static-mobile/0003/image-pre.webp", "url": "/img/wallpaper/static-mobile/0003/image.png" },
			{ "title": "0004", "preview": "/img/wallpaper/static-mobile/0004/image-pre.webp", "url": "/img/wallpaper/static-mobile/0004/image.png" },
			{ "title": "DfNHPPcc", "preview": "https://s21.ax1x.com/2025/07/23/pVG1uQ0.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVG1uQ0.jpg" },
			{ "title": "cZZwzhis", "preview": "https://s21.ax1x.com/2025/07/23/pVG1Vij.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVG1Vij.jpg" },
			{ "title": "aANKZHPX", "preview": "https://s21.ax1x.com/2025/07/23/pVGlIR1.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGlIR1.jpg" },
		],
		video: [
			{
				"title": "动漫男主",
				"preview": "/img/wallpaper/dynamic/动漫男主/Wallpaper.boys.webm",
				"url": "/img/wallpaper/dynamic/动漫男主/Wallpaper.boy.webm"
			},
			{
				"title": "拔剑少年",
				"preview": "/img/wallpaper/dynamic/拔剑少年/Wallpaper.Cut.00'07-00'11.mkv",
				"url": "/img/wallpaper/dynamic/拔剑少年/Wallpaper.Cut.00'05-00'15.webm"
			},
			{
				"title": "世界很温柔《龙族》上杉绘梨衣",
				"preview": "https://www.leleo.top/img/wallpaper/dynamic/世界很温柔《龙族》上杉绘梨衣/A2EF5E85-pre.webm",
				"url": "https://www.leleo.top/img/wallpaper/dynamic/世界很温柔《龙族》上杉绘梨衣/A2EF5E85.webm"
			},
			{
				"title": "弗洛洛",
				"preview": "/img/wallpaper/dynamic/弗洛洛/Wallpaper.Cut.00'00-00'02.webm",
				"url": "/img/wallpaper/dynamic/弗洛洛/Wallpaper.Cut.00'00-00'12.webm"
			},
			{
				"title": "佳音",
				"preview": "/img/wallpaper/dynamic/佳音/Wallpaper.Cut.00'00-00'02.webm",
				"url": "/img/wallpaper/dynamic/佳音/Wallpaper.Cut.00'00-00'12.webm"
			},
			{
				"title": "吉罗",
				"preview": "/img/wallpaper/dynamic/吉罗/Wallpaper.Cut.00'03-00'05.webm",
				"url": "/img/wallpaper/dynamic/吉罗/Wallpaper.Cut.00'00-00'08.webm"
			},
			{
				"title": "椿",
				"preview": "/img/wallpaper/dynamic/椿/Wallpaper.Cut.00'00-00'02.webm",
				"url": "/img/wallpaper/dynamic/椿/Wallpaper.Cut.00'00-00'12.webm"
			},
			{
				"title": "龙少",
				"preview": "/img/wallpaper/dynamic/龙少/Wallpaper.Cut.00'00-00'02.webm",
				"url": "/img/wallpaper/dynamic/龙少/Wallpaper.Cut.00'00-00'10.webm"
			},
			{
				"title": "黄昏",
				"preview": "/img/wallpaper/dynamic/黄昏/Wallpaper.Cut.00'00-00'01.webm",
				"url": "/img/wallpaper/dynamic/黄昏/Wallpaper.Cut.00'00-00'15.webm"
			},
			{
				"title": "忧愁少女",
				"preview": "/img/wallpaper/dynamic/忧愁少女/Wallpaper.Cut.00'00-00'03.webm",
				"url": "/img/wallpaper/dynamic/忧愁少女/Wallpaper.Cut.00'00-00'08.webm"
			},
			{
				"title": "尼尔：机械纪元 团队",
				"preview": "/img/wallpaper/dynamic/尼尔：机械纪元 团队/Nier-Automata-Team-pre.webm",
				"url": "/img/wallpaper/dynamic/尼尔：机械纪元 团队/Nier-Automata-Team.webm"
			},
			{
				"title": "向往航天的女孩",
				"preview": "/img/wallpaper/dynamic/向往航天的女孩/Toy-Aeroplane-pre.webm",
				"url": "/img/wallpaper/dynamic/向往航天的女孩/Toy-Aeroplane.webm"
			},
		],
		videoMobile: [
			{
				"title": "吉罗",
				"preview": "/img/wallpaper/dynamic-mobile/吉罗/Wallpaper.Cut.00'00-00'09.webm",
				"url": "/img/wallpaper/dynamic-mobile/吉罗/Wallpaper.Cut.00'00-00'09.webm"
			},
			{
				"title": "椿",
				"preview": "/img/wallpaper/dynamic-mobile/椿/Wallpaper.Cut.00'00-00'13.CUT.00'00-00'02.mp4",
				"url": "/img/wallpaper/dynamic-mobile/椿/Wallpaper.Cut.00'00-00'13.webm"
			},
			{
				"title": "kuroha",
				"preview": "/img/wallpaper/dynamic-mobile/kuroha/Wallpaper.Cut.00'00-00'05.CUT.00'00-00'02.mp4",
				"url": "/img/wallpaper/dynamic-mobile/kuroha/Wallpaper.Cut.00'00-00'05.webm"
			},
		],
	},

	//项目卡片 其中 字段"show"控制初始卡片的text是否展开
	projectcards: [
		{ go: "🚀 前往", img: "/img/img1.png", title: "爱心代码", subtitle: "爱她一万年 Love！", text: "If you see this line, I've managed to get your attention.", url: "https://heart.suzec.xyz/", show: false },
		{ go: "🗂️ 前往", img: "/img/img2.jpg", title: "冬日来信", subtitle: "你收到一份来信！", text: "If you see this line, I've managed to get your attention.", url: "http://dw5.cn/3207", show: false },
		{ go: "📝 前往", img: "/img/img3.png", title: "破解VIP视频", subtitle: "爱奇艺，腾讯，B站", text: "If you see this line, I've managed to get your attention.", url: "https://vip.suzec.xyz/", show: false },
		{ go: "👍 前往", img: "/img/img4.png", title: "原神抽奖", subtitle: "原神抽奖", text: "If you see this line, I've managed to get your attention.", url: "https://ys.suzec.xyz/", show: false },
		{ go: "🗃 前往", img:  "/img/img5.png", title: "资本做局器", subtitle: "小玩意", text: "If you see this line, I've managed to get your attention.", url: "https://ziben.suzec.xyz/", show: false },
		{ go: "🎨 前往", img: "/img/img6.png", title: "流星雨", subtitle: "流星雨", text: "If you see this line, I've managed to get your attention.", url: "https://rain.suzec.xyz/", show: false },
		{ go: "💍 前往", img: "/img/sunshine.jpg", title: "项目 7", subtitle: "7,000 miles of wonder", text: "If you see this line, I've managed to get your attention.", url: "https://leleo.top", show: false },
		{ go: "🔍 前往", img: "/img/sunshine.jpg", title: "项目 8", subtitle: "8,000 miles of wonder", text: "If you see this line, I've managed to get your attention.", url: "https://leleo.top", show: false },
		{ go: "🎮 前往", img: "/img/sunshine.jpg", title: "项目 9", subtitle: "9,000 miles of wonder", text: "If you see this line, I've managed to get your attention.", url: "https://leleo.top", show: false },
		{ go: "📱 前往", img: "/img/sunshine.jpg", title: "项目 10", subtitle: "10,000 miles of wonder", text: "If you see this line, I've managed to get your attention.", url: "https://leleo.top", show: false },
		{ go: "🌐 前往", img: "/img/sunshine.jpg", title: "项目 11", subtitle: "11,000 miles of wonder", text: "If you see this line, I've managed to get your attention.", url: "https://leleo.top", show: false },
		{ go: "🎯 前往", img: "/img/sunshine.jpg", title: "项目 12", subtitle: "12,000 miles of wonder", text: "If you see this line, I've managed to get your attention.", url: "https://leleo.top", show: false },
	],

	statement: ["备案号：XXICP备123456789号", "Copyright © 2025 SuZec"],
}

export default normalizeAssetPaths(config)
