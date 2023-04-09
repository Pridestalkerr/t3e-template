# t3e-template

Nextjs, Typescript, tRPC, tailwind with a custom express server.

## What is this?

This project attempts to be a template mirror of [create-t3-app]("https://github.com/t3-oss/create-t3-app"). It does not provide a CLI but the template is provided as is. Steps to reproduce the template are listed further down (TODO).

### Why?

I absolutely love [create-t3-app]("https://github.com/t3-oss/create-t3-app") but sometimes I need features that are very difficult to add in a create-t3-app (e.g. websockets, caching, sessions, etc), so I decided to create a template that I can use as a base for my projects. This template is not meant to be used as is, but rather as a base for your own projects. It is also not meant to be used as a "drop-in" replacement for create-t3-app. It has several drawbacks and it is not viable for serverless. It also does not provide an easy way to deploy the project.

### Why you might want to use this template

- you don't want serverless and/or don't want to rely on too many external cloud services (e.g. pusher, upstash, planetscale, etc) and would prefer to spin up your own
- your app relies heavily on websockets
- you want to use a custom express server (for whatever reason)
- you need more modularity (in which case I heavily recommend to spin up the template manually using the guide below)
