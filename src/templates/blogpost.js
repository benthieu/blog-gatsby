import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import FooterText from '../components/footer'

import "../styles/blogpost.scss"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulBlogPost

    return (
        <main className="blogpost">
            <article>
                <header>
                    <h3>{post.publishDate}</h3>
                    <h3 className="back-link">
                    <Link to="/">← Go back to overview</Link>
                    </h3>
                    <h1>
                        {post.title}
                    </h1>
                    <div className="description"
                    dangerouslySetInnerHTML={{
                    __html: post.description.childMarkdownRemark.html,
                    }} />
                </header>
                <Img alt="" fluid={post.heroImage.fluid} />
                <div className="body"
                    dangerouslySetInnerHTML={{
                    __html: post.body.childMarkdownRemark.html,
                    }} />
            </article>
            <FooterText></FooterText>
        </main>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
        title
        slug
        publishDate(formatString: "LL")
        heroImage {
            fluid(maxWidth: 1300, maxHeight: 400, resizingBehavior: FILL, background: "rgb:000000") {
                ...GatsbyContentfulFluid_tracedSVG
            }
        }
        description {
            childMarkdownRemark {
                html
            }
        }
        body {
            childMarkdownRemark {
                html
            }
        }
    }
  }
`