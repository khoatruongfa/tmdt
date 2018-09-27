var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.listen(3000, function(){
	console.log('connect successfully');
});

// config ejs
app.set('view engine','ejs');
app.set('views','./views');

app.get('/welcome',function(req, res){
	res.render('welcome');
});

// transmission params
app.get('/detail',function(req, res){
	res.render('detail',{name: "Khoa", age: 21});
});
app.get('/year',function(req, res){
	res.render('year',{year: [2010,2015,2018,2019]});
});

// handle post method
app.post('/hello',urlencodedParser,function(req, res){
	var u = req.body.username;
	var p = req.body.password;
	res.send('Xin chao: '+ u + ' mat khau: ' + p);
});

app.get('/',function(req,res){
 res.send('<div><h1>Welcome!!!</h1></div>');
});

app.get('/hello',function(req, res){
	res.send('<div><h2>Hello nodejs</2></div>');
});

app.get('/hello/:id',function(req, res){
	var id = req.params.id;
	res.send('<div>id: </div>' + id);
});

// upload file
var multer = require('multer');

app.get('/form',function(req, res){
	res.render('form');
});

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null,'./uploads');				// files are stored in ./uploads
	},
	filename: function(req, file, cb){
		cb(null,file.originalname);
	}
})

var upload = multer({storage: storage})
app.post('/upload',upload.single('upload-file'), function(req, res){
	console.log (req.file);
	res.send('upload successfully');
});

