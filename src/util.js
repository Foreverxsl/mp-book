//工具函数库
import config from './config'

// http get工具函数 获取数据
export function get(url,data) {
    return request(url,'GET',data)
}
export function post(url,data) {
    return request(url,'POST',data)
}
function request(url,method,data){
    return new Promise((reslove,reject)=>{
        wx.request({
            data,
            method,
            url:config.host + url,
            success:function(res){
                if(res.data.code==0){
                    reslove(res.data.data)
                }else{
                    showModal('失败',res.data.data.msg)
                    reject(res.data)
                }
            } 
        })
    })

}
export function showModal(title,content){
    wx.showModal({
      title, //提示的标题,
      content, //提示的内容,
      showCancel: false, //是否显示取消按钮,
      cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
    });
}
export function showSuccess(text){
    wx.showToast({
        title: text, //提示的内容,
        icon: 'success', //图标,
    });

}