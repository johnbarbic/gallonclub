---
date: 2018-10-06 03:15:00
title: Layout Component Part 2.
description: Finally, a little style.
keywords: 
- Layout
- CSS

author: 
  name: John Barbic
  email: john@barbic.com


tags:
- Tutorial
- Component
- Layout

published: true
---

Next up, it's time to style the application.  For The Gallon Club, I decided to use [W3.CSS](https://www.w3schools.com/w3css/default.asp) simply because I haven't seen it used anywhere and because I like its simplicity.  That said, CSS can turn into a deep dive and one you need to take once you have the basics covered.  As it is, I believe CSS-in-JS is where things are headed, but that's out of scope here.  The use of this css framework only involves 3 changes and will give us enough style for our purposes in the Gallon Club.

#### 1. Install W3.CSS with NPM.
```
npm install w3-css
```

I also want to take advantage of one of their themes and so I leveraged the existing layout.css.  

#### 2. Update /src/components/style.css with the following

```
.w3-theme-l5 {
  color: #000 !important;
  background-color: #f2f9fe !important
}

.w3-theme-l4 {
  color: #000 !important;
  background-color: #d2eafd !important
}

.w3-theme-l3 {
  color: #000 !important;
  background-color: #a6d4fa !important
}

.w3-theme-l2 {
  color: #000 !important;
  background-color: #79bff8 !important
}

.w3-theme-l1 {
  color: #fff !important;
  background-color: #4daaf6 !important
}

.w3-theme-d1 {
  color: #fff !important;
  background-color: #0c87eb !important
}

.w3-theme-d2 {
  color: #fff !important;
  background-color: #0b78d1 !important
}

.w3-theme-d3 {
  color: #fff !important;
  background-color: #0a69b7 !important
}

.w3-theme-d4 {
  color: #fff !important;
  background-color: #085a9d !important
}

.w3-theme-d5 {
  color: #fff !important;
  background-color: #074b83 !important
}

.w3-theme-light {
  color: #000 !important;
  background-color: #f2f9fe !important
}

.w3-theme-dark {
  color: #fff !important;
  background-color: #074b83 !important
}

.w3-theme-action {
  color: #fff !important;
  background-color: #074b83 !important
}

.w3-theme {
  color: #fff !important;
  background-color: #2196f3 !important
}

.w3-text-theme {
  color: #2196f3 !important
}

.w3-text-theme-grey {
  color: #A9A9A9 !important
}

.w3-border-theme {
  border-color: #2196f3 !important
}

.w3-hover-theme:hover {
  color: #fff !important;
  background-color: #2196f3 !important
}

.w3-hover-text-theme:hover {
  color: #2196f3 !important
}

.w3-hover-border-theme:hover {
  border-color: #2196f3 !important
}

```

#### 3. Lastly modfify /components/Layout.js.

```javascript{7}
import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Head from './Head'

import Header from './header'

import css from 'w3-css/w3.css'
import style from './layout.css'
```

#### Adding React Icons to our project

One of the best things about using React is the depth of plugins you can use.  To give the application that extra little bit of flair I wanted to use icons and looked around for a solution.  You could install any one of several icon frameworks, but I found [React Icons](https://react-icons.netlify.com/#/) a little library that makes it very easy to add them all.  I mean, why limit yourself?  

By now you should know the drill.
```
npm install react-icons --save
```

The React Icons documentation is straight forward and to use any icon is explained clearly on their site.

At this point the application will still not look that different, so in the next we will begin changing that.