import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import { ThemeProvider, createGlobalStyle, css } from 'styled-components'
import NProgress from 'nprogress'

// Utils
import theme from '../utils/theme'

// Layouts
import BlogPostLayout from '../components/blog/Post/Layout'

export default class MyApp extends App {
  render() {
    const {
      Component,
      pageProps,
      router: { route = '' },
    } = this.props
    let Layout = null

    if (route.startsWith('/blog/') && route.length > 6) {
      Layout = BlogPostLayout
    }

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {Layout ? (
          <Layout>
            {' '}
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    )
  }
}

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

// prettier-ignore
const globalStyles = css`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: 'IBM Plex Serif', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }
  }

  *,
  &:after,
  &:before {
    box-sizing: border-box;
  }

  ::selection {
    background: hsl(190, 20%, 92%);
  }

  /* NProgress */
  #nprogress{pointer-events:none}#nprogress .bar{background:#29d;position:fixed;z-index:1031;top:0;left:0;width:100%;height:2px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;box-shadow:0 0 10px #29d,0 0 5px #29d;opacity:1;-webkit-transform:rotate(3deg) translate(0px,-4px);-ms-transform:rotate(3deg) translate(0px,-4px);transform:rotate(3deg) translate(0px,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:1031;top:15px;right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:solid 2px transparent;border-top-color:#29d;border-left-color:#29d;border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .spinner,.nprogress-custom-parent #nprogress .bar{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
`
const GlobalStyle = createGlobalStyle`
  ${globalStyles}
`
