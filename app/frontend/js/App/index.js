import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setPortfolioType,
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

  go(url) {
    this.context.router.push(url);
  }

  setSlideModalContentName(val){
    $.fn.fullpage.setAllowScrolling(false);
    $('.slide-modal').addClass('visible');
    this.props.setPortfolioType(val);
    this.props.setSlideModalContentName('Portfolio');
  }

  render() {
    let {
      locale,
    } = this.props;
    let LANG_GENERAL = require('../../../locales/' + locale + '/general');
    let content = (
      <div className="page-content">
        <MobileNav isIndex={true}/>
        <Nav isIndex={true}/>
        <div className="core-content background-white fullpage-wrapper">
          <div className="core">
            MengoX
          </div>
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
  } = state;
  return {
    locale,
    currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPortfolioType: (val) => {
      dispatch(setPortfolioType(val));
    },
    setSlideModalContentName: (val) => {
      dispatch(setSlideModalContentName(val));
    },
  };
}

Index.contextTypes = {
  router: React.PropTypes.object
};

Index.propTypes = {
  setPortfolioType: React.PropTypes.func,
  setSlideModalContentName: React.PropTypes.func,
  locale: React.PropTypes.string,
  currentUser: React.PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);