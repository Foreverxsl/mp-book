<template>
    <div class="container">
        <CommentList v-if="userinfo.openId" type='user' :comments="comments"></CommentList>
        <div v-else class="text-primary">你还没登录，请先登录</div>
        <div v-if="userinfo.openId">
            <div class="page-title">我的图书</div>
            <Card v-for="book in books" :key='book.id' :book='book'></Card>
            <div v-if="!books.length">暂时还没添加过书，快去添加几本吧</div>

        </div>
    </div>
</template>
<script>
import {get} from '@/util'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
export default {
   data(){
        return{
            comments:[],
            userinfo:{},
            books:[]
        }
    },
    components: {
        CommentList,
        Card
    },
    methods:{
        init(){
            wx.showNavigationBarLoading()
            this.getComments()
            wx.hideNavigationBarLoading()
            this.getBooks()

        },
        async getComments(){
            const comments = await get('/weapp/commentlist',{
                openid:this.userinfo.openId
            })
            this.comments = comments.list
        },
        async getBooks(){
            const books = await get('/weapp/booklist',{
                openid:this.userinfo.openId        
            })
            this.books = books.list
        }
    },
    onPullDownRefresh(){
        this.init()
        wx.stopPullDownRefresh()
    },
    onShow() {
        let userinfo = wx.getStorageSync('userInfo');
        if(userinfo){
            this.userinfo = userinfo
            this.init()
        }
        
    }

    
}
</script>
<style lang='scss'>
.page-title{
    font-size: 14px;
    padding: 10px;
    background: #eee;
}

</style>


