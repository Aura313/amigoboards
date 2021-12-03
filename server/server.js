import app from  './api/app.js';

//Express APP

const port=4000;

app.get('/',(req,res)=>{
    res.send('<h1>Users!</h1>')
});

app.listen(port,()=>{
    console.log('Example app listening at http://localhost:7000')
});