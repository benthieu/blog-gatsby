module.exports = {
  siteMetadata: {
    title: "My personal blog",
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "HvQKcsCtWY4-obo9x_f0kumYlKowuLpN1JtAKsOBslo",
        spaceId: "2jvij655020y",
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
