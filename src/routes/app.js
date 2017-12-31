import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'dva/router'
import registerModel from 'utils/registerModel'
import dynamicWrapper from 'utils/dynamicWrapper'
import Homepage from './home'
import Problems from './problems'
import Contests from './contests'
import NotFound from './404'

import homeModel from './home/model'
import ProblemsModel from './problems/model'
import ProblemsDetailModel from './problems/_id/model'
import ContestsModel from './contests/model'
import ContestsDetailModel from './contests/_id/model'

const ProblemDetail = () => import('./problems/_id')
const ContestsDetail = () => import('./contests/_id')
const App = ({app}) => {
  const routes = [
    {
      path: '/home',
      exact: true,
      models: [homeModel],
      component: Homepage
    }, {
      path: '/problems/:id',
      exact: true,
      component: dynamicWrapper(ProblemDetail, app, () => [ProblemsDetailModel])
    }, {
      path: '/problems',
      exact: false,
      models: [ProblemsModel],
      component: Problems
    }, {
      path: '/contests/:id',
      exact: true,
      models: [ContestsModel],
      component: dynamicWrapper(ContestsDetail, app, () => [ContestsDetailModel])
    }, {
      path: '/contests',
      exact: false,
      models: [ContestsModel],
      component: Contests
    }, {
      path: '/admin',
      component: dynamicWrapper(() => import('routes/admin'))
    }, {
      path: '/404',
      exact: true,
      component: NotFound
    }
  ]
  return (
    <Switch>
      {routes.map(item => {
        if (item.models) {
          item.models.forEach(e => registerModel(app, e))
        }
        return (
          <Route
            exact={item.exact}
            key={item.path}
            path={item.path}
            component={item.component}
          />
        )
      })}
      <Redirect exact from='/' to='/home' />
     <Redirect from='*' to='/404' />
   </Switch>
  )
}

export default App
