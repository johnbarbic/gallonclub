const path = require('path')
const _ = require('lodash')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  let slug

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    slug = `/${parsedFilePath.name}`

    // const docTypeArray = fileNode.dir.split('/')
    // const type = docTypeArray[docTypeArray.length-1]
    //console.log(`\n`, slug)
    // Add slug as a field on the node.
    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve('src/templates/page.js')
  const postTemplate = path.resolve('src/templates/post.js')
  const memberTemplate = path.resolve('src/templates/member.js')
  const tagTemplate = path.resolve('src/templates/tags.js')

  //three named queries...note the use of glob filtering here
  return new Promise((resolve, reject) => {
    graphql(`
      {
        pages: allMarkdownRemark(
          filter: {
            fileAbsolutePath: { glob: "**/data/pages/**" }
            frontmatter: { published: { ne: false } }
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                published
                title
                description
                lastModDate
                layout
              }
            }
          }
        }

        posts: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            fileAbsolutePath: { glob: "**/data/posts/**" }
            frontmatter: { published: { ne: false } }
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                date(formatString: "DD MMMM, YYYY hh:mm a")
                title
                description
                keywords
                tags
                published
              }
            }
          }
        }

        members: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___joined] }
          filter: {
            fileAbsolutePath: { glob: "**/data/members/**" }
            frontmatter: { published: { ne: false } }
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                joined
                name
                published
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }

      //    console.log(result.data)

      // Make pages with the pages result
      const pages = result.data.pages.edges

      // Create pages
      pages.forEach(({ node }) => {
        const slug = node.fields.slug
        // console.log(slug);

        createPage({
          path: slug,
          component: pageTemplate,
        })
      })

      // Make posts with the posts result
      const posts = result.data.posts.edges

      // Create post detail pages
      posts.forEach(({ node }, index) => {
        const slug = node.fields.slug
        const previous =
          index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
          path: slug,
          component: postTemplate,
          context: {
            previous,
            next,
          },
        })
      })

      //Make members with the Members result
      const members = result.data.members.edges

      // Create member pages
      members.forEach(({ node }) => {
        const slug = node.fields.slug
        createPage({
          path: slug,
          component: memberTemplate,
        })
      })

      // Tag pages:
      let tags = []
      // Iterate through each post, putting all found tags into `tags`
      _.each(posts, edge => {
        if (_.get(edge, 'node.frontmatter.tags')) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })
      // Eliminate duplicate tags
      tags = _.uniq(tags)

      // Make tag pages
      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}/`,
          component: tagTemplate,
          context: {
            tag,
          },
        })
      })
      resolve()
    })
  })
}
