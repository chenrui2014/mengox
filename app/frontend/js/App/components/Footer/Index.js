import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  changeLocale,
  setModalContentName,
  logout,
} from './../../actions/index';

class Footer extends Component {

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
      className,
    } = this.props;
    if (_.isUndefined(className)){
      className = '';
    }
    return(
      <div className={`footer ${className}`}>
        <div className='footer-content'>
          <div className="copyright al-center">Copyright © Edward Xiao</div>
          <div className="height-10"></div>
          <a className="github-button" href="https://github.com/edwardfhsiao/mengox" data-count-href="/edwardfhsiao/mengox/stargazers" data-count-api="/repos/edwardfhsiao/mengox#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star edwardfhsiao/mengox on GitHub" rel="nofollow">
            Star
          </a>
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

Footer.contextTypes = {
  router: React.PropTypes.object
};

Footer.propTypes = {
  locale: React.PropTypes.string,
  className: React.PropTypes.string,
  currentUser: React.PropTypes.object,
  changeLocale: React.PropTypes.func,
  setModalContentName: React.PropTypes.func,
  logout: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);