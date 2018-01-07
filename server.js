var express = require('express');
var hbs = require('hbs');
var app = express();
var fs = require('fs');
const port = process.env.PORT || 3000;
app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('currentyear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.use((req,res,next)=>{
    var log = new Date().toString()+req.url+' '+req.method;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append to file server.log');
        }
    });
    console.log(log);
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainence');
// });
app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.render('home',{
        content:'welcome to my website',
        title:'home',
        currentyear: new Date().getFullYear(),
    });
});


app.get('/about',(req,res)=>{
    res.render('about',{
        content:'welcome to my website',
        title:'About',
        currentyear: new Date().getFullYear(),
    });
});


app.get('/help',(req,res)=>{
    res.render('help',{
        currentyear: new Date().getFullYear(),
        content:'welcome to my website',
        title:'Help'
    });
});

app.listen(port,'localhost',()=>{
    console.log(`server is running on ${port}`);
});