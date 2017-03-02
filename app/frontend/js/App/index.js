import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {
  setSlideModalContentName,
} from './actions/index';

import Nav from './components/Nav/Index';
import MobileNav from './components/MobileNav/Index';
import Footer from './components/Footer/Index';

import Utils from '../common/utils';

class Index extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  go(url) {
    this.context.router.push(url);
  }

  setSlideModalContentName(val){
    $('.slide-modal').addClass('visible');
  }

  render() {
    let {
      locale,
      indexContent,
    } = this.props;
    let LANG_GENERAL = require('../../../locales/' + locale + '/general');
    let content = (
      <div className="page-content">
        <MobileNav isIndex={true}/>
        <Nav isIndex={true}/>
        <div className="core-content background-white fullpage-wrapper">
          <div className="core">
            <h1>MengoX</h1>
            <div>
              MengoX built by Koa2, React, Webpack2, MongoDB. React-router, Server-side rendering are included. <br/>It is very easy to use, and it is perfect for people who wants to have their own portfolio website.
            </div>
            <div className="height-10"></div>
            <div><h4><a href="https://edwardxiao.com" className="blue-link" alt="Edward Xiao">Example site</a></h4></div>
            <div className="height-10"></div>
            <div className="height-10"></div>
            <div><a className="github-fork-ribbon" href="https://github.com/edwardfhsiao/mengox" alt="Edward Xiao MengoX mengox" rel="nofollow">Fork me on Github</a></div>
            <div className="height-10"></div>
            <div className="height-10"></div>
            <ReactMarkdown source={indexContent} className="markdown" />
          </div>
          <div className="push"></div>
        </div>
        <Footer/>
      </div>
    );
    return(
      <div className="page">
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let {
    locale,
    currentUser,
    indexContent,
  } = state;
  return {
    locale,
    currentUser,
    indexContent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSlideModalContentName: (val) => {
      dispatch(setSlideModalContentName(val));
    },
  };
}

Index.contextTypes = {
  router: React.PropTypes.object
};

Index.propTypes = {
  setSlideModalContentName: React.PropTypes.func,
  locale: React.PropTypes.string,
  currentUser: React.PropTypes.object,
  indexContent: React.PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);