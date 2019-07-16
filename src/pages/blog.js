import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

export default ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  //console.log(data)
  return (
    <Layout background="w3-white">
      <div className="w3-content w3-padding w3-padding-64">
        <div className="w3-content">
          <h2>The Gallon Club Blog</h2>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Link
              to={node.fields.slug}
              key={node.id}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w3-card w3-margin-bottom w3-padding-large w3-round-xlarge w3-white w3-hover-light-grey"
                key={node.id}
              >
                <h3 className="w3-text-theme">{node.frontmatter.title}</h3>
                <p>{node.frontmatter.description}</p>
                <p className="w3-opacity w3-tiny">
                  John Barbic on {node.frontmatter.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query blogPage {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fileAbsolutePath: { glob: "**/posts/**" }
        frontmatter: { published: { ne: false } }
      }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY hh:mm a")
            description
          }
        }
      }
    }
  }
`
