/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as OpportunitiesIndexImport } from './routes/opportunities/index'
import { Route as MessagesIndexImport } from './routes/messages/index'
import { Route as HomeIndexImport } from './routes/home/index'
import { Route as ConversationIndexImport } from './routes/conversation/index'
import { Route as AuthIndexImport } from './routes/auth/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const OpportunitiesIndexRoute = OpportunitiesIndexImport.update({
  id: '/opportunities/',
  path: '/opportunities/',
  getParentRoute: () => rootRoute,
} as any)

const MessagesIndexRoute = MessagesIndexImport.update({
  id: '/messages/',
  path: '/messages/',
  getParentRoute: () => rootRoute,
} as any)

const HomeIndexRoute = HomeIndexImport.update({
  id: '/home/',
  path: '/home/',
  getParentRoute: () => rootRoute,
} as any)

const ConversationIndexRoute = ConversationIndexImport.update({
  id: '/conversation/',
  path: '/conversation/',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  id: '/auth/',
  path: '/auth/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/': {
      id: '/auth/'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof rootRoute
    }
    '/conversation/': {
      id: '/conversation/'
      path: '/conversation'
      fullPath: '/conversation'
      preLoaderRoute: typeof ConversationIndexImport
      parentRoute: typeof rootRoute
    }
    '/home/': {
      id: '/home/'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeIndexImport
      parentRoute: typeof rootRoute
    }
    '/messages/': {
      id: '/messages/'
      path: '/messages'
      fullPath: '/messages'
      preLoaderRoute: typeof MessagesIndexImport
      parentRoute: typeof rootRoute
    }
    '/opportunities/': {
      id: '/opportunities/'
      path: '/opportunities'
      fullPath: '/opportunities'
      preLoaderRoute: typeof OpportunitiesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthIndexRoute
  '/conversation': typeof ConversationIndexRoute
  '/home': typeof HomeIndexRoute
  '/messages': typeof MessagesIndexRoute
  '/opportunities': typeof OpportunitiesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth': typeof AuthIndexRoute
  '/conversation': typeof ConversationIndexRoute
  '/home': typeof HomeIndexRoute
  '/messages': typeof MessagesIndexRoute
  '/opportunities': typeof OpportunitiesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/auth/': typeof AuthIndexRoute
  '/conversation/': typeof ConversationIndexRoute
  '/home/': typeof HomeIndexRoute
  '/messages/': typeof MessagesIndexRoute
  '/opportunities/': typeof OpportunitiesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/conversation'
    | '/home'
    | '/messages'
    | '/opportunities'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/auth' | '/conversation' | '/home' | '/messages' | '/opportunities'
  id:
    | '__root__'
    | '/'
    | '/auth/'
    | '/conversation/'
    | '/home/'
    | '/messages/'
    | '/opportunities/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthIndexRoute: typeof AuthIndexRoute
  ConversationIndexRoute: typeof ConversationIndexRoute
  HomeIndexRoute: typeof HomeIndexRoute
  MessagesIndexRoute: typeof MessagesIndexRoute
  OpportunitiesIndexRoute: typeof OpportunitiesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthIndexRoute: AuthIndexRoute,
  ConversationIndexRoute: ConversationIndexRoute,
  HomeIndexRoute: HomeIndexRoute,
  MessagesIndexRoute: MessagesIndexRoute,
  OpportunitiesIndexRoute: OpportunitiesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth/",
        "/conversation/",
        "/home/",
        "/messages/",
        "/opportunities/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth/": {
      "filePath": "auth/index.tsx"
    },
    "/conversation/": {
      "filePath": "conversation/index.tsx"
    },
    "/home/": {
      "filePath": "home/index.tsx"
    },
    "/messages/": {
      "filePath": "messages/index.tsx"
    },
    "/opportunities/": {
      "filePath": "opportunities/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
