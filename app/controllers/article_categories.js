import models from '../models/index';
import fs from 'fs';

const index = async (ctx, _next) => {
  const locals = {
    title: 'MengoX | Article Categories',
    nav: 'index',
    preloadedState: { articles: '' },
    baseUrl: '/',
  };
  await ctx.render('home/index', locals);
};

export default {
  index,
};
