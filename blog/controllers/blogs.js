const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const newBlog = await blog.save()

  if (newBlog){
    return response.status(201).json(newBlog)
  }
  else{
    return response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  const { body } = request

  const { id } = request.params



  const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter