/**
 * Created by out_xu on 17/8/20.
 */
import request from 'utils/request'
import API from 'config/api'

const getContest = (id) => request({
  url: API.contest.replace(':id', id),
  method: 'get',
  token: true
})

const joinContest = (id, data) => request({
  url: API.joinContest.replace(':id', id),
  method: 'post',
  token: true,
  data
})

export { getContest, joinContest }