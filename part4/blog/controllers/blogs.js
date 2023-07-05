const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')

  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user
  
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }
  const L = body.likes ? body.likes : 0
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: L,
    user: user.id
  })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    console.log('user',user)
    console.log('user.blogs',user.blogs);
    await user.save()
    response.status(201).json(savedBlog)
    //  errors are automatically handled by 
    //  require('express-async-errors') in app.js
    //  if an exception occurs in an async route
    //  the exception is automatically passed to the 
    //  error handling middleware
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    console.log('decodedToken.id not found')
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(request.params.id)

  const ownerId = blog.user.toString()
  if (decodedToken.id !== ownerId) {
    console.log(`Unauthorised: ${request.user.username} is not blog owner`);
    return response.status(401).json({ error: `Unauthorized: ${request.user.username} is not blog owner` });
  }
  else {
    console.log('authorised to delet!!!');
  }
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).json('deleted')
})

module.exports = blogsRouter
