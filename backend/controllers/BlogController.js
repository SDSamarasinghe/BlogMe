const Blog = require("../models/BlogModel");


//Add new Blog
const addBlog = (req, res) => {
    const {
      topic,
      description,
      img,
      
    } = req.body;
  
    const newBlog = new Blog({
      topic,
      description,
      img,
    });
  
    newBlog
      .save()
      .then((createdBlogs) => {
        res.json(createdBlogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Get All Blogs

  const getBlog = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  //Get Single Blog
  const getsingleBlog = async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findById(id);
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json(error);
    }
  };
  
//Update Blog

const updateBlog = async (req, res) => {
    const blogId = req.params.id;
    try {
      const id = await Blog.findById(blogId);
  
      if (!id) {
        return res.status(404).json("There is no Blog");
      }
  
      const {
          topic,
          description,
          img,
        
      } = req.body;
      const adsr = await Blog.findByIdAndUpdate(blogId, {
          topic,
          description,
          img,
      });
  
      res.status(201).json({
        updated: true,
      });
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

//Remove Blog
  const removeBlog = async (req, res) => {
    const blogId = req.params.id;
  
    try {
      const ad = await Blog.findById(blogId);
      if (!ad) {
        return res.status(404).json("There is no Blog to remove");
      }
  
      const removedBlog = await Blog.findByIdAndDelete(blogId);
      res.status(200).json(removedBlog);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };