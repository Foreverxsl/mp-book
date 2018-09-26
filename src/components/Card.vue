<template>
    <div class="book-card" @click="goDetail(book.id)">
        <div class="thumb" @click.stop="preview">
            <img :src="book.image" class="img" mode="aspectFit">
        </div>
        <div class="detail">
            <div class="row">
                <div class="right">
                    {{book.rate}} <Rate :value='book.rate'></Rate>
                </div>
                <div class="left title">
                    {{book.title}}
                </div>
            </div>
            <div class="row">
                <div class="right text-primary">
                   浏览量：{{book.count}}
                </div>
                <div class="left author">
                    {{book.author}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    分享者: {{book.user_info.nickName}}
                </div>
                <div class="left">
                    {{book.publisher}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Rate from '@/components/Rate'
export default {
    components: {
        Rate
    },
    props:['book'],
    methods:{
        goDetail(id) {
            wx.navigateTo({
                url: `/pages/detail/main?id=${id}`
            })
        },
        preview(){
            wx.previewImage({
              urls: [this.book.image], //需要预览的图片链接列表,
              current:this.book.image
            });
        }
      
    }
}
</script>
<style lang="scss" scoped>
.book-card{
    padding: 5px;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    .thumb{
        width: 90px;
        height: 90px;
        float: left;
        margin: 0 auto;
        overflow: hidden;
        .img{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .detail{
        margin-left: 96px;
        .row{
            line-height: 20px;
            margin-bottom: 8px;
        }
        .right{
            float: right;
            margin-right: 5px;
        }
        .left{
            margin-right: 100px;
        }
        .title{
            font-size: 13px;
            font-weight: bold;
            color: rgb(34, 33, 33);
        }
        .author{
            color:#EA5A49;
        }
    }
}

</style>
