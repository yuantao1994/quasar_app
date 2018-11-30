import { Notify } from 'quasar'
import createStore from '../store'

const store = typeof createStore === 'function' ? createStore() : createStore
let _backButtonPressed = false
let dismiss
export default function() {
  let currentPage = store.state.vux.currentPage
  if (currentPage.indexOf('tabs') >= 0 || currentPage == '/') {
    if (_backButtonPressed) navigator.app.exitApp()
    if (dismiss) dismiss()
    dismiss = Notify.create({
      message: `再按一次退出`,
      timeout: 1000, // 以毫秒为单位; 0意味着没有超时
      color: 'positive',
      position: 'bottom' // 'top', 'left', 'bottom-left'等
    })
    var state = {
      title: '1-index',
      url: '#'
    }
    window.history.pushState(state, state.title, '#')
    _backButtonPressed = true
    setTimeout(function() {
      _backButtonPressed = false
    }, 3000)
  }
}
