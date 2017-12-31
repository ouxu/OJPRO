import React, { Component } from 'react'
import Result from 'components/Result'
import { Button, Icon, Input, Modal } from 'antd'
import { Link } from 'dva/router'

const extraHelper = ({description, actionText, action}, i) => (
  <div style={{marginBottom: 16}} key={i}>
    <Icon style={{color: '#f5222d', marginRight: 8}} type='close-circle-o' />
    {description}
    {
      actionText && (
        <a style={{marginLeft: 16}} onClick={action}>{actionText} <Icon type='right' /></a>
      )
    }
  </div>
)

class ErrorResult extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: ''
    }
  }

  showModal = () => {
    Modal.confirm({
      title: '此竞赛私有，需要校验密码进入',
      content: (
        <Input size='small' type='password' style={{width: 150}} onBlur={(e) => {
          this.setState({password: e.target.value})
        }} />
      ),
      onOk: () => this.props.dispatch({
        type: 'contest/joinContest',
        payload: {
          id: this.props.id,
          data: this.state
        }
      }).then(() => {
        this.props.dispatch({type: 'contest/init', payload: this.props.id})
      })
    })
  }

  render () {
    const {dispatch, err, errCode} = this.props
    const extraArr = [
      {
        description: '竞赛不存在'
      }, {
        description: '竞赛未开始'
      }, {
        description: '您未登录或登录过期',
        actionText: '立即登录',
        action: () => dispatch({type: 'utils/showModal'})
      }, {
        description: '如果决赛为加密竞赛，请尝试输入密码',
        actionText: '加密竞赛加入',
        action: this.showModal
      }, {
        description: '若该竞赛为私有竞赛，请联系管理员或者竞赛创建者'
      }
    ]
    const extra = (
      <div>
        <div style={{fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', fontWeight: 500, marginBottom: 16}}>
          请根据提示重新操作，常见错误原因如下：
        </div>
        {extraArr.map(extraHelper)}
      </div>
    )
    const actions = (
      <div>
        {+errCode === 1007 && (
          <Button type='primary' onClick={this.showModal}>加密竞赛进入</Button>
        )}
        <Button type={+errCode === 1007 ? 'default' : 'primary'}>
          <Link to='/contests'>返回竞赛列表</Link>
        </Button>
      </div>
    )
    return (
      <div className='mt-20 pt-20'>
        <Result
          type='error'
          title='竞赛获取失败'
          extra={extra}
          description={err}
          actions={actions}
        />
      </div>
    )
  }
}

export default ErrorResult
