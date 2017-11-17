const config = require('./util/config.json')

const Client = require('./Client')
const client = new Client()

client.getPlaylistItems(config.ggUploadPlaylistId, 5).then(items => {
  console.log(items)
})

/* getPlaylistItems(config.ggUploadPlaylistId, 50).then(items => {

})
getVideoInfo('8RC_H3D8k08').then(video => {
  console.log(video)
}) */
