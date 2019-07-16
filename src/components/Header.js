import React from 'react'
import Menu from './Menu'

class Header extends React.Component {
  render() {
    return (
      <div className="w3-top">
        <Menu siteTitle={this.props.siteTitle} />
      </div>
    )
  }
}

export default Header
