/*! For license information please see systemtags-systemtags.js.LICENSE.txt */
!function(){var e,i={30213:function(){OCA.SystemTags||(OCA.SystemTags={}),OCA.SystemTags.App={initFileList:function(e){return this._fileList||(this._fileList=new OCA.SystemTags.FileList(e,{id:"systemtags",fileActions:this._createFileActions(),config:OCA.Files.App.getFilesConfig(),shown:!0}),this._fileList.appName=t("systemtags","Tags")),this._fileList},removeFileList:function(){this._fileList&&this._fileList.$fileList.empty()},_createFileActions:function(){var t=new OCA.Files.FileActions;return t.registerDefaultActions(),t.merge(OCA.Files.fileActions),this._globalActionsInitialized||(this._onActionsUpdated=_.bind(this._onActionsUpdated,this),OCA.Files.fileActions.on("setDefault.app-systemtags",this._onActionsUpdated),OCA.Files.fileActions.on("registerAction.app-systemtags",this._onActionsUpdated),this._globalActionsInitialized=!0),t.register("dir","Open",OC.PERMISSION_READ,"",(function(t,e){OCA.Files.App.setActiveView("files",{silent:!0}),OCA.Files.App.fileList.changeDirectory(OC.joinPaths(e.$file.attr("data-path"),t),!0,!0)})),t.setDefault("dir","Open"),t},_onActionsUpdated:function(t){this._fileList&&(t.action?this._fileList.fileActions.registerAction(t.action):t.defaultAction&&this._fileList.fileActions.setDefault(t.defaultAction.mime,t.defaultAction.name))},destroy:function(){OCA.Files.fileActions.off("setDefault.app-systemtags",this._onActionsUpdated),OCA.Files.fileActions.off("registerAction.app-systemtags",this._onActionsUpdated),this.removeFileList(),this._fileList=null,delete this._globalActionsInitialized}},window.addEventListener("DOMContentLoaded",(function(){$("#app-content-systemtagsfilter").on("show",(function(t){OCA.SystemTags.App.initFileList($(t.target))})),$("#app-content-systemtagsfilter").on("hide",(function(){OCA.SystemTags.App.removeFileList()}))}))},22609:function(){OCA.SystemTags=_.extend({},OCA.SystemTags),OCA.SystemTags||(OCA.SystemTags={}),OCA.SystemTags.FilesPlugin={ignoreLists:["trashbin","files.public"],attach:function(t){if(!(this.ignoreLists.indexOf(t.id)>=0||OCA.SystemTags.View)){var e=new OCA.SystemTags.SystemTagsInfoView;t.registerDetailView(e),OCA.SystemTags.View=e}}},OC.Plugins.register("OCA.Files.FileList",OCA.SystemTags.FilesPlugin)},19294:function(t,e,i){"use strict";i(30213),i(99641),i(22609),i(36670);var s=i(93379),n=i.n(s),l=i(7795),o=i.n(l),a=i(90569),r=i.n(a),c=i(3565),d=i.n(c),f=i(19216),u=i.n(f),h=i(44589),g=i.n(h),p=i(79891),m={};m.styleTagTransform=g(),m.setAttributes=d(),m.insert=r().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=u(),n()(p.Z,m),p.Z&&p.Z.locals&&p.Z.locals,window.OCA.SystemTags=OCA.SystemTags},99641:function(){var e;(e=function(t,e){this.initialize(t,e)}).prototype=_.extend({},OCA.Files.FileList.prototype,{id:"systemtagsfilter",appName:t("systemtags","Tagged files"),_systemTagIds:[],_lastUsedTags:[],_clientSideSort:!0,_allowSelection:!1,_filterField:null,initialize:function(t,e){if(OCA.Files.FileList.prototype.initialize.apply(this,arguments),!this.initialized){e&&e.systemTagIds&&(this._systemTagIds=e.systemTagIds),OC.Plugins.attach("OCA.SystemTags.FileList",this);var i=this.$el.find("#controls").empty();_.defer(_.bind(this._getLastUsedTags,this)),this._initFilterField(i)}},destroy:function(){this.$filterField.remove(),OCA.Files.FileList.prototype.destroy.apply(this,arguments)},_getLastUsedTags:function(){var t=this;$.ajax({type:"GET",url:OC.generateUrl("/apps/systemtags/lastused"),success:function(e){t._lastUsedTags=e}})},_initFilterField:function(e){var i=this;return this.$filterField=$('<input type="hidden" name="tags"/>'),e.append(this.$filterField),this.$filterField.select2({placeholder:t("systemtags","Select tags to filter by"),allowClear:!1,multiple:!0,toggleSelect:!0,separator:",",query:_.bind(this._queryTagsAutocomplete,this),id:function(t){return t.id},initSelection:function(t,e){var i=$(t).val().trim();if(i){var s=i.split(","),n=[];OC.SystemTags.collection.fetch({success:function(){_.each(s,(function(t){var e=OC.SystemTags.collection.get(t);_.isUndefined(e)||n.push(e.toJSON())})),e(n)}})}else e([])},formatResult:function(t){return OC.SystemTags.getDescriptiveTag(t)},formatSelection:function(t){return OC.SystemTags.getDescriptiveTag(t)[0].outerHTML},sortResults:function(t){return t.sort((function(t,e){var s=i._lastUsedTags.indexOf(t.id),n=i._lastUsedTags.indexOf(e.id);return s!==n?-1===n?-1:-1===s?1:s<n?-1:1:OC.Util.naturalSortCompare(t.name,e.name)})),t},escapeMarkup:function(t){return t},formatNoMatches:function(){return t("systemtags","No tags found")}}),this.$filterField.on("change",_.bind(this._onTagsChanged,this)),this.$filterField},_queryTagsAutocomplete:function(t){OC.SystemTags.collection.fetch({success:function(){var e=OC.SystemTags.collection.filterByName(t.term);t.callback({results:_.invoke(e,"toJSON")})}})},_onUrlChanged:function(t){if(t.dir){var e=_.filter(t.dir.split("/"),(function(t){return""!==t.trim()}));this.$filterField.select2("val",e||[]),this._systemTagIds=e,this.reload()}},_onTagsChanged:function(t){var e=$(t.target).val().trim();this._systemTagIds=""!==e?e.split(","):[],this.$el.trigger($.Event("changeDirectory",{dir:this._systemTagIds.join("/")})),this.reload()},updateEmptyContent:function(){var e=this.getCurrentDirectory();"/"===e?(this._systemTagIds.length?this.$el.find("#emptycontent").html('<div class="icon-systemtags"></div><h2>'+t("systemtags","No files found for the selected tags")+"</h2>"):this.$el.find("#emptycontent").html('<div class="icon-systemtags"></div><h2>'+t("systemtags","Please select tags to filter by")+"</h2>"),this.$el.find("#emptycontent").toggleClass("hidden",!this.isEmpty),this.$el.find("#filestable thead th").toggleClass("hidden",this.isEmpty)):OCA.Files.FileList.prototype.updateEmptyContent.apply(this,arguments)},getDirectoryPermissions:function(){return OC.PERMISSION_READ|OC.PERMISSION_DELETE},updateStorageStatistics:function(){},reload:function(){if(this._setCurrentDir("/",!1),!this._systemTagIds.length)return this.updateEmptyContent(),this.setFiles([]),$.Deferred().resolve();this._selectedFiles={},this._selectionSummary.clear(),this._currentFileModel&&this._currentFileModel.off(),this._currentFileModel=null,this.$el.find(".select-all").prop("checked",!1),this.showMask(),this._reloadCall=this.filesClient.getFilteredFiles({systemTagIds:this._systemTagIds},{properties:this._getWebdavProperties()}),this._detailsView&&this._updateDetailsView(null);var t=this.reloadCallback.bind(this);return this._reloadCall.then(t,t)},reloadCallback:function(t,e){return e&&e.unshift({}),OCA.Files.FileList.prototype.reloadCallback.call(this,t,e)}}),OCA.SystemTags.FileList=e},36670:function(){!function(t){function e(t){var e=t.toJSON();return OC.isUserAdmin()||e.canAssign||(e.locked=!0),e}var i=t.Files.DetailFileInfoView.extend({_rendered:!1,className:"systemTagsInfoView",name:"systemTags",id:"systemTagsInfoView",_inputView:null,initialize:function(t){var i=this;t=t||{},this._inputView=new OC.SystemTags.SystemTagsInputField({multiple:!0,allowActions:!0,allowCreate:!0,isAdmin:OC.isUserAdmin(),initSelection:function(t,s){s(i.selectedTagsCollection.map(e))}}),this.selectedTagsCollection=new OC.SystemTags.SystemTagsMappingCollection([],{objectType:"files"}),this._inputView.collection.on("change:name",this._onTagRenamedGlobally,this),this._inputView.collection.on("remove",this._onTagDeletedGlobally,this),this._inputView.on("select",this._onSelectTag,this),this._inputView.on("deselect",this._onDeselectTag,this)},_onSelectTag:function(t){this.selectedTagsCollection.create(t.toJSON())},_onDeselectTag:function(t){this.selectedTagsCollection.get(t).destroy()},_onTagRenamedGlobally:function(t){var e=this.selectedTagsCollection.get(t.id);e&&e.set(t.toJSON())},_onTagDeletedGlobally:function(t){this.selectedTagsCollection.remove(t)},setFileInfo:function(t){var i=this;this._rendered||this.render(),t&&(this.selectedTagsCollection.setObjectId(t.id),this.selectedTagsCollection.fetch({success:function(t){t.fetched=!0;var s=t.map(e);i._inputView.setData(s),s.length>0&&i.show()}})),this.hide()},render:function(){this.$el.append(this._inputView.$el),this._inputView.render()},isVisible:function(){return!this.$el.hasClass("hidden")},show:function(){this.$el.removeClass("hidden")},hide:function(){this.$el.addClass("hidden")},toggle:function(){this.$el.toggleClass("hidden")},openDropdown:function(){this.$el.find(".systemTagsInputField").select2("open")},remove:function(){this._inputView.remove()}});t.SystemTags.SystemTagsInfoView=i}(OCA)},79891:function(t,e,i){"use strict";var s=i(87537),n=i.n(s),l=i(23645),o=i.n(l)()(n());o.push([t.id,"#app-content-systemtagsfilter .select2-container{width:30%;margin-left:10px}#app-sidebar .app-sidebar-header__action .tag-label{cursor:pointer;padding:13px 0;display:flex;color:var(--color-text-light);position:relative;margin-top:-20px}","",{version:3,sources:["webpack://./apps/systemtags/src/css/systemtagsfilelist.scss"],names:[],mappings:"AASA,iDACC,SAAA,CACA,gBAAA,CAGD,oDACC,cAAA,CACA,cAAA,CACA,YAAA,CACA,6BAAA,CACA,iBAAA,CACA,gBAAA",sourcesContent:["/*\n * Copyright (c) 2016\n *\n * This file is licensed under the Affero General Public License version 3\n * or later.\n *\n * See the COPYING-README file.\n *\n */\n#app-content-systemtagsfilter .select2-container {\n\twidth: 30%;\n\tmargin-left: 10px;\n}\n\n#app-sidebar .app-sidebar-header__action .tag-label {\n\tcursor: pointer;\n\tpadding: 13px 0;\n\tdisplay: flex;\n\tcolor: var(--color-text-light);\n\tposition: relative;\n\tmargin-top: -20px;\n}\n"],sourceRoot:""}]),e.Z=o}},s={};function n(t){var e=s[t];if(void 0!==e)return e.exports;var l=s[t]={id:t,loaded:!1,exports:{}};return i[t].call(l.exports,l,l.exports,n),l.loaded=!0,l.exports}n.m=i,n.amdD=function(){throw new Error("define cannot be used indirect")},n.amdO={},e=[],n.O=function(t,i,s,l){if(!i){var o=1/0;for(d=0;d<e.length;d++){i=e[d][0],s=e[d][1],l=e[d][2];for(var a=!0,r=0;r<i.length;r++)(!1&l||o>=l)&&Object.keys(n.O).every((function(t){return n.O[t](i[r])}))?i.splice(r--,1):(a=!1,l<o&&(o=l));if(a){e.splice(d--,1);var c=s();void 0!==c&&(t=c)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[i,s,l]},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t},n.j=9698,function(){n.b=document.baseURI||self.location.href;var t={9698:0};n.O.j=function(e){return 0===t[e]};var e=function(e,i){var s,l,o=i[0],a=i[1],r=i[2],c=0;if(o.some((function(e){return 0!==t[e]}))){for(s in a)n.o(a,s)&&(n.m[s]=a[s]);if(r)var d=r(n)}for(e&&e(i);c<o.length;c++)l=o[c],n.o(t,l)&&t[l]&&t[l][0](),t[l]=0;return n.O(d)},i=self.webpackChunknextcloud=self.webpackChunknextcloud||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}(),n.nc=void 0;var l=n.O(void 0,[7874],(function(){return n(19294)}));l=n.O(l)}();
//# sourceMappingURL=systemtags-systemtags.js.map?v=8eca3de81e89d6efedfd