import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Link } from 'gatsby'

// ES6 Class has access to local state.
class MemberPage extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    return (
      <Layout background="w3-white">
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
