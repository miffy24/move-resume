/*把code写到#code和style标签里*/
function writeCode(prefix,code,fn){
  let domCode = document.querySelector('#code')
  var n = 0
  var id = setInterval(()=>{ 
    n += 1
    domCode.innerHTML = prefix + Prism.highlight(prefix + code.substring(0,n), Prism.languages.css);
    styleTag.innerHTML = prefix + code.substring(0,n)
    domCode.scrollTop = domCode.scrollHeight
    if(n >= code.length){
      window.clearInterval(id)
       fn.call()
    }
  },10)
}

function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paperWrapper>.paper')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 35)
}

var content = `/* 
 * 面试官你好，我是陈朱陶
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
  transition: all 1s;
}
html{
  background:#eee;
  perspective: 100vh;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/*我需要一点代码高亮*/
.token.selector{
  color:#690;
}
.token.property{
  color:#905;
}
.token.function{
  color:#DD4AGB;
}
/*加点3D效果*/
#code-wrapper{
  transform: rotateY(10deg) translateZ(-100px) ;
}

/*不玩了，我来介绍一下自己吧*/
/*我需要一张白纸*/
#code-wrapper{
  left:0;
  top:0;
  height:90vh;
  width:50vw;
}
#paperWrapper{
  transform: rotateY(-10deg) translateZ(-100px);
}
#paperWrapper > .paper{
  display:block;
}
`
var content1 = `
/*接下来用一个优秀的库marked.js
 *把Markdown变成HTML
 */


`
var md = `
# 自我介绍

我叫陈朱陶
2018届应届生，就读于长春科技学院
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉HTML，JavaScript，CSS,数据库

# 项目介绍

  * 简历
  * 轮播
  * 画板

# 联系方式

  - QQ: 1248378683
  - Email: chenzhutao@163.com
  - 手机: 18556785683

# 博客和github

  - 博客地址：https://miffy24.github.io
  - github地址： https://github.com/miffy24

`

let content2 = `
/*
 *这就是我的简历，谢谢观看
 */
`
writeCode('',content,()=>{
  createPaper(()=>{
    writeMarkdown(md,()=>{
      writeCode(content,content1,()=>{
        convertMarkdownToHtml(()=>{
          writeCode(content+content1,content2,()=>{
            console.log('完成')
          })
        })
      })
    })
  })
})
function createPaper(fn){
  var paperWrapper = document.createElement('div')
  paperWrapper.id = 'paperWrapper'
  var paper = document.createElement('pre')
  paper.className = 'paper'
  paperWrapper.appendChild(paper)
  document.body.appendChild(paperWrapper)
  fn.call()
}

function convertMarkdownToHtml(fn){
  var div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paperWrapper>.paper')
  markdownContainer.replaceWith(div)
  fn.call()
}







