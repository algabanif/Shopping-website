var http = require("http");
var fs = require("fs");
var path = require("path");
var printFun = function(req,res){

    var filepath = "./CS346-PROJECT"+req.url;// if no any page return it will be '/'
    
    if (filepath == "./CS346-PROJECT/")

        filepath = "./CS346-PROJECT/Home/index.html";

    var extname = path.extname(filepath);// should give filepath or it will not read css files
    
    var contentType = 'text/html'; 

    switch(extname){

        case '.js':

            contentType = 'text/javascript';

        case '.css':

            contentType = 'text/css';

            break;

        case '.json':

            contentType = 'text/json';

            

    }  

        fs.readFile(filepath,function(err,pgRes){

            if(err){

                res.writeHead(500);

                res.write("Content not found");

            }

            else{

                res.writeHead(200,{'Content-Type':contentType});

                res.write(pgRes,'utf-8');



            }



            res.end();

        });

    }

http.createServer(printFun).listen(3001,"127.0.0.1");