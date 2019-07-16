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
    <Layout background="w3-white">
      <div className="w3-row-padding w3-padding-64 w3-container">
        <div className="w3-content w3-panel w3-card-2 w3-padding-large w3-white w3-round-xxlarge">
          <h3>{tagHeader}</h3>
          <div className="w3-responsive">
            <table className="w3-table w3-bordered w3-small w3-hoverable">
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
