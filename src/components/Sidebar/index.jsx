import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router'
import { getAllMenu, updateNavPath } from '../../actions/menu'

const SubMenu = Menu.SubMenu

import './index.less'

const defaultProps = {
  items: []
}

const propTypes = {
  items: PropTypes.array
}

const { Sider } = Layout;

class Sidebar extends React.Component {

  state = {
    openKey: "sub1",
    activeKey: "menu101",
    collapsed: false,
    mode: 'inline',
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      mode: !this.state.collapsed ? 'vertical' : 'inline',
    });
  }

  componentDidMount () {
    this.props.getAllMenu()
  }

  componentWillReceiveProps(nextProps) {
    Array.isArray(nextProps.items) && nextProps.items.map((item, i) => {
      Array.isArray(item.child) && item.child.map((node) => {
        if(node.url && this.context.router.isActive(node.url, true)){
          this.menuClickHandle({
            key: 'menu'+node.key,
            keyPath: ['menu'+node.key, 'sub'+item.key]
          })
        }
      })
    });
  }

  menuClickHandle = (item) => {
    this.setState({
      activeKey: item.key
    })
    this.props.updateNavPath(item.keyPath, item.key)
  }

  render () {
    const { items, updateNavPath } = this.props
    const { router } = this.context
    let { activeKey, openKey } = this.state

    const _menuProcess = (nodes, pkey) => {
      console.log(nodes)
      return Array.isArray(nodes) && nodes.map((item, i) => {
        const menu = _menuProcess(item.child, item.key);
        if(item.url && router.isActive(item.url, true)){
          activeKey = 'menu'+item.key
          openKey = 'sub'+pkey
        }
        if (menu.length > 0) {
          return (
            <SubMenu
              key={'sub'+item.key}
              title={<span><Icon type={item.icon} /><span className="nav-text">{item.name}</span></span>}
            >
              {menu}
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item key={'menu'+item.key}>
              <Link to={item.url}>{item.icon && <Icon type={item.icon} />}{item.name}</Link>
            </Menu.Item>
          )
        }
      });
    }

    const menu = _menuProcess(items);

    return (
      <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
        <div className="ant-layout-logo"></div>
        <Menu
          mode={this.state.mode} theme="dark"
          selectedKeys={[activeKey]}
          defaultOpenKeys={[openKey]}
          onClick={this.menuClickHandle}
        >
          {menu}
        </Menu>
        <div className="sider-trigger">
          <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
        </div>
      </Sider>
    )
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
Sidebar.contextTypes = {
  router: React.PropTypes.object
}

function mapStateToProps(state) {

  return {
    items: state.menu.items
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMenu: bindActionCreators(getAllMenu, dispatch),
    updateNavPath: bindActionCreators(updateNavPath, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
