import React from 'react'
import { Link } from 'gatsby'
import { FaHome } from 'react-icons/fa'
import { FaQuestion } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'
import { FaBroadcastTower } from 'react-icons/fa'
// ES6 Class has access to local state.
class Menu extends React.Component {
  render() {
    const { siteTitle } = this.props
    return (
      <>
        <div
          id="largeScreens"
          className="w3-bar w3-blue w3-card w3-left-align w3-large"
        >
          <Link
            to="/"
            className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
          >
            {siteTitle} <FaHome style={{ paddingTop: '3px' }} />
          </Link>
          <Link
            to="/blog/"
            className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white w3-right"
          >
            Blog <FaBroadcastTower style={{ paddingTop: '3px' }} />
          </Link>
          <Link
            to="/members/"
            className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white w3-right"
          >
            Members <FaUsers style={{ paddingTop: '3px' }} />
          </Link>
          <Link
            to="/about/"
            className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white w3-right"
          >
            About <FaQuestion style={{ paddingTop: '3px' }} />
          </Link>
        </div>
        <div
          id="smallScreens"
          className="w3-bar w3-blue w3-card w3-left-align w3-hide-large w3-hide-medium w3-medium"
        >
          <Link
            to="/"
            className="w3-bar-item w3-button w3-padding-large w3-hover-white"
          >
            Gallon Club
          </Link>
          <Link
            to="/blog/"
            className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-right"
          >
            <FaBroadcastTower style={{ paddingTop: '3px' }} />
          </Link>
          <Link
            to="/members/"
            className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-right"
          >
            <FaUsers style={{ paddingTop: '3px' }} />
          </Link>
          <Link
            to="/about/"
            className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-right"
          >
            <FaQuestion style={{ paddingTop: '3px' }} />
          </Link>
        </div>
      </>
    )
  }
}

export default Menu
