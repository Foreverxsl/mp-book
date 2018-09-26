<template>
    <div class="comment-list">
        <div class="page-title" v-if='comments.length'>
            <p>我的评论</p>
        </div>
        <div class="comment" :key="comment.id" v-for="comment in comments" @click="handleClick(comment)">
            <div class="user">
                <div class="inline">
                    <img :src="comment.image" class="avatar" mode="aspectFit">
                    {{comment.title}}
                </div>
                <div class="right">
                    {{comment.location||'未知地点'}}
                    <span class="text-primary">
                        --
                    </span>
                    {{comment.phone||'未知型号'}}
                </div>
            </div>
            <div class="content">
                {{comment.comment}}
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    props:['comments','type'],
    methods: {
      handleClick(comment){
          if(this.type === 'user'){
              wx.navigateTo({ url: '/pages/detail/main?id='+comment.bookid});
          }
      }
    }
}
</script>

<style lang='scss'>
.comment-list{
    font-size: 14px;
    .page-title{
        padding-left: 10px;
        background: #eee;
        line-height: 20px;
        p{
             font-size: 14px;
        }
    }
    .comment{
        background: white;
        margin-bottom: 10px;
        padding: 5px 20px;
        .content{
            margin: 10px 0;
        }
    }
    .user{
        .avatar{
            width: 25px;
            height: 25px;
            vertical-align: middle;
            border-radius: 50%;
            margin-right: 5px;
        }
        .inline{
            display: inline;
        }
        .right{
            float: right;
        }
    }

}
</style>
