import * as React from "react"
import Helmet from "react-helmet"
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import FooterText from '../components/footer'

import "../styles/index.scss"

// markup
class IndexPage extends React.Component {
  render() {
  const posts = this.props.data.allContentfulBlogPost.edges;
  return (
    <main className="overview">
      <Helmet>
        <title>Blog - Benjamin Mathieu</title>
        <meta property="og:title" content="Benjamin's Tech Blog" />
        <meta property="og:description" content="My tech blog - things I discover, build or fix." />
        <meta property="og:image" content={this.props.data.ogFile.publicURL} />
        <meta property="og:url" content="https://blog.benjamin-mathieu.ch" />
      </Helmet>
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
            fluid(maxWidth: 500, maxHeight: 440, resizingBehavior: FILL, quality: 80) {
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
    ogFile: file(name: {eq: "og"}) {
      publicURL
    }
  }
`