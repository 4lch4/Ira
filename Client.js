const config = require('./util/config')
const baseUrl = 'https://www.googleapis.com/youtube/v3'

const RestClient = require('node-rest-client-promise').Client
const restClient = new RestClient()

class Client {
  constructor (options) {
    this.options = options || {}
    this.apiKey = config.apiKey
    this.part = 'snippet%2CcontentDetails'
  }

  async getPlaylistItems (playlistId, maxResults, data) {
    return new Promise((resolve, reject) => {
      if (maxResults === undefined) maxResults = 10
      else if (maxResults > 50) maxResults = 50

      const urlOpts = `maxResults=${maxResults}&part=snippet%2CcontentDetails&key=${this.apiKey}`
      const playlistUrl = `${baseUrl}/playlistItems?playlistId=${playlistId}&${urlOpts}`

      restClient.getPromise(playlistUrl).then(data => {
        if (data === true) resolve(data.data)
        else resolve(data.data.items)
      })
    })
  }

  async getPlaylistPageItems (playlistId, pageToken, maxResults, data) {
    return new Promise((resolve, reject) => {
      if (maxResults === undefined) maxResults = 10
      else if (maxResults > 50) maxResults = 50
      const urlOpts = `maxResults=${maxResults}&part=snippet%2CcontentDetails&pageToken=${pageToken}&key=${this.apiKey}`
      const playlistUrl = `${baseUrl}/playlistItems?playlistId=${playlistId}&${urlOpts}`

      restClient.getPromise(playlistUrl).then((data, response) => {
        if (data === true) resolve(data)
        else resolve(data.items)
      })
    })
  }

  async getVideoInfo (videoId) {
    return new Promise((resolve, reject) => {
      const videoUrl = `${baseUrl}/videos?id=${videoId}&part=snippet%2CcontentDetails&key=${this.apiKey}`

      restClient.getPromise(videoUrl).then((data, response) => {
        resolve(data.items[0])
      })
    })
  }
}

module.exports = Client
