---
date: 2018-10-06 02:50:00
title: Layout Component Part 1.
description: One component to rule them all.
keywords: 
- Components
- Layout
- Meta Tags

author: 
  name: John Barbic
  email: john@barbic.com


tags:
- Tutorial
- Component
- Layout
- Refactor

published: true
---

The layout is the beating heart of the application. It takes node data and generates all the UI for each page in the application.  At the time of this writing the default starter uses Static Query, and I want to leverage that. But for any page in the site, if the Markdown file has tags or a description in its front matter, then I want to add them to the site's description and keyword meta tags in the document head.  

There are a number of changes to be made to the default starter in order to pull that off.

#### 1. Update the site's metadata in gatsby-config.js to be more reflective of the Gallon Club.

```javascript{2-8}
module.exports = {
  siteMetadata: {
    title: 'The Gallon Club',
    intro: 'The Gallon Club',
    description: 'Site Description',
    keywords: 'Gatsby,Blood Donation,Phlebotomy,Be a Blood Donor',
    siteURL: 'gallonclub.com',
  },
```

####2. Let's abstract the Helmet Tag into a new component.
Create components/Head.js with the following code:

```
import React from 'react'
import Helmet from 'react-helmet'

class Head extends React.Component {
  render() {
    const data = this.props.data
    const pagedescription = this.props.pagedescription
    const pagekeywords = this.props.pagekeywords
    const metadescription = data.site.siteMetadata.description
    const metakeywords = data.site.siteMetadata.keywords

    const description =
      pagedescription == ''
        ? metadescription
        : pagedescription + ', ' + metadescription

    const keywords =
      pagekeywords == '' ? metakeywords : pagekeywords + ', ' + metakeywords


    return (
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    )
  }
}

export default Head

```

The component will receive data and props from the Layout component.  This component is responsible for determining if the node has page specific keywords and description.  Using a ternary operator for each variable, it dynamically prepends them to the site's keyword and description variables, respectively, which are then used within the Helmet tag.  

####3. Modify the Layout.js file

1. Remove "import Helmet from 'react-helmet'."
2. Add "import Head from './Head'" to import our new Head component.
3. Add default pagekeywords and pagedescription as props in addition to children.  
4. Modify the setTitleQuery to include the new elements from the changes we made to gatsby-config.js
5. Add the new Head tag.

The file should look like the following with the highlighted changes. 

```javascript{4,9,16-18,25-29}
import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Head from './Head'

import Header from './header'
import './layout.css'

const Layout = ({ children, pagekeywords = '', pagedescription = '' }) => (
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
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
```

Note that Layout.js still contains the StaticQuery since title is passed to the header.   

At this point, if you restart the application using "gatsby develop" it wont look any different, but if you inspect the page and examine the <head> element, you will see new values for the description and keyword meta elements.

```
<meta name="description" content="Site Description" data-react-helmet="true">
<meta name="keywords" content="Gatsby,Blood Donation,Phlebotomy,Be a Blood Donor" data-react-helmet="true">
```
That gives the site some basic Search Engine Optimization (SEO) and that a good place to end this installment.
