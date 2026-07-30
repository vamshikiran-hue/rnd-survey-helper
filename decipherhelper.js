/* ============================================================ */
/* FIX FOR LOGIT PLATFORM                                       */
/* opinions.logitgroup.com - sid = 105                         */
/* ============================================================ */

/* Fix 1 - getHostId */
if (typeof getHostId === 'undefined') {
    window.getHostId = function() { return 105; };
}

/* Fix 2 - getBaseUrl */
if (typeof getBaseUrl === 'undefined') {
    window.getBaseUrl = function() { return 'https://opinions.logitgroup.com'; };
}

/* Fix 3 - readOnly (may not be defined on Logit) */
if (typeof readOnly === 'undefined') {
    window.readOnly = false;
}

/* Fix 4 - fail function */
if (typeof fail === 'undefined') {
    window.fail = function(msg) { console.error('fail:', msg); };
}

/* Fix 5 - Observer */
if (typeof Observer === 'undefined') {
    window.Observer = function() {
        this.observe = function() {};
        this.disconnect = function() {};
    };
}

/* Fix 6 - Tipped tooltip library */
if (typeof Tipped === 'undefined') {
    window.Tipped = {
        create: function() {},
        remove: function() {},
        show: function() {},
        hide: function() {}
    };
}

/* Fix 7 - _ translation function */
if (typeof _ === 'undefined') {
    window._ = function(str) { return str; };
}

/* ============================================================ */
/*global window, CodeMirror, fail, Observer, toastr, Templates, Mousetrap, _, Tipped, readOnly */

$(function () {
    'use strict';
    /*jshint validthis: true*/
    var surveyPath = 'selfserve/' + location.pathname.replace(/\/apps\/lumos\//, '').split(':')[0];
    var isReadOnly = readOnly;
    var lastError = null;
    var ALT_MODES = ['vim'];  // add ?mode=<mode> to url
    var PREFIX = 'xmledit-';
    var CLASSES = {
        undoButton: 'undo-command',
        redoButton: 'redo-command',
        save: PREFIX + 'save',
        errors: PREFIX + 'errors',
        findNext: PREFIX + 'find-next',
        findPrevious: PREFIX + 'find-previous',
        replace: PREFIX + 'replace',
        replaceAll: PREFIX + 'replace-all',
        textarea: PREFIX + 'textarea',
        changed: PREFIX + 'changed',
        saving: PREFIX + 'saving',
        saveSucceeded: PREFIX + 'success',
        saveFailed: PREFIX + 'save-failed',
        reset: PREFIX + 'reset',
        highlight: PREFIX + 'highlight'
    };
    var SELECTORS = {
        container: '.' + PREFIX + 'container',
        undoButton: '.' + CLASSES.undoButton,
        redoButton: '.' + CLASSES.redoButton,
        save: '.' + CLASSES.save,
        textarea: '.' + CLASSES.textarea,
        savingModal: '.' + PREFIX + 'saving-modal',
        errorModal: '.' + PREFIX + 'error-modal',
        errorDetails: '.' + PREFIX + 'error-modal-error-details-go-here',
        testSurvey: '.' + PREFIX + 'test-survey',
        splashScreen: '.' + PREFIX + 'splashscreen'
    };
    var EVENTS = {
        saving: 'on-' + PREFIX + 'saving',
        saveSucceeded: 'on-' + PREFIX + 'save-succeeded',
        saveFailed: 'on-' + PREFIX + 'save-failed',
        changed: 'on-' + PREFIX + 'changed',
        undoable: 'on-' + PREFIX + 'undoable',
        nonUndoable: 'on-' + PREFIX + 'non-undoable',
        redoable: 'on-' + PREFIX + 'redoable',
        nonRedoable: 'on-' + PREFIX + 'non-redoable'
    };
    var $errorWidget = $("<div class='survey-error'><i class='fa icon-error'></i> <span class='msg'/></div>");

    function showErrors() {
        var $modal = $(SELECTORS.errorModal);
        var $details = $modal.find(SELECTORS.errorDetails);

        if (!lastError) {
            return;
        }

        $details.html(lastError);
        $modal.modal('show');
    }

    function Btn($btn, isDisabled, classes) {
        this.$btn = $btn;
        this.classes = $.extend({
            enabled: '',
            disabled: ''
        }, classes || {});
        this._disabled = null;
        if (isDisabled) {
            this.disable();
        } else {
            this.enable();
        }
    }

    $.extend(Btn.prototype, {
        disable: function disable() {
            if (this._disabled !== true) {
                this.$btn.addClass('disabled');
                this.$btn.removeClass(this.classes.enabled);
                this.$btn.addClass(this.classes.disabled);
                this.$btn[0].disabled = true;
                this._disabled = true;
            }
        },
        enable: function enable() {
            if (this._disabled !== false) {
                this.$btn.removeClass('disabled');
                this.$btn.removeClass(this.classes.disabled);
                this.$btn.addClass(this.classes.enabled);
                this.$btn[0].disabled = false;
                this._disabled = false;
            }
        },
        isDisabled: function isDisabled() {
            return this._disabled;
        },
        click: function click(fn) {
            var me = this;
            if (fn) {
                // set a click handler
                if ($.isFunction(fn)) {
                    this.$btn.click(function () {
                        if (!me.isDisabled()) {
                            return fn.apply(me, arguments);
                        }
                    });
                }
            } else {
                return this.$btn.click();
            }
        }
    });
    if (!isReadOnly) {
        var saveBtn = new Btn($(SELECTORS.save), true, {enabled: 'btn-success'});
        var testSurveyBtn = new Btn($(SELECTORS.testSurvey));
        var undoBtn = new Btn($(SELECTORS.undoButton), true, {});
        var redoBtn = new Btn($(SELECTORS.redoButton), true, {});
    }

    function XmlEditor() {
        var editor = this;
        editor._observer = new Observer();
        editor.$context = $(SELECTORS.container);
        var $textarea = editor.$context.find(SELECTORS.textarea);
        var options = $.extend({
            mode: 'xml',
            smartIndent: false,
            lineNumbers: true,
            highlightSelectionMatches: false,
            keyMap: (function getKeyMap() {
                var qparams = window.location.search ? window.location.search.substring(1).split(',') : [];

                for (var i = 0; i < qparams.length; i++) {
                    var parts = qparams[i].split('=');
                    if (parts[0] === 'mode' && ALT_MODES.indexOf(parts[1]) > -1) {
                        return parts[1];
                    }
                }
                return 'default';
            })(),
            extraKeys: {
                // On Enter copy the indentation from the current line and use it on the next line
                'Enter': function (codeMirror) {
                    // On Enter the current selection is removed
                    if (codeMirror.somethingSelected()) codeMirror.replaceSelection("");
                    var cursorPos = codeMirror.getCursor();
                    var line = codeMirror.getLine(cursorPos.line);
                    // Copy indentation
                    var end = line.search(/[^\s\u00a0]/);
                    if (end === -1) end = line.length;
                    if (cursorPos.ch < end) end = cursorPos.ch;
                    var copy = line.slice(0, end);
                    // Add indentation to new line
                    codeMirror.replaceRange("\n" + copy, cursorPos);
                },
                'Ctrl-Enter': function () {
                    saveBtn.click();
                },
                'Shift-Ctrl-1': function () {
                    showErrors();
                }
            }
        });
        if (!isReadOnly) {
            editor.requestFetchData(true).then(function (content) {
                $(SELECTORS.splashScreen).hide();
                $(SELECTORS.container).show();

                if (content) {
                    $textarea.val(content.xml);
                    editor.codemirror = CodeMirror.fromTextArea($textarea[0], options);
                    editor.codemirror.on("change", $.proxy(editor.changed, editor));
                    editor.addHandlers();
                    editor.lockXmlSections(content.multiEdit, content.xml, true);
                }

                showErrors();
                if (lastError) {
                    editor._setState(EVENTS.saveFailed);
                }
            });
        } else {
            options.readOnly = true;
            editor.requestFetchData().then(function (content) {
                $(SELECTORS.splashScreen).hide();
                $(SELECTORS.container).show();

                if (content) {
                    $textarea.val(content);
                    editor.codemirror = CodeMirror.fromTextArea($textarea[0], options);
                    editor.addHandlers();
                }
            });
        }
    }

    $.extend(XmlEditor.prototype, {
        doer: function doer(which, instance) {
            var cm = instance.codemirror;
            var hs = cm.historySize();

            if (hs[which] > 0) {
                cm[which]();
                instance.changed();
            }
        },
        undo: function undo() {
            // undo the last change in CodeMirror
            this.doer('undo', this);
        },
        redo: function redo() {
            // redo the last change in CodeMirror
            this.doer('redo', this);
        },
        save: (function () {
            function success(res) {
                if (!isResponseOk(res)) {
                    return failure.apply(this, arguments);
                }
                this.codemirror.setOption('readOnly', false);
                this.codemirror.markClean();
                this._changed = false;
                this._notification = res.notification ? res.notification : '';
                this._setState(EVENTS.saveSucceeded);
                this._observer.notify(EVENTS.saveSucceeded);
                this._checkUndoRedo();
                this._clearErrorWidgets();
                this.errorState = false;
            }

            function failure(res) {
                var me = this;
                this._clearErrorWidgets();

                if (res.hasOwnProperty('xml')) {
                    this.codemirror.setValue(res.xml);
                }
                this.codemirror.setOption('readOnly', false);
                this._notification = '';
                this._checkUndoRedo();

                // Some errors (ex. 'hermes-eval-errors' in loops) prevent the survey
                // from loading. In these cases, the error message will be displayed
                // with the unexpanded/unclean line number in a dialog.
                if (res.el_errors && res.el_errors.length > 0) {
                    $.each(res.el_errors, function (i, err) {
                        var $widget = $errorWidget.clone();
                        $widget.find('span').text(err[1]);
                        me.errs.push(me.codemirror.addLineWidget(err[0] - 1, $widget[0], {above: true}));

                        // scroll to the first error
                        if (i === 0) {
                            me.codemirror.scrollIntoView(err[0] - 1);
                        }
                    });

                    // trigger failed events, but skip the dialog
                    this._observer.notify(EVENTS.saveFailed, '');
                    me.lockXmlSections(res.multiEdit, res.xml);
                } else {
                    this._setState(EVENTS.saveFailed);
                    this._observer.notify(EVENTS.saveFailed, res.$info || res.error || 'unknown reason');
                }
                this.errorState = true;
            }

            function isResponseOk(res) {
                // checks if the response has an error indicator
                return !(res.error || res.$error || !res.success);
            }

            function save() {
                var editor = this;
                if (!editor._changed) {
                    var dfd = $.Deferred();
                    dfd.resolve();
                    return dfd.promise();
                }

                editor._setState(EVENTS.saving);
                editor._observer.notify(EVENTS.saving);
                editor.codemirror.setOption('readOnly', 'nocursor');

                var promise = $.hermes('saveRawXml', {
                    path: editor.savePath,
                    xml: editor.codemirror.getValue()
                }, {});

                promise.done($.proxy(success, editor));
                promise.fail($.proxy(failure, editor));

                return promise;
            }

            return save;
        })(),
        _changed: false,
        changed: function changed() {
            this._changed = true;
            this._setState(EVENTS.changed);
            this._observer.notify(EVENTS.changed);
            this._checkUndoRedo();
        },
        _checkUndoRedo: function _checkUndoRedo() {
            // check if there is anything to undo/redo and tells any listeners about it
            var cm = this.codemirror;
            var hs = cm.historySize();

            if (hs.undo > 0) {
                this._observer.notify(EVENTS.undoable);
            } else {
                this._observer.notify(EVENTS.nonUndoable);
            }

            if (hs.redo > 0) {
                this._observer.notify(EVENTS.redoable);
            } else {
                this._observer.notify(EVENTS.nonRedoable);
            }
        },
        _setState: (function () {
            var STATES = {};
            STATES[EVENTS.changed] = CLASSES.changed;
            STATES[EVENTS.saving] = CLASSES.saving;
            STATES[EVENTS.saveSucceeded] = CLASSES.saveSucceeded;
            STATES[EVENTS.saveFailed] = CLASSES.saveFailed;

            // create a space delimited string of all of the classes
            var ALL = $.map(STATES, function (className) {
                return className;
            }).join(' ');

            return function (state) {
                if (!STATES[state]) {
                    return;
                }

                if (this._state !== state) {
                    this.$context.removeClass(ALL).addClass(STATES[state]);
                    this._state = state;
                }
            };
        })(),
        _state: '',
        _notification: '',
        on: function on(evtType, callback) {
            this._observer.subscribe(evtType, callback);
        },
        emit: function emit(evtType) {
            // forces an event type to be emitted
            this._observer.notify(evtType);
        },
        setOption: function setOption(name, value) {
            this.codemirror.setOption(name, value);
        },
        _clearErrorWidgets: function _clearErrorWidgets() {
            var cm = this.codemirror;
            $.each(this.errs, function () {
                cm.removeLineWidget(this);
            });
        },
        errs: [],
        saveAndLaunch: function saveAndLaunch() {
            var editor = this;
            editor.save().then(function () {
                if (editor.savePath && !editor.errorState) {
                    window.LaunchProject(editor.savePath);
                }
            });
        },
        errorState: null,
        requestFetchData: function (getMultiEditInfo) {
            var editor = this;
            return $.hermes('lumos/getSurveyEditorData', {
                path: surveyPath,
                multiEditInfo: getMultiEditInfo,
                readOnly: isReadOnly
            }, {}).then(function (res) {
                editor.savePath = res.savePath;
                if (!res.success) {
                    // Indicates an error in the survey.xml
                    lastError = res.error || '';
                }
                if (!isReadOnly) {
                    window.Heartbeat.init(editor.savePath.replace('selfserve/', ''));
                }
                return !getMultiEditInfo ? res.xml : {xml: res.xml, multiEdit: res.multiEdit};
            }, function (res) {
                // Indicates an error in the processing of the request
                lastError = res && (res.$info || res.$error) || res;
                isReadOnly = true;
                return $.Deferred().resolve('');
            });
        },
        fetchData: function() {
            return this.requestFetchData(false);
        },
        _lastSavedVersion: null,
        setLastSavedVersion: function () {
            this._lastSavedVersion = this.codemirror.getValue();
        },
        getLastSavedVersion: function () {
            return this._lastSavedVersion;
        },
        resetToLastSavedVersion: function () {
            this.codemirror.setValue(this._lastSavedVersion);
            this.emit(EVENTS.changed);
        },
        addHandlers: function () {
            var editor = this;

            if (!isReadOnly) {
                saveBtn.click($.proxy(editor.save, editor));

                testSurveyBtn.click(function () {
                    var handler = function () {
                        window.open(
                            "/survey/" + editor.savePath,
                            "xmleditor_testsurvey"
                        );
                    };
                    editor.save().done(handler);
                });

                // Initialize xmleditor menus
                initializeActionsMenu(editor);
                initializeViewOptionsMenu(editor);

                var Growler = (function () {
                    // performs the notifications

                    var notify = (function () {
                        // make all notification go through here, so we can easily
                        // change libraries

                        // NOTIFIER: toastr
                        var OPTIONS = {
                            positionClass: 'toast-bottom-right'
                        };

                        var FN_MAP = {
                            info: 'info',
                            success: 'success',
                            error: 'error',
                            warn: 'warning'
                        };

                        return function notify(type, message, o) {
                            var fn = toastr[FN_MAP[type]];
                            if (o) {
                                o = $.extend({}, OPTIONS, o || {});
                            } else {
                                o = OPTIONS;
                            }

                            fn('', message, o);
                        };
                    })();

                    return {
                        saveSucceeded: function onSaveSucceeded() {
                            $(SELECTORS.savingModal).modal('hide');
                            if (editor._notification) {
                                notify('success', editor._notification);
                            } else {
                                notify('success', 'Save completed');
                            }
                        },
                        saveFailed: function onSaveFailed() {
                            $(SELECTORS.savingModal).modal('hide');
                            notify('error', 'Save failed');
                        }
                    };
                })();

                // this is NOT the jQuery .on() method
                editor.on(EVENTS.saving, function (msg) {
                    $(SELECTORS.savingModal).modal({backdrop: 'static'});
                });
                editor.on(EVENTS.saveFailed, function (msg) {
                    lastError = $.isArray(msg) ? msg.join("<br />\n") : msg;
                    showErrors();
                });
                editor.on(EVENTS.saveSucceeded, function () {
                    lastError = null;
                    editor.setLastSavedVersion();
                });

                editor.on(EVENTS.undoable, function () {
                    undoBtn.enable();
                });
                editor.on(EVENTS.nonUndoable, function () {
                    undoBtn.disable();
                });
                editor.on(EVENTS.redoable, function () {
                    redoBtn.enable();
                });
                editor.on(EVENTS.nonRedoable, function () {
                    redoBtn.disable();
                });

                // jQuery .on() events
                $(SELECTORS.undoButton).on('click', function () {
                    editor.undo();
                });
                $(SELECTORS.redoButton).on('click', function () {
                    editor.redo();
                });

                Tipped.create($(SELECTORS.undoButton), _('Undo') + ' (ctrl+z)', {skin: 'rs'});
                Tipped.create($(SELECTORS.redoButton), _('Redo') + ' (ctrl+shift+z)', {skin: 'rs'});

                editor.setLastSavedVersion();

                // save
                editor.on(EVENTS.changed, $.proxy(saveBtn.enable, saveBtn));
                editor.on(EVENTS.saving, $.proxy(saveBtn.disable, saveBtn));

                // growler
                editor.on(EVENTS.saveSucceeded, Growler.saveSucceeded);
                editor.on(EVENTS.saveFailed, Growler.saveFailed);
            }

            // bind certain keys so they happen even when focus is outside of the
            // text editor
            var shortcutBindings = {
                'ctrl+z': function () {
                    editor.undo();
                },
                'ctrl+shift+z': function () {
                    editor.redo();
                },
                'ctrl+enter': function () {
                    saveBtn.click();
                },
                'ctrl+shift+1': function () {
                    showErrors();
                },
                'ctrl+f': function () {
                    CodeMirror.commands.find(editor.codemirror);
                },
                'ctrl+g': function () {
                    CodeMirror.commands.findNext(editor.codemirror);
                },
                'ctrl+shift+g': function () {
                    CodeMirror.commands.findPrev(editor.codemirror);
                },
                'ctrl+shift+f': function () {
                    CodeMirror.commands.replace(editor.codemirror);
                },
                'ctrl+shift+r': function () {
                    CodeMirror.commands.replaceAll(editor.codemirror);
                }
            };

            $.each(shortcutBindings, function (keys, fn) {
                Mousetrap.bind(keys, fn);
            });

            // Alert user when leaving the xml editor without saving changes
            $(window).bind('beforeunload', function () {
                // Some browsers allow us to customize the message,
                // others will ignore it and use their own native message
                var msg = "You have attempted to leave this page. If you have made any changes to the XML without saving, your changes will be lost. Are you sure you want to exit this page?";

                if (!editor.codemirror.isClean()) {
                    return msg;
                }
            });

            resizeCodeMirror(editor, $(window));
            $(window).resize(function () {
                resizeCodeMirror(editor, $(this));
            }); // resize CodeMirror editor any time the window changes size
        },
        lockXmlSections: function(multiEdit, xml, hasAddAlert) {
            var editor = this;
            //Check if multiEdit is locked by a subsection checkout.
            if (multiEdit && (multiEdit.multiEditLock === "1" || multiEdit.multiEditLabel)) {
                if(hasAddAlert) {
                    var $alertLabel =Templates.get('alertLabel', {
                        message: _('You may edit only the XML for your block. Grayed out code is unavailable for editing')
                    });
                    $('.xmledit').prepend($alertLabel);
                    $('#topToolBar').children().not(':first').remove();
                    resizeCodeMirror(editor, $(window));
                }
                var notAllowedOptions = {readOnly: true, css: "color: #cccccc"};
                var xmlParse = xml.split('\n');
                var xmlInfo = {lastLine: xmlParse.length, lastChar: xmlParse[xmlParse.length - 1].length - 1};
                //if there is not MultiEditLabel to edit, block all the survey xml.
                if (!multiEdit.multiEditLabel){
                    editor.codemirror.doc.markText(
                        {line:0, ch: 0}, {line:xmlInfo.lastLine, ch: xmlInfo.lastChar}, notAllowedOptions
                    );
                } else {
                    //Locks from the beginning of the xml to the beginning of the block.
                    editor.codemirror.doc.markText(
                        {line:0, ch: 0},
                        {
                            line:multiEdit.multiEditLabelInfo.start.line,
                            ch: multiEdit.multiEditLabelInfo.start.char_pos
                        },
                        notAllowedOptions
                    );
                    //Locks from the ending of the block to the ending of the xml.
                    editor.codemirror.doc.markText(
                        {
                            line:multiEdit.multiEditLabelInfo.end.line,
                            ch: multiEdit.multiEditLabelInfo.end.char_pos
                        },
                        {line:xmlInfo.lastLine, ch: xmlInfo.lastChar},
                        notAllowedOptions
                    );
                    //Locks type of tag (only can be block).
                    editor.codemirror.doc.markText(
                        {
                            line:multiEdit.multiEditLabelInfo.start.line,
                            ch: multiEdit.multiEditLabelInfo.start.char_pos
                        },
                        {
                            line:multiEdit.multiEditLabelInfo.start.line,
                            ch: multiEdit.multiEditLabelInfo.start.char_pos + 6
                        },
                        notAllowedOptions
                    );
                    //Locks all metadata.
                    for (var metadata_field in multiEdit.multiEditLabelInfo.metadata) {
                        var data =  multiEdit.multiEditLabelInfo.metadata[metadata_field];
                        editor.codemirror.doc.markText(
                            {line:data.line, ch: data.start},
                            {line:data.line, ch: data.end},
                            notAllowedOptions
                        );
                    }
                }
            }
        }
    });

    function initializeActionsMenu(editor) {
        $('li.nav-actionsMenu').dui_dropMenu({
            closeOnClickOut: true,
            init: function (menu) {
                function isEnabledWrapper(action) {
                    return function () {
                        return !$.isFunction(action.cond) || action.cond();
                    };
                }

                var actions = [{
                    className: CLASSES.save,
                    text: 'Save',
                    subText: ' (ctrl+enter)',
                    cond: function () {
                        return !editor.codemirror.isClean();
                    },
                    handler: function () {
                        editor.save();
                    }
                }, {
                    className: CLASSES.reset,
                    text: 'Revert to Last Save',
                    subText: '',
                    cond: function () {
                        return editor.codemirror.getValue() !== editor.getLastSavedVersion();
                    },
                    handler: function () {
                        editor.resetToLastSavedVersion();
                    }
                }, {
                    className: CLASSES.find,
                    text: 'Find',
                    subText: ' (ctrl+f)',
                    handler: function () {
                        CodeMirror.commands.find(editor.codemirror);
                    }
                }, {
                    className: CLASSES.findNext,
                    text: 'Find Next',
                    subText: ' (ctrl+g)',
                    handler: function () {
                        CodeMirror.commands.findNext(editor.codemirror);
                    }
                }, {
                    className: CLASSES.findPrevious,
                    text: 'Find Previous',
                    subText: ' (ctrl+shift+g)',
                    handler: function () {
                        CodeMirror.commands.findPrev(editor.codemirror);
                    }
                }, {
                    className: CLASSES.replace,
                    text: 'Replace',
                    subText: ' (ctrl+shift+f)',
                    handler: function () {
                        CodeMirror.commands.replace(editor.codemirror);
                    }
                }, {
                    className: CLASSES.replaceAll,
                    text: 'Replace All',
                    subText: ' (ctrl+shift+r)',
                    handler: function () {
                        CodeMirror.commands.replaceAll(editor.codemirror);
                    }
                }];

                $.each(actions, function (_, action) {
                    var handler = action.handler;
                    action.handler = function () {
                        handler.apply(this, arguments);
                        menu.close();
                    };
                    action.isEnabled = isEnabledWrapper(action);
                });

                return Templates.get('actionsMenu', actions);
            },
            insertWhere: '.nav-actionsMenu:first'
        });
    }

    function initializeViewOptionsMenu(editor) {
        $('li.viewOptions').dui_dropMenu({
            closeOnClickOut: true,
            init: function (menu) {
                function isEnabledWrapper(action) {
                    return function () {
                        return !$.isFunction(action.cond) || action.cond();
                    };
                }

                var actions = [
                    {
                        className: CLASSES.errors,
                        text: 'Errors',
                        subText: ' (ctrl+shift+!)',
                        cond: function () {
                            return !!lastError;
                        },
                        handler: function () {
                            showErrors();
                        }
                    },
                    {
                        className: CLASSES.highlight,
                        text: 'Highlight Selections',
                        subText: '',
                        handler: function() {
                            var current = editor.codemirror.getOption('highlightSelectionMatches');
                            editor.codemirror.setOption('highlightSelectionMatches', !current);
                        }
                    }
                ];

                $.each(actions, function (_, action) {
                    var handler = action.handler;
                    action.handler = function () {
                        handler.apply(this, arguments);
                        menu.close();
                    };
                    action.isEnabled = isEnabledWrapper(action);
                });

                return Templates.get('actionsMenu', actions);
            },
            insertWhere: '#view-menu .viewOptions:first'
        });
    }

    function resizeCodeMirror(editor, $container) {
        // resizes the CodeMirror editor so that it fills the container
        var containerHeight = $container.height() - $('#fwheader').height() -
            $('.dux-control-bar-bottom').outerHeight()-  $('.alert-info').outerHeight();
        var cmHeight = editor.$context.find('.CodeMirror').height();
        var gutter = editor.$context.outerHeight(true) - cmHeight;

        editor.codemirror.setSize(null, containerHeight - gutter);
    }

    window.editor = new XmlEditor();
});
