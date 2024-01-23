import experss from 'express';
import bodyParser from "body-parser";

const port = 3000;
const app = experss();

var postNum = 0;
var blogText = [];
var titleText = [];

app.use(experss.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) =>{
    res.render("index.ejs",
    {blogData : blogText ,
    titleData :  titleText, 
    limit : postNum });
})

app.get("/createPost", (req,res) =>{
    res.render("createPost.ejs");
});

app.post("/", (req,res) =>{
    blogText[postNum] = req.body["blogText"];
    titleText[postNum] = req.body["titleText"];
    postNum += 1;
    res.render("index.ejs",
    {blogData : blogText ,
    titleData :  titleText, 
    limit : postNum });
});

app.get("/postPage", (req,res) =>{
    const index = req.query.variable;
    const viewPostTitle = titleText[index];
    const viewPostBlog = blogText[index];
    res.render("postPage.ejs",
    {postTitle : viewPostTitle,
    postBlog : viewPostBlog,
    index : index});
});

app.post('/editPost', (req, res) =>{
    const editPostIndex = req.body.index
    res.render("editPost.ejs",{
        titleVal : titleText[editPostIndex],
        blogVal : blogText[editPostIndex],
        index : editPostIndex
    });
});

app.post('/editPreview', (req, res) =>{
    const editPreviewIndex = req.body.index;
    titleText[editPreviewIndex] = req.body.newTitleText;
    blogText[editPreviewIndex] = req.body.newBlogText;
    res.render("editPreview.ejs",{
        postTitle : titleText[editPreviewIndex],
        postBlog : blogText[editPreviewIndex],
        index : editPreviewIndex
    });
});

app.post('/deletePost',(req, res) =>{
    const deletePostIndex = req.body.index;
    res.render("deletePost.ejs",{
        title : titleText[deletePostIndex],
        index : deletePostIndex
    });
});

app.post('/deleting',(req, res) =>{
    const deletingIndex = req.body.index;
    titleText = titleText.filter(item => item !== titleText[deletingIndex]);
    blogText = blogText.filter(item => item !== blogText[deletingIndex]);
    postNum -= 1;
    res.redirect('/');
});

app.get("/about",(req,res) =>{
    res.render("about.ejs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  