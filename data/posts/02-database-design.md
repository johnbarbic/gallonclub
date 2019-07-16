---
date: 2018-10-06 01:45:00 
title: Database Design
description: Lets define what we want to create.
keywords: 
- Gatsbyjs Tutorial
- Gatsby Design

author: 
  name: John Barbic
  email: john@barbic.com

#YAML array syntax
tags:
- Tutorial
- YAML
- Markdown

published: true
---
Generally, when I design any application, or any bit of functionality in general, I always start with the database, and define the tables I need to store the data.  It's just how my brain does things.  For the Gallon Club I wanted to explore more about the file system storage because I thought the use of Markdown files as a database was cool. I knew I wanted to abstract my data as much as possible from the UI code and came up with three types of pages for the site.

  1. Generated pages.
  2. Generated Member pages.
  3. Generated Blog pages.

I created a data directory with subdirectories for pages, members, and posts, respecively.  I then seeded them with Markdown files.

###Frontmatter

Frontmatter in Markdown files is powerful stuff, and with a bit of reading on YAML, I arrived at the following values for each type of Markdown file.

For blog posts:

  1. Date - A date value for the pubished date.
  2. Title - The post title.
  3. Description - A small discription. 
  4. Keywords - An array of keywords.
  5. Author - An object composed of the author's name and email address.
  6. Tags - An array of tags.
  7. Published - A boolean to indicate if the page is published.

For members:

  1. Joined - A date value for the membership date.
  2. Member - An object composed of the member's firstname, lastname, and email address.
  3. Location - the member's location.
  4. Published - A boolean to indicate if the page is published.

For pages:

  1. LastModDate - A date value for the revision date.
  2. Title - The page title.
  3. Description - A small page discription. 
  4. Published - A boolean to indicate if the page is published.
  5. Layout - A switch to control the layout of the page.

Together these comprise the data for the website. An analogy might be to think of the directories as tables and each of the documents as rows. That mental model breaks down when you consider that the structure of the YAML in the frontmatter of the document defines "columns," but you get the idea. With this done, it is time to leverage gatsby-node.js and learn more about the configuration required to bring the data in. The seed data is composed of three files as follows. 

data/members/01-johnbarbic.md

```
---
joined: 2018-08-02
member: 
  firstname: John
  lasename: Barbic
  email: john@barbic.com
  location: Boulder, CO 
published: true
---

### Hello

Hi, I'm John and I'm the author of the Gallon Club. I created The Gallon Club. The application's mission is to encourage blood donation while at the same time learning to develop a static Club website with Gatsby.

```

data/pages/home.md

```
---
lastModDate: 2018-01-01

title: The Gallon Club
description: 
published: true
layout: minimal
---

```

data/posts/01-intro.md

```
---
date: 2018-08-18 09:30:00
title: Introduction
description: How taking my first steps beyond the official Gatsby.js tutorial lead me to create The Gallon Club.
keywords: 
- Gatsbyjs Tutorial
- Gatsby Setup


author: 
  name: John Barbic
  email: john@barbic.com

#YAML array syntax
tags:
- Tutorial

published: true
---

Lorem Ipsum

```
In the next post, let's explore how Gatsby reads these files...
