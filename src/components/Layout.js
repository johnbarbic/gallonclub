import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Head from './Head'
import Header from './Header'
import Footer from './Footer'

import css from 'w3-css/w3.css'
import style from './style.css'

const Layout = ({
  children,
  pagekeywords = '',
  pagedescription = '',
  background = 'w3-white',
}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            intro
            description
            keywords
          }
        }
      }
    `}
    render={data => (
      <>
        <Head
          data={data}
          pagedescription={pagedescription}
          pagekeywords={pagekeywords}
        />
        <div>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div className={background}>
            <div>{children}</div>
          </div>
          <Footer siteTitle={data.site.siteMetadata.title} />
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
