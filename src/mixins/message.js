export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {}
      },
      methods: {
        /**
         * 封装alert弹窗样式
         * @param {*} msg
         * @param {*} type
         * @param {*} callback
         */
        openMessage(msg, type = 'info', callback = function () { }) {
          const sortTypes = {
            'suc': 'success',
            'err': 'error',
            'war': 'warning'
          }
          if (sortTypes.hasOwnProperty(type)) {
            type = sortTypes[type]
          }

          this.$alert(msg, '', {
            type: type,
            showConfirmButton: false,
            closeOnClickModal: true,
            callback: action => {
              callback()
            }
          });
        },
        /**
         * 封装confirm弹窗方法
         * @param {*} optionParams
         * @param {*} content
         * @param {*} confirmFunc
         * @param {*} cancelFunc
         */
        openConfirm(optionParams = {}, content = '', confirmFunc = function () { }, cancelFunc = function () { }) {
          let baseParam = {
            title: '提示',
            message: content,
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'messagebox-btn',
            cancelButtonClass: 'messagebox-btn',
          }

          baseParam = Object.assign({}, baseParam, optionParams)

          this.$msgbox({
            ...baseParam,
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                setTimeout(() => {
                  done();
                  confirmFunc()
                }, 300)
              } else {
                done();
                cancelFunc()
              }
            },
            callback: (action, instance) => {

            }
          })
        }
      }
    })
  }
}
