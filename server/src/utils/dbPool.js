import MongoClient from 'mongodb'
// sudo mongod --fork --config /etc/mongod.conf
const DBPool = async () => {
  const client = await MongoClient.connect("mongodb://localhost:27017", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  try {
    return client.db('chatapp')
  } catch (error) {
    console.log(error)
    return null
  }
}

export default DBPool
