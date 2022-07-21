import  express from "express";
import listEndpoints from "express-list-endpoints";
import postsRouter from "./apis/books/index.js";

const server = express()
const port = 3001
server.use(express.json())

// ********************** ENDPOINTS *****************
server.use("/blogPosts",postsRouter)

server.listen(port,()=>{
    console.table(listEndpoints(server))
    console.log("sever is running on port : ", port);
})