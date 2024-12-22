import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extenden: true}));
app.use(methodOverride("_method"))

let posts = [];

app.get("/", (req,res) => {
    res.render("index.ejs", { posts });
});

app.get("/add", (req,res) => {
    res.render("form.ejs", {post: null})
});

app.post("/add", (req,res) => {
    const newPost = {id: Date.now(), title: req.body.title, content: req.body.content};
    posts.push(newPost);
    res.redirect("/");
});

app.get("/edit/:id", (req,res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render("form.ejs", { post });
});

app.delete("/delete/:id", (req,res) => {
    posts = posts.filter(post => post.id != req.params.id);
    res.redirect("/");
});

app.put("/edit/:id", (req,res) => {
    const post = posts.find(p => p.id == req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

