const express = require('express');
const mysql2 = require('mysql');
const cors = require('cors');
node = express();
node.use(cors());

const connection = mysql2.createConnection({
    host:'127.0.0.1',
    user:'root',
    database:'quranblog',
    password:'123456'
});

node.get('/',(req,res)=>res.json({success:0,message:'welcome to api'}));
node.get('/posts',(req,res)=>{
    connection.query("SELECT * FROM posts",(err,rows,fields)=>{
        if(!!err){
            console.log("err->",err);
        }else{
            res.json(rows);
        }
    })
})
node.get('/posts/title',(req,res)=>{
    connection.query("SELECT title,id,date,info FROM posts WHERE title LIKE 'أ%'",(err,rows,fields)=>{
        if(!!err){
            console.log("err->",err);
        }else{
            res.json(rows);
        }
    })
})
node.get('/posts/active',(req,res)=>{
    connection.query("SELECT posts.id,posts.title,posts.info,posts.image ,users.name ,posts.created_at FROM posts LEFT JOIN users ON posts.user_id= users.id WHERE posts.Pstatus=1",(err,rows,fields)=>{
        if(!!err){
            console.log("err->",err);
        }else{
            res.json(rows);
        }
    })
})

node.get('/post/:id',(req,res)=>{
    const su = req.params.id;
    connection.query(`SELECT * FROM posts WHERE id=${su}`,(err,rows,fields)=>{
        if(!!err){
            console.log("err->",err);
        }else{
            res.json(rows);
        }
    })
})




node.listen(4000,()=>console.log('connected on port 4000'));