import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import * as React from "react"
import Helmet from "react-helmet"
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
        <meta name="description" content="My tech blog - things I discover, build or fix."/>
        <meta itemprop="name" content="Benjamin's Tech Blog" />
        <meta itemprop="description" content="My tech blog - things I discover, build or fix." />
        <meta itemprop="image" content={this.props.data.ogFile.childImageSharp.resize.src} />
        <meta property="og:site_name" content="Benjamin's Tech Blog" />
        <meta property="og:title" content="Benjamin's Tech Blog" />
        <meta property="og:description" content="My tech blog - things I discover, build or fix." />
        <meta property="og:image" itemprop="image" content={this.props.data.ogFile.childImageSharp.resize.src} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.benjamin-mathieu.ch" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="blog.benjamin-mathieu.ch" />
        <meta property="twitter:url" content="https://blog.benjamin-mathieu.ch" />
        <meta name="twitter:title" content="Benjamin's Tech Blog" />
        <meta name="twitter:description" content="My tech blog - things I discover, build or fix." />
        <meta name="twitter:image" content={this.props.data.ogFile.childImageSharp.resize.src} />
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
              <GatsbyImage image={node.heroImage.gatsbyImageData} />
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
            gatsbyImageData(width: 500, height: 440, resizingBehavior: FILL, quality: 80, placeholder: TRACED_SVG)
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
      childImageSharp {
        resize(height: 256, width: 256) {
          src
        }
      }
    }
  }
`
