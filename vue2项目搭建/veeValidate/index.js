import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 声明使用vue插件
Vue.use(VeeValidate) // v-validate / errors / $validator

// 指定提示文本的为中文
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  // 根据name属性名称映射对应的中文提示名称
  attributes: {
    phone: '手机号',
    code: '验证码',
    name: '用户名',
    pwd: '密码',
    captcha: '验证码'
  }
})

// 自定义验证规则
// VeeValidate.Validator.extend('mobile', {
//   // 验证函数
//   validate: value => {
//     return /^1\d{10}$/.test(value)
//   },
//   getMessage: field => field + '必须是11位手机号码'
// })
VeeValidate.Validator.extend('phone', {
  // 验证函数
  validate: value => {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})
VeeValidate.Validator.extend('code', {
  // 验证函数
  validate: value => {
    return /^\d{4,6}$/.test(value)
  },
  getMessage: field => field + '请输入4-6位验证码'
})
// VeeValidate.Validator.extend('name', {
//   // 验证函数
//   validate: value => {
//     return /^\w+$/.test(value)
//   },
//   getMessage: field => field + '字母-数字-下划线'
// })
// VeeValidate.Validator.extend('pwd', {
//   // 验证函数
//   validate: value => {
//     return /^\w+$/.test(value)
//   },
//   getMessage: field => field + '字母-数字-下划线'
// })
// VeeValidate.Validator.extend('captcha', {
//   // 验证函数
//   validate: value => {
//     return /^[a-z0-9]+$/i.test(value)
//   },
//   getMessage: field => field + '必须是4位验证码'
// })