const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')

const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user

  if (!user){
    return response.status(404).json({ error: 'user not found' })
  }

  const blog = new Blog({
    ...request.body,
    user: user.id
  })

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog.id)
  await user.save()

  return response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id

  const user = request.user

  if (!user){
    return response.status(404).json({
      error: 'user not found'
    })
  }

  const blog = await Blog.findById(id)

  if (!blog){
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() === user.id ){
    console.log('delete here')
    await Blog.findByIdAndDelete(blog.id)
  }

  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {

  const { body } = request

  const { id } = request.params



  const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter