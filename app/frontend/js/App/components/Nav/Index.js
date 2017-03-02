import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  changeLocale,
  setModalContentName,
  logout,
} from './../../actions/index';

class Nav extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if (typeof window !== 'undefined'){
      require('bootstrap-sass/assets/javascripts/bootstrap/modal.js');
      require('bootstrap-sass/assets/javascripts/bootstrap/transition.js');
    }
  }

  changeLocale(){
    let val = this.refs.locale.value;
    this.props.changeLocale(val);
  }

  setModalContentName(val){
    this.props.setModalContentName(val);
  }

  logout(){
    this.props.logout();
  }

  handleImageLoaded(){

  }

  render() {
    let {
      locale,
      isIndex,
      activeTab,
      currentUser,
      className,
    } = this.props;

    if (_.isUndefined(className)){
      className = '';
    }
    let LANG_GENERAL = require('../../../../../locales/' + locale + '/general');
    let LANG_NAV = require('../../../../../locales/' + locale + '/nav');
    let LANG_USER = require('../../../../../locales/' + locale + '/user');
    let userHtml;
    if (_.isNull(currentUser)){
      userHtml = (
        <div className="user-nav__item">
          <div className="user-nav__item no-mobile-990 cursor-pointer" data-toggle="modal" data-target="#myModal" onClick={this.setModalContentName.bind(this, 'Login')}>{LANG_USER.login}</div>
          <div className="user-nav__item no-mobile-990">&nbsp;/&nbsp;</div>
          <div className="user-nav__item no-mobile-990 cursor-pointer" data-toggle="modal" data-target="#myModal" onClick={this.setModalContentName.bind(this, 'Signup')}>{LANG_USER.signup}</div>
        </div>
      );
    }
    else{
      let avatarImageHtml;
      if (currentUser.avatar != ''){
        avatarImageHtml = (
          <div className={`avatar-container dp-tbl-cel middle`}>
            <div className={`avatar-holder`}>
              <img className="" src={`${currentUser.avatar}?imageView/1/w/${100}/h/${100}`} style={{'width':'100%'}} onLoad={this.handleImageLoaded.bind(this)}/>
            </div>
          </div>
        );
      }
      userHtml = (
        <div className="user-nav__item mo-dropdown no-mobile-990">
          <div className="dp-tbl">
            {avatarImageHtml}
            <div className="dp-tbl-cel middle">&nbsp;</div>
            <div className="dp-tbl-cel middle">{currentUser.nickname}</div>
          </div>
          <div className="mo-dropdown__menu">
            <div className="mo-dropdown__container">
              <div className="mo-dropdown__item" data-toggle="modal" data-target="#myModal" onClick={this.setModalContentName.bind(this, 'MyAccount')}>
                {LANG_USER['my-account']}
              </div>
              <div className="mo-dropdown__item" onClick={this.logout.bind(this)}>
                {LANG_USER.logout}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return(
      <div className={`nav ${className}`}>
        <div className="nav__left menu">
          <span className="mobile-menu-icon glyphicon glyphicon-menu-hamburger grey-4a" aria-hidden="true"></span>
          <a className="no-mobile-990" href="/">
            <div className="site-name"><span>{LANG_GENERAL.name}</span></div>
          </a>
          <a href={`/`} className={activeTab == 'home' ? `menu__item no-mobile-990 active` : `menu__item no-mobile-990`}><div>{LANG_NAV.home}</div></a>
          <a href={`/articles`} className={activeTab == 'articles' ? `menu__item no-mobile-990 active` : `menu__item no-mobile-990`}><div>{LANG_NAV.article}</div></a>
        </div>
        <div className="nav__center show-mobile-tbl-cel-990">
          <a href="/">
            <div className="site-name"><span>{LANG_GENERAL.name}</span></div>
          </a>
        </div>
        <div className="nav__right user-nav">
          {userHtml}
          <div className="user-nav__item no-mobile-990">&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div className="user-nav__item input-group" style={{'position':'relative'}}>
            <select
              ref="locale"
              onChange={this.changeLocale.bind(this)}
              style={{'float':'none','display':'inline-block','paddingRight':'28px', 'paddingLeft':'8px'}}
              value={locale}
            >
              <option value="zh-CN">简体中文</option>
              <option value="zh-HK">繁體中文</option>
              <option value="en-US">English</option>
            </select>
            <div className="select-arrow"></div>
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
    changeLocale: (val) => {
      dispatch(changeLocale(val));
    },
    setModalContentName: (val) => {
      dispatch(setModalContentName(val));
    },
    logout: () => {
      dispatch(logout());
    },
  };
}

Nav.contextTypes = {
  router: React.PropTypes.object
};

Nav.propTypes = {
  locale: React.PropTypes.string,
  activeTab: React.PropTypes.string,
  className: React.PropTypes.string,
  isIndex: React.PropTypes.bool,
  currentUser: React.PropTypes.object,
  changeLocale: React.PropTypes.func,
  setModalContentName: React.PropTypes.func,
  logout: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);