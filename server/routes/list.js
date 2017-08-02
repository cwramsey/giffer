
const S3 = require('aws-sdk/clients/s3')

function listSingleGif ({ AWS_ID, AWS_SECRET, AWS_S3_BUCKET }) {
  const client = new S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET
  })

  return async function handler (req, res, marker, objs = []) {
    let listResponse
    try {
      listResponse = await client.listObjects({ Bucket: AWS_S3_BUCKET, Marker: marker }).promise()
    } catch (err) {
      console.warn('Error retrieving listObjects from s3.', err)
      res.send({ error: 'Error retrieving gif from service.', code: 500 })
    }

    const onlyGifs = listResponse.Contents.filter(x => x.Key.includes(req.params.key) && x.Key.endsWith('.gif'))
      .concat(objs)

    if (listResponse.IsTruncated) {
      return handler(req, res, listResponse.Marker, onlyGifs)
    }

    const gifUrls = onlyGifs.map(x => `https://s3.amazonaws.com/${AWS_S3_BUCKET}/${x.Key}`)

    res.send(gifUrls)
  }
}

function listAllGifs ({ AWS_ID, AWS_SECRET }) {
  return (req, res) => {}
}

module.exports = { listAllGifs, listSingleGif }
