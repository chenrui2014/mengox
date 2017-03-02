import React, { Component } from 'react';
import { connect } from 'react-redux';
import Utils from '../../../common/utils';
import Validator from '../../../common/my_validator';
let validator = new Validator();

import {
  signup,
  remove,
  fetchVerifyCode,
  changeCaptcha,
} from '../../actions/index';

class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 60,
      nickname: props.currentUser.nickname,
      role: props.currentUser.role,
      phone: props.currentUser.phone,
      email: props.currentUser.email,
      verifyCode: '',
      password: '',
      repassword: '',
      isSendVerifyCode: false,
      avatar: props.currentUser.avatar,
      captchaCode: '',
      isUploading: false,
      isPreview: true,
      isChangePassword: false,
      isDelete: false,
      verifyNickname: '',
    }
  }

  componentDidMount(){

  }

  componentDidUpdate(prevProps){
    if (prevProps.isSendVerifyCode && !this.props.isSendVerifyCode){
      this.clearTime();
    }
    if (prevProps.currentUser != this.props.currentUser){
      this.setState({isPreview: true});
    }
  }

  createCaptcha() {
   return {__html: this.props.captcha};
  }

  changeCaptcha(){
    this.props.changeCaptcha();
  }

  setCaptchaCode(e){
    this.removeErrorMessage(e.target.id);
    let captchaCode = this.refs.captchaCode.value;
    this.setState({captchaCode});
  }

  setAvatar(){
    let avatar = this.refs.avatar.value;
    this.setState({avatar});
  }

  setVerifyCode(){
    let verifyCode = this.refs.verifyCode.value;
    this.setState({verifyCode});
  }

  setIsSendVerifyCode(val){
    this.setState({isSendVerifyCode:val});
  }

  setNickname(e){
    this.removeErrorMessage(e.target.id);
    let nickname = this.refs.nickname.value;
    this.setState({nickname});
  }

  setPhone(e){
    this.removeErrorMessage(e.target.id);
    let phone = this.refs.phone.value;
    this.setState({phone});
  }

  setIsPhone(val){
    this.removeErrorMessage('phone');
    this.removeErrorMessage('email');
    this.setState({isPhone: val});
  }

  setEmail(e){
    this.removeErrorMessage(e.target.id);
    let email = this.refs.email.value;
    this.setState({email});
  }

  setPassword(e){
    this.removeErrorMessage(e.target.id);
    this.removeErrorMessage('repassword');
    let password = this.refs.password.value;
    this.setState({password});
  }

  setRepassword(e){
    this.removeErrorMessage(e.target.id);
    let repassword = this.refs.repassword.value;
    this.setState({repassword});
  }

  setIsPreview(isPreview){
    if (isPreview){
      if(this.setState({avatar: this.props.currentUser.avatar}));
    }
    this.setState({isPreview});
  }

  fetchVerifyCode(){
    let $el;
    if (this.state.isPhone){
      $el = $('#phone');
    }
    else{
      $el = $('#email');
    }
    if (validator.validate($el)){
      this.timer();
      this.setIsSendVerifyCode(true);
      this.fetchVerifyCodeApi(this.state.username).then((res) => {
        if (res.code === 0){
          // Utils.stopSpin('spin-loader');
        }
        else{
          if(res.msg){
            if (this.state.isPhone){
              $el = $('#phone');
            }
            else{
              $el = $('#email');
            }
            if (!$el.parent().siblings('.my-validator-message').length){
              validator.createMessage($el.parent(), res.msg, 'error');
            }
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  fetchVerifyCodeApi(user) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/api/users/send-verify-code',
        data: {user},
        type: 'post',
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        }
      });
    })
  }

  timer(){
    let counter = this.state.counter;
    this.time = setInterval(() => {
      counter--;
      if(counter < 0) {
        this.clearTime();
      } else {
        this.setState({counter});
      }
    }, 1000);
  }

  clearTime(){
    this.setState({counter: 60});
    clearInterval(this.time);
    this.props.setIsSendVerifyCode(false);
  }

  removeErrorMessage(id){
    validator.removeValidate($('#' + id));
  }

  onBlur(e){
    validator.validate($('#' + e.target.id), e.target.dataset.myValidatorName, this.props.locale);
  }

  signup(e){
    if (validator.isValidForm($('#currentUser'))){
      let {
        currentUser
      } = this.props;
      let {
        nickname,
        role,
        phone,
        email,
        verifyCode,
        password,
        avatar,
        captchaCode,
      } = this.state;
      this.props.signup(currentUser.id, nickname, role, phone, email, verifyCode, password, avatar, captchaCode);
    }
    e.preventDefault();
  }

  handleImageLoaded() {
    Utils.stopSpin('avatar-spin-loader');
  }

  setIsChangePassword(isChangePassword){
    this.setState({isChangePassword});
  }

  delete(){
    this.props.remove(this.props.currentUser.id);
  }

  setIsDelete(isDelete){
    this.setState({isDelete});
  }

  setVerifyNickname(){
    let verifyNickname = this.refs.verifyNickname.value;
    this.setState({verifyNickname});
  }

  render() {
    let {
      locale,
      captcha,
      currentUser,
    } = this.props;
    let {
      counter,
      nickname,
      phone,
      email,
      // password,
      // repassword,
      verifyCode,
      isSendVerifyCode,
      avatar,
      captchaCode,
      isUploading,
      isPreview,
      isChangePassword,
      isDelete,
      verifyNickname,
    } = this.state;
    let LANG_USER = require('../../../../../locales/' + locale + '/user');
    let LANG_ACTION = require('../../../../../locales/' + locale + '/action');
    let LANG_MESSAGE = require('../../../../../locales/' + locale + '/message');
    let newNicknameHtml;
    let newPhoneHtml;
    let newEmailHtml;
    let nicknameHtml;
    let phoneHtml;
    let emailHtml;
    let avatarHtml;
    let avatarImageHtml;
    let previewClass;
    let cameraHtml;
    let verifyCodeHtml;
    let captchaHtml;
    let passwordHtml;
    let repasswordHtml;
    let actionsHtml;
    let deleteAccountContentHtml;
    let deleteAccountButtonHtml;

    let toggleChangePasswordHtml;


    if (isDelete){
      deleteAccountContentHtml = (
        <div className="row-wrapper">
          <div className="input-group width-100pc">
            <input
              type="text"
              id="nickname"
              ref="verifyNickname"
              className="form-control input-sm"
              data-my-validator="true"
              data-my-validator-required="true"
              data-my-validator-name=""
              data-my-validator-type="text"
              placeholder={`${LANG_MESSAGE['enter']}${LANG_USER.nickname}${LANG_MESSAGE['to-confirm']}`}
              onBlur={this.onBlur.bind(this)}
              style={{'float':'none','display':'inline-block'}}
              onChange={this.setVerifyNickname.bind(this)}
              autoComplete="off"
            />
          </div>
        </div>
      );
      deleteAccountButtonHtml = (
        <div className="dp-tbl">
          <div className="dp-tbl-cel" style={{'width':'48%'}}>
            <div className={`my-button my-button--gray-border width-100pc`} onClick={this.setIsDelete.bind(this, false)}>{LANG_ACTION.cancel}</div>
          </div>
          <div className="dp-tbl-cel" style={{'width':'10px'}}></div>
          <div className="dp-tbl-cel" style={{'width':'48%'}}>
            <div className={verifyNickname == nickname ? `my-button my-button--red width-100pc` : `my-button my-button--red width-100pc disabled`} onClick={verifyNickname == nickname ? this.delete.bind(this) : ``}>{LANG_USER['delete-account']}</div>
          </div>
        </div>
      );
    }
    else{
      if (isPreview){
        let phoneText;
        let emailText;
        nicknameHtml = (
          <div className="row-wrapper">
            <div className="input-group width-100pc">
              <span className="input-title">{LANG_USER['nickname']}</span>
              <div className="dp-inline-block mgl-10">{currentUser.nickname}</div>
            </div>
          </div>
        );
        phoneText = currentUser.phone;
        if (phoneText == ''){
          phoneText = LANG_USER.unset;
        }
        emailText = currentUser.email;
        if (emailText == ''){
          emailText = LANG_USER.unset;
        }
        phoneHtml = (
          <div className="row-wrapper">
            <div className="input-group width-100pc">
              <span className="input-title">{LANG_USER['phone']}</span>
              <div className="dp-inline-block mgl-10">{phoneText}</div>
            </div>
          </div>
        );
        emailHtml = (
          <div className="row-wrapper">
            <div className="input-group width-100pc">
              <span className="input-title">{LANG_USER['email']}</span>
              <div className="dp-inline-block mgl-10">{emailText}</div>
            </div>
          </div>
        );
        actionsHtml = (<div className={`my-button my-button--blue width-100pc`} onClick={this.setIsPreview.bind(this, false)}>{LANG_ACTION.edit}{LANG_USER.info}</div>);
      }
      else{
        newNicknameHtml = (
          <div className="row-wrapper">
            <div className="input-group width-100pc">
              <span className="input-title">{LANG_USER['nickname']}</span>
              <input
                type="text"
                id="nickname"
                ref="nickname"
                className="form-control input-sm"
                value={nickname}
                data-my-validator="true"
                data-my-validator-required="true"
                data-my-validator-name=""
                data-my-validator-type="text"
                placeholder={LANG_USER.nickname}
                onBlur={this.onBlur.bind(this)}
                style={{'float':'none','display':'inline-block'}}
                onChange={this.setNickname.bind(this)}
                autoComplete="off"
              />
            </div>
          </div>
        );
        newPhoneHtml = (
          <div className="row-wrapper">
            <div className="input-group width-100pc">
              <span className="input-title">{LANG_USER['phone']}</span>
              <input
                type="text"
                id="phone"
                ref="phone"
                className="form-control input-sm"
                value={phone}
                data-my-validator="true"
                data-my-validator-required="true"
                data-my-validator-name=""
                data-my-validator-type="number"
                placeholder={LANG_USER.phone}
                onBlur={this.onBlur.bind(this)}
                style={{'float':'none','display':'inline-block'}}
                onChange={this.setPhone.bind(this)}
                autoComplete="off"
              />
            </div>
          </div>
        );
        newEmailHtml = (
          <div className="row-wrapper">
            <div className="input-group width-100pc">
              <span className="input-title">{LANG_USER['email']}</span>
              <input
                type="text"
                id="email"
                ref="email"
                className="form-control input-sm"
                value={email}
                data-my-validator="true"
                data-my-validator-required="true"
                data-my-validator-name=""
                data-my-validator-type="email"
                placeholder={LANG_USER.email}
                onBlur={this.onBlur.bind(this)}
                style={{'float':'none','display':'inline-block'}}
                onChange={this.setEmail.bind(this)}
                autoComplete="off"
              />
            </div>
          </div>
        );
        if (isChangePassword){
          passwordHtml = (
            <div className="row-wrapper">
              <div className="input-group width-100pc">
                <span className="input-title">{LANG_USER['new']}{LANG_USER['password']}</span>
                <input
                  type="password"
                  id="password"
                  ref="password"
                  className="form-control input-sm"
                  data-my-validator="true"
                  data-my-validator-name=""
                  data-my-validator-min-length="6"
                  data-my-validator-max-length="20"
                  data-my-validator-type="password"
                  placeholder={`${LANG_USER['new']}${LANG_USER['password']}`}
                  onBlur={this.onBlur.bind(this)}
                  style={{'float':'none','display':'inline-block'}}
                  onChange={this.setPassword.bind(this)}
                  autoComplete="off"
                />
              </div>
            </div>
          );
          repasswordHtml = (
            <div className="row-wrapper">
              <div className="input-group width-100pc">
                <span className="input-title">{LANG_USER['repeat-new-password']}</span>
                <input
                  type="password"
                  id="repassword"
                  ref="repassword"
                  className="form-control input-sm"
                  data-my-validator="true"
                  data-my-validator-name={LANG_USER['passwords']}
                  data-my-validator-min-length="6"
                  data-my-validator-max-length="20"
                  data-my-validator-type="password"
                  placeholder={`${LANG_USER['new']}${LANG_USER['password']}`}
                  onBlur={this.onBlur.bind(this)}
                  data-my-validator-compare-id="password"
                  style={{'float':'none','display':'inline-block'}}
                  onChange={this.setRepassword.bind(this)}
                  autoComplete="off"
                />
              </div>
            </div>
          );
        }
        verifyCodeHtml = (
          <div className="row-wrapper">
            <div className="input-group" style={{'width':'48%'}}>
              <span className="input-title">{LANG_USER['verify-code']}</span>
              <input
                type="text"
                id="verify-code"
                ref="verify-code"
                className="form-control input-sm"
                value={verifyCode}
                data-my-validator="true"
                data-my-validator-required="true"
                data-my-validator-name=""
                data-my-validator-length="6"
                data-my-validator-type="number"
                onBlur={this.onBlur.bind(this)}
                style={{'float':'none','display':'inline-block'}}
                onChange={this.setVerifyCode.bind(this)}
                autoComplete="off"
              />
            </div>
            <div className={!isSendVerifyCode ? `fetch-verify-code my-button my-button--gray-border` : `fetch-verify-code my-button my-button--gray-border disabled`} onClick={!isSendVerifyCode ? this.fetchVerifyCode.bind(this) : ``}><div className="spin-loader" id="verify-code-spin-loader"></div>{!isSendVerifyCode ? LANG_USER['fetch-verify-code'] : `${counter}s${LANG_USER['re-fetch-verify-code']}`}</div>
          </div>
        );
        // TODO: when I have money;
        verifyCodeHtml = '';
        if (captcha != ''){
          captchaHtml = (
            <div className="row-wrapper">
              <div className="input-group" style={{'width':'48%'}}>
                <input
                  type="text"
                  id="captchaCode"
                  ref="captchaCode"
                  className="form-control input-sm"
                  value={captchaCode}
                  data-my-validator="true"
                  data-my-validator-required="true"
                  data-my-validator-name=""
                  data-my-validator-type="text"
                  style={{'float':'none','display':'inline-block'}}
                  onBlur={this.onBlur.bind(this)}
                  onChange={this.setCaptchaCode.bind(this)}
                  autoComplete="off"
                />
              </div>
              <div className="fetch-captcha-code" onClick={this.changeCaptcha.bind(this)} dangerouslySetInnerHTML={this.createCaptcha()}></div>
            </div>
          );
        }
        actionsHtml = (
          <div className="dp-tbl">
            <div className="dp-tbl-cel" style={{'width':'48%'}}>
              <div className={`my-button my-button--gray-border width-100pc`} onClick={this.setIsPreview.bind(this, true)}>{LANG_ACTION.cancel}</div>
            </div>
            <div className="dp-tbl-cel" style={{'width':'10px'}}></div>
            <div className="dp-tbl-cel" style={{'width':'48%'}}>
              <div className={`my-button my-button--blue width-100pc`} onClick={this.signup.bind(this)}>{LANG_ACTION.confirm}{LANG_ACTION.update}</div>
            </div>
          </div>
        );
        deleteAccountButtonHtml = (
          <div className={`my-button my-button--red width-100pc`} onClick={this.setIsDelete.bind(this, true)}>{LANG_USER['delete-account']}</div>
        );
        toggleChangePasswordHtml = (
          <div className="form-check step-content__text mgt-15 mgb-20">
            <label className="form-check-label fw-reg" style={{'marginBottom':'0'}}>
              <input
                type="checkbox"
                className="form-check-input"
                onClick={this.setIsChangePassword.bind(this, !isChangePassword)}
              />
              &nbsp;{`${LANG_ACTION['change']}${LANG_USER['password']}`}
            </label>
          </div>
        );
      }
    }

    cameraHtml = (<div className="camera-mask"><span className="icon fa fa-camera-retro"></span></div>);
    if (!isUploading && avatar != ''){
      avatarImageHtml = (<img className="" src={`${avatar}?imageView/1/w/${100}/h/${100}`} style={{'width':'100%'}} onLoad={this.handleImageLoaded.bind(this)}/>);
      previewClass = 'preview';
    }
    else{
      avatarImageHtml = (
        <span className="icon fa fa-camera-retro"></span>
      );
    }
    avatarHtml = (
      <div className="avatar-picker" id={`pickfiles`} onClick={isPreview ? this.setIsPreview.bind(this, false) : ``}>
        <div className={`avatar-holder ${previewClass}`}>
          <div className="spin-loader" id="avatar-spin-loader" style={{'zIndex':'999'}}></div>
          {avatarImageHtml}
          {cameraHtml}
        </div>
      </div>
    );

    return(
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-title" id="exampleModalLabel">{isDelete ? `${LANG_ACTION['are-you-sure']}?` : LANG_USER['my-account']}</span>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form className="signup" id="currentUser" onSubmit={this.signup.bind(this)} autoComplete="off">
            <div className="input-wapper">
              <div id="container" className={!isDelete ? `avatar-container` : `avatar-container hidden`}>
                {avatarHtml}
              </div>
              <div className={!isDelete ? `height-10` : `height-10 hidden`}></div>
              {newNicknameHtml}
              {nicknameHtml}
              {newPhoneHtml}
              {phoneHtml}
              {newEmailHtml}
              {emailHtml}
              {verifyCodeHtml}
              {toggleChangePasswordHtml}
              {passwordHtml}
              {repasswordHtml}
              {captchaHtml}
              {deleteAccountContentHtml}
              {deleteAccountButtonHtml}
            </div>
            <input type="submit" className="hidden"/>
          </form>
        </div>
        <div className="modal-footer">
          {actionsHtml}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let {
    locale,
    currentUser,
    captcha,
    isSendVerifyCode,
  } = state;
  return {
    locale,
    currentUser,
    captcha,
    isSendVerifyCode,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signup: (id, nickname, role, phone, email, verifyCode, password, avatar, captchaCode) => {
      dispatch(signup(id, nickname, role, phone, email, verifyCode, password, avatar, captchaCode));
    },
    remove: (id) => {
      dispatch(remove(id));
    },
    changeCaptcha: () => {
      dispatch(changeCaptcha());
    },
  };
}

MyAccount.contextTypes = {
  router: React.PropTypes.object
};

MyAccount.propTypes = {
  locale: React.PropTypes.string,
  isSendVerifyCode: React.PropTypes.bool,
  currentUser: React.PropTypes.object,
  captcha: React.PropTypes.string,
  signup: React.PropTypes.func,
  remove: React.PropTypes.func,
  changeCaptcha: React.PropTypes.func,
  setIsSendVerifyCode: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);