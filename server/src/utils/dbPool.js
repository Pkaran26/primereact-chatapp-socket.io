import MongoClient from 'mongodb'

const DBPool = async () => {
  const client = await MongoClient.connect("mongodb://localhost:27017", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  try {
    return client.db('blog_koa')
  } catch (error) {
    console.log(error)
    return null
  }
}

export default DBPool
