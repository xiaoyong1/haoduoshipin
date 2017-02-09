let marked = require('marked');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));


// function getPost(post) {
//   var postPath = __dirname + `/src/posts/${post}.md`;
//   return fs.readFileAsync(postPath);
// }
// getPost(1).then(function(content) {
//   console.log(marked(content.toString()));
// })





// 现在来生成 index.html 也就是首页视频列表
function episodeCard(item) {
  return `
  <a class="item" href="/v/${item.id}.html">
    <span class="left">${item.id}</span>
    <span class="right">
      <span class="title">${item.title}</span>
      <span class="date">${item.created_at}</span>
    </span>
  </a>`
}

function newPostList(content) {
  var dir = __dirname + '/tmp';
  if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  var path = __dirname + "/tmp/index.html";
  return fs.writeFileAsync(path, content);
}



function genHomePage(list) {
  var arr = JSON.parse(list);
  var cards = arr.map(function(item, i) {
    return episodeCard(item);
  });
  newPostList(cards.reverse().join('\n'));
}


function getPostList() {
  var path = __dirname + "/src/posts.json";
  return fs.readFileAsync(path);
}

getPostList().then(function(list) {
  genHomePage(list)
})