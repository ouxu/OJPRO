import { modalModel } from 'utils/modelExtend'
import modelExtend from 'dva-model-extend'
import { check, login, logout } from 'services/user'
import sleep from 'utils/sleep'
import message from 'utils/message'
export default modelExtend(modalModel, {
  namespace: 'user',
  state: {
    role: '',
    token: '',
    user: {},
    lastCheck: '',
    interval: 600000
  },
  subscriptions: {
    userSubscriber ({dispatch, history}) {
      return history.listen(() => {
        dispatch({type: 'check'})
          .catch(e => dispatch({type: 'logout'}))
      })
    }
  },
  effects: {
    * check ({}, {select, call, put}) {
      const user = yield select(({user}) => user)
      const {token, lastCheck, interval} = user
      const now = (new Date()).getTime()
      if (token && (!lastCheck || (now - lastCheck) > interval)) {
        yield call(check)
        let data = {
          ...user,
          lastCheck: (new Date()).getTime()
        }
        yield put({type: 'update', payload: data})
      }
    },
    * login ({payload}, {put, call}) {
      try {
        const {values} = payload
        yield put({type: 'utils/showLoading'})
        yield call(sleep, 1500)
        let data = yield call(login, values)
        data = {
          ...data,
          lastCheck: (new Date()).getTime()
        }
        yield put({type: 'hideModal'})
        yield put({type: 'update', payload: data})
        message.success('登录成功')
      } catch (e) {
        throw e
      } finally {
        yield put({type: 'utils/hideLoading'})
      }
    },
    * logout ({}, {put}) {
      const user = {
        role: 'student',
        token: '',
        user: {},
        lastCheck: ''
      }
      yield put({
        type: 'update',
        payload: user
      })
    }
  },
  reducers: {
    update (state, {payload}) {
      const user = {
        ...state,
        ...payload
      }
      localStorage.setItem('NEUQ-OJ', JSON.stringify({user}))
      return user
    }
  }
})