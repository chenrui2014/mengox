import models from '../models/index';
import _ from 'lodash';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import objectAssign from 'object-assign';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../frontend/js/App/reducers/index';
import Index from '../frontend/js/App/index.js';
import helper from './helper';

const index = async (ctx, _next) => {
  let query = _.merge(query, { uniqueKey: 'instruction' });
  let select = ['title', 'uniqueKey', 'author', 'preface', 'desc', 'content', 'articleCategory', 'sequence', 'cover', 'type', 'tag', 'isBanned', 'isPrivate', 'isAdminOnly', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
  let populate = 'createdBy';
  let sort = { sequence: 1 };
  let res = await helper.getArticles(query, select, sort, true, populate);
  const indexContent = res.data[0].content;
  let preloadedState = _.merge(ctx.state.preloadedState, { indexContent });
  const prerenderHtml = await handleRender(preloadedState, <Index/>);
  const locals = {
    title: 'MengoX',
    nav: 'index',
    prerenderHtml: prerenderHtml,
    baseUrl: '/',
  };
  await ctx.render('home/index', locals);
};

const about = async (ctx, _next) => {
  const readme = fs.readFileSync('README.md', 'utf8');
  const locals = {
    title: 'About',
    nav: 'about',
    content: readme,
  };
  await ctx.render('home/about', locals);
};

const handleRender = async(preloadedState, component) => {
  let newState = {};
  Object.keys(preloadedState).map((key) => {
    if (key !== 'csrf' && key !== 'captchaData' && key !== 'qiniuDomain'){
      newState[key] = preloadedState[key];
    }
  });
  const store = createStore(reducer, newState);
  const html = renderToString(
    <Provider store={store}>
      {component}
    </Provider>
  );
  return html;
}

export default {
  index,
  about
};
