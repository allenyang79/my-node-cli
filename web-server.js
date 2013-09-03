var express = require('express'),
	app = express(),
	port = parseInt(process.env.PORT, 10) || 8080,
	fs=require('fs'),
	args,
	webDir;


	/**simple web server start **/
	args=process.argv.slice(2);
	if(args.length>0){
		stats = fs.lstatSync('/the/path');
		if(stats.isDirectory()){
			webDir=args[0];
		}else{
			throw(new Error('the assign path is not directiory'));	
			process.exit(0);
		}
	}else{
		webDir=process.cwd();
	}

	app.configure(function(){
			app.use(express.methodOverride());
			app.use(express.bodyParser());
			//app.use(express.static(__dirname + '/'));
			app.use(express.static(webDir));
			app.use(app.router);
	});


console.log('start express web-server');
//console.dir(arguments);
//console.dir(process.argv);
//console.dir(process.execArgv);
//console.log(process.execPath);
//console.log(process.cwd());


app.listen(port);
console.log("Now serving the app at http://localhost:" + port + " :: " + webDir);
