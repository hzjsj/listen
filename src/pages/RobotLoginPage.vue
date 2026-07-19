<template>
  <main class="robot-login-page" aria-labelledby="robot-login-title">
    <div class="robot-login-page__orb robot-login-page__orb--left" aria-hidden="true"></div>
    <div class="robot-login-page__orb robot-login-page__orb--right" aria-hidden="true"></div>
    <button class="robot-login-page__close" aria-label="关闭页面">×</button>

    <section class="robot-login-page__hero" aria-label="慧听说欢迎区">
      <h1 id="robot-login-title">机器人登入页面</h1>
      <p class="robot-login-page__welcome">欢迎使用！</p>
      <h2>慧听说</h2>
      <span class="robot-login-page__title-line"></span>
      <span class="robot-login-page__star" aria-hidden="true">★</span>
      <span class="robot-login-page__bubble" aria-hidden="true"><i></i><i></i><i></i></span>
      <img class="robot-login-page__robot" :src="robotHeroSrc" alt="慧听说机器人学习助手" />
    </section>

    <section class="robot-login-page__card" aria-label="账号登录">
      <div class="robot-login-page__tabs" role="tablist" aria-label="登录或注册">
        <button :class="{ active: activeTab === 'login' }" type="button" role="tab" @click="activeTab = 'login'">登录</button>
        <button :class="{ active: activeTab === 'register' }" type="button" role="tab" @click="activeTab = 'register'">注册</button>
      </div>

      <label class="robot-login-page__field">
        <span class="robot-login-page__icon robot-login-page__icon--phone" aria-hidden="true"></span>
        <input v-model="account" autocomplete="username" placeholder="请输入手机号/账号" />
      </label>
      <label class="robot-login-page__field">
        <span class="robot-login-page__icon robot-login-page__icon--lock" aria-hidden="true"></span>
        <input v-model="password" autocomplete="current-password" placeholder="请输入密码" :type="showPassword ? 'text' : 'password'" />
        <button class="robot-login-page__eye" type="button" aria-label="切换密码显示" @click="showPassword = !showPassword"></button>
      </label>

      <div class="robot-login-page__options">
        <label><input v-model="rememberPassword" type="checkbox" />记住密码</label>
        <label><input v-model="autoLogin" type="checkbox" />自动登录</label>
        <a href="#">忘记密码?</a>
      </div>

      <button class="robot-login-page__submit" type="button" @click="handleLogin">登录</button>

      <div class="robot-login-page__other">
        <span>其他登录方式</span>
        <button type="button"><i aria-hidden="true">▰</i>教育账号登录</button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'login' | 'register'>('login')
const account = ref('')
const password = ref('')
const rememberPassword = ref(true)
const autoLogin = ref(false)
const showPassword = ref(false)
// Replace this public URL with the final robot artwork path when the asset is available.
const robotHeroSrc = '/robot-login-hero.png'

const handleLogin = () => {
  window.location.href = '/'
}
</script>

<style scoped>
.robot-login-page{position:relative;min-height:100vh;overflow:hidden;font-family:Inter,'PingFang SC','Microsoft YaHei',sans-serif;color:#0b35a8;background:radial-gradient(circle at 37% 56%,#f4fbff 0 16%,#d6ecff 38%,transparent 39%),radial-gradient(circle at 13% 90%,#ffffff80 0 19%,transparent 20%),linear-gradient(135deg,#acd6ff 0%,#eaf6ff 49%,#dcefff 100%)}
.robot-login-page:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#ffffff4d 0 3%,transparent 3.2%),radial-gradient(circle at 4% 28%,#fff 0 6px,transparent 7px),radial-gradient(circle at 41% 24%,#fff 0 4px,transparent 5px),radial-gradient(circle at 16% 8%,#ffffff55 0 8px,transparent 9px),radial-gradient(circle at 43% 15%,#ffffff70 0 2px,transparent 3px);pointer-events:none}.robot-login-page__orb{position:absolute;border-radius:50%;border:2px solid #ffffff58}.robot-login-page__orb--left{left:-130px;top:310px;width:760px;height:420px;transform:rotate(-18deg)}.robot-login-page__orb--right{right:120px;top:-130px;width:640px;height:420px;transform:rotate(-22deg)}.robot-login-page__close{position:absolute;right:54px;top:34px;z-index:3;border:0;background:transparent;color:#416cc5;font-size:64px;font-weight:200;line-height:1;cursor:pointer}.robot-login-page__hero{position:absolute;left:122px;top:96px;z-index:2;width:660px}.robot-login-page__hero h1{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.robot-login-page__welcome{margin:0 0 28px;color:#0b35a8;font-size:76px;font-weight:900;line-height:1;letter-spacing:5px;text-shadow:0 6px 0 #05288518}.robot-login-page__hero h2{margin:0 0 28px;color:#0a35a5;font-size:50px;font-weight:900;letter-spacing:3px}.robot-login-page__title-line{display:block;width:58px;height:8px;border-radius:10px;background:#1676ff}.robot-login-page__star{position:absolute;left:12px;top:274px;color:#ffd75c;font-size:55px;text-shadow:0 4px 8px #e0a72355}.robot-login-page__bubble{position:absolute;left:-68px;top:354px;width:91px;height:64px;border-radius:16px;background:linear-gradient(#9ccaff,#74aef0);display:flex;gap:11px;align-items:center;justify-content:center;box-shadow:0 10px 24px #70a6dd55}.robot-login-page__bubble:after{content:"";position:absolute;left:18px;bottom:-15px;border:16px solid transparent;border-left-color:#76aef0;border-top:0}.robot-login-page__bubble i{width:13px;height:13px;border-radius:50%;background:#dbeeff}.robot-login-page__robot{display:block;width:620px;height:560px;margin-top:60px;object-fit:cover;object-position:left 31%;border-radius:42px;filter:drop-shadow(0 24px 32px #5c9ae455);mix-blend-mode:multiply}.robot-login-page__card{position:absolute;right:73px;top:110px;z-index:2;width:732px;min-height:844px;padding:62px 52px;border-radius:26px;background:rgba(255,255,255,.96);box-shadow:0 22px 80px #7aaedf42}.robot-login-page__tabs{display:flex;gap:96px;margin:0 0 52px 19px}.robot-login-page__tabs button{position:relative;border:0;background:transparent;color:#55627f;font-size:38px;font-weight:800;cursor:pointer}.robot-login-page__tabs .active{color:#0875ff}.robot-login-page__tabs .active:after{content:"";position:absolute;left:13px;bottom:-26px;width:50px;height:7px;border-radius:9px;background:#1b79ff}.robot-login-page__field{height:86px;margin-bottom:32px;padding:0 28px;border:2px solid #dbe6f5;border-radius:18px;background:#fff;display:flex;align-items:center;gap:25px}.robot-login-page__field input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:#13285e;font-size:28px}.robot-login-page__field input::placeholder{color:#a8b4ca}.robot-login-page__icon--phone{position:relative;width:26px;height:34px;border:5px solid #a9b8d5;border-radius:5px}.robot-login-page__icon--phone:after{content:"";position:absolute;left:7px;bottom:2px;width:5px;height:5px;border-radius:50%;background:#a9b8d5}.robot-login-page__icon--lock{position:relative;width:26px;height:26px;border-radius:6px;background:#a9b8d5}.robot-login-page__icon--lock:before{content:"";position:absolute;left:3px;top:-18px;width:20px;height:22px;border:5px solid #a9b8d5;border-bottom:0;border-radius:15px 15px 0 0}.robot-login-page__eye{position:relative;width:31px;height:20px;border:5px solid #a9b8d5;border-radius:50%;background:transparent}.robot-login-page__eye:after{content:"";position:absolute;left:8px;top:4px;width:7px;height:7px;border-radius:50%;background:#a9b8d5}.robot-login-page__options{display:flex;align-items:center;gap:80px;margin:8px 6px 66px;color:#273b68;font-size:22px}.robot-login-page__options input{width:24px;height:24px;accent-color:#1677ff}.robot-login-page__options label{display:flex;align-items:center;gap:9px}.robot-login-page__options a{margin-left:auto;color:#096dff;font-weight:700;text-decoration:none}.robot-login-page__submit{width:100%;height:86px;border:0;border-radius:34px;background:linear-gradient(180deg,#43a0ff,#0867f4);box-shadow:0 14px 26px #1677ff40;color:#fff;font-size:34px;font-weight:800;cursor:pointer}.robot-login-page__other{position:relative;margin-top:58px;text-align:center;color:#9ba8c0;font-size:18px}.robot-login-page__other:before,.robot-login-page__other:after{content:"";position:absolute;top:10px;width:206px;height:1px;background:#e5edf8}.robot-login-page__other:before{left:20px}.robot-login-page__other:after{right:20px}.robot-login-page__other span{display:block;margin-bottom:28px}.robot-login-page__other button{border:0;background:transparent;color:#086dff;font-size:22px;font-weight:700;cursor:pointer}.robot-login-page__other i{display:inline-grid;place-items:center;width:59px;height:59px;margin-right:13px;border-radius:50%;background:#fff;border:1px solid #dbe8f7;box-shadow:0 8px 20px #a9c3e333;color:#1175ff;font-style:normal}@media (max-width:1200px){.robot-login-page__hero{left:44px;transform:scale(.82);transform-origin:left top}.robot-login-page__card{right:30px;width:620px}.robot-login-page__other:before,.robot-login-page__other:after{width:155px}}@media (max-width:900px){.robot-login-page{min-height:1220px}.robot-login-page__hero{position:relative;left:auto;top:auto;margin:40px auto 0}.robot-login-page__card{position:relative;right:auto;top:auto;margin:20px auto 60px;width:min(92vw,640px);min-height:auto}.robot-login-page__welcome{font-size:54px}.robot-login-page__robot{width:92vw;max-width:620px}.robot-login-page__options{gap:20px;flex-wrap:wrap}.robot-login-page__other:before,.robot-login-page__other:after{display:none}}
</style>
