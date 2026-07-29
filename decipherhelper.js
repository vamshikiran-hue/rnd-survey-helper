<!DOCTYPE html>
<html class="bui-buttons bui-icons" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />

<title>Editing Survey XML</title>

<!-- bui -->
<link rel="stylesheet" href="/apps/static/lumos/support/bui/dist/bui.css?28a2f8e229" />

<!-- DUX Foundation -->
<link rel="stylesheet" href="/s/shared/dux/normalize.css?d66ee95ed6" />
<link rel="stylesheet" href="/s/shared/dux/dux.css?e65a6484d3" />

<!-- Decipher Plugins -->
<link rel="stylesheet" href="/s/global.css?bb96f25345" />
<link rel="stylesheet" href="/s/mobilewarnings.css?8433787a7a">
<link rel="stylesheet" href="/s/launchproject/launchproject.css?eab22b54e1"/>
<link rel="stylesheet" href="/s/launchproject/launch.css?cb96676417"/>
<link rel="stylesheet" href="/s/project-summary.main.css?eb7a647dda"/>
<link rel="stylesheet" href="/s/fonts/iconFonts.css?70b7432318"/>
<link rel="stylesheet" href="/apps/static/takesurvey/takesurvey.css?4789aa8140">
<link rel="stylesheet" href="/s/shared/navbar/navbar.css?760cb5dbdd"/>
<link rel="stylesheet" href="/s/framework.css?78c1cb8b3d"/>
<link rel="stylesheet" href="/s/ptw/framework.main.css?695128a99f"/>
<link rel="stylesheet" href="/s/cms/tasks.css?5bd0d60e72"/>
<link rel="stylesheet" href="/s/shared/navbar/navbar.main.css?7ef2cf705e"/>
<link rel="stylesheet" href="/s/support/fontawesome/css/font-awesome.css?2dedbce405"/>
<link rel="stylesheet" href="/s/dui.css?1c6938bb3b" />

<!-- Third Party Plugins -->
<link rel="stylesheet" href="/s/support/jquery-ui-1.9.2.custom/css/smoothness/jquery-ui-1.9.2.custom.min.css?ad7753b880" />
<link rel="stylesheet" href="/s/support/jquery-ui-1.9.2.custom/css/smoothness/jquery-ui-1.9.2.beacon.css?4ddb951d43"/>
<link rel="stylesheet" href="/s/support/bootstrap-2.1/css/bootstrap.min.css?37f4cb40fe" />
<link href="/s/support/font-awesome-4.6.3/css/font-awesome.min.css?4083f5d376" rel="stylesheet"/>
<link rel="stylesheet" href="/s/support/toastr/toastr.css?972923eb40" />
<link rel="stylesheet" href="/s/support/codemirror-5.65.20/lib/codemirror.css?ce804ae97a" />
<link rel="stylesheet" href="/s/support/codemirror-5.65.20/addon/dialog/dialog.css?c89dce10b4" />
<link rel="stylesheet" href="/s/support/tipped-3.1.8/tipped.css?3a8bc445bc" />

<!-- App Specific -->
<link rel="stylesheet" href="/apps/static/lumos/xmleditor/main.css?ad73b21ed2" />

<script type="text/javascript" src="/s/jquery183.all.js?6bb9029f8c"></script>
<script type="text/javascript" src="/s/jquery.tojson.js?56fdd8b667"></script>
<script type="text/javascript" src="/s/base.js?4bf7791c54"></script>
<script type="text/javascript" src="/s/controller.js?b430b33abd"></script>
<script type="text/javascript" src="/s/observer.js?a4273ef459"></script>
<script type="text/javascript" src="/s/assert.js?55f3deffb6"></script>
<script type="text/javascript" src="/s/jquery.decipher.js?3c76dcc8e5"></script>
<script type="text/javascript" src="/s/uniqueids.js?3940dc2372"></script>
<script type="text/javascript" src="/s/jstemplate.js?fc1ccb159b"></script>
<script type="text/javascript" src="/s/templates.js?e16b1e8ada"></script>
<script type="text/javascript" src="/s/heartbeat.js?cdeb3e7c3a"></script>

<script type="text/javascript">
var featureFlags = {};
</script>
<script type="text/javascript" src="/s/i18n/messages.js?b54d82e05e"></script>
<script type="text/javascript" src="/s/framework.js?a6d596c65a"></script>
<script type="text/javascript" src="/s/helper.js?6ab477cf6c"></script>
<script type="text/javascript" src="/s/sst.js?4de12d4437"></script>
<script type="text/javascript" src="/s/mobilewarnings.js?b8bca72eb1"></script>
<script type="text/javascript" src="/s/launchproject/launchproject.all.js?ca23cf7479"></script>
<script type="text/javascript" src="/s/projectsummary.js?f64bc0a11b"></script>
<script type="text/javascript" src="/s/progressbar.js?97d09fc7f6"></script>
<script type="text/javascript" src="/s/tasks.js?cd8f83ea0d"></script>
<script type="text/javascript" src="/s/lang.js?78e8db19a2"></script>
<script type="text/javascript" src="/s/dui.js?92862ea2bf"></script>
<script type="text/javascript" src="/s/url.js?bc648c1dee"></script>
<script type="text/javascript" src="/s/statusmanager.js?44a0f75c58"></script>
<script type="text/javascript" src="/s/closeproject.js?8f761bddc3"></script>
<script type="text/javascript" src="/s/support/tipped-3.1.8/tipped.js?d71d90bfc1"></script>
<script type="text/javascript" src="/s/tipped-skins.js?6b0e015877"></script>
<script type="text/javascript" src="/apps/static/takesurvey/takesurvey.js?bfc4a1521f"></script>
<script type="text/javascript" src="/s/support/clipboardjs/clipboard.min.js?3f3688138a"></script>
<script src="/s/support/tipped-3.1.8/tipped.js?d71d90bfc1"></script>
<script type="text/javascript" src="/s/shared/navbar/navbar.js?e660298e62"></script>

</head>

<body class="framework" id="xmledit">
<div id="fwheader">
<header id="gh-navbar" class="global-header designmap-restyle">
<script type="text/javascript">
window.navbar = {
path: "selfserve/53b/260705"
};
</script>
<div class="gh-primary-header">
<div id="gh-navigation-menus">
<nav id="fv-nav">
<div class="gh-title-support-row px-5 py-0 h-100">
<span class="gh-title gh-large col-3">
<a class="body-2-medium link-dark-background p-0" href="/apps/portal/">Portal</a>
<span class="project-divider">|</span>
<span class="gh-survey-name title-1" title="Practice_Vamshi_V2">Practice_Vamshi_V2</span>
<span class="gh-survey-state d-none d-tag-block">
draft
</span>


</span>
<div class="gh-nav-row col-6">
<ul class="gh-project-overview-tabs">
<!-- Portal -->
<!-- PROJECT OVERVIEW -->
<li
class="gh-nav-link gh-menu-holder project-overview-link"
>
<a class="gh-header-link" href="/apps/portal/#/projects/detail/selfserve/53b/260705">
Overview
</a>
</li>

<!-- Build -->
<li
class="gh-selected-nav-link gh-nav-link gh-menu-holder"
>
<a class="gh-header-link">Build</a>
</li>

<li class="gh-menu-holder gh-nav-link">
<!-- Test -->
<a class="gh-header-link">Preview</a>
<ul class="gh-dropdown-menu">
<!-- Test -->
<li><a class="gh-header-link" href="javascript: TakeSurvey.init('selfserve/53b/260705', false, false, true)">Test Survey</a></li>
<li><a class="gh-header-link" href="javascript: URL.sst('selfserve/53b/260705', 'xmledit')">Run Simulated Data</a></li>
<li><a class="gh-header-link" href="/admin/sst/list?survey=selfserve/53b/260705">Simulated Data History</a></li>
</ul>
</li>

<li
class="gh-nav-link gh-menu-holder"
>
<a class="gh-header-link">Responses</a>
<ul class="gh-dropdown-menu">
<li class=""><a class="gh-header-link" href="/apps/distribution/selfserve/53b/260705">Participant Sources</a></li>
<li class=""><a class="gh-header-link" href="/rep/selfserve/53b/260705:dashboard">Response Summary</a></li>
<li class="">
<a class="gh-header-link" href="/apps/campaign/list?project=selfserve/53b/260705">
Email Campaigns
</a>
</li>
<li class=""><a class="gh-header-link" href="/apps/respondents/report/selfserve/53b/260705">View/Edit Responses</a></li>
<li class="gh-menu-holder">
<a class="gh-more-tools">More Tools</a>
<i class="fa fa-chevron-right fa-icon-chevron-right" aria-hidden="true"></i>
<ul class="gh-dropdown-menu gh-hover-menu gh-sub-hover-menu">
</ul>
</li>
</ul>
</li>
<!-- Report -->
<li
class="gh-nav-link gh-menu-holder"
>
<a class="gh-header-link">Report</a>
<ul class="gh-dropdown-menu">
<li class="crosstabsMenuItem"><a class="gh-header-link" href='/apps/report/selfserve/53b/260705' target="_self">Crosstabs</a></li>

<li class="gh-menu-holder">
<a class="gh-more-tools">
Data Downloads
</a>
<i class="fa fa-chevron-right fa-icon-chevron-right" aria-hidden="true"></i>
<ul class="gh-dropdown-menu gh-hover-menu gh-sub-hover-menu">
<li>
<a class="gh-header-link data-downloads"
rel=':excel?config=qualified&run=1&format=xlsx&layout='
title="One Excel workbook per segment (zipped)">
Excel
</a>
</li>
<li>
<a class="gh-header-link data-downloads"
rel=':sav?config=qualified&run=1&unicode=1&forceOE=1'
title="One SPSS 16+ *.sav data file for each segment, including all OE data (zipped)">
SPSS
</a>
</li>
<li class="otherFormatsMenuItem">
<a class="gh-header-link" href='/apps/report/selfserve/53b/260705#!/downloads/'>
Other Data Formats
</a>
</li>

<script type="text/javascript" charset="utf-8">
jQuery(".data-downloads").on("click", function(event) {
if ( jQuery(event.target).parent().hasClass('disabled') ) {
return;
}

var downloadConfig = {
target          : event.target,
path            : "selfserve/53b/260705",
queryParameters : 'config=qualified&run=1'
};

$.dui.runReportDownload(downloadConfig);
});
</script>
</ul>
</li>

<li class="gh-menu-holder">
<a class="gh-more-tools">More Tools</a>
<i class="fa fa-chevron-right fa-icon-chevron-right" aria-hidden="true"></i>
<ul class="gh-dropdown-menu gh-hover-menu gh-sub-hover-menu">
<li class=""><a class="gh-header-link" href='/apps/dashboard/selfserve/53b/260705:list'>Dashboards</a></li>
<li class="savedReportMenuItem"><a class="gh-header-link" href='/apps/report/selfserve/53b/260705#!/custom/list' target="_self">View Saved Reports</a></li>
<li><a class="gh-header-link" href='/admin/users/audit-survey/selfserve/53b/260705' target="_self">Survey Audit Log</a></li>
</ul>
</li>
</ul>
</li>
</ul>
</div>
<span class="gh-support gh-menu-holder col-3 mr-0">
<a class="cursor-default gh-header-link">Help</a>
<ul class="gh-dropdown-menu gh-support-menu"><li><a href="/apps/mindtouch/Decipher" target="_blank" class="body-2-medium">Knowledge Base</a></li>
<li><a href="/apps/mindtouch?cid=helpdesk" target="_blank" class="body-2-medium">Help Desk</a></li>
</span>
</div>
</nav>
<nav class="gh-secondary-navigation">
<ul>
<li class="">
<a class="gh-header-link" href="/apps/lumos/53b/260705:edit">Survey Editor</a>
</li>
<li  class="">
<a class="gh-header-link" href="/apps/themeeditor?survey=selfserve/53b/260705">Themes</a>
</li>
<li class="gh-menu-holder">
<a class="gh-more-tools">
More Tools
<i class="fa fa-chevron-down fa-icon-chevron-down" aria-hidden="true"></i>
</a>
<ul class="gh-dropdown-menu gh-dropdown-tools">
<li class="">
<a class="gh-header-link" href="/apps/mls/selfserve/53b/260705">Language Manager</a>
</li>
<li class="gh-selected-secondary-nav">
<a class="gh-header-link" href="/apps/lumos/53b/260705:xmledit">
Edit XML
</a>
</li>
<li class="">
<a class="gh-header-link" href="/apps/lumos/53b/260705/temp-view:edit">View Survey Setup</a>
</li>
<li class="">
<a class="gh-header-link" href="/apps/lumos/53b/260705:viewxml">
View XML
</a>
</li>
<li class="">
<a class="gh-header-link" href="/apps/filemanager/selfserve/53b/260705">Upload System Files</a>
</li>
<li class="">
<a class="gh-header-link" href="/apps/tasks/selfserve/53b/260705">Tasks</a>
</li>
<li>
<a href="/admin/vc/list?file=selfserve/53b/260705/survey.xml">Version Control</a>
</li>
</ul>
</li>
</ul>
</nav>
<div id="topToolBar" class="group d-flex">
<ul id='view-menu' class="d-flex align-items-center mb-0">
<li class="link submenu-link hadNav nav-actionsMenu clickable pl-4 pb-0">
<a class="icon-dropdown m-0">
<i class="fa fa-gear"></i>
Actions &nbsp;
<i class="fa fa-caret-down"></i>
</a>
<div id="actionOffset"></div>
</li>
<li class="link submenu-link hadNav viewOptions pb-0 ml-4">
<a class="link-text icon-dropdown m-0">
<i class="fa fa-eye"></i>
View Options &nbsp;
<i class="fa fa-caret-down"></i>
</a>
<ul id="view_options" class="submenu dropdown-submenu topbar-submenu" tabindex="0" style="display: none"></ul>
</li>
<li class="link clickable undo-command ml-4 pb-0">
<a class="m-0">
<span class="fa fa-rotate-left"></span>
</a>
</li>
<li class="link clickable redo-command ml-4 pb-0">
<a class="m-0">
<span class="fa fa-rotate-right"></span>
</a>
</li>
</ul>

<a class="project-settings" href="javascript: URL.globalPreferences('selfserve/53b/260705')"><i class="fa fa-cog"></i> Settings</a>
<!-- Only allow launch of live/closed surveys from builder if in a temp-edit-live directory -->
<button id="gh-launch-survey-button" class="btn launch-button btn-sm tracking-navbar-launch-survey" name="launch" onclick="window.editor.saveAndLaunch()">
Launch Survey
</button>
<!-- for js load of button -->
</div>
</div>
</div>
</header>
</div>
<!-- /#fwheader -->
<div class="container xmledit-splashscreen">
<div class="row-fluid">
<div class="offset4 span4">
<img src="/apps/static/lumos/images/spinner_1.gif?a51c5608d0" alt="" /> Loading XML Editor&hellip;
</div>
</div>
</div>
<div class="xmledit xmledit-container container-fluid" style="display: none">
<div class="row-fluid">
<div class="span12">
<textarea class="xmledit-textarea hidden"></textarea>
</div>
</div>
<div class="row-fluid dux-control-bar-bottom">
<div class="span8"></div>

<div class="span4">
<button class="btn btn-primary xmledit-save" title="Save Changes">
<i class="icon-save"></i>Save
</button>
<button class="btn btn-default btn-darken xmledit-test-survey" title="Save Changes and Then Take the Survey">
<i class="icon-test"></i>Test Survey
</button>
</div>
</div>
<div id="modals">
<div class="modal hide big-modal xmledit-error-modal" aria-hidden="true" tabindex="-1">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" data-target=".xmledit-error-modal" aria-hidden="true">&times;</button>
<h3>Error Details</h3>
</div>
<div class="modal-body">
<p class="xmledit-error-modal-error-details-go-here">Error details go here</p>
</div>
<div class="modal-footer">
<button class="btn" data-dismiss="modal" data-target=".xmledit-error-modal" type="button">Close</button>
</div>
</div>
<div class="modal hide tiny-modal xmledit-saving-modal" aria-hidden="true" tabindex="-1">
<div class="modal-body">
<p><img src="/apps/static/lumos/images/spinner_1.gif?a51c5608d0" alt="" /> Saving&hellip;</p>
</div>
</div>
</div>
</div>
<div id="templates">
<div id="sstAll" class="prompt run-sst" style="margin:0 auto;">
<div class="sst-staff sst">
<h2>SST test data</h2>
<div class="sstData">
<div class="progress">
<div class="incomplete">
<div class="complete"></div>
</div>
</div> <!-- /progress -->
<div class="testData">
<dl class="status">
<dt class="status-msg">survey is ready for testing</dt>
<dd class="info-msg">0/0 succeeded <a href="#">view SST history</a></dd>
</dl>
<button class="runTestData">run test data</button>
<a href="#" class="clearSST">clear data</a>
</div> <!-- /test data -->
<div class="respondents">
<form action="#">
<ul>
<li>
<select id="automatedRespondents">
<option value="100">100</option>
<option value="200">200</option>
<option value="300">300</option>
</select>
<label for="automatedRespondents">automated participants</label>
</li>
<li><input type="checkbox" id="qualified" class="qualified" /> <label for="qualified">qualified data only</label> <em>mostly qualified only responses submitted</em></li>
<li><input type="checkbox" id="skipValidate" class="skipValidate" /> <label for="skipValidate">skip validation</label> <em>does not restrict answers with logic that cause inefficiencies</em></li>
<li><input type="checkbox" id="respectOptionals" class="respectOptionals" /> <label for="respectOptionals">respect optionals</label> <em>leave some optional answers blank</em></li>
<li>
<a href="#" class="editor-toggle clickable">custom SST run</a>
<div class="sst-text">
<textarea name="editSstText" class="editSstText" id="editSstText" cols="25" rows="5"></textarea>
<button class="apply">apply</button>
</div> <!-- /sst text -->
</li>
</ul>
<div class="sstButtons">
<a href="#">view report data</a>
<button class="finishSst" id="finishSst">finish</button>
</div> <!-- /sst buttons -->
</form>
</div> <!-- /respondents -->
</div> <!-- /sst data -->
</div> <!-- /sst-staff -->
</div> <!-- /sst prompt -->
<div id="dialog_surveyStatus" jsvalues="title:&quot;Survey State: &quot; + projectName.truncateEndSmartly(30)">
<p>
The current state for this survey is "<span id="dialog_surveyCurrentStatus"><strong jscontent='_(displayCurrentState)'></strong></span>". Would you like to set it to "<span id="dialog_surveyTargetStatus"><strong jscontent='_(displayTargetState)'></strong></span>"?
</p>
</div>
<div id="dialog_closeProject" title="Close Project">
<p>Are you sure you want to close this survey?</p>
<ul class='list'>
<li><span jscontent="$this.surveyName"></span> (<span jscontent="$this.projectPath"></span>)</li>
<div class="inline-error"></div>
</ul>
</div>
<div id="takeSurveyDialog" title="Survey Test Environment">
<span class="instructions"><i>Use the settings below to configure the survey testing environment</i></span>

<div class="dropMenuContainer">
<div class="sample_menu">
<span class="ico_samplesources"></span><span> Participant Source:</span>
<div id="ts_sampleSources">
<span jsdisplay="!$this.samples.length" class="no_ss"><em>No Participant Sources Defined</em></span>
<select jsdisplay="$this.samples.length" class='sampleSelect'>
<option jsselect="$this.samples" jsvalues="value: $this.index; selected: $this.index == $top.defaultSampleList" jscontent="$this.name"></option>
</select>
</div>
</div>

<div class="language_menu">
<span class="ico_globe"></span><span> Language:</span>
<div id="ts_languages">
<select class='langSelect'>
<option jsselect="$this.languages" jsvalues="value: $this.key; selected: $this[ 'default']; data-default: $this[ 'default']" jscontent="$this.display"></option>
</select>
</div>
</div>
</div>

<div jsselect="$this.samples" jsvalues="class: 'variablesMenu surveySourcesMenu varMenu_' + $this.index">
<div class="variablesHeader">Participant Source Variables</div>
<span class="variableItems" jsselect="$this.extraVariables">
<div class ="variableType">
<span jscontent="$this.title.name + ':'" jsvalues="title:$this.title.label"></span>
<input type='text' size='5' jsvalues="name: $this.title.name" jsdisplay='! $this.virtual' value='' />
<select class='virtualSelect' jsvalues='name: $this.title.name' jsdisplay='$this.virtual' value=''>
<option value='' selected></option>
<option jsselect='$this.virtual.children' jsvalues='value:$this.label' jscontent='$this.cdata'></option>
</select>
</div>
</span>
</div>

<div class='variablesMenu globalMenu'>
<div class='variablesHeader'>Global Variables</div>
<span class='variableItems' jsselect='$top.globalVars'>
<div class='variableType'>
<span jscontent="$this.name + ':'"></span>
<input type='text' size='5' jsvalues="name: $this.name" jsdisplay='! $this.virtual' value='' />
<select class='virtualSelect' jsvalues='name: $this.name' jsdisplay='$this.virtual' value=''>
<option value='' selected></option>
<option jsselect='$this.virtual.children' jsvalues='value:$this.label' jscontent='$this.cdata'></option>
</select>
</div>
</span>
</div>

<div class="survey_link">
<span class="linkHeader ico_link"></span><span> Survey Link:</span>
<div class="linkContainer">
<div id="appAccessText"></div>
<a id="linkto" target="_blank"></a>
<a id="linkto_relative" class="hidden"></a>
</div>
<div class="btnContainer">
<button id="testInBrowser" class="dux-button clickable">
Test In Browser
</button>
<div id="copyToClipboard">
<button class="dux-button">
<i class="fa-icon-copy fa-icon-large"></i>
Copy to Clipboard
</button>
</div>
<button id="toggleSendToPhone" class="dux-button clickable"><i class="fa-icon-mobile-phone"></i> Generate QR Code</button>
</div>
<div class='qrcode_share'>
<span class='qrcode_content'>
<p class='qrcode_info'></p>
<button class="qrcode_retry dux-button">
<i class="fa-icon-repeat fa-icon-large"></i>
Try again
</button>
<img class='qrcode' />
</span>
</div>
</div>
</div>

<div id='testsurvey_fail' class='badSurvey'>
<div class='badSurvey-msg staff'>
This survey cannot be tested in its current state.  It may contain features not supported, or errors.  <a href="/apps/lumos/53b/260705:xmledit"> Click here</a> to edit the survey in the xml editor.  More details on this error can be found below:
<div class='errorMsg'>
<!-- html error message will be inserted here -->
</div>
</div>
</div>
<div id="projectSummary" class="projectSummary">
<div class="floatcontainer projectSummaryContainer">
<div class="hidden floatcontainer projectSummaryFulcrumContainer">
<div class="fulcrumSummaryHeader">
<h2><i class="fulcrum-icon"></i> Fulcrum Data</h2>
</div>
<div class="innerBox">
<div class="syncMsg"><img src="/s/images/wait.gif?9c92dd524f" alt="" />
<span class="syncMsgTxt">Communicating with Fulcrum&hellip;</span>
</div>
</div>
</div>
</div>
<div class="clear"></div>
</div>

<div id="projectSummarySurveyUrls" class="project-summary-group projectSummarySurveyUrls">
<h2 class="subheading-2">Survey URLs</h2>
<div class="inner-box">
<table class="surveyUrl">
<tbody jsdisplay="$this.surveyUrls">
<tr jsselect="$this.surveyUrls">
<td class="surveyTitle body-2-medium" jscontent="title"></td>
<td class="surveyLang body-2" jscontent="lang"></td>
<td class="surveyLink body-2">
<a href="#" target="_blank" jsvalues="href: link" jscontent="link"></a>
</td>
</tr>
<tr jsdisplay="$this.surveyUrls.length === 0 && !$this.capi">
<td colspan="3" class="noSurveyUrls">
<h3>There are no available survey urls</h3>Either you have not included any participant sources or you have disabled all languages for each participant source.
</td>
</tr>
</tbody>
<tbody jsdisplay="$this.fulcrum">
<tr>
<td colspan="3" class="noSurveyUrls"><h3>There are no available survey urls</h3>
<div>
<a href="#" title="open a new window to test survey">Test Survey</a>
</div>
</td>
</tr>
</tbody>
<tbody jsdisplay="$this.capi">
<tr>
<td class="surveyTitle" jscontent="$this.capi.title"></td>
<td></td>
<td class="surveyLink">
<a target="_blank"
title="open a new window to test survey"
href="">Offline Interviewers Application</a>
| <i>Manage interviewers in the <a target="_blank" jsvalues="href: '/rep/' + $this.project + ':dashboard?tab=offline&split=none'">Response Summary</a></i>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div id="projectSummaryConfigUrls" class="project-summary-group projectSummaryConfigUrls">
<div class="inner-box">
<div class="gridToggle toggleConfiguration body-3-medium pb-2">
<g>
<svg viewBox="0 0 20 20" fill="none">
<path stroke="#3E5467" stroke-width="2" d="M8.5 14l4-4-4-4"></path>
</svg>
</g>
Use the grid to configure the survey URLs for this project
</div>
<div class="grid" style="display: none;">
<div jsdisplay="samples.length > 0">
<table class="table table-single-line">
<thead>
<tr>
<th></th>
<th class="surveyLang" jsselect="langs" jscontent="$this.lang.capitalize()" jsvalues="real: true; data-langcode: $this.langCode"></th>
</tr>
</thead>
<tbody>
<tr class="surveySample" jsselect="samples" jsvalues="real: true" jsvars="sample_index: $index">
<td class="surveyTitle body-2-medium" jscontent="name" jsvalues="id: 'list_' + list"></td>
<td class="surveyLangToggle" jsselect="langs" jsvars="id: 'checkbox_' + sample_index + '_' + $index">
<div class="custom-control custom-checkbox ml-5 mr-5">
<input type="checkbox" class="custom-control-input" jsvalues="checked: ($this ? true : false);" jseval="jQuery(this).attr('id', id);">
<label class="custom-control-label" jseval="jQuery(this).attr('for', id);">
<svg class="checkbox-checkmark" viewBox="-4 -6 20 20">
<g fill="none">
<path stroke="#fff" stroke-width="2" d="M1.5 3.75l3 3 6-6" />
</g>
</svg>
</label>
</div>
</td>
</tr>
</tbody>
</table>
<div class="form-group text-right">
<button class="clickable update btn btn-primary ">Update</button>
</div>
</div>
<div jsdisplay="samples.length === 0">
<span>There are no participant sources included in this project</span>
</div>
</div>
</div>
</div>

<div id="projectSummaryQuotas" class="project-summary-group projectSummaryQuotas">
<h2 class="subheading-2">Quotas</h2>
<div class="inner-box body-2">
<span class="noContent" jsdisplay="!$this.hasQuotas">No quotas exist in this survey</span>
<a href="#" title="open a new window to the Response Summary > quotas" jsdisplay="$this.hasQuotas">View quotas in the Response Summary</a>
</div>
</div>

<div id="projectSummaryExitLinks" class="project-summary-group projectSummaryExitLinks">
<h2 class="subheading-2">Exit Links</h2>
<div class="inner-box">
<div jsdisplay="exitLinks.length > 0">
<div class="row mb-6" jsselect="exitLinks">
<div class="col-md-3 body-2-medium" jscontent="$this.provider"></div>
<div class="col-md-7">
<div class="row">
<div class="col-md-3 text-capitalize body-2">qualified</div>
<div class="col-md-9 body-2">
<a href='#' jsdisplay="$this.qual === 'link'" jsvalues="href: $this.linkQualified" jscontent="$this.linkQualified" target="_blank"></a>
<span jsdisplay="$this.qual === 'msg'" jscontent="$this.msgQualified"></span>
</div>
</div>
<div class="row">
<div class="col-md-3 text-capitalize body-2">terminated</div>
<div class="col-md-9 body-2">
<a href='#' jsdisplay="$this.term === 'link'" jsvalues="href: $this.linkTerminated" jscontent="$this.linkTerminated" target="_blank"></a>
<span jsdisplay="$this.term === 'msg'" jscontent="$this.msgTerminated"></span>
</div>
</div>
<div class="row">
<div class="col-md-3 text-capitalize body-2">overquota</div>
<div class="col-md-9 body-2">
<a href='#' jsdisplay="$this.over === 'link'" jsvalues="href: $this.linkOver" jscontent="$this.linkOver" target="_blank"></a>
<span jsdisplay="$this.over === 'msg'" jscontent="$this.msgOver"></span>
</div>
</div>
<div class="row" jsselect="$this.otherExits">
<div class="col-md-3 body-2" jscontent="$this.cond"></div>
<div class="col-md-9 body-2">
<a href='#' jsdisplay="$this.over === 'link'" jsvalues="href: $this.linkOver" jscontent="$this.linkOver" target="_blank"></a>
<span jsdisplay="$this.over === 'msg'" jscontent="$this.msgOver"></span>
</div>
</div>
</div>
</div>
</div>
<div jsdisplay="exitLinks.length === 0">
<span class="noContent">no exit links exist in this survey</span>
</div>
</div>
</div>

<div id="projectSummaryMobile" class="project-summary-group projectSummaryMobile">
<h2 class="subheading-2">Mobile</h2>
<div class="inner-box">
<h3 class="body-2-medium">Settings</h3>
<div class="pl-4 pb-1 body-2" jsselect="$this.settings"><span jscontent="$this"></span></div>
<div class="pl-4 pb-1 body-2" jsdisplay="$this.settings.length==0">There are no mobile settings for this survey.</div>

<div class="mobileWarnings" jsdisplay="$this.warnings.numWarnings>0">
<div id="mobileWarningsContainer" jsvars="groups:$this.warnings.groups;numWarnings:$this.warnings.numWarnings">
<div id="mobileWarnings" class="mobileWarningsContainer"><!-- This is a jstemplate -->
<p>
<strong>Mobile Warnings</strong>
<span id="mobileWarningsButtons">
<a href="/apps/lumos/53b/260705:edit#fn=openGlobalPreferences" class="mobile-configure-settings">configure mobile settings</a>
<span id="warningButtons"></span>
</span>
</p>
<div class="mobile-warning-container">
<fieldset jsselect='groups' jsdisplay='$this.warnings.length'>
<legend jscontent='$this.legend'></legend>
<ul class="list mobile-warnings">
<li jsselect='$this.warnings'>
<span jscontent='$this.warning'></span> <i jsdisplay='$this.tooltip' class="fa-icon-question-sign" jsvalues='title:$this.tooltip'></i>
</li>
</ul>
</fieldset>
</div>
</div>
</div>
</div>
</div>
</div>


<div id="projectSummarySettings" class="project-summary-group projectSummarySettings">
<h2 class="subheading-2">Settings</h2>
<div class="inner-box">
<h3 class="body-2-medium">Survey Settings</h3>
<div class="pl-4 pb-1" jsselect="$this"><span jscontent="$this" class="body-2"></span></div>
<div class="pl-4 pb-1"jsdisplay="$this.length == 0" class="noContent body-2">no settings have been selected</div>
</div>
</div>

<div id="projectSummaryFulcrum" class="projectSummaryFulcrum outerBox">
<div class="fulcrumSummaryHeader">
<h2><i class="fulcrum-icon"></i> Fulcrum Data</h2>
</div>
<div class="innerBox">
<ul>
<li>
<span class="quotaSummary">
You are getting <span jscontent="$this.survey.Quota"></span> total completes at a CPI of <span jscontent="$this.survey.QuotaCPI"></span> from Fulcrum.
<br/>
Estimated Cost: <span jscontent="'$' + parseFloat(parseInt($this.survey.Quota, 10) * parseFloat($this.survey.QuotaCPI)).toFixed(2)"></span>
</span>
</li>
<li><span class="surveyTitle">Survey Name </span><span class="surveyName" jscontent="$this.survey.SurveyName"></span></li>
<li><span class="surveyTitle">Qualifications</span>
<ul class="fulcrumQualifications" jsselect="$this.qualifications" jsvars="label: Name || QuestionID">
<li jscontent="label + ':'"></li>
<li><span jscontent="'[' + LogicalOperator + '] '"></span><span jscontent="PreCodes"></span></li>
</ul>
</li>
<li>
<div transclude='fulcrumQuotas'></div>
</li>
</ul>
</div>
</div>

<div id="fulcrumQuotas" class="fulcrumQuotas">
<div jsdisplay='$this.quotas.length'>
<span class="surveyTitle">Quotas</span>
<ul jsselect="$this.quotas" class='quotaList'>
<li><span jscontent="Name"></span> <span jscontent="Quota"></span></li>
</ul>
</div>
</div>

<div id="projectSummaryFulcrumError" class="projectSummaryFulcrum outerBox">
<div class="fulcrumSummaryHeader">
<h2><i class="fulcrum-icon"></i> Fulcrum Data</h2>
</div>
<div class="innerBox errorBox error">
<ul>
<li jsselect="$this.$info"><span jseval="jQuery(this).html($this)"></span></li>
</ul>
<br/>
<div>Project launch will be disabled</div>
</div>
</div>
<div id='projectLaunchKickOff' class='projectLaunchKickOff'>
<div class='fulcrum hidden projectLaunchSection'>
<span class='icon'></span>
<div class='hdr'>Fulcrum <a jsdisplay='canEdit' class='editFulcrum' href='#'>Edit</a></div>
<div class='details'>
<div class="innerBox">
<div class="syncMsg"><img src="/s/images/wait.gif?9c92dd524f" alt="" />
<span class="syncMsgTxt">Synchronizing Fulcrum Data&hellip;</span>
</div>
</div>
</div>
</div>
<div class='offline offline-launch hidden projectLaunchSection'>
<span class='icon'></span>
<div class='hdr'>Offline</div>
<div class='details'>
<div class='innerBox'>
<div class='syncMsg'><img src="/s/images/wait.gif?9c92dd524f" alt="" />
<span class="syncMsgText">Checking Offline compatibility&hellip;</span>
</div>
</div>
</div>
</div>
<div class='overVars hidden projectLaunchSection'>
<div class='details'>
<div class='innerBox'>
<div class='syncMsg'><img src="/s/images/wait.gif?9c92dd524f" alt="" />
<span class="syncMsgText">Checking checkbox variable count&hellip;</span>
</div>
</div>
</div>
</div>
<div class="launchStatus">
<p>Before we launch your survey, we perform the following checks to prepare your survey for participants.</p>
<ul>
<li id="step-issues" class="processing">
<i class="fa fa-check mr-2"></i><i class="fa fa-minus mr-2"></i><i class="fa fa-times mr-2"></i>Check tasks <span class="badge badge-pill badge-excluded">Excluded</span>
<div class="issueContainer"></div>
</li>
<li id="step-sst" class="processing">
<i class="fa fa-check mr-2"></i><i class="fa fa-minus mr-2"></i><i class="fa fa-times mr-2"></i>Run test data and check survey logic <span class="badge badge-pill badge-excluded">Excluded</span>
<div class="issueContainer"></div>
</li>
<li id="step-makelive" class="processing">
<i class="fa fa-check mr-2"></i><i class="fa fa-minus mr-2"></i><i class="fa fa-times mr-2"></i>Clean out data and prepare for participants
<div class="issueContainer"></div>
</li>
</ul>
<div class="launch-bottom">
<p>Remember to complete any edits prior to launching your survey.</p>
</div>
</div>
</div>

<div id="compatibilityWarningsTemplate">
<div class="incompatible-detail">
<strong>We cannot launch your project.</strong>

<p class="mt-3" jsdisplay="samplesourceWarnings.length">At least one Sample Marketplace participant source has been added to the live survey since you created your temporary copy. Remove the new participant source from the live survey or revert your copy to the original survey and try again.
</p>

<ul class="warning-list" jsdisplay="offline.length || mobile.length || kinesis.length || projectParameters.length || imported.length">
<li jsdisplay="kinesis.length">
Your project has datapoint(s) that are not compatible with Kinesis Panel.
<a class="mobile-warning-learnmore" target="_blank" href="https://forstasurveys.zendesk.com/hc/en-us/sections/4409397744667-Panel-Management-Integration">
Learn More
</a>
</li>
<li jsdisplay="offline.length">
Your project has element(s) which are not compatible with Offline Survey.
<a class="mobile-warning-learnmore" target="_blank" href="/apps/mindtouch?cid=162">
Learn More
</a>
</li>
<li jsdisplay="!offline.length && mobile.length">
Your project has element(s) which are not compatible with your project settings.
<a class="mobile-warning-learnmore" target="_blank" href="/apps/mindtouch?cid=162">
Learn More
</a>
</li>
<li jsdisplay="imported.length">
Your project has imported element(s) that are not supported.
<a class="mobile-warning-learnmore" target="_blank" href="/apps/mindtouch?cid=kb_1884">
Learn More
</a>
</li>
<li jsdisplay="projectParameters.length">
<span>You have blank responses in Project Parameters.</span>
</li>
</ul>

<div jsdisplay="offline.length || mobile.length || kinesis.length">
Please adjust the content of your survey
<span jsdisplay="mobile.length"> or change your project settings.</span>
</div>
</div>

<div class='incompat-buttons' jsdisplay="offline.length || mobile.length || kinesis.length || projectParameters.length || imported.length || samplesourceWarnings.length">
<button class="editProjectParameters" jsdisplay="projectParameters.length">Edit project parameters</button>
<a jsdisplay="samplesourceWarnings.length" class="btn btn-primary mt-2 float-right ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" jsvalues="href: '/apps/lumos/' + '53b/260705' + ':edit?revert'">Revert this temporary survey</a>
<button class='editSurvey' jsdisplay="offline.length || mobile.length || kinesis.length || imported.length">Go edit survey content</button>
<button class='editSettings' jsdisplay='mobile.length'>Open project settings</button>
</div>
</div>

<div id="streamlineWarningTemplate" class="streamline-launch-details">
<div class="streamline-launch">
<p>To reduce the time needed to launch your project you may optionally exclude certain system checks.</p>
<p>Learn more about <a href="https://forstasurveys.zendesk.com/hc/en-us/articles/4409470184731-Launching-a-Survey#2.1" target="_blank">Launch Options</a>.</p>
<div class="alert alert-warning launchoptions" role="alert">
<div class="icon-container">
<svg class="icon icon-warning" viewBox="0 0 20 17">
<g>
<path d="M10.864.48l8.759 15.016A1 1 0 0 1 18.759 17H1.241a1 1 0 0 1-.864-1.504L9.137.481a1 1 0 0 1 1.727 0z"></path>
<path fill="#FFF" fill-rule="nonzero" d="M9 12h2v2H9v-2zm0-6h2v5H9V6z"></path>
</g>
</svg>
</div>
<div class="info">
Warning!<br>
Excluding system checks could result in survey errors.
</div>
</div>
<div class="streamline-launch-agreement">
<label for="ignore-warnings-checkbox">
<input type="checkbox" id="ignore-warnings-checkbox" name="ignore-warnings-checkbox">
<div>
Ignore task checking warnings.<br>
<span class="note">Task checks verify that all tasks have been completed.</span>
</div>
</label>
<label for="ignore-sst-checkbox">
<input type="checkbox" id="ignore-sst-checkbox" name="ignore-sst-checkbox">
<div>
Exclude test data and survey logic test.<br>
<span class="note">Task runs test data to verify survey logic.</span>
</div>
</label>
<label for="agreement-checkbox">
<input type="checkbox" id="agreement-checkbox" name="agreement-checkbox" disabled="disabled">
<div>I understand that skipping one or more of these steps may result in uncaught survey errors and / or an inaccurate progress bar.</div>
</label>
</div>
</div>
</div>

<div id="noQuotaWarningTemplate" class="noquota-details">
<div class="noquota">
<p>To avoid additional charges for oversampling, we recommend adding quotas for all surveys with purchased sample.</p>
<p>Learn more about <a href="https://forstasurveys.zendesk.com/hc/en-us/sections/4409233666843" target="_blank">using quotas to limit your survey completes</a>.</p>
<div class="noquota-agreement">
<label for="noquota-checkbox">
<input type="checkbox" id="noquota-checkbox" name="noquota-checkbox">
<div>I agree to launch my survey as is and take full responsibility for any oversampling that might occur.</div>
</label>
</div>
</div>
</div>

<div id="changedQuotaWarningTemplate" class="noquota-details">
<div class="noquota">
<p>The quotas in the temp survey do not match the quotas in the live survey. Please update the temporary version with quota sources from the live version prior to saving your changes.</p>
<p style="margin:15px 15px 15px 0">Learn more about <a href="https://forstasurveys.zendesk.com/hc/en-us/articles/4409461452059-Editing-Quota-Limits-in-Field" target="_blank">editing quotas in live surveys</a>.</p>
<div class="noquota-agreement">
<label for="changedquota-checkbox">
<input type="checkbox" id="changedquota-checkbox" name="noquota-checkbox">
<div>I take full responsibility for launching my survey as-is.</div>
</label>
</div>
</div>
</div>
<div id='outstandingTasks' class='hasOutstandingTasks'>
<i class="fa fa-exclamation-triangle"></i>
<div class='msg' jsdisplay='hasOutstandingTasks'>This project has outstanding tasks. Are you sure you want to launch?</div>
<div class='status'>
<div class='statusMsg' jscontent='status'></div>
<form method="get" target="_blank" jsvalues="action:viewTasksLink">
<button class='reviewTasksButton'>View tasks</button>
</form>
</div>
</div>
<div id="taskPanePrintable" class="taskPane printable">
<div class="taskElement" jsselect="elements" jseval="jQuery(this).addClass('question' + overallStatus)">
<h2 class="cmsPrintQuestionTitle" jsvars="overallStatus: $this.overallStatus" jscontent="($this.element_id == '_general' ? 'General' : $this.element_id ) + ': ' + $this.questionTitle.truncateMiddle(90)"></h2>
<table class="cmsPrint" jsselect="$this.todos" jseval="jQuery(this).addClass('task' + statusClass)">
<tr class="cmsPrintTaskRowPrimary">
<td class="cmsPrintTaskStatusIcon" jseval="jQuery(this).addClass('task' + $this.statusClass)"><div class="taskStatus"></div></td>
<td class="cmsPrintTaskStatus"><span jscontent="$this.statusClass.toLowerCase()"></span></td>
<td class="cmsPrintTaskDescription" jseval="jQuery(this).html($this.description)"></td>
</tr>
<tr class="cmsPrintTaskRowSecondary">
<td colspan="3" class="cmsPrintTaskDateCreator">
<span class="cmsPrintTaskDate" jscontent="'task created on ' + $this.created + ' by '"></span>
<span class="cmsPrintTaskCreator" jscontent="$this.fullname || $this.email"></span>
</td>
</tr>
<tr class="cmsPrintCommentRow" jsselect="$this.comments">
<td colspan=3>
<table class="cmsPrintComment">
<tr class="cmsPrintCommentRowPrimary">
<td class="cmsPrintCommentEmpty">&nbsp;</td>
<td class="cmsPrintCommentDescription" jseval="jQuery(this).html($this.description)"></td>
</tr>
<tr class="cmsPrintCommentRowSecondary">
<td class="cmsPrintCommentEmpty">&nbsp;</td>
<td class="cmsPrintCommentDateCreator">
<span class="cmsPrintCommentDate" jscontent="'comment added on ' + $this.created + ' by '"></span>
<span class="cmsPrintCommentCreator" jscontent="$this.fullname || $this.email"></span>
</td>
</tr>
</table>
</td>
</tr>
<tr><td colspan="3"><hr class="taskSeparator"></td></tr>
</table>
<hr class="questionSeparator" />
</div>
</div>
<div id='sstError' class='sstError'>
<i class="fa fa-exclamation-circle"></i>
<div class='sstErrorHdr'>There was an error while running simulated data:</div>
<div class='sstErrorMsg'>
<div jscontent="errorMsg"></div>
<ul jsdisplay="errorItems">
<li jsselect="errorItems" jscontent="$this"></li>
</ul>
</div>
</div>
<div id='fulcrumError' class='fulcrumError'>
<i class="fa fa-exclamation-circle"></i>
<div class='sstErrorHdr'>there was an error while attempting to update the Fulcrum status:</div>
<div class='fulcrumErrorMsg'>
<div jscontent="errorMsg"></div>
</div>
</div>
<div id='kinesisError' class='kinesisError'>
<i class="fa fa-exclamation-circle"></i>
<div class='sstErrorHdr'>There was an error while attempting to sync datapoint(s) with Kinesis</div>
<div class='kinesisErrorMsg'>
<ul jsdisplay="warningList">
<li jsselect="$this.warningList" jscontent="$this"></li>
</ul>
</div>
</div>
<div id='quota_changes'>
<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
<span>These changes affected your quotas.</span>
<a target="_top" href="/rep/selfserve/53b/260705:dashboard?tab=quota">Review quota changes.</a>
</div>
<div id='relaunchProject'>
this project is currently closed.  Are you sure you want to relaunch it?
</div>
<ul id="actionsMenu" class="dropdown-submenu topbar-submenu">
<li class="processbar-item" jsselect="$this" jseval="jQuery(this).addClass($this.className);">
<a href="#" jseval="$this.href ? jQuery(this).attr('href', $this.href) : ($this.isEnabled(this) ? jQuery(this).click($this.handler) : jQuery(this).addClass('disabled'));">
<span jscontent="$this.text"></span>
<span class="unicode-down" jscontent="$this.subText"></span>
</a>
</li>
</ul>
<div id="taskPanePrintable" class="taskPane printable">
<div class="taskElement" jsselect="elements" jseval="jQuery(this).addClass('question' + overallStatus)">
<h2 class="cmsPrintQuestionTitle" jsvars="overallStatus: $this.overallStatus" jscontent="($this.element_id == '_general' ? 'General' : $this.element_id ) + ': ' + $this.questionTitle.truncateMiddle(90)"></h2>
<table class="cmsPrint" jsselect="$this.todos" jseval="jQuery(this).addClass('task' + statusClass)">
<tr class="cmsPrintTaskRowPrimary">
<td class="cmsPrintTaskStatusIcon" jseval="jQuery(this).addClass('task' + $this.statusClass)"><div class="taskStatus"></div></td>
<td class="cmsPrintTaskStatus"><span jscontent="$this.statusClass.toLowerCase()"></span></td>
<td class="cmsPrintTaskDescription" jseval="jQuery(this).html($this.description)"></td>
</tr>
<tr class="cmsPrintTaskRowSecondary">
<td colspan="3" class="cmsPrintTaskDateCreator">
<span class="cmsPrintTaskDate" jscontent="'task created on ' + $this.created + ' by '"></span>
<span class="cmsPrintTaskCreator" jscontent="$this.fullname || $this.email"></span>
</td>
</tr>
<tr class="cmsPrintCommentRow" jsselect="$this.comments">
<td colspan=3>
<table class="cmsPrintComment">
<tr class="cmsPrintCommentRowPrimary">
<td class="cmsPrintCommentEmpty">&nbsp;</td>
<td class="cmsPrintCommentDescription" jseval="jQuery(this).html($this.description)"></td>
</tr>
<tr class="cmsPrintCommentRowSecondary">
<td class="cmsPrintCommentEmpty">&nbsp;</td>
<td class="cmsPrintCommentDateCreator">
<span class="cmsPrintCommentDate" jscontent="'comment added on ' + $this.created + ' by '"></span>
<span class="cmsPrintCommentCreator" jscontent="$this.fullname || $this.email"></span>
</td>
</tr>
</table>
</td>
</tr>
<tr><td colspan="3"><hr class="taskSeparator"></td></tr>
</table>
<hr class="questionSeparator" />
</div>
</div>
<div id="alertLabel" class="alert alert-info" role="alert">
<div class="alert-content">
<i class="fa fa-lg fa-info-circle alert-icon"></i>
<p class="alert-text" jscontent="$this.message"></p>
</div>
</div>
</div>
<script type="text/javascript" src="/s/support/bootstrap-2.1/js/bootstrap.min.js?f406e54c52"></script>
<script type="text/javascript" src="/s/support/toastr/toastr.js?80e9e4aa94"></script>
<script type="text/javascript" src="/s/support/mousetrap-1.2.2.min.js?360e3caa4b"></script>
<script type="text/javascript" src="/s/support/jquery-ui-1.9.2.custom/js/jquery-ui-1.9.2.custom.min.js?2b0698cb47"></script>
<script type="text/javascript" src="/s/support/codemirror-5.65.20/lib/codemirror.js?8cc0accc2d"></script>
<script type="text/javascript" src="/s/support/codemirror-5.65.20/keymap/vim.js?492c72c205"></script>
<script type="text/javascript" src="/s/support/codemirror-5.65.20/mode/xml/xml.js?c93fe254ef"></script>
<script type="text/javascript" src="/s/support/codemirror-5.65.20/addon/dialog/dialog.js?1b33c63e7d"></script>
<script type="text/javascript" src="/s/support/codemirror-5.65.20/addon/search/search.js?aee5a4efc3"></script>
<script type="text/javascript" src="/s/support/codemirror-5.65.20/addon/search/searchcursor.js?ca8612c41c"></script>
<script type="text/javascript" src="/s/support/codemirror-5.65.20/addon/search/match-highlighter.js?d7d3dd2592"></script>

<script type="text/javascript">
window.readOnly = false;
window.isClosed = false;
</script>
<script type="text/javascript" src="/apps/static/lumos/xmleditor/main.js?f1f4803908"></script>
</body>
</html>