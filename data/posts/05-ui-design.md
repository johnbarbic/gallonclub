---
date: 2018-10-06 02:45:00
title: Lets think about design
description: Building with components.
keywords: 
- Components
- Design

author: 
  name: John Barbic
  email: john@barbic.com


#YAML array syntax
tags:
- Tutorial
- Component
- Design

published: true
---
Even though I was new to React, I found React to be familiar. When the web was new JavaScript and HTML were commonly found in the same file. When React first came out some separation purists seemed to freak out, but I'd wager there are millions of pages of legacy code where the HTML and JavaScript have lived side by side for decades.  This is one way of saying, that there is a solid argument for keeping them comingled.  Developers need to be able to reason about the code they are in and that is what I find when working in React.

To create the Gallon Club let's review the components we will create.  There are 6 of them:
  1. Layout - The layout component is the wrapper for all other components.
  2. Head - The head component will generate the head section of the rendered HTML (I see people call this SEO, but Head seems more direct).
  3. Header - Running along the top of the website will be a header that contains the menu for the application.
  4. Menu - A simple component for the menu items.
  5. Footer - A basic component for the footer of the site with a copyright statement.
  6. Prevnext - A component for the blog's previous and next links-

Implicit in the design is that the majority of pages will be driven by Markdown files.  I write "majority" because one exception is the home page.  

There are many ways to componentize an application.  For example, a menu item within the menu component is a logical candidate to be turned into a component, but you have to draw the line somewhere.   The list above represents all the components we will create in the course of creating the initial version of The Gallon Club.  Once you are familiar with the basic architecture, the creation of a new Gatsby application will likely be derived from of a similar list of components, and you will dive right in.  But for the Gallon Club I want this to be an organic experience. 

We will begin with the default starter's Layout component and begin decomposing it into the components we want.  I created the list above so you can see where I'm headed, but I don't mean to imply that creating an app is a linear path. Often it is much more organic, and I intend to take an organic approach here so that we encounter more of the intermediate decisions you will face when creating your own application and be able to make good reason choices about your own architecture.  In other words, this isn't gospel and it is likely that I will come back to revise these components over time.  What's important is that the architecture supports that evolution, which I believe is an inherent quality of React.     