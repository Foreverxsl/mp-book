<template>
    <div class="bookinfo">
        <div class="thumb">
            <img class="back" :src="info.image" mode="aspectFill" alt="">
            <img :src="info.image" class="img" mode="aspectFit">
            <div class="info">
                <div class="title">
                    {{info.title}}
                </div>
                <div class="author">
                    {{info.author}}          
                </div>
            </div>
        </div>
        <div class="detail">
            <img :src="userinfo.img" class="avatar" mode="aspectFit">
            {{userinfo.name}}
            <div class="right text-primary">
                {{info.rate}}分<Rate :value='info.rate'></Rate>
            </div>
        </div>
        <div class="detail">
            出版社:{{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" :key="i" v-for="(tag,i) in info.tags">{{tag}}</div>
        </div>
        <div class="summary">
            <p :key="i" v-for="(sum,i) in info.summary">{{sum}}</p>
        </div>
    </div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
    components: {
        Rate
    },
    props:['info'],
    computed: {
        userinfo(){
            return this.info.user_info||{}
        }
    }

}
</script>

<style lang="scss">
.bookinfo{
    font-size: 14px;
    .badge{
        display: inline-block;
        margin: 5px;
        padding: 4px;
        border-radius: 10px;
        border: 1px #EA5A49 solid;
        color: #EA5A49;
    }
    .summary{ 
        padding: 10px 15px;
        p{
            text-indent: 2em;
            font-size: 14px;
        }
    }
    .right{
        float: right;
    }
    .detail{
        padding: 5px 10px;
        .avatar{
            margin-left: 5px;
            margin-right: 5px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
    .thumb{
        width: 750rpx;
        height: 500rpx;
        overflow: hidden;
        .back{
            width: 100%;
            filter: blur(15px)

        }
        .img{
            position: absolute;
            width: 100%;
            height: 300rpx;
            left: 0;
            top: 30rpx;
        }
        .info{
            color: white;
            position: absolute;
            width: 100%;
            left: 0;
            top: 330rpx;
            text-align: center;
            .title{
                margin-top: 10rpx;
                font-size: 18px;
            }
            .author{
                font-size: 14px;
            }
        }
    }
}

</style>
