import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import PrevNext from '../components/Prevnext'

// Utilities
import kebabCase from 'lodash/kebabCase'

// ES6 Class has access to local state.
class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { pageContext } = this.props

    //console.log(post)

    return (
      <Layout
        pagekeywords={post.frontmatter.keywords}
        pagedescription={post.frontmatter.description}
        background="w3-white"
      >
        <div className="w3-row-padding w3-padding-64 w3-container">
          <div className="w3-content w3-panel w3-card-2 w3-padding-large w3-white w3-round-xxlarge">
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
            <div className="w3-cell-row" style={{ padding: '0' }}>
              <div className="w3-cell w3-mobile w3-tiny w3-text-theme-grey h-card">
                <div className="p-name" style={{ display: 'none' }}>
                  {post.frontmatter.author.name}
                </div>
                <div style={{ display: 'none' }}>
                  <a
                    className="u-email"
                    href={'mailto:' + post.frontmatter.author.email}
                  >
                    {post.frontmatter.author.email}
                  </a>
                </div>
                <div>{post.frontmatter.date}</div>
              </div>
              <div className="w3-cell w3-mobile w3-tiny w3-text-theme-grey">
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

            <PrevNext pageContext={pageContext} />
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
