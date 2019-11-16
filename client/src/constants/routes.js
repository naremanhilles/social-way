import React from "react";
import { Redirect } from "react-router-dom";

import {
  Home,
  CreateProfile,
  Posts,
  Post,
  PostForm,
  PublicService,
  Event,
  Profile,
  AdminPosts,
  PendingUsersAccounts,
  UsersAccounts,
  Tags,
  Tips
} from "components/pages";

export const isNotAuthRoutes = [
  {
    key: 1,
    path: "/signup",
    exact: true,
    component: CreateProfile
  },
  {
    key: 2,
    path: "/login",
    exact: true
  },
  {
    key: 3,
    path: "/",
    exact: true,
    component: Home
  },
  {
    key: 4,
    path: "*",
    exact: true,
    render: () => <Redirect to="/" />
  }
];

export const isAuthRoutes = [
  { key: 1, isProtected: false, path: "/logout", exact: true },
  {
    key: 2,
    isProtected: true,
    path: "/profile",
    exact: true,
    component: Profile
  },
  {
    key: 3,
    isProtected: true,
    path: "/posts/live",
    exact: true,
    component: props => <Post {...props} postType="live" />
  },
  {
    key: 4,
    isProtected: true,
    path: "/posts/draft",
    exact: true,
    component: props => <Post {...props} postType="draft" />
  },
  {
    key: 5,
    isProtected: true,
    path: "/posts/new",
    exact: true,
    component: PostForm
  },
  {
    key: 6,
    isProtected: true,
    path: "/post/public-service/:id/edit",
    exact: true,
    component: props => <PostForm postFormType="public service" {...props} />
  },
  {
    key: 7,
    isProtected: true,
    path: "/post/event/:id/edit",
    exact: true,
    component: props => <PostForm postFormType="event" {...props} />
  },
  {
    key: 8,
    isProtected: true,
    path: "/post/event/:category/:id",
    exact: true,
    component: Event
  },
  {
    key: 9,
    isProtected: true,
    path: "/post/public-service/:category/:id",
    exact: true,
    component: PublicService
  },
  {
    key: 10,
    isProtected: true,
    path: "/posts",
    exact: true,
    component: Posts
  },
  {
    key: 11,
    isAdmin: true,
    isProtected: true,
    path: "/admin/pending-accounts",
    exact: true,
    component: PendingUsersAccounts,
    tab: "1"
  },
  {
    key: 12,
    isAdmin: true,
    isProtected: true,
    path: "/admin/accounts",
    exact: true,
    component: UsersAccounts,
    tab: "2"
  },
  {
    key: 13,
    isAdmin: true,
    isProtected: true,
    path: "/admin/posts",
    exact: true,
    component: AdminPosts,
    tab: "3"
  },
  {
    key: 14,
    isAdmin: true,
    isProtected: true,
    path: "/admin/seo-tips",
    exact: true,
    component: Tips,
    tab: "4"
  },
  {
    key: 15,
    isAdmin: true,
    isProtected: true,
    path: "/admin/tags",
    exact: true,
    component: Tags,
    tab: "5"
  },
  {
    key: 16,
    isProtected: false,
    path: "*"
  }
];
