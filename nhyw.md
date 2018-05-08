
## 南湖印务接口需求文档
员工后台暂时不管
### 概述

为了方便统一，提升开发效率，开发接口应注意一下事项：
> - 接口名服务端自定义，酌情返回字段
> - 请求header中附带Authentication,解析错误请返回异常说明
> - 所有金钱字段返回值为0或最多2为小数的数字
> - 所有接口返回字段无值应为`''`，对象类型空值为`{}`，数组类型空值为`[]`
> - 所有枚举字段应当同时返回key和value
> - 所有图片、文件服务端一同返回图片前缀
> - 服务器正常运行的情况下，必须返回响应数据
> 正确请求返回`{ state:0, data:{} }`
> 异常请求返回`{ state:1, code:400200, msg:'' }`

### 微信交互
目前应用到这些，开发中发现补足另行协商
#### 获取openid
- **method** `request.url`
- **request**
    参数：传入jscode
- **response**
    响应：服务端根据appid、密匙、jscode生成签名获取到用户openid，并加密生成3dr_session返回 前端存储，之后任何请求header中带上Authentication。
    签名规则请查阅<a href="https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#wxchecksessionobject" target="_blank">《微信官方文档》</a>

**登录流程**
![Alt Text](https://developers.weixin.qq.com/miniprogram/dev/image/api-login.jpg?t=201857)

#### 调起微信支付
详细流程查阅官方文档<a href="https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=5" target="_blank">《微信官方文档》</a>

#### 文件上传
详细流程查阅官方文档，注意显示格式个大小<a href="https://developers.weixin.qq.com/miniprogram/dev/api/network-file.html#wxuploadfileobject" target="_blank">《微信官方文档》</a>

### 个人中心
#### 获取用户基本信息
- **method** `request.url`
- **request**
    参数：header中的token
- **response**
    响应：用户基本信息。
> **注意** ：用户首次使用会上传用户关联的微信资料信息，服务端保存。用户修改个人微信信息，本项目用户信息不受影响，且用户可以自行修改资料

#### 上传用户基本信息
- **method** `request.url`
- **request**
    参数：`data:{...}` 从微信获取到的基本信息
- **response**
    响应：成功或失败。

#### 修改用户基本信息
- **method** `request.url`
- **request**
    参数：`data:{...}` 用户基本信息
- **response**
    响应：成功或失败。

#### 修改绑定手机
- **method** `request.url`
- **request**
    参数：手机号
- **response**
    响应：成功或失败。

#### 我的文件
- **method** `request.url`
- **request**
    参数：header中的token
- **response**
    响应：用户上传的文件历史。

#### 会员积分
- **method** `request.url`
- **request**
    参数：header中的token
- **response**
    响应：积分产出与消耗历史明细。

#### 优惠卡券
- **method** `request.url`
- **request**
    参数：header中的token
- **response**
    响应：暂时只做输入口令使用卡券，服务端定义生成规则，页面调用接口使用卡券。

#### 意见反馈
- **method** `request.url`
- **request**
    参数：反馈意见(文本，注意限制长度特殊字符)
- **response**
    响应：暂时只做输入口令使用卡券，服务端定义生成规则，页面调用接口使用卡券。

#### 活动通告
视情况而定，可先不做。
- **method** `request.url`
- **request**
    参数：无
- **response**
    响应：最新一条活动公告(尽量简明一句话，如若是一篇文章，需要另外提供公告详情接口)。

### 预约打印

#### 选择门店
选择门店后，上传文件。目前不做省市区赛选，直接下拉框选择,最新使用也暂时不做。
- **method** `request.url`
- **request**
    参数：无
- **response**
    响应：门店列表list。

#### 提交打印设置
每个文件对应一条设置，不做单文件选择即动态计算金额，太耗性能，批量提交后返回单价*份数 总金额显示给用户。
- **method** `request.url`
- **request**
    参数：`[]`文件和打印设置数组
- **response**
    响应：服务端计算金额返回,并带上可用积分 积分抵扣。

#### 确认支付订单
- **method** `request.url`
- **request**
    参数：微信支付流程
- **response**
    响应：支付成功则生成订单、以及取货码。

### 资料库
#### 资料库列表
- **method** `request.url`
- **request**
    参数：可筛选，按门店、资料类别、时间等
- **response**
    响应：资料列表。

#### 资料库详情
- **method** `request.url`
- **request**
    参数：资料编号
- **response**
    响应：资料详情。

#### 添加资料到购物车
- **method** `request.url`
- **request**
    参数：资料编号
- **response**
    响应：成功或失败。

#### 删除购物车资料
- **method** `request.url`
- **request**
    参数：购物车商品编号
- **response**
    响应：成功或失败。

#### 购物车下单确认
下单确认不调用接口，弹出设置打印参数页面，之后同预约打印流程。订单需要区分资料库订单和预约打印订单。
- **method** `request.url`
- **request**
    参数：资料编号和打印设置数组
- **response**
    响应：成功或失败。

### 我的订单
#### 订单-预约订单
- **method** `request.url`
- **request**
    参数：订单编号
- **response**
    响应：订单关联的文件、设置、状态、支付情况、取货码等。

#### 订单-资料库订单
- **method** `request.url`
- **request**
    参数：订单编号
- **response**
    响应：订单关联的文件、设置、状态、支付情况、门店、取货码等。

#### 订单详情
- **method** `request.url`
- **request**
    参数：订单编号
- **response**
    响应：订单所有详细信息。
