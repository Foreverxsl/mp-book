<template>
  <div class="container">
    <div class="userinfo">
      <img class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <p class="card">
            <span v-if="lock">
              <button class="btn-info" open-type="getUserInfo" @getuserinfo="login">{{userInfo.nickName}}</button>
            </span>
            <span v-else>
              {{userInfo.nickName}}
            </span>
        </p>
      </div>
    </div>
    <YearProgress></YearProgress>
    <button class="btn" @click="scanCode" v-if="!lock">扫码添加图书</button>
  </div>
</template>

<script>
import YearProgress from '@/components/YearProgress'
import qcloud from 'wafer2-client-sdk'
import { showSuccess, post, showModal } from '@/util'
import config from '@/config'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userInfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      },
      lock: true
    }
  },
  methods: {
    login () {
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: userInfo => {
            showSuccess('登录成功')
            this.userInfo = userInfo
            this.lock = false
            wx.setStorageSync('userInfo', this.userInfo)
          },
          fail: err => {
            console.log('登录失败', err)
          }
        })
      }
    },
    scanCode () {
      wx.scanCode({
        success: (res) => {
          if(res.result){
            console.log(res)
            this.addBook(res.result)
          }
        }
      })
    },
    async addBook(isbn){
      const res = await post('/weapp/addbook',{
        isbn,
        openid: this.userInfo.openId
      })
      console.log(res)
      showModal('添加成功',`${res.title}添加成功`)
    }
   },
  onShow () {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
        this.lock = false
      }
    }
  }
</script>

<style lang="scss">
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  img {
    width: 80px;
    height: 80px;
    margin: 10px;
    border-radius: 50%;
  }
  .card {
    padding: 5px;
  }
  .btn-info {
    font-size: 14px;
    background: #fff;
  }
}
</style>
