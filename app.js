//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "To Compose Mail Go to /compose.";
const aboutContent = "This is a challenge done in Udemy course. Go to /compose to add a new blog. Every blog post has it's own page where you can view the complete post content other than the truncated post description on home page. You can go to the post's page by clicking on Read More.";
const contactContent = "The contact Details will go here for your blog website.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/",function(req,res){
  res.render("home",{
    startingContent:homeStartingContent,
    posts:posts
  });
});
app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:post", (req,res)=>{
  posts.forEach(post => {
    if(_.lowerCase(post.title)===_.lowerCase(req.params.post))
    {
      res.render("post",{
        title:post.title,
        content:post.content
      });
    }
  });
});

app.post("/compose",function(req,res){
  const post={
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
