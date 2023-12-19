const Blog = require('../models/blog')
const User = require('../models/user')

const helperBlogs = [
  {
    'title': 'Blog that will be deleted',
    'author': 'root',
    'url': 'www',
    'likes': 100,
    'user':'65820c0e07d0bae387af204f',
    'id': '65820ade71b100d602336707'
  },
  {
    'title': 'Go To Statement Considered Harmful',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    'likes': 5,
    'id': '5a422aa71b54a676234d17f8'
  },
  {
    'title': 'TDD harms architecture',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    'likes': 0,
    'id': '5a422ba71b54a676234d17fb'
  },
  {
    'title': 'Type wars',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    'likes': 2,
    'id': '5a422bc61b54a676234d17fc'
  },
  {
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    'likes': 12,
    'id': '5a422b3a1b54a676234d17f9'
  },
  {
    'title': 'First class tests',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    'likes': 10,
    'id': '5a422b891b54a676234d17fa'
  },
  {
    'title': 'New note 3',
    'author': 'BS',
    'url': 'www',
    'likes': 100,
    'user':'6580f1ad2f580f543f52d232',
    'id': '6580f800c47b3644c82f3aac'
  },
  {
    'title': 'Authenticated blog',
    'author': 'BS',
    'url': 'www',
    'likes': 100,
    'user':'6580f7e1c47b3644c82f3aa1',
    'id': '65810449e9cf4d67ec4e42c9'
  }
]

const blogsInDb = async () => {
  const notes =  await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  helperBlogs,
  blogsInDb,
  usersInDb
}