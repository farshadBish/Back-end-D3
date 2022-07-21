
import  express  from "express";
import {fileURLToPath} from 'url'
import { dirname, join} from "path";
import fs from 'fs'
import uniqid from 'uniqid';


const postsRouter = express.Router()

const postsJsonPath = join(dirname(fileURLToPath(import.meta.url)) , "posts.json")
console.log(postsJsonPath);
const getPosts = () => JSON.parse(fs.readFileSync(postsJsonPath)) 
const writePosts = (postsArray) => fs.writeFileSync(postsJsonPath , JSON.stringify(postsArray))

postsRouter.post("/" , (req,res,next) => {
    const newPost = {...req.body , createdAt : new Date(), _id: uniqid() }
    const posts = getPosts();
    posts.push(newPost)
    writePosts(posts)
    res.status(201).send({_id: newPost._id})
})
postsRouter.get("/" , (req,res,next) => {
    const posts = getPosts()
    res.send(posts);
    if(req.query && req.query.name){
        const filteredPosts = posts.filter(post => post.name === req.query.name)
        res.send(filteredPosts)
    }else{
        res.send(posts)
    }
    }
)
postsRouter.get("/:postId" , (req,res,next) => {
    const posts = getPosts()
    const foundPost = posts.find(post => post._id === req.params.postId)
    res.send(foundPost)
})
postsRouter.put("/:postId" , (req,res,next) => {
    const posts = getPosts()
    const index = posts.findIndex(post => post._id === req.params.postId)
    const oldPost = posts[index]
    const updatedPost = {...oldPost , ...req.body , updatedAt : new  Date()}
    posts[index] = updatedPost
    writePosts(posts);
    res.send(updatedPost);
})
postsRouter.delete("/:postId" , (req,res,next) => {
    const posts = getPosts();
    const remainingPosts = posts.filter(post => post._id !== req.params.postId);
    writePosts(remainingPosts);
    res.status(204).send()
})


export default postsRouter