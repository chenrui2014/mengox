import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  setModalContentName,
  logout,
} from './../../actions/index';

class MobileNav extends Component {

  constructor(props) {
    super(props);
  }

  setModalContentName(val){
    this.props.setModalContentName(val);
  }

  logout(){
    this.props.logout();
  }

  render() {
    let {
      locale,
      currentUser,
      isIndex,
      activeTab,
    } = this.props;
    let userHtml;
    let LANG_NAV = require('../../../../../locales/' + locale + '/nav');
    let LANG_USER = require('../../../../../locales/' + locale + '/user');
    if (_.isNull(currentUser)){
      userHtml = (
        <div className="mo-nav-column__item">
          <div className="mo-nav-column__item user-nav">
            <span className="user-nav__item cursor-pointer" data-toggle="modal" data-target="#myModal" onClick={this.setModalContentName.bind(this, 'Login')}>{LANG_USER.login}</span>
            <span className="user-nav__item">&nbsp;/&nbsp;</span>
            <span className="user-nav__item cursor-pointer" data-toggle="modal" data-target="#myModal" onClick={this.setModalContentName.bind(this, 'Signup')}>{LANG_USER.signup}</span>
          </div>
        </div>
      );
    }
    else{
      userHtml = (
        <div className="mo-nav-column__item">
          <div className="mo-nav-column__item user-nav">
            <span className="user-nav__item cursor-pointer" data-toggle="modal" data-target="#myModal" onClick={this.setModalContentName.bind(this, 'MyAccount')}>{currentUser.nickname}</span>
            <span className="user-nav__item">&nbsp;/&nbsp;</span>
            <span className="user-nav__item cursor-pointer" data-toggle="modal" data-target="#myModal" onClick={this.logout.bind(this, false)}>{LANG_USER.logout}</span>
          </div>
        </div>
      );
    }
    return(
      <div className="mo-navbar__nav-mobile mo-nav-mobile">
        <div className="mo-nav-mobile__mask"></div>
        <div className="nav__left menu">
          <div className="mo-nav-mobile__content">
            <div className="mo-nav-mobile__menu-wrapper">
                {userHtml}
                <a className={activeTab == 'articles' ? `mo-nav-column__item active` : `mo-nav-column__item`} href={`/articles`} data-menuanchor="articles">
                  <div className="nav-item-wrapper">
                    <div className="mgt-10">
                      {LANG_NAV.article}
                    </div>
                  </div>
                </a>
            </div>
          </div>
        </div>
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
    setModalContentName: (val) => {
      dispatch(setModalContentName(val));
    },
    logout: (val) => {
      dispatch(logout(val));
    },
  };
}

MobileNav.contextTypes = {
  router: React.PropTypes.object
};

MobileNav.propTypes = {
  locale: React.PropTypes.string,
  activeTab: React.PropTypes.string,
  isIndex: React.PropTypes.bool,
  currentUser: React.PropTypes.object,
  setModalContentName: React.PropTypes.func,
  logout: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);