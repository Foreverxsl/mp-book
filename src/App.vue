<script>
import {get} from './util'
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  // created () {
  //   wx.request({
  //     url: config.host+'/weapp/demo', //开发者服务器接口地址",
  //     success: res => {
  //       console.log(res);
  //     }
  //   })
  async created(){
    const res = await get('/weapp/demo')
    console.log(123,res)
    console.log('小程序启动了')
  }
}
</script>

<style>
.text-primary{
  color: #EA5A49;
}
.btn{
  color: white;
  background: #EA5A49;
  margin-top: 10px;
  margin-left: 5%;
  margin-right: 5%;
  border-radius: 4px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 90%;
}
.btn:active{
  background: rgb(230, 57, 38);
}
.text-footer{
  text-align: center;
  font-size: 12px;
}

</style>