import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { FaUserPlus } from 'react-icons/fa'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  //console.log(data)

  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <header
        className="w3-container w3-white w3-center"
        style={{ padding: '65px 0 30px' }}
      >
        <div>
          <Img resolutions={data.logo.childImageSharp.resolutions} />
        </div>

        <Link
          to="/members/"
          className="w3-button w3-black w3-round-large w3-hover-green"
        >
          <FaUserPlus style={{ paddingTop: '3px' }} />{' '}
          <span>Join The Club!</span>
        </Link>
      </header>

      <div className="w3-row-padding w3-padding-64 w3-light-grey w3-container">
        <div className=" w3-content ">
          <div className="w3-half">
            <div className="w3-cell w3-cell-middle">
              <h3>Welcome</h3>
              <p>
                The Gallon Club's sole objective is to encourage life long blood
                donation, by getting members to commit to donating a gallon of
                blood or more throughout their lifetime. That's it.
              </p>
              <h3>Join Us</h3>
              <p className="w3-text-grey">
                There are no fees, no requirements, just make the commitment,
                and you're in! The only way blood supplies get replenished is
                through people like you that donate their time to give blood. So
                join today, we'd love to have you!
              </p>
            </div>
          </div>
          <div className="w3-half w3-container w3-cell w3-cell-middle">
            <Img sizes={data.bloodcells.childImageSharp.sizes} />
          </div>
        </div>
      </div>

      <div className="w3-row-padding w3-padding-64 w3-container">
        <div className=" w3-content ">
          <div className="w3-half w3-container w3-cell">
            <Img sizes={data.achievement.childImageSharp.sizes} />
          </div>
          <div className="w3-half">
            <div className="w3-container w3-cell w3-cell-middle">
              <h3>An example of Gatsby.js</h3>
              <h5 className="w3-padding-16">
                The Gallon Club is also an example applicaiton for learning more
                about{' '}
                <a className="link" href="https://www.gatsbyjs.org/">
                  Gatsby
                </a>. And the blog is tutorial about building static websites
                like this one.
              </h5>
              <p className="w3-text-grey">
                Static website technology makes it easy to create
                high-performance websites for any cause or non-profit. With
                Gatsby you can use your skills to make a positive difference and
                have fun doing it. Start with the{' '}
                <Link className="link" to="/about/">
                  About
                </Link>{' '}
                to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query homePage {
    logo: file(relativePath: { regex: "/logo.png/" }) {
      childImageSharp {
        resolutions(width: 150, height: 150, quality: 95) {
          ...GatsbyImageSharpResolutions_withWebp
        }
      }
    }
    achievement: file(
      relativePath: { regex: "/achievement-pexesdotcom.jpg/" }
    ) {
      childImageSharp {
        sizes(maxWidth: 500) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    bloodcells: file(relativePath: { regex: "/blood.jpg/" }) {
      childImageSharp {
        sizes(maxWidth: 500) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    markdownRemark(fields: { slug: { eq: "/home" } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
