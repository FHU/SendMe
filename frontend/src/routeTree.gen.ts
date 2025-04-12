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
import { Route as HomeIndexImport } from './routes/home/index'
import { Route as ConversationsIndexImport } from './routes/conversations/index'
import { Route as AuthIndexImport } from './routes/auth/index'
import { Route as MessagesConversationIdImport } from './routes/messages/$conversationId'

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

const HomeIndexRoute = HomeIndexImport.update({
  id: '/home/',
  path: '/home/',
  getParentRoute: () => rootRoute,
} as any)

const ConversationsIndexRoute = ConversationsIndexImport.update({
  id: '/conversations/',
  path: '/conversations/',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  id: '/auth/',
  path: '/auth/',
  getParentRoute: () => rootRoute,
} as any)

const MessagesConversationIdRoute = MessagesConversationIdImport.update({
  id: '/messages/$conversationId',
  path: '/messages/$conversationId',
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
    '/messages/$conversationId': {
      id: '/messages/$conversationId'
      path: '/messages/$conversationId'
      fullPath: '/messages/$conversationId'
      preLoaderRoute: typeof MessagesConversationIdImport
      parentRoute: typeof rootRoute
    }
    '/auth/': {
      id: '/auth/'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof rootRoute
    }
    '/conversations/': {
      id: '/conversations/'
      path: '/conversations'
      fullPath: '/conversations'
      preLoaderRoute: typeof ConversationsIndexImport
      parentRoute: typeof rootRoute
    }
    '/home/': {
      id: '/home/'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeIndexImport
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
  '/messages/$conversationId': typeof MessagesConversationIdRoute
  '/auth': typeof AuthIndexRoute
  '/conversations': typeof ConversationsIndexRoute
  '/home': typeof HomeIndexRoute
  '/opportunities': typeof OpportunitiesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/messages/$conversationId': typeof MessagesConversationIdRoute
  '/auth': typeof AuthIndexRoute
  '/conversations': typeof ConversationsIndexRoute
  '/home': typeof HomeIndexRoute
  '/opportunities': typeof OpportunitiesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/messages/$conversationId': typeof MessagesConversationIdRoute
  '/auth/': typeof AuthIndexRoute
  '/conversations/': typeof ConversationsIndexRoute
  '/home/': typeof HomeIndexRoute
  '/opportunities/': typeof OpportunitiesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/messages/$conversationId'
    | '/auth'
    | '/conversations'
    | '/home'
    | '/opportunities'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/messages/$conversationId'
    | '/auth'
    | '/conversations'
    | '/home'
    | '/opportunities'
  id:
    | '__root__'
    | '/'
    | '/messages/$conversationId'
    | '/auth/'
    | '/conversations/'
    | '/home/'
    | '/opportunities/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  MessagesConversationIdRoute: typeof MessagesConversationIdRoute
  AuthIndexRoute: typeof AuthIndexRoute
  ConversationsIndexRoute: typeof ConversationsIndexRoute
  HomeIndexRoute: typeof HomeIndexRoute
  OpportunitiesIndexRoute: typeof OpportunitiesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  MessagesConversationIdRoute: MessagesConversationIdRoute,
  AuthIndexRoute: AuthIndexRoute,
  ConversationsIndexRoute: ConversationsIndexRoute,
  HomeIndexRoute: HomeIndexRoute,
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
        "/messages/$conversationId",
        "/auth/",
        "/conversations/",
        "/home/",
        "/opportunities/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/messages/$conversationId": {
      "filePath": "messages/$conversationId.tsx"
    },
    "/auth/": {
      "filePath": "auth/index.tsx"
    },
    "/conversations/": {
      "filePath": "conversations/index.tsx"
    },
    "/home/": {
      "filePath": "home/index.tsx"
    },
    "/opportunities/": {
      "filePath": "opportunities/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
