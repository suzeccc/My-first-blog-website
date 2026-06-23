<template>
<div class="loader-container">
  <div class="spinner"></div>
  <div class="loading-text">
    <h2>SuZec的个人主页</h2>
    <p>加载中...</p>
  </div>
</div>
</template> 

<script setup>
import { withBasePath } from '../utils/assetPath.js';

const loaderBackground = `url("${withBasePath('/img/loader.svg')}")`;
</script>

<style scoped>
/* From Uiverse.io by Nawsome */ 
.spinner:before {
  transform: rotateX(60deg) rotateY(45deg) rotateZ(45deg);
  animation: 750ms rotateBefore infinite linear reverse;
}

.spinner:after {
  transform: rotateX(240deg) rotateY(45deg) rotateZ(45deg);
  animation: 750ms rotateAfter infinite linear;
}

.spinner:before,
.spinner:after {
  box-sizing: border-box;
  content: '';
  display: block;
  position: absolute;
  margin-top: -5em;
  margin-left: -5em;
  width: 10em;
  height: 10em;
  transform-style: preserve-3d;
  transform-origin: 50%;
  transform: rotateY(50%);
  perspective-origin: 50% 50%;
  perspective: 340px;
  background-size: 10em 10em;
  background-image: v-bind(loaderBackground);
}
/* sitNSpin.less */
@keyframes rotateBefore {
  from {
    transform: rotateX(60deg) rotateY(45deg) rotateZ(0deg);
  }

  to {
    transform: rotateX(60deg) rotateY(45deg) rotateZ(-360deg);
  }
}

@keyframes rotateAfter {
  from {
    transform: rotateX(240deg) rotateY(45deg) rotateZ(0deg);
  }

  to {
    transform: rotateX(240deg) rotateY(45deg) rotateZ(360deg);
  }
}

/* 加载容器样式 */
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: relative;
}

/* 加载文字样式 */
.loading-text {
  margin-top: 3rem;
  text-align: center;
  color: var(--leleo-welcomtitle-color, #FFFFFF);
}

.loading-text h2 {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInOut 2s ease-in-out infinite;
}

.loading-text p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.8;
  animation: pulse 1.5s ease-in-out infinite;
}

/* 文字动画效果 */
@keyframes fadeInOut {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* 移动端适配 */
@media (max-width: 960px) {
  .loading-text h2 {
    font-size: 1.5rem;
  }
  
  .loading-text p {
    font-size: 1rem;
  }
}
</style>
