## 论工程师的设计能力
- 3年工作经验，面试必考设计能力
- 成为项目技术负责人，设计能力是必要基础
- 从写好代码，到做好设计，设计模式是必经之路<br><br>

## 前端学习设计模式的困惑
- 网上的资料都是针对java等后端语言的
- 看懂概念，但是不知道怎么用，看完就忘
- 现在的JS框架，到底都用了哪些设计模式<br><br>

## 课程概述
- 做什么：讲解JS设计模式
- 哪些部分：面向对象；设计原则；设计模式
- 技术：面向对象；UML类图；ES6<br><br>

## 搭建开发环境
- 初始化npm环境：npm init
- 安装webpack：npm install webpack webpack-cli --save-dev
- 安装webpack-dev-server和html-webpack-plugin：npm install webpack-dev-server html-webpack-plugin --save-dev
- 安装babel：npm install babel-core babel-loader@7 babel-polyfill babel-preset-es2015 babel-preset-latest --save-dev
- 创建webpack.dev.config.js文件
```js
const path = require('path')
// 配置热更新
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },
  // 模块配置
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }]
  },
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  // 服务端配置
  devServer: {
    contentBase: path.join(__dirname, './release'), //根目录
    open: true, //自动打开浏览器
    port: 9000 //端口
  }
}
```

- 修改package.json文件，增加npm run dev命令
```json
{
  "name": "javascriptdesign",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config ./webpack.dev.config.js --mode development"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-latest": "^6.24.1",
    "html-webpack-plugin": "^4.0.4",
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
  }
}
```

- 增加.babelrc配置文件
```js
{
  "presets": ["es2015","latest"],
  "plugins": []
}
```

- 创建测试文件
```js
class Person {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

let P = new Person('张三')
console.log(P.getName())
```
<br><br>

## 面向对象
- 概念：类或者对象(实例)
```js
// 类，即模板
class Person {
  constructor(name,age) {
    this.name = name
    this.age = age
  }
  getName() {
    return this.name
  }
  getAge() {
    return this.age
  }
}

// 创建实例
let zhang = new Person('张三',18)
console.log(zhang.getName())
console.log(zhang.getAge())
// 创建实例
let wang = new Person('老王',28)
console.log(wang.getName())
console.log(wang.getAge())
```
- 三要素
1、继承：子类继承父类；可将公共方法抽离出来，提高复用，减少冗余<br>
```js
// 父类
class Person {
  constructor(name,age) {
    this.name = name
    this.age = age
  }
  getName() {
    return this.name
  }
  getAge() {
    return this.age
  }
}
// 子类继承父类
class Student extends Person {
  constructor(name,age,number) {
    super(name,age)
    this.number = number
  }
  study() {
    console.log(`我是${this.name},读着${this.number}`)
  }
}
// 创建实例
let zhang = new Student('张三',18,'三年级')
console.log(zhang.getName())
console.log(zhang.getAge())
zhang.study()
```
2、封装：数据的权限和保密；有三种特性，分别是完全开发(public)、对子类开放(protected)、对自己开放(private)；可以减少耦合，不该外露的不外露。利于数据、接口的权限管理。ES6目前不支持，一般认为_开头的属性是private<br>
```js
// ES6尚不支持封装，我们可以用typescript来演示
// 测试网址：http://www.typescriptlang.org/play/

// 父类
class Person {
  name:string
  age:number
  protected weight:number // 定义protected属性，对子类开放
  constructor(name:string,age:number) {
    this.name = name
    this.age = age
    this.weight = 120
  }
  getName() {
    return this.name
  }
  getAge() {
    return this.age
  }
}
// 子类继承父类
class Student extends Person {
  grade:string
  private girlfriend:string // 定义private属性，只能在子类中使用
  constructor(name:string,age:number,grade:string) {
    super(name,age)
    this.grade = grade
    this.girlfriend = 'xiaohong'
  }
  study() {
    alert(`我是${this.name},读着${this.grade}`)
  }
  getWeight() {
    // 获取父类定义的weight属性
    alert(`${this.weight}`)
  }
  getGirl() {
    // 获取子类girlfriend属性值
    alert(`${this.girlfriend}`)
  }
}
// 创建实例
let zhang = new Student('张三',18,'三年级')
zhang.getWeight()
alert(zhang.grade) //可以访问 
alert(zhang.girlfriend) //错误，无法访问
zhang.getGirl() //可以访问
```
3、多态：同一接口不同实现；JS应用极少；需要结合java等语言的接口、重写、重载等功能；保持子类的开放性和灵活性；面向接口编程；<br>
```js
// 父类
class Person {
  constructor(name) {
    this.name = name
  }
  saySomething() {
    console.log(`i am ${this.name}`)
  }
}
// 子类继承父类
class Student extends Person {
  constructor(name) {
    super(name)
  }
  // 重写saySomething()
  saySomething() {
    console.log(`i am not ${this.name}`)
  }
}
// 创建实例
let wang = new Person('老王')
wang.saySomething()
let zhang = new Student('张三')
zhang.saySomething()
```
- JS的应用举例：
```js
class jQuery {
  constructor(seletor) {
    let slice = Array.prototype.slice
    let dom = slice.call(document.querySelectorAll(seletor))
    let len = dom ? dom.length : 0
    for(let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.seletor = seletor || ''
  }
  append(node){}
  addClass(name){}
  html(data){}
}
window.$ = function (seletor) {
  // 工厂模式
  return new jQuery(seletor)
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript设计模式</title>
  <script src="./release/bundle.js"></script>
</head>
<body>
  <p>p标签一</p>
  <p>p标签二</p>
  <p>p标签三</p>

  <script>
    let $P = $('p')
    console.log($P)
    console.log($P.addClass)
  </script>
</body>
</html>
```
- 面向对象的意义：数据结构化。对于计算机，结构化的才是最简单的。编程应该简单和抽象。<br><br>


## UML类图
- 概念：Unified Modeling Language(统一建模语言)
- UML包含很多中图，和本课相关的是类图
- 关系：主要讲解泛华和关联
- 演示：代码和类图结合
- 工具：MS Office visio(https://www.processon.com/)
- 基本规则
| 类名      | 
| :--------:| 
| + public属性名A: 类型<br># protected属性名B: 类型<br>- private属性名C: 类型 | 
| + public方法名A(参数1,参数2): 返回值类型<br># protected方法名B(参数1,参数2): 返回值类型<br>- private方法名C(参数1,参数2): 返回值类型 |


## UML类图案例1
代码
```js
class People {
  constructor(name,age) {
    this.name = name
    this.age = age
  }
  eat() {}
  speak() {}
}
```

类图
| People    | 
| :--------:| 
| + name: String<br>+ age: Number | 
| + eat(): void<br>+ speak(): void |


## UML类图案例2
代码
```js
class People {
  constructor(name,house) {
    this.name = name
    this.house = house
  }
  saySomething() {
    alert('我是People')
  }
}

class A extends People {
  constructor(name,house) {
    super(name,house)
  }
  saySomething() {
    alert('我是A')
  }
}

class B extends People {
  constructor(name,house) {
    super(name,house)
  }
  saySomething() {
    alert('我是B')
  }
}

class House {
  constructor(city) {
    this.city = city
  }
  showCity() {
    alert(`我的房子在${this.city}`)
  }
}

// 测试
let aHouse = new House('北京')
let a = new A('aaa',aHouse)
console.log(a.name) // aaa
console.log(a.house) // House{city:'北京'}
console.log(a.house.city) // 北京
let b = new B('bbb')
console.log(b) // {name:'bbb',house:undefined}
```

类图；
![leitu01.png]()
<br><br>


## 设计原则
#### 何为设计？
- 即按照哪一种思路或者标准来实现功能。
- 功能相同，可以有不同设计方案来实现。
- 伴随着需求增加，设计的作用才能体现出来。<br><br>

#### 《UNIX/LINUX设计哲学》
- 小即是美
- 让每个程序只做好一件事
- 快速建立原型
- 舍弃高效率而取可移植性
- 采用纯文本用来存储数据
- 充分利用软件的杠杆效应(软件复用)
- 使用shell脚本来提高杠杆效应和可移植性
- 避免强制性的用户界面
- 让每个程序都成为过滤器
- 允许用户定制环境
- 尽量使操作系统内核小而轻量化
- 使用小写字母并尽量简短
- 沉默是金：异常处理
- 各部分之和大于整体
- 寻求90%的解决方案<br><br>

#### 五大设计原则(SOLID)
- S-单一职责原则：一个程序只做好一件事；如果功能过于复杂就拆分开，每个部分保持独立
- O-开放封闭原则：对扩展开放，对修改封闭；增加需求时，扩展新代码，而非修改已有代码；这是软件设计的终极目标
- L-李氏置换原则：子类能覆盖父类；父类出现的地方子类就能出现
- I-接口独立原则：保持接口的单一独立，避免出现“胖接口”；JS中没有接口(typescript例外)，使用较少；类似单一职责原则，这里更关注接口
- D-依赖导致原则：面向接口编程，依赖于抽象而不依赖于具体；使用方只关注接口而不关注具体类的实现<br><br>

#### 用Promise来说明SO原则
- 单一职责原则：每个then中的逻辑只做好一件事
- 开放封闭原则：如果新增需求，扩展then
```js
function loadImg(src) {
  let promise = new Promise(function(resolve, reject) {
    let img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject('图片加载失败')
    }
    img.src = src
  })
  return promise
}
let src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586939926254&di=92df4682e74f7ca6d18cff9f27821fa9&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2F4cda9a25dc2e3e42bca5c4d7e3519fb5.jpeg"
let result = loadImg(src)
result.then(function(img) {
  console.log(`width:${img.width}`)
  console.log(`height:${img.height}`)
  return img
}).then(function(img) {
  console.log(`height:${img.height}`)
  console.log(img)
}).catch(function(err) {
  console.log(err)
})
```

#### 从设计到模式
- 设计
- 模式
- 分开
- 从设计到模式<br><br>


## 介绍23种设计模式
#### 创建型
- 工厂模式(工厂方法模式，抽象工厂模式，建造者模式)
- 单例模式
- 原型模式<br>

#### 结构型
- 适配器模式
- 装饰器模式
- 代理模式
- 外观模式
- 桥接模式
- 组合模式
- 享元模式<br>

#### 行为型
- 策略模式
- 模板方法模式
- 观察者模式
- 迭代器模式
- 职责连模式
- 命令模式
- 备忘录模式
- 状态模式
- 访问者模式
- 中介者模式
- 解释器模式<br><br>


## 如何学习设计模式
- 明白每个设计的道理和用意
- 通过经典应用体会它的真正使用场景
- 自己编码时多思考，尽量模仿<br><br>


## 面试题示例1
内容：
- 打车时，可以打专车或者快车。任何车都有车牌号和名称
- 不同车价格不同，快车每公里1元，专车每公里2元
- 行程开始时，显示车辆信息
- 行程结束时，显示打车金额(假定行程就5公里)

要求：
- 画出UML类图
- 用ES6语法写出该示例

解答：
- UML类图
![mianshi01.png]()
- ES6代码
```js
// 父类
class Car {
  constructor(number, name) {
    this.number = number
    this.name = name
  }
}
// 子类
class Kuaiche extends Car {
  constructor(number, name) {
    super(number, name)
    this.price = 1
  }
}
// 子类
class Zhuanche extends Car {
  constructor(number, name) {
    super(number, name)
    this.price = 2
  }
}
// 行程类(方法类)
class Trip {
  constructor(car) {
    this.car = car
  }
  start() {
    console.log(`行程开始，车型：${this.car.name}，车牌号：${this.car.number}`)
  }
  end() {
    console.log(`行程结束，价格：${this.car.price*5}`)
  }
}

let Kcar = new Kuaiche(1002008, '桑塔纳')
let Ktrip = new Trip(Kcar)
Ktrip.start()
Ktrip.end()
let Zcar = new Zhuanche(2004067, '比亚迪')
let Ztrip = new Trip(Zcar)
Ztrip.start()
Ztrip.end()
```


## 面试题示例2
内容：
- 某停车场，分3层，每层100个车位
- 每个车位都能监控到车辆的驶入和离开
- 车辆进入前，显示每层的空余车位数量
- 车辆进入时，摄像头可识别车牌号和时间
- 车辆出来时，出口显示器显示车牌号和停车时长

要求：
- 画出UML类图
- 用ES6语法写出该示例

解答：
- UML类图
![mianshi02.png]()
- ES6代码
```js
// 车辆
class Car {
  constructor(num) {
    this.num = num
  }
}

// 摄像头
class Camera {
  shot(car) {
    return {
      num: car.num,
      inTime: Date.now()
    }
  }
}

// 出口显示屏
class Screen {
  show(car, inTime) {
    console.log(`车牌号：${car.num}`)
    console.log(`停车时间：${Date.now() - inTime}`)
  }
}

// 停车场
class Park {
  constructor(floors) {
    // 层数
    this.floors = floors || []
    // 摄像头对象
    this.camera = new Camera()
    // 显示屏对象
    this.screen = new Screen()
    // 存储摄像头拍摄返回的车辆信息
    this.carList = {}
  }
  // 进入
  in(car) {
    // 通过摄像头获取信息
    const info = this.camera.shot(car)
    // 停到某个停车位
    const i = parseInt(Math.random() * 100 % 100)
    // 停在第一层
    const place = this.floors[0].places[i]
    place.in()
    info.place = place
    // 记录信息
    this.carList[car.num] = info
  }
  // 出去
  out(car) {
    // 获取信息
    const info = this.carList[car.num]
    // 将停车位清空
    const place = info.place
    place.out()
    // 显示时间
    this.screen.show(car, info.inTime)
    // 清空记录
    delete this.carList[car.num]
  }
  // 空余车位
  emptyNum() {
    return this.floors.map(floor => {
      return `${floor.index} 层还有${floor.emptyPlaceNum()}个空闲车位`
    }).join('\n')
  }
}

// 层数
class Floor {
  constructor(index, places) {
    this.index = index
    // 停车位
    this.places = places || []
  }
  // 空余车位
  emptyPlaceNum() {
    let num = 0
    this.places.forEach(p => {
      if(p.empty) {
        num = num + 1
      }
    })
    return num
  }
}

// 车位
class Place {
  constructor() {
    this.empty = true
  }
  in() {
    this.empty = false
  }
  out() {
    this.empty = true
  }
}

// 测试
// 初始化停车场
const floors = []
for(let i = 0; i < 3; i++) {
  const places = []
  for(let j = 0; j < 100; j++) {
    places[j] = new Place()
  }
  floors[i] = new Floor(i+1, places)
}
const park = new Park(floors)

// 初始化车辆
const car1 = new Car(100)
const car2 = new Car(200)
const car3 = new Car(300)

console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)
console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)

console.log('第三辆车进入')
console.log(park.emptyNum())
park.in(car3)
console.log('第三辆车离开')
park.out(car3)
```


## 工厂模式
- 介绍：将new操作单独封装；遇到new时，就要考虑是否该使用工厂模式；
- 示例：你去购买汉堡，直接点餐、取餐，不会自己亲手做。商店要"封装"做汉堡的工作，做好直接给买者。
- UML类图
![gongchang.png]()

- ES6代码
```js
class Product {
  constructor(name) {
    this.name = name
  }
  init() {
    console.log('inti'+this.name)
  }
  fun1() {
    console.log('fun1')
  }
  fun2() {
    console.log('fun2')
  }
}

class Creator {
  create(name) {
    return new Product(name)
  }
}

let creator = new Creator()
let p = creator.create('第一个示例')
p.init()
let p2 = creator.create('第二个示例')
p2.init()
```


## 单例模式
- 介绍：系统中被唯一使用；一个类只有一个实例
- 示例：登录框、购物车
- 设计原则：符合单一职责原则，只实例化唯一的对象；没法具体开放封闭原则，但是绝对不违反开放封闭原则
- UML类图
![danli]()

- java代码来演示UML图
```js
public class SingleObject {
  // 私有化构造函数，外部不能new，只能内部new
  private SingleObject() {}
  // 唯一被new出来的对象
  private SingleObject instance = null;
  // 获取对象的唯一接口
  public SingleObject = getInstance() {
    if(instance == null) {
      // 只new一次
      instance = new SingleObject()
    }
    return instance;
  }
  // 对象方法
  public void login(username, password) {
    System.out.println("login...")
  }
}

// 测试代码
public class SingletonPatternDemo {
  public static void main(String[] args) {
    // 不合法的构造函数，编译时错误：构造函数SingleObject()是不可见的
    // SingleObject object = new SingleObject();
    
    // 获取唯一可用的对象
    SingleObject object = SingleObject.getInstance();
    object.login();
  }
}
```

- ES6代码来演示UML图
```js
class SingleObject {
  login() {
    console.log('login...')
  }
}
SingleObject.getInstance = (function(){
  let instance
  return function(){
    if(!instance){
      instance = new SingleObject()
    }
    return instance
  }
})()

// 测试：注意这里只能使用静态函数getInstance，不能new SingleObject()
// let obj01 = new SingleObject()
let obj01 = SingleObject.getInstance()
obj01.login()
let obj02 = SingleObject.getInstance()
obj02.login()
console.log('obj01 === obj02：', obj01 === obj02)
console.log('---分割线---')
let obj03 = new SingleObject()
obj03.login()
console.log('obj01 === obj03：', obj01 === obj03)
```

- 模拟登录框
```js
class LoginForm {
  constructor() {
    this.state = 'hide'
  }
  show() {
    if(this.state === 'show') {
      console.log('已经显示')
      return
    }
    this.state = 'show'
    console.log('登录框已经显示')
  }
  hide() {
    if(this.state === 'hide') {
      console.log('已经隐藏')
      return
    }
    this.state = 'hide'
    console.log('登录框已经隐藏')
  }
}
LoginForm.getInstance = (function() {
  let instance
  return function() {
    if(!instance) {
      instance = new LoginForm()
    }
    return instance
  }
})()

// 测试
let login01 = LoginForm.getInstance()
login01.show()
let login02 = LoginForm.getInstance()
login02.show()
let login03 = LoginForm.getInstance()
login03.hide()
console.log('login01===login03：', login01===login03)
```


## 适配器模式
- 旧接口格式和使用者不兼容
- 中间加一个适配转换接口
- 场景：封装旧接口；vue computed
- 设计原则：将旧接口和使用者进行分离；符合开放封闭原则
- UML类图
![shipei.png]()

- ES6代码
```js
class Adaptee {
  specificRequest() {
    return '德国标准的插头'
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee()
  }
  request() {
    let info = this.adaptee.specificRequest()
    return `${info} -> 转换器 -> 中国标准的插头`
  }
}

// 测试
let target = new Target()
let res = target.request()
console.log(res)
```


## 装饰器模式
- 介绍：为对象添加新功能；不改变其原有的结构和功能
- UML类图
![zhuangshiqi.png]()
- ES6代码
```js
class Circle {
  draw() {
    console.log('画一个圆形')
  }
}
class Decorator {
  constructor(circle) {
    this.circle = circle
  }
  draw() {
    this.circle.draw()
    this.setRedBorder(this.circle)
  }
  setRedBorder(circle) {
    console.log('设置红色边框')
    console.log(circle)
  }
}
// 测试代码
let circle = new Circle()
circle.draw()
console.log('---分割线---')
let dec = new Decorator(circle)
dec.draw()
```

- ES7装饰器
```js
// 步骤一：npm install babel-plugin-transform-decorators-legacy --save-dev
// 步骤二：编写.babelrc文件
{
  "presets": ["es2015","latest"],
  "plugins": ["transform-decorators-legacy"]
}
// 步骤三：验证是否可用装饰器语法
@testDec
class Demo {

}
function testDec(target) {
  target.isDec = true
}
alert(Demo.isDec)
// 步骤四：可加参数的装饰器
@testDec(true)
class Demo {

}
function testDec(isDec) {
  return function(target) {
    target.isDec = isDec
  }
}
alert(Demo.isDec)
```

- 装饰器的原理
```js
// 装饰器的原理
@decorator
class A {}

// 等同于
class A {}
A = decorator(A) || A
```

- 装饰类-mixin示例
```js
function mixins(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list)
  }
}
const Foo = {
  foo() {
    alert('这是foo')
  }
}
@mixins(Foo)
class MyClass {}
let obj = new MyClass()
obj.foo()
```

- 装饰方法-例1
```js
function readonly(target, name, descriptor) {
  descriptor.writable = false
  return descriptor
}
class Person {
  constructor() {
    this.first = 'A'
    this.last = 'B'
  }
  // 装饰方法
  @readonly
  name() {
    return `${this.first}和${this.last}`
  }
}
let p = new Person()
console.log(p.name())
// p.name = function(){} //这里会报错，因为name是只读属性
```

- 装饰方法-例2
```js
function log(target, name, descriptor) {
  let oldValue = descriptor.value
  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments)
    return oldValue.apply(this, arguments)
  }
  return descriptor
}
function readonly(target, name, descriptor) {
  descriptor.writable = false
  return descriptor
}
class Math {
  @log
  add(a, b) {
    return a+b
  }
}
let math = new Math() 
const result = math.add(2,4) // 执行add时，会自动打印日志，因为有@log装饰器
console.log('result:',result)
```

- [core-decorators](https://github.com/jayphelps/core-decorators)：第三方开源lib；提供常用的装饰器
```js
// 步骤一：npm install core-decorators --save
// 步骤二：编码
import { readonly, deprecate } from 'core-decorators'
class Person {
  @readonly
  name() {
    return 'zhangsan'
  }
}
let p = new Person()
alert(p.name())

class Animal {
  @deprecate('即将废用', { url: 'www.imooc.com' })
  name() {
    return '猴哥~'
  }
}
let a = new Animal()
alert(a.name())
```
- 设计原则验证：将现有对象和装饰器进行分离，两者独立存在；符合开放封闭原则


## 代理模式
- 介绍：使用者无权访问目标对象；中间加代理，通过代理做授权和控制
- UML类图
![daili.png]()
- ES6案例
```js
class ReadImg {
  constructor(fileName) {
    this.fileName = fileName
    // 初始化即从硬盘中加载，模拟
    this.loadFromDisk()
  }
  display() {
    console.log('display...'+this.fileName)
  }
  loadFromDisk() {
    console.log('loading...'+this.fileName)
  }
}
class ProxyImg {
  constructor(fileName) {
    this.readImg = new ReadImg(fileName)
  }
  display() {
    this.readImg.display()
  }
}
let pro = new ProxyImg('1.png')
pro.display()
```
- 场景：网页事件代理；jQuery的$.proxy；ES6的Proxy
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript设计模式</title>
  <script src="https://lib.baomitu.com/jquery/3.5.0/jquery.js"></script>
</head>
<body>
  <div id="box">
    <p id="p1">p标签一</p>
    <p id="p2">p标签二</p>
    <p id="p3">p标签三</p>
  </div>

  <script>
    // 网页事件代理
    let Div = document.getElementById('box')
    Div.addEventListener('click', function(e){
      let target = e.target
      if(target.nodeName === 'P') {
        console.log(target.innerHTML)
      }
    })
    // jQuery
    $('#p1').click(function(){
      let self = this
      setTimeout(() => {
        $(self).css('color', 'red')
      }, 1000);
    })
    $('#p2').click(function(){
      let fn = $.proxy(function(){
        $(this).css('color', 'blue')
      })
      fn = $.proxy(fn, this)
      setTimeout(fn, 1000);
    })
    $('#p3').click(function(){
      setTimeout($.proxy(function(){
        $(this).css('color', 'green')
      }, this), 1000);
    })
  </script>
</body>
</html>
```

```js
// 明星
let star = {
  name: '张三',
  age: 25,
  phone: '15920902345'
}
// 经纪人
let agent = new Proxy(star, {
  get: function(target, key) {
    if(key==='phone'){
      // 返回经纪人自己的手机号码
      return '8888888'
    }
    if(key==='price'){
      // 明星不报价，经纪人报价
      return 1000
    }
    return target[key]
  },
  set: function(target, key, val) {
    if(key==='customPrice'){
      if(val<10000) {
        throw new Error('价格太低了')
      }else{
        target[key] = val
        return true
      }
    }
  }
})
console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)
agent.customPrice = 15000
console.log('经纪人报价：',agent.customPrice)
```
- 设计原则验证：代理类和目标类分离，隔离开目标类和使用者；符合开放封闭原则


## 代理模式VS适配器模式
- 适配器模式：提供一个不同的接口(如不同版本的插头)
- 代理模式：提供一个一模一样的接口


## 代理模式VS装饰器模式
- 装饰器模式：扩展功能，原有功能不变且可直接使用
- 代理模式：显示原有功能，但是经过限制或者阉割之后的


## 外观模式
- 介绍：为子系统的一组接口提供了一个高层接口；使用者使用这个高层接口
- 示例：去医院看病，接待员去挂号、门诊、划价等
- UML类图
![waiguan.png]()
- 场景
```js
function bindEvent (elem, type, selector, fn) {
  if(fn==null) {
    fn = selector
    selector = null
  }
}
// 调用
bindEvent(elem, 'click', '#div1', fn)
bindEvent(elem, 'click', fn)
```
- 设计原则验证：不符合单一职责原则和开放封闭原则，因此谨慎使用，不可滥用。


## 观察者模式
- 介绍：发布or订阅；一对多
- 示例：点咖啡、叫外卖
- UML类图
![guanchazhe.png]()
- ES6代码
```js
// 主题，保存状态，状态变化之后触发所有观察者对象
class Subject {
  constructor() {
    this.state = 0
    this.observers = []
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
    this.notifyAllObservers()
  }
  notifyAllObservers() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
  attach(observer) {
    this.observers.push(observer)
  }
}

// 观察者
class Observer {
  constructor(name, subject) {
    this.name = name
    this.subject = subject
    this.subject.attach(this)
  }
  update() {
    console.log(`${this.name} update, state：${this.subject.getState()}`)
  }
}
// 测试
let s = new Subject()
let o1 = new Observer('o1', s)
let o2 = new Observer('o2', s)
let o3 = new Observer('o3', s)
s.setState(1)
s.setState(2)
s.setState(3)
```
- 场景：网页事件绑定、Promise、jQuery的callbacks、nodejs自定义事件、nodejs处理http请求、多进程通讯、Vue和React组件生命周期触发、vue的watch和computed
- 设计原则验证：主题和观察者分离，不是主动触发而是被动监听，两者解耦；符合开放封闭原则


## 迭代器模式
- 介绍：顺序访问一个集合；使用者无需知道集合的内部结构(封装)
- UML类图
![diedaiqi.png]()
- ES6代码演示
```js
class Iterator {
  constructor(container) {
    this.list = container.list
    this.index = 0
  }
  next() {
    if(this.hasNext()) {
      return this.list[this.index++]
    }
    return null
  }
  hasNext() {
    if(this.index >= this.list.length) {
      return false
    }
    return true
  }
}
class Container {
  constructor(list) {
    this.list = list
  }
  // 生成遍历器
  getIterator() {
    return new Iterator(this)
  }
}

let arr = [1,2,3,4,5,6,77]
let container = new Container(arr)
let iterator = container.getIterator()
while(iterator.hasNext()) {
  console.log(iterator.next())
}
```
- 场景：jQuery的each、ES6的Iterator

#### ES6的Iterator为何存在
- 1、ES6语法中，有序集合的数据类型已经有很多
- 2、需要有一个统一的遍历接口来遍历所有数据类型
- 有序集合：Array、Map、Set、String、TypedArray、arguments、NodeList
- 注意：object不是有序集合，可以用Map代替

#### ES6的Iterator是什么
- 以上数据类型，都有[Symbol.iterator]属性
- 属性值是函数，执行函数返回一个迭代器
- 这个迭代器就有next方法可顺序迭代子元素
- 可运行Array.prototype[Symbol.iterator]来测试
- 代码示例
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript设计模式</title>
  <script src="https://lib.baomitu.com/jquery/3.5.0/jquery.js"></script>
</head>
<body>
  <div id="box">
    <p id="p1">p标签一</p>
    <p id="p2">p标签二</p>
    <p id="p3">p标签三</p>
  </div>

  <script>
    function eachFn(data) {
      // 生成遍历器
      let iterator = data[Symbol.iterator]()
      // console.log(iterator.next()) // 有数据时返回{value:1, done:false}
      // console.log(iterator.next())
      // console.log(iterator.next())
      // console.log(iterator.next())
      // console.log(iterator.next()) // 没有数据时返回{value: undefined, done:true}
      let item = { done: false }
      while(!item.done) {
        item = iterator.next()
        if(!item.done) {
          console.log(item.value)
        }
      }
    }

    function eachFo(data) {
      for(let item of data) {
        console.log(item)
      }
    }

    // 测试代码
    let arr = [1,2,3,4]
    let nodeList = document.getElementsByTagName('p')
    let m = new Map()
    m.set('a', 100)
    m.set('b', 300)
    eachFn(arr)
    eachFn(nodeList)
    eachFn(m)
    console.log('---分割线---')
    eachFo(arr)
    eachFo(nodeList)
    eachFo(m)
  </script>
</body>
</html>
```

## 状态模式
- 介绍：一个对象有状态变化；每次状态变化都会触发一个逻辑；不能总是用if...else来控制
- 示例：交通信号灯不同颜色的变化
- UML类图
![zhuangtai.png]
- 代码示例
```js
// 状态(红灯、绿灯、黄灯)
class State {
  constructor(color) {
    this.color = color
  }
  handle(context) {
    console.log(`turn to ${this.color} light`)
    context.setState(this)
  }
}
// 主体
class Context {
  constructor() {
    this.state = null
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
  }
}
// 测试
let context = new Context()
let green = new State('green')
let yellow = new State('yellow')
let red = new State('red')
// 绿灯亮了
green.handle(context)
console.log(context.getState())
// 黄灯亮了
yellow.handle(context)
console.log(context.getState())
// 红灯亮了
red.handle(context)
console.log(context.getState())
```
- 场景：有限状态机(如交通红绿灯)；写一个简单的Promise


#### 状态机代码实现
```js
// 步骤一：npm i javascript-state-machine --save-dev
// 步骤二：npm i jquery --save-dev

import StateMachine from "javascript-state-machine";
import $ from "jquery";
// 初始化状态机模型
let fsm = new StateMachine({
  init: "收藏",
  transitions: [
    {
      name: "doStore",
      from: "收藏",
      to: "取消收藏",
    },
    {
      name: "deleteStore",
      from: "取消收藏",
      to: "收藏",
    },
  ],
  methods: {
    // 监听执行收藏
    onDoStore: function () {
      console.log("收藏成功");
      updateText();
    },
    // 监听取消收藏
    onDeleteStore: function () {
      console.log("已经取消收藏");
      updateText();
    },
  },
});

let btn = $("#btn01");
btn.click(function () {
  console.log(432)
  if (fsm.is("收藏")) {
    fsm.doStore();
  } else {
    fsm.deleteStore();
  }
});
// 更新按钮文案
function updateText() {
  btn.text(fsm.state);
}
// 初始化文案
updateText();
```

#### 写一个简单的Promise
```js
import StateMachine from "javascript-state-machine";
// 状态机模型
let fsm = new StateMachine({
  init: 'pending', // 初始化状态
  transitions: [
    {
      name: 'resolve', // 事件名称
      from: 'pending',
      to: 'fullfilled'
    },
    {
      name: 'reject',
      from: 'pending',
      to: 'rejected'
    }
  ],
  methods: {
    onResolve: function(state, data) {
      // state:当前状态示例；data:fsm.resolve(xxx)执行时传递过来的参数
      data.successList.forEach(fn => fn())
    },
    onReject: function(state, data) {
      data.failList.forEach(fn => fn())
    }
  }
})

// 定义Promise
class MyPromise {
  constructor(fn) {
    this.successList = []
    this.failList = []
    fn(()=>{
      fsm.resolve()
    }, ()=>{
      fsm.reject()
    })
  }
  then(successFn, failFn) {
    this.successList.push(successFn)
    this.failList.push(failFn)
  }
}

// 测试代码
function loadImg(src) {
  let promise = new Promise(function(resolve, reject) {
    let img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject('图片加载失败')
    }
    img.src = src
  })
  return promise
}
let src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586939926254&di=92df4682e74f7ca6d18cff9f27821fa9&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2F4cda9a25dc2e3e42bca5c4d7e3519fb5.jpeg"
let result = loadImg(src)
result.then(function(img) {
  console.log(`width:${img.width}`)
  console.log(`height:${img.height}`)
  return img
}).then(function(img) {
  console.log(`height:${img.height}`)
}).catch(function(err) {
  console.log(err)
})
```


## 原型模式
- 概念：clone自己，生成一个新对象
- 代码实现
```js
// Object.create()用到了原型模式的思想
// 基于一个原型创建一个对象
const prototype = {
  getName: function(){
    return this.first + '-' + this.last
  },
  say: function(){
    console.log('hi~')
  }
}
// 基于原型创建x
let x = Object.create(prototype)
x.first = 'A'
x.last = 'B'
console.log(x.getName())
x.say()
// 基于原型创建y
let y = Object.create(prototype)
y.first = 'C'
y.last = 'D'
console.log(y.getName())
y.say()
```
- 对比JavaScript中的原型prototype：1、prototype可以理解为ES6中class的一种底层原理；2、而class是实现面向对象编程的基础，并不是服务于某个模式；3、若干年后ES6全面普及，大家可能会忽略掉prototype；4、但是Object.create却会长久存在<br>


## 桥接模式
- 概念：用于把抽象化与实现化解耦，使得二者可以独立变化
- 代码实现
```js
class ColorShape {
  yellowCicle() {
    console.log('yellow')
  }
  redCicle() {
    console.log('red')
  }
  blueCicle() {
    console.log('blue')
  }
}
// 测试
let cs = new ColorShape()
cs.yellowCicle()
cs.redCicle()
cs.blueCicle()

class Color {
  constructor(name) {
    this.name = name
  }
}
class Shape {
  constructor(name, color) {
    this.name = name
    this.color = color
  }
  draw() {
    console.log(`${this.color.name}-${this.name}`)
  }
}
// 测试代码
let red01 = new Color('red01')
let yellow01 = new Color('yellow01')
let circle = new Shape('circle01', red01)
circle.draw()
let triangle = new Shape('triangle', yellow01)
triangle.draw()
```

## 组合模式
- 概念：生成树形结构，表示“整体-部分”关系；让整体和部分都具有一致的操作方式<br>


## 享元模式
- 概念：共享内存，主要考虑内存，而非效率；相同的数据，共享使用。<br>


## 策略模式
- 概念：不同策略分开处理；避免出现大量if...else或者switch...case
- 代码实现
```js
// if版本
class User {
  constructor(type) {
    this.type = type
  }
  buy() {
    if(this.type === 'ordinary') {
      console.log('普通用户购买')
    } else if(this.type === 'member') {
      console.log('会员用户购买')
    } else if(this.type === 'vip') {
      console.log('vip用户购买')
    }
  }
}
let u1 = new User('ordinary')
u1.buy()
let u2 = new User('member')
u2.buy()
let u3 = new User('vip')
u3.buy()

// 策略模式版本
class OrdinaryUser {
  buy() {
    console.log('普通用户购买')
  }
}
class MemberUser {
  buy() {
    console.log('会员用户购买')
  }
}
class VipUser {
  buy() {
    console.log('vip用户购买')
  }
}
let u4 = new OrdinaryUser()
u4.buy()
let u5 = new MemberUser()
u5.buy()
let u6 = new VipUser()
u6.buy()
```


## 模板方法模式
- 代码实现
```js
class Action {
  handle() {
    this.handle1()
    this.handle2()
    this.handle3()
  }
  handle1() {
    console.log('1')
  }
  handle2() {
    console.log('2')
  }
  handle3() {
    console.log('3')
  }
}
let a = new Action()
a.handle()
```


## 职责链模式
- 概念：一步操作可能分为多个职责角色来完成；把这些角色都分开，然后用一个链串起来；将发起者和各个处理者进行隔离
- 代码实现
```js
// 请假审批，需要组长审批、经理审批、最后总监审批
class Action {
  constructor(name) {
    this.name = name
    this.nextAction = null
  }
  setNextAction(action) {
    this.nextAction = action
  }
  handle() {
    console.log(`${this.name} 审批`)
    if(this.nextAction !=null){
      this.nextAction.handle()
    }
  }
}
let a1 = new Action('组长')
let a2 = new Action('经理')
let a3 = new Action('总监')
a1.setNextAction(a2)
a2.setNextAction(a3)
a1.handle()
```


## 命令模式
- 概念：执行命令时，发布者和执行者分开；中间加入命令对象，作为中转站
- 应用：网页富文本编辑器操作，浏览器封装了一个命令对象
- 代码实现
```js
// 接收者
class Receiver {
  exec() {
    console.log('执行')
  }
}
// 命令者
class Command {
  constructor(receiver) {
    this.receiver = receiver
  }
  cmd() {
    console.log('触发命令')
    this.receiver.exec()
  }
}
// 触发者
class Invoker {
  constructor(command) {
    this.command = command
  }
  invoke() {
    console.log('开始')
    this.command.cmd()
  }
}
// 士兵
let soldier = new Receiver()
// 小号手
let trumpeter = new Command(soldier)
// 将军
let general = new Invoker(trumpeter)
general.invoke()
```


## 备忘录模式
- 概念：随时记录一个对象的状态变化；随时可以恢复之前的某个状态(如撤销功能)
```js
// 状态备忘
class Memento {
  constructor(content) {
    this.content = content
  }
  getContent() {
    return this.content
  }
}
// 备忘列表
class CareTaker {
  constructor() {
    this.list = []
  }
  add(memento) {
    this.list.push(memento)
  }
  get(index) {
    return this.list[index]
  }
}
// 编辑器
class Editor {
  constructor() {
    this.content = null
  }
  setContent(content) {
    this.content = content
  }
  getContent() {
    return this.content
  }
  saveContentToMemento() {
    return new Memento(this.content)
  }
  getContentFromMemento(memento) {
    this.content = memento.getContent()
  }
}
// 测试代码
let editor = new Editor()
let careTaker = new CareTaker()
editor.setContent('111')
editor.setContent('222')
careTaker.add(editor.saveContentToMemento()) // 存储备忘录
editor.setContent('333')
careTaker.add(editor.saveContentToMemento()) // 存储备忘录
editor.setContent('444')

console.log(editor.getContent())
editor.getContentFromMemento(careTaker.get(1)) // 撤销
console.log(editor.getContent())
editor.getContentFromMemento(careTaker.get(0)) // 撤销
console.log(editor.getContent())
```


## 中介者模式
- 概念
![zhongjiezhe]()
- 代码实现
```js
class Mediator {
  constructor(a, b) {
    this.a = a
    this.b = b
  }
  setA() {
    let number = this.b.number
    this.a.setNumber(number * 100)
  }
  setB() {
    let number = this.a.number
    this.b.setNumber(number / 100)
  }
}
class A {
  constructor() {
    this.number = 0
  }
  setNumber(num, m) {
    this.number = num
    if(m) {
      m.setB()
    }
  }
}
class B {
  constructor() {
    this.number = 0
  }
  setNumber(num, m) {
    this.number = num
    if(m) {
      m.setA()
    }
  }
}
// 测试
let a = new A()
let b = new B()
let m = new Mediator(a, b)
a.setNumber(100, m)
console.log(a.number, b.number)
b.setNumber(100, m)
console.log(a.number, b.number)
```


## 综合应用
- UML类图
![xiangmu.png]()

#### 用到的设计模式
- 工厂模式：$('xxx')，创建商品
- 单例模式：购物车
- 装饰器模式：打点统计
- 观察者模式：网页事件、Promise
- 状态模式：添加到购物车or从购物车删除
- 模板方法模式：渲染有统一的方法，内部包含了各模块的渲染
- 代理模式：打折商品信息的处理<br>
