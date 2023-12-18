const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, val) => acc + val.likes, 0)

const mostLiked = (blogs) => {
  let mostLikedBlog = blogs[0]
  blogs.forEach(element => {
    if (element.likes > mostLikedBlog.likes) {
      mostLikedBlog = element
    }
  })
  return {
    title : mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}

const mostBlogs = (blogs) => {
  const authors = []

  blogs.forEach(blog => {
    const index = authors.findIndex(item => item.author === blog.author)
    if (index !== -1){
      authors[index].blogs +=1
    }
    else{
      authors.push({
        author: blog.author,
        blogs: 1
      })
    }
  })

  return authors.sort((a, b) => b.blogs - a.blogs)[0]
}

const authorWithMoreLikes = (blogs) => {
  const likes = []
  blogs.forEach(blog => {
    const index = likes.findIndex(item => item.author === blog.author)
    if (index !== -1){
      likes[index].likes += blog.likes
    }
    else{
      likes.push({
        author: blog.author,
        likes: blog.likes
      })
    }
  })

  return likes.sort((a, b) => b.likes - a.likes)[0]
}


module.exports = {
  dummy,
  totalLikes,
  mostLiked,
  mostBlogs,
  authorWithMoreLikes
}

