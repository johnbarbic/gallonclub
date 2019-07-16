---
date: 2018-10-06 05:35:00
title: Rendering Templates.
description: The templates for rendering pages in the application.
keywords: 
- Gatsby Page Generation
- Microformats

author: 
  name: John Barbic
  email: john@barbic.com


tags:
- Tutorial
- Component
- Microformats

published: true
---
In [Working with gatsby-node.js](/03-gatsby-node), we left off at the point where gatsby-node read our "database" nodes, but we were not yet generating pages.  Now it is time complete that process, but first we need to create four templates in order to generate four type of pages in the application.

  1. Page template for rendering pages from the /data/page directory.
  2. Member template for rendering pages from the /data/member directory.
  3. Post template for rendering pages from the /data/posts directory.
  4. Tags template for rendering a tags from the tags derived from the blog post data.

  As you will see, the templates are somewhat derivative of each other, but I've kept them separate for simplicity.  One overarching theme in the way I structure my code is to keep things as simple as possible. In this case, I don't know how each of these areas will evolve over time, so while I could have one rendering template for all pages, I've elected to create specific templates for each area.  This way it will be trivial to make enhancements in one area of the system without the baggage, or cognitive load, that comes with trying to reason side effects in the other two areas.  I'm not saying this doesn't come without its own compromise, but I am saying I'm willing to make a trade off to minimize brain damage later.

  At this point, we have most of our components developed and have a lot of the look and feel coming together.  In the application's src subdirecotry we add a new directory "templates."  This is where we will create four new files as described below:


  ### 1. The Page Template (/src/templates/page.js)

  This is the first template for rendering pages.  When I began designing the application I didn't fully understand how the home page would work so I created this template with two rendering options.  One in which the application would wrap contents in the a fully loaded layout, and another in a more minimal implementation. At the moment the application only uses the former, but I have left the code intact even though it is more complex than it needs to be. 

  In the React [documentation](https://reactjs.org/docs/state-and-lifecycle.html), it is mentioned that using ES6 classes comes with addition features that are not available when using the functional declaration.  That stuck with me and so I tend to use ES6 classes by default.  As they show in the section regarding adding lifecycle methods to a class, the functions are nicely organized in the component and I've done a similar thing in the page template.  In this way, the frontmatter in any page can controll whether the template renders one way or the other.

  Like you saw in the official tutorial the two common includes are React and Graphql since our pages wil be derived from the markdown files in the data directory.  In addition we have to make one more include for the Layout component we created in [Layout Component Part 1](/06-layout-1) and [Layout Component Part 2](07-layout-2). 

```
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

//This component can render content in two ways based on the value of the page's layout frontmatter.
//Standard Rendering
function RenderStandard({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds our page data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout background="w3-theme-l4">
      <div className="w3-row-padding w3-padding-64 w3-container">
        <div className="w3-content w3-panel w3-card-2 w3-padding-large w3-white w3-round-xxlarge">
          <h1 className="w3-text-theme">{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Layout>
  )
}
//Minimal Rendering
function RenderMinimal({ data }) {
  const { markdownRemark } = data
  const { html } = markdownRemark

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default function Template({ data }) {
  const { layout } = data.markdownRemark.frontmatter

  if (layout === 'standard') {
    return <RenderStandard data={data} />
  } else {
    return <RenderMinimal data={data} />
  }
}
export const pageQuery = graphql`
  query page($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        lastModDate(formatString: "MMMM DD, YYYY")
        layout
      }
    }
  }
`
```
### 2. The Member Template (/src/templates/member.js)

The member template is used to display the contents of any member markdown file.  Since I am the only member at launch it's pretty basic.  That said, this template works much like the post template that follows.  In other words, over time it might be necessary to add prev and next links to allow readers of the site to page through membership list as it grows.  

```
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

// ES6 Class has access to local state.
class MemberPage extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    return (
      <Layout background="w3-theme-l4">
        <div className="w3-row-padding w3-padding-64 w3-container">
          <div className="w3-content w3-panel w3-card-2 w3-padding-large w3-white w3-round-xxlarge">
            <h3 className="w3-text-theme" style={{ marginBottom: '0' }}>
              {post.frontmatter.name}
            </h3>
            <p style={{ marginTop: '-7px' }} className="w3-tiny">
              (Member Since: {post.frontmatter.joined})
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: post.html }}
              style={{ minHeight: '100px' }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default MemberPage

export const memberQuery = graphql`
  query member($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        name
        joined(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

```

### 3. The Post Template (/src/templates/post.js)

The post template is used to display the contents of any blog post markdown file in the /data/blog directory.  This is the template that application used to generate the blog posts you've been reading.  There are three additional complications for blog posts.  The first and simplest is the use of [Microformats](http://microformats.org/wiki/Main_Page).  Specifically, the template makes basic use of [h-card](http://microformats.org/wiki/h-card) and [h-entry](http://microformats.org/wiki/h-entry) standards.  This together with the enhancements to the metatags we made in [Layout Component Part 1](/06-layout-1) will give our little blog some mojo when it comes to search engines.  

The second complication is the generation and display of tags.  Remember in [Database Design](/02-database-design) when we designed our Markdown "database," we added a tags array.  In this template, we display those as links at the top of the page.  

The final complication is the Previous and Next links at the bottom of the page.  They are contained in the, wait for it, Prevnext component that we will discuss in [The Prevnext Component](12-prevnext-component). In [Generating Pages with Gatsby-node](/11-gatsby-node-part-2) we will discuss how the Prevnext component gets the data it needs in order to do its thing, which is very similar to the way in which tags are derived. 

```
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Link } from 'gatsby'

// Utilities
import kebabCase from 'lodash/kebabCase'

// ES6 Class has access to local state.
class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    //console.log(post)

    return (
      <Layout
        pagekeywords={post.frontmatter.keywords}
        pagedescription={post.frontmatter.description}
        background="w3-theme-l4"
      >
        <div className="w3-row-padding w3-padding-64 w3-container">
          <div className="w3-content w3-panel w3-card-2 w3-padding-large w3-white w3-round-xxlarge">
            <div className="w3-cell-row" style={{ padding: '0' }}>
              <div
                className="w3-cell w3-mobile w3-tiny w3-text-theme-grey h-card"
                style={{ padding: '0' }}
              >
                <div className="p-name">{post.frontmatter.author.name}</div>
                <div>
                  <a
                    class="u-email"
                    href={'mailto:' + post.frontmatter.author.email}
                  >
                    {post.frontmatter.author.email}
                  </a>
                </div>
                <div>{post.frontmatter.date}</div>
              </div>
              <div
                className="w3-cell w3-mobile w3-tiny w3-text-theme-grey"
                style={{ padding: '0' }}
              >
                Tagged in{' '}
                {post.frontmatter.tags.map(tag => (
                  <span key={tag}>
                    <Link to={`/tags/${kebabCase(tag)}/`} key={tag}>
                      {tag}
                    </Link>{' '}
                  </span>
                ))}
              </div>
            </div>
            <article className="h-entry">
              <h1 className="p-name w3-text-theme">{post.frontmatter.title}</h1>
              <time className="d-published w3-tiny w3-text-theme w3-hide">
                {post.frontmatter.date}
              </time>
              <div
                className="e-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </article>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPost

export const pageQuery = graphql`
  query post($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY hh:mm a")
        author {
          name
          email
        }
        title
        description
        keywords
        tags
      }
    }
  }
`

```

### 4. The Post Template (/src/templates/tags.js)

The fourth template almost feels like little cheat.  As I wrote earlier I don't pretend to be a great writer of tutorials, and it would be wrong not to acknowledge and poimt you to some great documentation. Gatsby's documentation has improved dramatically in the months leading up to the V2 release so it's worth perusing it for adding functionality to your application.  For the blog portion of the application you recall in [Database Design](/02-database-design) that I created a tag array in the frontmatter of the posts files.  This is because in the official documentation there is a nice artical [Creating Tags Pages for Blog Posts](https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/) on adding this functionality.  With only one modification, which is discussed in the next article, Support for tags in the Gallon Club was added by simply following the documentation.  As Colette tells Linguini in Ratatouille, "Follow the recipe..." 


```
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../components/Layout'

// Components

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged as "${tag}"`
  return (
    <Layout background="w3-theme-l4">
      <div className="w3-row-padding w3-padding-64 w3-container">
        <div className="w3-content w3-panel w3-card-2 w3-padding-large w3-white w3-round-xxlarge">
          <h3>{tagHeader}</h3>
          <div className="w3-responsive">
            <table className="w3-table-all w3-small w3-hoverable">
              <thead>
                <tr className="w3-light-grey">
                  <th>Link</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {edges.map(({ node }) => {
                  const slug = node.fields.slug
                  const { title, description, date } = node.frontmatter
                  return (
                    <tr key={title}>
                      <td>
                        <Link to={slug}>{title} </Link>
                      </td>
                      <td>{description}</td>
                      <td>{date}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="w3-padding-32">
            <Link to="/tags">All tags</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              // path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired,
      ),
    }),
  }),
}

export default Tags
//note that we do not want to include unpublished pages here
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] }, published: { ne: false } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            published
            date(formatString: "DD MMMM, YYYY hh:mm a")
          }
        }
      }
    }
  }
`

```

