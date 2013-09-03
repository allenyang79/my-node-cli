var	fs=require('fs'),
	clc = require('cli-color'),
	_=require('underscore'),
	args;

var settings,defaultSettings,options={};

var findResults=[];

//procress args
args=process.argv.slice(2);
if(args.length==0){
	//use custom options
	options.path='/Volumes/free/0_webdocument/skk';
	//options.path='/users/a2279871/Desktop/test';
	options.filePattern='.php';
	options.pathPettern='skk';
	options.contentPattern='Model'
}else{
	//now not support
	console.log(clc.red('now not support input arguments by commend line'));
	process.exit();	
}

defaultSettings={
	path:process.cwd(),
	pathPattern:'.*',
	pathPatternModifiers:'i',
	filePattern:'.*',
	filePatternModifiers:'i',
	contentPattern:null,
	contentPatternModifiers:'gm'
	
}

//綁定設定
settings=_.extend(_.clone(defaultSettings),options);

var pathReg=new RegExp(settings.pathPattern,settings.pathPatternModifiers);
var fileReg=new RegExp(settings.filePattern,settings.filePatternModifiers);
var contentReg=false;
if(settings.contentPattern){
	contentReg=new RegExp(settings.contentPattern,settings.contentPatternModifiers)
}


function findPath(path){
	//match path
	console.log(path);
	if(!pathReg.test(path)){
		return;
	}
	var files=fs.readdirSync(path);
	for(var i=0;i<files.length;i++){
		var file=files[i];
		var filepath=path+'/'+files[i];
		var stats = fs.lstatSync(filepath);
		if(stats.isFile()){
			//is file
			console.log(clc.blue('FILE>')+filepath);
			
			if(fileReg.test(file)){
				console.log(clc.yellow("FILE NAME MATCH"));
				if(contentReg){
					fileContent=fs.readFileSync(filepath);
					if(contentReg.test(fileContent)){
						console.log(clc.green("===FILE CONTENT MATCH==="));
						findResults.push(filepath);
					}
				}else{
					findResults.push(filepath);
				}
				//process.exit(0);
			}
		}else if(stats.isDirectory()){
			console.log(clc.blue(' DIR>')+filepath);
			findPath(filepath);
		}else{
			console.log(clc.red('UNKNOW>')+filepath);
			process.exit(0);
		}
	}
}

console.log(clc.green("===SETTING:==="));
console.dir(settings);
console.log(clc.green('===FIND START....==='));

findPath(settings.path);
console.log(clc.green('===FIND COMPLETE==='));
if(findResults.length>0)
	console.dir(findResults);
else{
	console.log(clc.red('===SEARCH NOTHING==='));
}
