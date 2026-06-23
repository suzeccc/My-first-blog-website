import homeright from '../src/components/hoemright.vue';
import typewriter from './components/typewriter.vue';
import tab1 from './components/tabs/tab1.vue';
import tab2 from './components/tabs/tab2.vue';
import tab3 from './components/tabs/tab3.vue';
import loader from './components/loader.vue';
import polarchart from './components/polarchart.vue';
import config from './config.js';
import { getCookie } from './utils/cookieUtils.js';
import { setMeta,getFormattedTime,getFormattedDate,dataConsole } from './utils/common.js';
import { useDisplay } from 'vuetify'

export default {
  components: {
    tab1,tab2,tab3,loader,homeright,typewriter,polarchart
  },
  setup() {
    const { xs,sm,md } = useDisplay();
    return { xs,sm,md };
  },
  data() {
    return {
      isloading:false,
      isClearScreen: false,
      formattedTime:"",
      formattedDate:"",
      configdata: config,
      dialog1: false,
      dialog2: false,
      personalizedtags: null,
      videosrc: '',
      ismusicplayer: false,
      isPlaying:false,
      playlistIndex: 0,
      audioLoading: false,
      musicinfo: null,
      musicinfoLoading:false,
      lyrics:{},
      isMuted: true,  // 是否静音
      userInteracted: false,  // 用户是否已交互
      socialPlatformIcons: null,
      isExpanded: false,
      stackicons:[
        {icon:"mdi-vuejs",color:"green", model: false,tip: 'vue'},
        {icon:"mdi-language-javascript",color:"#CAD300", model: false,tip: 'javascript'},
        {icon:"mdi-language-css3",color:"blue", model: false,tip: 'css'},
        {icon:"mdi-language-html5",color:"red", model: false,tip: 'html'},
        {icon:"$vuetify",color:"#1697F6", model: false,tip: 'vuetify'},
      ],
      projectcards:null,
      tab: null,
      tabs: [
        {
          icon: 'mdi-pencil-plus',
          text: '样式预览',
          value: 'tab-1',
          component: "tab1",
        },
        {
          icon: 'mdi-wallpaper',
          text: '背景预览',
          value: 'tab-2',
          component: "tab2",
        },
        {
          icon: 'mdi-music-circle-outline',
          text: '音乐播放',
          value: 'tab-3',
          component: "tab3",
        },
      ],

    };
  },
  async mounted() {
    if(import.meta.env.VITE_CONFIG){
      this.configdata = JSON.parse(import.meta.env.VITE_CONFIG);
    }
    this.projectcards = this.configdata.projectcards;this.socialPlatformIcons = this.configdata.socialPlatformIcons;
    this.personalizedtags = this.configdata.tags;
    this.isloading = true;
    let imageurl = "";
    this.dataConsole();
    this.setMeta(this.configdata.metaData.title,this.configdata.metaData.description,this.configdata.metaData.keywords,this.configdata.metaData.icon);
    
    imageurl = this.setMainProperty(imageurl);

    //异步等待背景壁纸包括视频壁纸加载完成后再显示页面
    const loadImage = () => {
        const imageUrls = [
          config.avatar,
          ...config.projectcards.map(item => item.img)
        ];
        return new Promise((resolve, reject) => {
          const imagePromises = imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
                const imgs = new Image();
                imgs.src = url;
                imgs.onload = () => resolve();
                imgs.onerror = (err) => {
                  console.warn(`图片加载失败: ${url}`, err);
                  resolve(); // 图片加载失败时继续执行，而不是拒绝整个Promise
                };
            });
          })

          // 设置超时机制：2.5秒
          const timeoutPromise = new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2500);
          });
          
          // 等待所有图片加载完成或超时
          Promise.race([Promise.all(imagePromises), timeoutPromise]).then(()=>{
            if(imageurl){
              const img = new Image();
              img.src = imageurl;
              // resolve() 函数通将一个 Promise 对象从未完成状态转变为已完成状态
              img.onload = () => {resolve();};
              img.onerror = (err) => {
                console.warn(`背景图片加载失败: ${imageurl}`, err);
                resolve(); // 图片加载失败时继续执行
              };
            }else{
              const video = this.$refs.VdPlayer;
              if(video) {
                // 设置视频加载超时，避免长时间等待
                const videoTimeout = setTimeout(() => {
                  console.warn('视频加载超时，继续执行');
                  resolve();
                }, 5000); // 5秒超时
                
                video.onloadedmetadata = () => {
                  clearTimeout(videoTimeout);
                  console.log('视频元数据加载完成');
                  resolve();
                };
                
                video.onerror = (err) => {
                  clearTimeout(videoTimeout);
                  console.warn('视频加载失败，使用降级处理', err);
                  resolve(); // 视频加载失败时继续执行
                };
                
                // 尝试加载视频
                video.load();
              } else {
                console.warn('视频元素未找到');
                resolve();
              }
            }
          }).catch((err) => {
            console.warn('壁纸加载过程中出现错误，继续执行', err);
            resolve(); // 发生错误时也继续执行
          });
        });
     };

    loadImage().then(() => {
        this.formattedTime =  this.getFormattedTime(new Date());
        this.formattedDate =  this.getFormattedDate(new Date());
        setTimeout(() => {
          this.isloading = false;
        }, "500");          
      }).catch((err) => {
        console.error('壁纸加载失败:', err);
        // 即使加载失败也确保页面显示
        setTimeout(() => {
          this.isloading = false;
        }, "100");  
      });
 
      setInterval(() => {
        this.formattedTime =  this.getFormattedTime(new Date()) ;
      }, 1000);

      await this.getMusicInfo();  //获取音乐数据
      this.setupAudioListener();  //设置 ended 事件监听器，当歌曲播放结束时自动调用 nextTrack 方法。
      
      // 添加全局点击监听器来处理移动端播放列表关闭
      this.$nextTick(() => {
        document.addEventListener('click', this.handleGlobalClick);
        document.addEventListener('touchstart', this.handleGlobalClick);
      });
  },

  beforeDestroy() {     //在组件销毁前移除事件监听器，防止内存泄漏。
    this.$refs.audioPlayer.removeEventListener('ended',  this.nextTrack);
    // 移除全局点击监听器
    document.removeEventListener('click', this.handleGlobalClick);
    document.removeEventListener('touchstart', this.handleGlobalClick);
  },

  watch:{
    isClearScreen(val){
      if(!this.videosrc){
        return
      }
      if(val){
        this.$refs.VdPlayer.style.zIndex = 0; 
        this.$refs.VdPlayer.controls = true;
      }else{
        this.$refs.VdPlayer.style.zIndex = -100; 
        this.$refs.VdPlayer.controls = false;
      }
    },
    audioLoading(val){
      this.isPlaying = !val;
    }

  //若弹出框使得页面播放卡顿，可以先停止背景播放
  //   dialog1(val){
  //     if(val){
  //       this.$refs.VdPlayer.pause();
  //     }else{
  //       this.$refs.VdPlayer.play();
  //     }
  //  }
  },

  computed: {
    currentSong() {
      return this.musicinfo[this.playlistIndex];
    },
    audioPlayer() {
      return this.$refs.audioPlayer;
    }
  },
  
  methods: {
    
    // 初始化自动播放
    initAutoPlay() {
      if (this.configdata.musicConfig && this.configdata.musicConfig.autoPlayMuted) {
        // 设置初始音量和音乐
        this.playlistIndex = this.configdata.musicConfig.initialMusicIndex || 0;
        
        this.$nextTick(() => {
          if (this.$refs.audioPlayer) {
            // 静音状态下自动播放
            this.$refs.audioPlayer.volume = 0;
            this.isMuted = true;
            
            this.$refs.audioPlayer.play().then(() => {
              console.log('静音自动播放成功');
              
              // 即使静音播放成功，如果需要用户交互来取消静音，仍然添加事件监听器
              if (this.configdata.musicConfig.requireUserInteraction && !this.userInteracted) {
                // 添加用户交互事件监听器
                document.addEventListener('mousemove', this.handleUserInteraction, { once: true });
                document.addEventListener('click', this.handleUserInteraction, { once: true });
                document.addEventListener('touchstart', this.handleUserInteraction, { once: true });
                document.addEventListener('wheel', this.handleUserInteraction, { once: true });
                document.addEventListener('keydown', this.handleUserInteraction, { once: true });
              }
            }).catch(error => {
              console.log('自动播放失败:', error);
              // 即使静音播放失败，也需要用户交互来播放音乐
              if (this.configdata.musicConfig.requireUserInteraction && !this.userInteracted) {
                // 添加用户交互事件监听器
                document.addEventListener('mousemove', this.handleUserInteraction, { once: true });
                document.addEventListener('click', this.handleUserInteraction, { once: true });
                document.addEventListener('touchstart', this.handleUserInteraction, { once: true });
                document.addEventListener('wheel', this.handleUserInteraction, { once: true });
                document.addEventListener('keydown', this.handleUserInteraction, { once: true });
              }
            });
          }
        });
      }
    },
    
    // 处理用户交互，取消静音
    handleUserInteraction() {
      if (this.configdata.musicConfig.requireUserInteraction && this.$refs.audioPlayer) {
        this.userInteracted = true;
        
        // 移除所有事件监听器
        document.removeEventListener('mousemove', this.handleUserInteraction);
        document.removeEventListener('click', this.handleUserInteraction);
        document.removeEventListener('touchstart', this.handleUserInteraction);
        document.removeEventListener('wheel', this.handleUserInteraction);
        document.removeEventListener('keydown', this.handleUserInteraction);
        
        // 设置到配置的初始音量
        const initialVolume = this.configdata.musicConfig.initialVolume || 0.7;
        this.$refs.audioPlayer.volume = initialVolume;
        this.isMuted = false;
        
        // 尝试播放音乐（如果尚未播放）
        if (this.$refs.audioPlayer.paused) {
          this.$refs.audioPlayer.play();
        }
        
        // 更新播放状态
        this.isPlaying = true;
        
        console.log('用户交互完成，已取消静音');
      }
    },
    getCookie,setMeta,getFormattedTime,getFormattedDate,dataConsole,

    // 随机选择壁纸的方法
    getRandomWallpaper(type, device) {
      const { xs } = useDisplay();
      const isMobile = device !== undefined ? device : xs.value;
      
      if (type === 'pic') {
        const wallpaperList = isMobile ? this.configdata.wallpaper.picMobile : this.configdata.wallpaper.pic;
        if (!wallpaperList || wallpaperList.length === 0) {
          // 如果移动端没有静态壁纸，使用PC端壁纸作为后备
          const fallbackList = isMobile ? this.configdata.wallpaper.pic : this.configdata.wallpaper.picMobile;
          const randomIndex = Math.floor(Math.random() * fallbackList.length);
          return {
            type: 'pic',
            datainfo: fallbackList[randomIndex]
          };
        }
        const randomIndex = Math.floor(Math.random() * wallpaperList.length);
        return {
          type: 'pic',
          datainfo: wallpaperList[randomIndex]
        };
      } else {
        const wallpaperList = isMobile ? this.configdata.wallpaper.videoMobile : this.configdata.wallpaper.video;
        if (!wallpaperList || wallpaperList.length === 0) {
          // 如果移动端没有动态壁纸，使用PC端壁纸作为后备
          const fallbackList = isMobile ? this.configdata.wallpaper.video : this.configdata.wallpaper.videoMobile;
          const randomIndex = Math.floor(Math.random() * fallbackList.length);
          return {
            type: 'video',
            datainfo: fallbackList[randomIndex]
          };
        }
        const randomIndex = Math.floor(Math.random() * wallpaperList.length);
        return {
          type: 'video',
          datainfo: wallpaperList[randomIndex]
        };
      }
    },

    setMainProperty(imageurl){
      const root = document.documentElement;
      let leleodata = this.getCookie("leleodata");
      if(leleodata){
        root.style.setProperty('--leleo-welcomtitle-color', `${leleodata.color.welcometitlecolor}`);
        root.style.setProperty('--leleo-vcard-color', `${leleodata.color.themecolor}`);
        root.style.setProperty('--leleo-brightness', `${leleodata.brightness}%`);
        root.style.setProperty('--leleo-blur', `${leleodata.blur}px`); 
      }else{
        root.style.setProperty('--leleo-welcomtitle-color', `${this.configdata.color.welcometitlecolor}`);
        root.style.setProperty('--leleo-vcard-color', `${this.configdata.color.themecolor}`);  
        root.style.setProperty('--leleo-brightness', `${this.configdata.brightness}%`);  
        root.style.setProperty('--leleo-blur', `${this.configdata.blur}px`);
      }
  
      let leleodatabackground = this.getCookie("leleodatabackground");
      const { xs } = useDisplay();
      if(leleodatabackground){
        // 检查是否存在移动端和PC端的配置
        const hasMobileConfig = leleodatabackground.mobile && leleodatabackground.mobile.datainfo;
        const hasPcConfig = leleodatabackground.pc && leleodatabackground.pc.datainfo;
        
        if(xs.value){
          // 移动端
          if(hasMobileConfig && leleodatabackground.mobile.type == "pic"){
            root.style.setProperty('--leleo-background-image-url', `url('${leleodatabackground.mobile.datainfo.url}')`);
            imageurl = leleodatabackground.mobile.datainfo.url;
            return imageurl;
          }else if(hasMobileConfig && leleodatabackground.mobile.type == "video"){
            this.videosrc = leleodatabackground.mobile.datainfo.url;
          }else if(hasPcConfig){
            // 如果移动端没有配置，使用PC端配置作为后备
            if(leleodatabackground.pc.type == "pic"){
              root.style.setProperty('--leleo-background-image-url', `url('${leleodatabackground.pc.datainfo.url}')`);
              imageurl = leleodatabackground.pc.datainfo.url;
              return imageurl;
            }else{
              this.videosrc = leleodatabackground.pc.datainfo.url;
            }
          }
        }else{
          // PC端
          if(hasPcConfig && leleodatabackground.pc.type == "pic"){
            root.style.setProperty('--leleo-background-image-url', `url('${leleodatabackground.pc.datainfo.url}')`);
            imageurl = leleodatabackground.pc.datainfo.url;
            return imageurl;
          }else if(hasPcConfig && leleodatabackground.pc.type == "video"){
            this.videosrc = leleodatabackground.pc.datainfo.url;
          }else if(hasMobileConfig){
            // 如果PC端没有配置，使用移动端配置作为后备
            if(leleodatabackground.mobile.type == "pic"){
              root.style.setProperty('--leleo-background-image-url', `url('${leleodatabackground.mobile.datainfo.url}')`);
              imageurl = leleodatabackground.mobile.datainfo.url;
              return imageurl;
            }else{
              this.videosrc = leleodatabackground.mobile.datainfo.url;
            }
          }
        }
          
      }else{
        // 检查是否启用随机壁纸功能
        if (this.configdata.wallpaperConfig.enableRandom) {
          // 如果启用随机壁纸，随机选择一个壁纸
          if(xs.value){
            const randomWallpaper = this.getRandomWallpaper(this.configdata.background.mobile.type, true); // 使用配置的默认壁纸类型
            if(randomWallpaper.type == "pic"){
              root.style.setProperty('--leleo-background-image-url', `url('${randomWallpaper.datainfo.url}')`);
              imageurl = randomWallpaper.datainfo.url;
              return imageurl;
            }else{
              this.videosrc = randomWallpaper.datainfo.url;
            }
          }else{
            const randomWallpaper = this.getRandomWallpaper(this.configdata.background.pc.type, false); // 使用配置的默认壁纸类型
            if(randomWallpaper.type == "pic"){
              root.style.setProperty('--leleo-background-image-url', `url('${randomWallpaper.datainfo.url}')`);
              imageurl = randomWallpaper.datainfo.url;
              return imageurl;
            }else{
              this.videosrc = randomWallpaper.datainfo.url;
            }
            
          }
        } else {
          // 如果不启用随机壁纸，使用默认配置
          if(xs.value){
            if(this.configdata.background.mobile.type == "pic"){
              root.style.setProperty('--leleo-background-image-url', `url('${this.configdata.background.mobile.datainfo.url}')`);
              imageurl = this.configdata.background.mobile.datainfo.url;
              return imageurl;
            }else{
              this.videosrc = this.configdata.background.mobile.datainfo.url;
            }
          }else{
            if(this.configdata.background.pc.type == "pic"){
              root.style.setProperty('--leleo-background-image-url', `url('${this.configdata.background.pc.datainfo.url}')`);
              imageurl = this.configdata.background.pc.datainfo.url;
              return imageurl;
            }else{
              this.videosrc = this.configdata.background.pc.datainfo.url;
            }
            
          }
        }
      }
    },

    projectcardsShow(key){
      this.projectcards.forEach((item,index)=>{
        if(index!= key){
          item.show = false;
        }
      })
    },
    handleCancel(){
      this.dialog1 = false;
    },
    jump(url){
      window.open(url, '_blank').focus();
    },
    
    async getMusicInfo(){
      this.musicinfoLoading = true;
      try {
        // 获取在线音乐
        const response = await fetch(`https://api.i-meto.com/meting/api?server=${this.configdata.musicPlayer.server}&type=${this.configdata.musicPlayer.type}&id=${this.configdata.musicPlayer.id}`
        );
        if (!response.ok) {
          throw new Error('网络请求失败');
        }
        let onlineMusic = await response.json();
        
        // 获取本地音乐
        let localMusic = this.configdata.localMusic || [];
        
        // 合并在线音乐和本地音乐
        this.musicinfo = [...localMusic, ...onlineMusic];
        
        this.musicinfoLoading = false;
        
        // 音乐加载完成后，根据配置自动播放
        this.$nextTick(() => {
          this.initAutoPlay();
        });
      } catch (error) {
        console.error('请求失败:', error);
        // 如果网络请求失败，至少显示本地音乐
        this.musicinfo = this.configdata.localMusic || [];
        
        this.$nextTick(() => {
          this.initAutoPlay();
        });
      }
      
    },
    musicplayershow(val) {
        this.ismusicplayer = val;
    },
    
    musicplayershowToggle() {
        this.ismusicplayer = !this.ismusicplayer;
    },
    
    showMusicPlaylist() {
        this.ismusicplayer = true;
    },
    
    handleGlobalClick(event) {
      // 在移动端，如果播放列表是显示状态，且点击的不是播放器或播放列表本身，则关闭播放列表
      if (this.xs && this.ismusicplayer) {
        const playerWrapper = document.querySelector('.global-player-wrapper');
        const playlistPanel = document.querySelector('.music-playlist-panel');
        
        if (playerWrapper && !playerWrapper.contains(event.target) && 
            playlistPanel && !playlistPanel.contains(event.target)) {
          this.ismusicplayer = false;
        }
      }
    },

    setupAudioListener() {
      this.$refs.audioPlayer.addEventListener('ended', this.nextTrack);
    },

    togglePlay() {
      if (!this.isPlaying) {
        this.audioPlayer.play();
        this.isVdMuted = true;
      } else {
        this.audioPlayer.pause();
        this.isVdMuted = false;
      }
      this.isPlaying = !this.musicinfoLoading && !this.isPlaying;
    },
    previousTrack() {
      this.playlistIndex = this.playlistIndex > 0 ? this.playlistIndex - 1 : this.musicinfo.length - 1;
      this.updateAudio();
    },
    nextTrack() {
      this.playlistIndex = this.playlistIndex < this.musicinfo.length - 1 ? this.playlistIndex + 1 : 0;
      this.updateAudio();
    },
    updateAudio() {
      this.audioPlayer.src = this.currentSong.url;
      this.$refs.audiotitle.innerText = this.currentSong.title;
      this.$refs.audioauthor.innerText = this.currentSong.author;
      
      // 如果用户已交互，则应用配置的初始音量
      if (this.userInteracted) {
        const initialVolume = this.configdata.musicConfig.initialVolume || 0.7;
        this.audioPlayer.volume = initialVolume;
        this.isMuted = false;
      } else {
        // 如果用户尚未交互，保持静音状态
        this.audioPlayer.volume = 0;
        this.isMuted = true;
      }
      
      this.isPlaying = true;
      
      // 尝试播放音乐
      this.audioPlayer.play().then(() => {
        console.log('音乐播放成功');
      }).catch(error => {
        console.log('音乐播放失败，等待用户交互:', error);
        // 如果播放失败，确保事件监听器已添加
        if (this.configdata.musicConfig.requireUserInteraction && !this.userInteracted) {
          document.addEventListener('mousemove', this.handleUserInteraction, { once: true });
          document.addEventListener('click', this.handleUserInteraction, { once: true });
          document.addEventListener('touchstart', this.handleUserInteraction, { once: true });
          document.addEventListener('wheel', this.handleUserInteraction, { once: true });
          document.addEventListener('keydown', this.handleUserInteraction, { once: true });
        }
      });
    },
    updateCurrentIndex(index) {
      this.playlistIndex = index;
      this.updateAudio();
    },
    updateIsPlaying(isPlaying) {
      this.isPlaying = isPlaying;
    },
    updateLyrics(lyrics){
      this.lyrics = lyrics;
    },
    // 监听等待事件（缓冲不足）
    onWaiting() {
      this.audioLoading = true;
    },
    // 监听可以播放事件（缓冲足够）
    onCanPlay() {
      this.audioLoading = false;
    },
    // 监听播放事件
    onPlay() {
      console.log('音频开始播放');
    },
    // 监听正在播放事件
    onPlaying() {
      console.log('音频正在播放');
    },
    // 监听暂停事件
    onPause() {
      console.log('音频已暂停');
    },
    expandSwitch() {
      this.isExpanded = true;
    },
    collapseSwitch() {
      this.isExpanded = false;
    },
    // 视频处理方法
    getVideoMimeType(src) {
      if (!src) return 'video/mp4';
      const extension = src.split('.').pop().toLowerCase();
      const mimeTypes = {
        'mp4': 'video/mp4',
        'webm': 'video/webm',
        'mkv': 'video/x-matroska',
        'avi': 'video/x-msvideo',
        'mov': 'video/quicktime'
      };
      return mimeTypes[extension] || 'video/mp4';
    },
    
    onVideoLoadStart() {
      console.log('视频开始加载');
    },
    
    onVideoLoaded() {
      console.log('视频加载完成');
    },
    
    onVideoError(error) {
      console.error('视频加载失败:', error);
      // 可以在这里添加降级处理，比如显示静态背景
      const root = document.documentElement;
      // 如果视频加载失败，使用纯色背景作为降级方案
      document.body.style.backgroundColor = '#282c34';
      // 同时隐藏视频元素，避免显示错误占位符
      const video = this.$refs.VdPlayer;
      if(video) {
        video.style.display = 'none';
      }
    },
  }
};