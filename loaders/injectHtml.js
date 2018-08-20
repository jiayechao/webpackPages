const path = require("path");
const glob = require('glob');
const srcDir = path.resolve(process.cwd(), "src");
const pageDir = path.resolve(srcDir, 'pages');
const pageFiles = glob.sync(pageDir + '/*.{html,art}')
var fileTag = function(name){
  for(let i = 0; i<pageFiles.length; i++){
      let filepath = pageFiles[i];
      let filename = filepath.substring(filepath.lastIndexOf('\/') + 1,filepath.lastIndexOf('.'));
      let fullname = filepath.substring(filepath.lastIndexOf('\/') + 1);
      if(filename === name){
          return {tag:true, name: fullname}
      }
  }
  return {tag: false}
}

module.exports = function(source) {
    //去pages文件夹找对应的html
    let path = this.resourcePath
    let name = path.substring(path.lastIndexOf('\\') + 1,path.lastIndexOf('.'));
    let result = fileTag(name);
    if(result.tag){
      return 'import("../pages/'+result.name+'");' + source;
    }else {
      return source
    }
}