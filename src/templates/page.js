import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

//This component can render content in two way based on the value of the page's layout frontmatter.

function RenderStandard({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds our page data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout background="w3-light-white">
      <div className="w3-row-padding w3-padding-64 w3-container">
        <div className="w3-content w3-panel w3-card-2 w3-padding-large w3-white w3-round-xxlarge">
          <h1 className="w3-text-theme">{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <article
            className="content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  )
}

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
