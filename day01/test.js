function $(ele) {
  return document.getElementById(ele)
}
// 保存变量
let box = $("box")
let setting = $("setting")
let setbox = $("setbox")
let change = $("change")
let bgcolors = $("bgcolor").getElementsByTagName("li")
let widths = $("width").getElementsByTagName("li")
let heights = $("height").getElementsByTagName("li")
let reset = $("reset")
let sure = $("sure")
// 打开设置窗口
setting.onclick = function () {
  eventClick(setting)
}
// 恢复div的样式
reset.onclick = function () {
  eventClick(reset)
}
// 确定div的样式
sure.onclick = function () {
  eventClick(sure)
}
// 封装按钮点击事件
function eventClick(ele) {
  if (ele === setting) {
    box.style.backgroundColor = "rgba(0, 0, 0, .5)"
    setbox.style.display = "block"
  } else if (ele === reset) {
    change.style.height = '100px'
    change.style.width = '100px'
    change.style.backgroundColor = "transparent"
  } else {
    box.style.backgroundColor = "#fff"
    setbox.style.display = "none"
  }

}
// 封装设置div样式函数
function events(ele) {
  for (let i = 0; i < ele.length; i++) {
    ele[i].onmouseover = function () {
      if (ele === bgcolors) {
        ele[i].style.border = '1px solid black'
        ele[i].style.cursor = 'pointer'
      } else {
        ele[i].style.cursor = 'pointer'
        ele[i].style.backgroundColor = "rgb(168, 168, 61)"
        ele[i].style.color = "black"
      }
    }
    ele[i].onmouseout = function () {
      if (ele === bgcolors) {
        ele[i].style.border = 'none'
      } else {
        ele[i].style.backgroundColor = "#fff"
        ele[i].style.color = "#666"
      }
    }
    ele[i].onclick = function () {
      if (ele === bgcolors) {
        change.style.backgroundColor = window.getComputedStyle(bgcolors[i]).backgroundColor
      } else if (ele === widths) {
        change.style.width = ele[i].innerHTML + 'px'
      } else {
        change.style.height = ele[i].innerHTML + 'px'
      }
    }
  }
}
events(bgcolors)
events(widths)
events(heights)


// Chrome浏览器支持，英文格式输出rgb格式
// console.log(window.getComputedStyle(bgcolors[i]).backgroundColor)
// Chrome浏览器支持，并且只支持内联样式，英文格式输出原本格式；16进制格式输出rgb格式
// console.log(bgcolors[i].style.backgroundColor)
// Chrome浏览器不支持
// console.log(bgcolors[i].getBoundingClientRect().backgroundColor)