import React from 'react'
import { MdCopyright } from 'react-icons/md'

class Footer extends React.Component {
  render() {
    const tempDate = new Date()
    const year = tempDate.getFullYear()
    const { siteTitle } = this.props
    //Small text for the footer.  Light grey so it is distinguished on the home page but blends in everywhere else.
    return (
      <div className="w3-white w3-container w3-padding-16 w3-text-theme w3-small">
        <MdCopyright style={{ paddingTop: '5px' }} /> {year} {siteTitle}
      </div>
    )
  }
}

export default Footer
