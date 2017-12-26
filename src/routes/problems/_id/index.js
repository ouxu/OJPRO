/**
 * Created by out_xu on 17/8/25.
 */
import React, { Component } from 'react'
import { Col, Icon, Row } from 'antd'
import { connect } from 'dva'
import ProblemEditor from './ProblemEditor'
import './index.less'
import ProblemDetail from './ProblemDetail'

class ProblemPage extends Component {
  componentDidMount () {
    const {dispatch, match} = this.props
    dispatch({
      type: 'problem/init',
      payload: {
        id: match.params.id
      }
    })
  }

  render () {
    const {problems, problem, match, dispatch, user} = this.props
    const {detail, layout, editor, result, activeKey} = problem
    const {problemsList} = problems
    const {params} = match
    const editorProps = {dispatch, params, user, ...editor}
    const detailProps = {activeKey, dispatch, detail, result, problemsList}
    return (
      <Row type='flex' className='problem-page'>
        <Col xs={24} sm={layout.left} className='left pl-10'>
          <ProblemDetail {...detailProps} key={layout.left} />
        </Col>
        <Col xs={24} sm={layout.right} className='right'>
          <div className='action hand' onClick={() => dispatch({type: 'problem/changeLayout'})}>
            <Icon type={layout.left === 10 ? 'right' : 'left'} />
          </div>
          <ProblemEditor {...editorProps} />
        </Col>
      </Row>
    )
  }
}

export default connect(({user, problems, problem}) => ({user, problems, problem}))(ProblemPage)