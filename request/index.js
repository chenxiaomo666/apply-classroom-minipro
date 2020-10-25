// 用于处理请求的组件，可复用

export const request=(...params)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
           ...params,
           success:(result)=>{
               resolve(result);
           },
           fail:(err)=>{
               reject(err)
           }
        });
    })
}