import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  setIsNotFound,
} from '../../actions/index';

import Validator from '../../../common/my_validator';
let validator = new Validator();

import Utils from '../../../common/utils';

import MobileNav from '../../components/MobileNav/Index';
import Nav from '../../components/Nav/Index';
import Footer from '../../components/Footer/Index';
import NotFound from '../NotFound/Index';
import '../../../../css/articles.css';

class ArticleForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      // backUrl: null,
      id: '',
      title: '',
      uniqueKey: '',
      author: '',
      preface: '',
      desc: '',
      cover: '',
      articleCategory: '',
      sequence: '',
      type: '',
      tag: '',
      isBanned: false,
      isPrivate: false,
      isAdminOnly: false,
      content: '',
      articleCategoryOptions: [],
      isUploading: false,
      isUseUrl: false,
    }
  }

  setIsLoading(bool) {
    this.setState({isLoading: bool});
  }

  componentDidMount() {
    if (!_.isNull(this.props.currentUser) && this.props.currentUser.role == 'admin'){
      this.fetchArticleCategoryOptions();
      if (this.props.params.id){
        this.fetchArticle(this.props.params.id);
      }
    }
    else{
      this.props.setIsNotFound(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.params.id && (prevState.uniqueKey == '' && this.state.uniqueKey != '')){
      this.setIsLoading(false);
    }
  }

  fetchArticle(id) {
    Utils.initSpin('spin-loader');
    this.fetchArticleApi(id).then((res) => {
      if (res.code === 0){
        if (res.data.length){
          let {
            id,
            title,
            uniqueKey,
            author,
            preface,
            desc,
            cover,
            articleCategory,
            sequence,
            type,
            tag,
            isBanned,
            isPrivate,
            isAdminOnly,
            content,
          } = res.data[0];
          this.setState({
            id: id,
            title: title,
            uniqueKey: uniqueKey,
            author: author,
            preface: preface,
            desc: desc,
            cover: cover,
            articleCategory: articleCategory,
            sequence: sequence,
            type: type,
            tag: tag,
            isBanned: isBanned,
            isPrivate: isPrivate,
            isAdminOnly: isAdminOnly,
            content: content,
          });
        }
        else{
          this.props.setIsNotFound(true);
        }
      }
      else{
        if(res.msg){
          alert(res.msg);
        }
      }
      Utils.stopSpin('spin-loader');
    }).catch((err) => {
      // debugger;
      // alert('网络错误，请重试');
      console.log(err);
      Utils.stopSpin('spin-loader');
    });
  }

  fetchArticleApi(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/api/articles/' + id,
        type: 'get',
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        }
      });
    })
  }

  handleImageLoaded() {
    Utils.stopSpin('cover-spin-loader');
  }

  removeErrorMessage(id){
    validator.removeValidate($('#' + id));
  }

  onBlur(e){
    validator.validate($('#' + e.target.id), e.target.dataset.myValidatorName, this.props.locale);
  }

  setTitle(e){
    this.removeErrorMessage(e.target.id);
    let title = this.refs.title.value;
    this.setState({title});
  }

  setCover(e){
    this.removeErrorMessage(e.target.id);
    let cover = this.refs.cover.value;
    this.setState({cover});
  }

  setUniqueKey(e){
    this.removeErrorMessage(e.target.id);
    let uniqueKey = this.refs.uniqueKey.value;
    this.setState({uniqueKey});
  }

  setAuthor(e){
    this.removeErrorMessage(e.target.id);
    let author = this.refs.author.value;
    this.setState({author});
  }

  setPreface(e) {
    this.removeErrorMessage(e.target.id);
    let preface = this.refs.preface.value;
    this.setState({preface});
  }

  setDesc(e) {
    this.removeErrorMessage(e.target.id);
    let desc = this.refs.desc.value;
    this.setState({desc});
  }

  setType(e) {
    this.removeErrorMessage(e.target.id);
    let type = this.refs.type.value;
    this.setState({type});
  }

  setSequence(e) {
    this.removeErrorMessage(e.target.id);
    let sequence = this.refs.sequence.value;
    this.setState({sequence});
  }

  setTag(e) {
    this.removeErrorMessage(e.target.id);
    let tag = this.refs.tag.value;
    this.setState({tag});
  }

  setArticleCategory() {
    let articleCategory = this.refs.articleCategory.value;
    this.setState({articleCategory});
  }

  fetchArticleCategoryOptions() {
    Utils.initSpin('spin-loader');
    this.fetchArticleCategoryOptionsApi().then((res) => {
      if (res.code === 0){
        this.setState({articleCategoryOptions: res.data});
        if (res.data.length){
          if (_.isUndefined(this.props.params.id)){
            this.setState({articleCategory: res.data[0].uniqueKey});
          }
        }
      }
      else{
        if(res.msg){
          alert(res.msg);
        }
      }
      if (!this.props.params.id){
        this.setIsLoading(false);
      }
      Utils.stopSpin('spin-loader');
    }).catch((err) => {
      // debugger;
      // alert('网络错误，请重试');
      console.log(err);
      Utils.stopSpin('spin-loader');
    });
  }

  fetchArticleCategoryOptionsApi() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/api/article_categories/options',
        type: 'get',
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        }
      });
    })
  }

  submit(e){
    if (validator.isValidForm($('#submit'))){
      let {
        id,
        title,
        uniqueKey,
        author,
        preface,
        desc,
        cover,
        articleCategory,
        sequence,
        type,
        tag,
        isBanned,
        isPrivate,
        isAdminOnly,
        content,
      } = this.state;
      this.submitForm(id, title, uniqueKey, author, preface, desc, cover, articleCategory, sequence, type, tag, isBanned, isPrivate, isAdminOnly, content);
    }
    e.preventDefault();
  }

  submitForm(id, title, uniqueKey, author, preface, desc, cover, articleCategory, sequence, type, tag, isBanned, isPrivate, isAdminOnly, content){
    Utils.initSpin('spin-loader');
    this.submitFormApi(id, title, uniqueKey, author, preface, desc, cover, articleCategory, sequence, type, tag, isBanned, isPrivate, isAdminOnly, content).then((res) => {
      if (res.code === 0){
        this.context.router.push('/articles/' + res.uniqueKey);
      }
      else if (res.code === 3){
        if (!$('#uniqueKey').parent().siblings('.my-validator-message').length) {
          validator.createMessage($('#uniqueKey').parent(), res.msg, 'error');
        }
      }
      Utils.stopSpin('spin-loader');
    }).catch((err) => {
      // debugger;
      // alert('网络错误，请重试');
      console.log(err);
      Utils.stopSpin('spin-loader');
    });
  }

  submitFormApi(id, title, uniqueKey, author, preface, desc, cover, articleCategory, sequence, type, tag, isBanned, isPrivate, isAdminOnly, content){
    let url = '/api/articles';
    let method = 'post';
    if (id != ''){
      url = `/api/articles/${id}`;
      method = 'put';
    }
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: method,
        data: {id, title, uniqueKey, author, preface, desc, cover, articleCategory, sequence, type, tag, isBanned, isPrivate, isAdminOnly, content},
        success: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        }
      });
    })
  }

  setIsBanned(val){
    this.setState({isBanned:val});
  }

  setIsPrivate(val){
    this.setState({isPrivate:val});
  }

  setIsAdminOnly(val){
    this.setState({isAdminOnly:val});
  }

  setIsUseUrl(val){
    this.setState({isUseUrl:val});
  }

  go(url) {
    this.context.router.push(url);
  }

  handleEditorChange() {
    let val = this.refs['content'].value;
    this.setState({content: val});
  }

  render() {
    let contentHtml;
    let {
      locale,
      isNotFound,
      articleList,
      // currentUser,
    } = this.props;
    let {
      isLoading,
      isUploading,
      // id,
      title,
      uniqueKey,
      author,
      preface,
      desc,
      cover,
      articleCategory,
      sequence,
      type,
      tag,
      isBanned,
      isPrivate,
      isAdminOnly,
      content,
      articleCategoryOptions,
      isUseUrl,
    } = this.state;
    if (isNotFound){
      contentHtml = (<NotFound />);
    }
    else{
      let LANG_ARTICLE = require('../../../../../locales/' + locale + '/article');
      let LANG_ACTION = require('../../../../../locales/' + locale + '/action');
      // let LANG_GENERAL = require('../../../../../locales/' + locale + '/general');
      let LANG_NAV = require('../../../../../locales/' + locale + '/nav');
      let coverUrlHtml;
      let coverHtml;
      let coverImageHtml;
      let previewClass;
      let cameraHtml = (<div className="camera-mask"><span className="icon fa fa-camera-retro"></span></div>);
      if (!isUploading && cover != ''){
        // coverImageHtml = (<img className="" src={`${cover}?imageView/1/w/${300}/h/${300}`} style={{'width':'100%'}} onLoad={this.handleImageLoaded.bind(this)}/>);
        coverImageHtml = (<img className="" src={`${cover}`} style={{'width':'100%'}} onLoad={this.handleImageLoaded.bind(this)}/>);
        previewClass = 'preview';
      }
      if (isUseUrl){
        coverUrlHtml = (
          <div className="row-wrapper">
            <div className="title">{LANG_ARTICLE['cover']}</div>
            <div className="input-group width-100pc">
              <input
                type="text"
                id="cover"
                ref="cover"
                className="form-control input-sm"
                value={cover}
                data-my-validator="true"
                data-my-validator-required="false"
                data-my-validator-name=""
                data-my-validator-type="text"
                placeholder={LANG_ARTICLE['cover']}
                onBlur={this.onBlur.bind(this)}
                style={{'float':'none','display':'inline-block'}}
                onChange={this.setCover.bind(this)}
                autoComplete="off"
              />
            </div>
          </div>
        );
      }
      else{
        coverHtml = (
          <div className="cover-picker" id="pickfiles">
            <div className={`cover-holder ${previewClass}`}>
              <div className="spin-loader" id="cover-spin-loader" style={{'zIndex':'999'}}></div>
              {coverImageHtml}
              {cameraHtml}
            </div>
          </div>
        );
      }
      // let articleListHtml;
      let articleCategoryOptionsHtml;
      if (!isLoading){
        if (articleCategoryOptions.length){
          articleCategoryOptionsHtml = articleCategoryOptions.map((item, key) => {
            return (
              <option key={key} value={item.uniqueKey}>{item.title}</option>
            );
          });
        }
        // let backUrl = this.state.backUrl;
        contentHtml = (
          <div className="page-content article background-white">
            <MobileNav isIndex={false} activeTab="articles"/>
            <Nav isIndex={false} activeTab="articles"/>
            <div className="core-content background-white">
              <div className="core">
                <div className="my-button my-button--red" onClick={uniqueKey == '' ? this.go.bind(this, '/articles/') : this.go.bind(this, '/articles/' + uniqueKey)}>{LANG_NAV['back']}</div>
                <form className="submit" id="submit" onSubmit={this.submit.bind(this)} autoComplete="off">
                  <div className="form-check step-content__text mgt-15 mgb-20">
                    <label className="form-check-label fw-reg" style={{'marginBottom':'0'}}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onClick={this.setIsUseUrl.bind(this, !isUseUrl)}
                        checked={isUseUrl}
                      />
                      &nbsp;<span className="">{`${LANG_ARTICLE['use-image-url']}`}</span>
                    </label>
                  </div>
                  <div id="container" className="cover-container">
                    {coverUrlHtml}
                    {coverHtml}
                  </div>
                  <div className="row-wrapper">
                    <div className="title">{LANG_ARTICLE['title']}</div>
                    <div className="input-group width-100pc">
                      <input
                        type="text"
                        id="title"
                        ref="title"
                        className="form-control input-sm"
                        value={title}
                        data-my-validator="true"
                        data-my-validator-required="true"
                        data-my-validator-name=""
                        data-my-validator-type="text"
                        placeholder={LANG_ARTICLE['title']}
                        onBlur={this.onBlur.bind(this)}
                        style={{'float':'none','display':'inline-block'}}
                        onChange={this.setTitle.bind(this)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="row-wrapper">
                    <div className="title">{LANG_ARTICLE['unique-key']}</div>
                    <div className="input-group width-100pc">
                      <input
                        type="text"
                        id="uniqueKey"
                        ref="uniqueKey"
                        className="form-control input-sm"
                        value={uniqueKey}
                        data-my-validator="true"
                        data-my-validator-required="true"
                        data-my-validator-name=""
                        data-my-validator-type="text"
                        placeholder={LANG_ARTICLE['unique-key']}
                        onBlur={this.onBlur.bind(this)}
                        style={{'float':'none','display':'inline-block'}}
                        onChange={this.setUniqueKey.bind(this)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="row-wrapper">
                    <div className="title">{LANG_ARTICLE['author']}</div>
                    <div className="input-group width-100pc">
                      <input
                        type="text"
                        id="author"
                        ref="author"
                        className="form-control input-sm"
                        value={author}
                        data-my-validator="true"
                        data-my-validator-required="true"
                        data-my-validator-name=""
                        data-my-validator-type="text"
                        placeholder={LANG_ARTICLE['author']}
                        onBlur={this.onBlur.bind(this)}
                        style={{'float':'none','display':'inline-block'}}
                        onChange={this.setAuthor.bind(this)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="row-wrapper">
                    <div className="title">{LANG_ARTICLE['preface']}</div>
                    <div className="input-group width-100pc">
                      <input
                        type="text"
                        id="preface"
                        ref="preface"
                        className="form-control input-sm"
                        value={preface}
                        data-my-validator="true"
                        data-my-validator-required="false"
                        data-my-validator-name=""
                        data-my-validator-type="text"
                        placeholder={LANG_ARTICLE['preface']}
                        onBlur={this.onBlur.bind(this)}
                        style={{'float':'none','display':'inline-block'}}
                        onChange={this.setPreface.bind(this)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="row-wrapper">
                    <div className="title">{LANG_ARTICLE['desc']}</div>
                    <div className="input-group width-100pc">
                      <input
                        type="text"
                        id="desc"
                        ref="desc"
                        className="form-control input-sm"
                        value={desc}
                        data-my-validator="true"
                        data-my-validator-required="false"
                        data-my-validator-name=""
                        data-my-validator-type="text"
                        placeholder={LANG_ARTICLE['desc']}
                        onBlur={this.onBlur.bind(this)}
                        style={{'float':'none','display':'inline-block'}}
                        onChange={this.setDesc.bind(this)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="row-wrapper">
                    <div className="title">{LANG_ARTICLE['type']}</div>
                    <div className="input-group width-100pc">
                      <input
                        type="text"
                        id="type"
                        ref="type"
                        className="form-control input-sm"
                        value={type}
                        data-my-validator="true"
                        data-my-validator-required="false"
                        data-my-validator-name=""
                        data-my-validator-type="text"
                        placeholder={LANG_ARTICLE['type']}
                        onBlur={this.onBlur.bind(this)}
                        style={{'float':'none','display':'inline-block'}}
                        onChange={this.setType.bind(this)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="row-wrapper">
                    <div className="title">{LANG_NAV['article-category']}</div>
                    <div className="input-group width-100pc" style={{'position':'relative','background':'#fff'}}>
                      <select
                        ref="articleCategory"
                        onChange={this.setArticleCategory.bind(this)}
                        style={{'float':'none','display':'inline-block','paddingRight':'28px', 'paddingLeft':'8px', 'height':'30px', 'width':'100%', 'borderColor':'#ccc'}}
                        value={articleCategory}
                      >
                        {articleCategoryOptionsHtml}
                      </select>
                      <div className="select-arrow"></div>
                    </div>
                  </div>
                  <div className="row-wrapper">
                    <div className="title">{LANG_ARTICLE['sequence']}</div>
                    <div className="input-group width-100pc">
                      <input
                        type="text"
                        id="sequence"
                        ref="sequence"
                        className="form-control input-sm"
                        value={sequence}
                        data-my-validator="true"
                        data-my-validator-required="false"
                        data-my-validator-name=""
                        data-my-validator-type="number"
                        placeholder={LANG_ARTICLE['sequence']}
                        onBlur={this.onBlur.bind(this)}
                        style={{'float':'none','display':'inline-block'}}
                        onChange={this.setSequence.bind(this)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="row-wrapper">
                    <div className="title">{LANG_ARTICLE['tag']}</div>
                    <div className="input-group width-100pc">
                      <input
                        type="text"
                        id="tag"
                        ref="tag"
                        className="form-control input-sm"
                        value={tag}
                        data-my-validator="true"
                        data-my-validator-required="false"
                        data-my-validator-name=""
                        data-my-validator-type="text"
                        placeholder={LANG_ARTICLE['tag']}
                        onBlur={this.onBlur.bind(this)}
                        style={{'float':'none','display':'inline-block'}}
                        onChange={this.setTag.bind(this)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="title">{LANG_ARTICLE['content']}</div>
                  <textarea
                    ref={`content`}
                    value={content}
                    onChange={this.handleEditorChange.bind(this)}
                  />
                  <div className="height-20"></div>
                  <div className="form-check step-content__text mgt-15 mgb-20">
                    <label className="form-check-label fw-reg" style={{'marginBottom':'0'}}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onClick={this.setIsBanned.bind(this, !isBanned)}
                        checked={isBanned}
                      />
                      &nbsp;<span className="">{`${LANG_ARTICLE['banned']}`}</span>
                    </label>
                  </div>
                  <div className="form-check step-content__text mgt-15 mgb-20">
                    <label className="form-check-label fw-reg" style={{'marginBottom':'0'}}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onClick={this.setIsPrivate.bind(this, !isPrivate)}
                        checked={isPrivate}
                      />
                      &nbsp;<span className="">{`${LANG_ARTICLE['private']}`}</span>
                    </label>
                  </div>
                  <div className="form-check step-content__text mgt-15 mgb-20">
                    <label className="form-check-label fw-reg" style={{'marginBottom':'0'}}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onClick={this.setIsAdminOnly.bind(this, !isAdminOnly)}
                        checked={isAdminOnly}
                      />
                      &nbsp;<span className="">{`${LANG_ARTICLE['admin-only']}`}</span>
                    </label>
                  </div>
                  <div className="submit-button my-button my-button--blue" onClick={this.submit.bind(this)}>{LANG_ACTION.confirm}</div>
                  <div className="height-20"></div>
                  <input type="submit" className="hidden"/>
                  <div id="contentContainer" className="hidden"><div id="contentFilePicker"></div></div>
                </form>
              </div>
              <div className="push"></div>
            </div>
            <Footer/>
          </div>
        );
      }
    }
    return(
      <div className="page">
        {contentHtml}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let {
    locale,
    articleList,
    isNotFound,
    currentUser,
  } = state;
  return {
    locale,
    articleList,
    isNotFound,
    currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticleList: () => {
      dispatch(fetchArticleList());
    },
    setIsNotFound: (val) => {
      dispatch(setIsNotFound(val));
    },
  };
}

ArticleForm.contextTypes = {
  router: React.PropTypes.object
};

ArticleForm.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
  isLoading: React.PropTypes.bool,
  locale: React.PropTypes.string,
  currentUser: React.PropTypes.object,
  articleList: React.PropTypes.array,
  fetchArticleList: React.PropTypes.func,
  setIsNotFound: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);