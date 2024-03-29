import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import React from 'react'
import Helmet from "react-helmet"
import FooterText from '../components/footer'
import "../styles/blogpost.scss"


class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.contentfulBlogPost

        return (
            <main className="blogpost">
                <Helmet>
                    <title>{post.title.concat(" - Benjamin's Tech Blog")}</title>
                    <meta name="description" content={post.description.childMarkdownRemark.rawMarkdownBody.substring(0,150)}/>
                    <meta itemprop="name" content={post.title.concat(" - Benjamin's Tech Blog")} />
                    <meta itemprop="description" content={post.description.childMarkdownRemark.rawMarkdownBody.substring(0,150)} />
                    <meta itemprop="image" content={post.resized.gatsbyImageData.images.fallback.src} />
                    <meta property="og:site_name" content="Benjamin's Tech Blog" />
                    <meta property="og:title" content={post.title.concat(" - Benjamin's Tech Blog")} />
                    <meta property="og:description" content={post.description.childMarkdownRemark.rawMarkdownBody.substring(0,150)} />
                    <meta property="og:image:secure_url" itemprop="image" content={post.resized.gatsbyImageData.images.fallback.src} />
                    <meta property="og:image" itemprop="image" content={post.resized.gatsbyImageData.images.fallback.src} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={"https://blog.benjamin-mathieu.ch/blog/".concat(post.slug)} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="twitter:domain" content="blog.benjamin-mathieu.ch" />
                    <meta property="twitter:url" content={"https://blog.benjamin-mathieu.ch/blog/".concat(post.slug)} />
                    <meta name="twitter:title" content="Benjamin's Tech Blog" />
                    <meta name="twitter:description" content="My tech blog - things I discover, build or fix." />
                    <meta name="twitter:image" content={post.resized.gatsbyImageData.images.fallback.src} />
                </Helmet>
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
                    <GatsbyImage image={post.heroImage.gatsbyImageData} />
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
            gatsbyImageData(
                width: 1300,
                height: 400,
                resizingBehavior: FILL,
                quality: 80,
                backgroundColor: "#000",
                placeholder: TRACED_SVG
                )
        }
        resized: heroImage {
            gatsbyImageData(
              width: 256
              height: 256
              resizingBehavior: FILL
              quality: 80
              backgroundColor: ""
              formats: JPG
            )
          }
        description {
            childMarkdownRemark {
                rawMarkdownBody
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
