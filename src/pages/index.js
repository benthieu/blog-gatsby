import * as React from "react"
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import FooterText from '../components/footer'

import "@fontsource/livvic/300.css" // Weight 500.
import "@fontsource/noto-serif-jp/200.css" // Loads the italic variant.
import "@fontsource/noto-serif-jp/400.css" // Loads the italic variant.
import "../styles/index.scss"

// markup
class IndexPage extends React.Component {
  render() {
  const posts = this.props.data.allContentfulBlogPost.edges;
  return (
    <main className="overview">
      <header>
        <h1>
          Welcome to my TechBlog!
        </h1>
      </header>
      {posts.map(({ node }) => {
        return (
          <article key={node.slug}>
            <Link to={`/blog/${node.slug}`}>
              <Img alt="" fluid={node.heroImage.fluid} />
            </Link>
            <h3>{node.publishDate}</h3>
            <h2>
              <Link to={`/blog/${node.slug}`}>
                {node.title}
              </Link>
            </h2>
            <div className="description"
            dangerouslySetInnerHTML={{
              __html: node.description.childMarkdownRemark.html,
            }} />
          </article>
        )
      })}
    <FooterText></FooterText>
    </main>
  )
}}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "LL")
          heroImage {
            fluid(maxWidth: 500, maxHeight: 440, resizingBehavior: FILL) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`