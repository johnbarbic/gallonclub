import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

export default ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  //console.log(data)
  return (
    <Layout background="w3-light-white">
      <div className="w3-content w3-padding-64 w3-container">
        <div className="w3-content">
          <h2 className="w3-margin-bottom">Members of The Gallon Club</h2>
          <div className="w3-margin-bottom">
            <p>
              Here are some honorary members of the Gallon Club. Would you like
              to join us? Come join the project and send a pull request.
            </p>
          </div>

          {/* commenting out for now
          <div className="w3-container w3-margin-bottom">
            <p>{data.allMarkdownRemark.totalCount} Blood Donor Developers</p>
          </div>
*/}
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Link
              to={node.fields.slug}
              key={node.id}
              style={{ textDecoration: 'none' }}
            >
              <div className="w3-card w3-margin-bottom w3-padding-large w3-round-xlarge w3-white w3-hover-light-grey">
                <h3 className="w3-text-theme">{node.frontmatter.name}</h3>
                <div>{node.frontmatter.location}</div>
                <p className="w3-opacity w3-tiny">
                  Member Since {node.frontmatter.joined}
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
  query memberPage {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___joined] }
      filter: {
        fileAbsolutePath: { glob: "**/members/**" }
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
            name
            joined(formatString: "DD MMMM, YYYY")
            location
          }
        }
      }
    }
  }
`
