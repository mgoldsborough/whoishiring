# Who is hiring? in React

This is a simple react project that displays job postings from the monthly "Who's Hiring" posts on [Hacker News](https://news.ycombinator.com/news)

Deployed to https://whoishiring.goldsborough.io/ via gh-pages

## Quick Start

Install dependencies and run the local app

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Deploy

```bash
npm run predeploy
npm run deploy
```

## Adding new posts

The available posts are driven by a flat file, `src/postIds.json`.

To add a new "Who's Hiring" post, add it to the top of this file.


```json
[
  {
    "id": 38842977, 
    "title": "January 2024"
  },
  ...other items...
]
```
