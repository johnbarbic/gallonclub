import React from 'react'
import Helmet from 'react-helmet'

class Head extends React.Component {
  render() {
    const data = this.props.data
    const pagedescription = this.props.pagedescription
    const pagekeywords = this.props.pagekeywords
    const metadescription = data.site.siteMetadata.description
    const metakeywords = data.site.siteMetadata.keywords

    const description =
      pagedescription == ''
        ? metadescription
        : pagedescription + ', ' + metadescription

    const keywords =
      pagekeywords == '' ? metakeywords : pagekeywords + ', ' + metakeywords

    //console.log(('test', pagekeywords))

    return (
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{data.site.siteMetadata.intro}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="apple-mobile-web-app-title"
          content={data.site.siteMetadata.siteURL}
        />
        <meta
          name="application-name"
          content={data.site.siteMetadata.siteURL}
        />
        <link
          href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans"
          rel="stylesheet"
        />{' '}
      </Helmet>
    )
  }
}

export default Head
