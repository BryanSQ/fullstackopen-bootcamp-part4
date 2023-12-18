const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./blog_helper')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.helperBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('blogs are returned as JSON', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.helperBlogs.length)
})

test('the property id is defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a new blog entry can be added', async () => {
  const newBlog = {
    author: 'Bryan Sandi',
    title: 'Testing environments',
    likes: 10,
    url: 'www.somefakesite.com'
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd =  await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.helperBlogs.length + 1)
})

test('blogs with a missing likes attribute will default to zero likes', async () => {
  const newBlog = {
    author: 'Bryan Sandi',
    title: 'Testing environments',
    url: 'www.somefakesite.com'
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)

  expect(response.body.likes).toBe(0)
})


test('delete a blog', async () => {
  const blogToDelete = helper.helperBlogs[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.helperBlogs.length - 1)

  const contents = blogsAtEnd.map(blog => blog.title)

  expect(contents).not.toContain(blogToDelete.title)
})

test('update a blog', async () => {
  const blogToUpdate = helper.helperBlogs[0]

  const update = {
    likes: 111
  }

  const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(update)
    .expect(200)

  expect(response.body.likes).toBe(111)
})


afterAll(async () => {
  await mongoose.connection.close()
})