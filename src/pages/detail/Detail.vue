<template>
<div>
    <BookInfo :info='info'></BookInfo>
    <CommentList :comments='comments'></CommentList>
    <div class="comment" v-if="showAdd">
        <textarea v-model="comment" class="textarea" :maxlength="100" placeholder="请输入图书评论">
        </textarea>
        <div class="location">
            地理位置:
            <switch color='#EA5A49' :check='location' @change="getGeo"></switch>
            <span class="text-primary">{{location}}</span>
        </div>
        <div class="phone">
            手机型号:
            <switch color='#EA5A49' :check='phone' @change="getPhone"></switch>
            <span class="text-primary">{{phone}}</span>
        </div>
        <button class="btn" @click="addComment">
            评论
        </button>
    </div>
    <div v-else class="text-footer text-primary">
        未登录或者已经评论过了
    </div>
    <button class="btn" open-type='share'>转发给好友</button>
</div>
</template>

<script>
import {get,post,showModal} from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
    components:{
        BookInfo,
        CommentList
    },
    data () {
        return {
            comments:[],
            userinfo:{},
            bookid:'',
            info:{},
            comment:'',
            location:'',
            phone:''
        }
    },
    computed: {
        showAdd(){
            // 没登录
            if(!this.userinfo.openId){
                return false;
            }
            // 评论列表查到自己的openid
            if(this.comments.filter(v=>v.openid==this.userinfo.openId).length){
                return false;
            }
            return true;
        }
    },
    methods:{
        async addComment(){
            if(!this.comment){
                return
            }
           const data  = {
               openid:this.userinfo.openId,
               bookid:this.bookid,
               comment:this.comment,
               phone:this.phone,
               location:this.location 
           }
           try{
               await post('/weapp/addComment',data)
               this.comment = ''
               this.getComments()

           }catch(e){
               showModal('失败',e.msg)
           }
           console.log(data) 
        },
        async getDetail(){
            const info = await get('/weapp/bookdetail',{id:this.bookid})
            wx.setNavigationBarTitle({ title: info.title });
            this.info = info
            console.log(info)
        },
        async getComments(){
            const comments = await get('/weapp/commentlist',{bookid:this.bookid})
            this.comments = comments.list || []
        },
        getGeo(e){
            const ak = 'yRPNzgurSSxUb6FoWKp9Sxk08uG9ZMnX'
            let url = 'http://api.map.baidu.com/geocoder/v2/'
            if(e.target.value){
                wx.getLocation({
                  success: res => {
                    console.info("getLocation success: ", res);
                    wx.request({
                      url, //开发者服务器接口地址",
                      data: {
                          ak,
                          location:`${res.latitude},${res.longitude}`,
                          output:'json'
                      }, //请求的参数",
                      success: res => { 
                          console.log(res)
                         if(res.data.status ==0){
                             this.location = res.data.result.addressComponent.city
                         }else{
                             this.location = '未知地点'
                             console.log('出错了')
                         }
                      },
                      fail: () => {},
                    });
                  },
                  fail: () => {
                    console.log("getLocation failed")
                  }
                });
            }else{
                this.location = ''
            }
        },
        getPhone(e){
            if(e.target.value){
                const phoneInfo = wx.getSystemInfoSync();
                console.log(phoneInfo)
                this.phone = phoneInfo.model
            }else{
                this.phone = ''

            }
        }

    },
    mounted () {
        this.bookid = this.$root.$mp.query.id
        this.location='',
        this.phone='',
        this.getDetail()
        this.getComments()
        const userinfo = wx.getStorageSync('userInfo');
        if(userinfo){
            this.userinfo = userinfo
        }
    }
    
}
</script>

<style lang='scss'>
.comment{
    margin-top: 10px;
    .textarea{
        width: 730rpx;
        height: 200rpx;
        background: #eee;
        padding: 10rpx;
         
    }
    .location{
        switch{
            margin-left: 5px;
        }
        font-size: 14px;
        margin-top: 10px;
        padding: 10px;
    }
    .phone{
        switch{
            margin-left: 5px;
        }
        font-size: 14px;
        margin-top: 10px;
        padding: 10px;
    }
}

</style>
