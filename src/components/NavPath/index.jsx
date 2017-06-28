import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Breadcrumb } from 'antd'
import { connect } from 'react-redux'

import './index.less'

const defaultProps = {
  navpath: []
}

const propTypes = {
  navpath: PropTypes.array
}

class NavPath extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { navpath } = this.props
    const bread = navpath.map((item)=>{
      return (
        <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>
      )
    })
    return (
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item key='bc-0'>首页</Breadcrumb.Item>
        {bread}
      </Breadcrumb>
    )
  }
}

NavPath.propTypes = propTypes;
NavPath.defaultProps = defaultProps;

function mapStateToProps(state) {

  return {
    navpath: state.menu.navpath
  }
}

export default connect(mapStateToProps)(NavPath)
