### 1.题目描述
给定一个只包括`(),{},[]`的字符串，判断字符串是否有效。<br>

有效字符串需满足：
- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。
- 注意空字符串可被认为是有效字符串。
```js
输入: "()"
输出: true

输入: "()[]{}"
输出: true

输入: "(]"
输出: false

输入: "([)]"
输出: false

输入: "{[]}"
输出: true
```
<br><br>


### 2.解题思路
- 对于没有闭合的左括号而言，越靠后的左括号，对应的右括号越靠前
- 满足后进先出，考虑用栈
```js
输入: "{[]}"
输出: true
```
<br><br>


### 3.解题步骤
- 新建一个栈
- 扫描字符串，遇左括号入栈，遇到和栈顶括号类型匹配的右括号就出栈，类型不匹配直接判定为不合法
- 最后栈空了就合法，否则不合法<br><br>


### 4.代码示例
```js
let isValid = function (s) {
  if (s.length % 2 === 1) {
    return false;
  }
  const stack = [];
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i];
    // console.log(c) // ()
    if (c === "(" || c === "{" || c === "[") {
      stack.push(c); //进栈
      // console.log(stack) // ['(']
    } else {
      const t = stack[stack.length - 1];
      // console.log(t) //(
      // console.log(c) //)
      if (
        (t === "(" && c === ")") ||
        (t === "{" && c === "}") ||
        (t === "[" && c === "]")
      ) {
        stack.pop(); //出栈
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};

console.log(isValid("()"));
```