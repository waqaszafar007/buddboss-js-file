window.bp = window.bp || {},
function(p) {
    "undefined" != typeof BP_Nouveau && (bp.Nouveau = bp.Nouveau || {},
    bp.Nouveau.Media = {
        start: function() {
            this.setupGlobals(),
            this.addListeners()
        },
        setupGlobals: function() {
            var e = p("body");
            this.current_page = 1,
            this.current_page_existing_media = 1,
            this.current_page_albums = 1,
            this.current_tab = !e.hasClass("single-topic") && !e.hasClass("single-forum") && "bp-dropzone-content",
            this.sort_by = "",
            this.order_by = "",
            this.currentTargetParent = BP_Nouveau.media.current_folder,
            this.moveToIdPopup = BP_Nouveau.media.move_to_id_popup,
            this.moveToTypePopup = BP_Nouveau.media.current_type,
            this.privacySelectorSelect = "",
            this.privacySelectorSpan = "",
            this.currentAlbum = BP_Nouveau.media.current_album,
            void 0 !== window.Dropzone && (window.Dropzone.autoDiscover = !1);
            e = document.getElementsByClassName("forum-post-document-template").length ? document.getElementsByClassName("forum-post-document-template")[0].innerHTML : "";
            this.documentOptions = {
                url: BP_Nouveau.ajaxurl,
                timeout: 108e5,
                dictFileTooBig: BP_Nouveau.media.dictFileTooBig,
                acceptedFiles: BP_Nouveau.media.document_type,
                createImageThumbnails: !1,
                dictDefaultMessage: BP_Nouveau.media.dropzone_document_message,
                autoProcessQueue: !0,
                addRemoveLinks: !0,
                uploadMultiple: !1,
                maxFiles: void 0 !== BP_Nouveau.document.maxFiles ? BP_Nouveau.document.maxFiles : 10,
                maxFilesize: void 0 !== BP_Nouveau.document.max_upload_size ? BP_Nouveau.document.max_upload_size : 2,
                dictInvalidFileType: BP_Nouveau.document.dictInvalidFileType,
                dictMaxFilesExceeded: BP_Nouveau.media.document_dict_file_exceeded,
                previewTemplate: e,
                dictCancelUploadConfirmation: BP_Nouveau.media.dictCancelUploadConfirmation
            };
            var t, e = document.getElementsByClassName("forum-post-video-template").length ? document.getElementsByClassName("forum-post-video-template")[0].innerHTML : "";
            this.videoOptions = {
                url: BP_Nouveau.ajaxurl,
                timeout: 108e5,
                dictFileTooBig: BP_Nouveau.video.dictFileTooBig,
                acceptedFiles: BP_Nouveau.video.video_type,
                createImageThumbnails: !1,
                dictDefaultMessage: BP_Nouveau.video.dropzone_video_message,
                autoProcessQueue: !0,
                addRemoveLinks: !0,
                uploadMultiple: !1,
                maxFiles: void 0 !== BP_Nouveau.video.maxFiles ? BP_Nouveau.video.maxFiles : 10,
                maxFilesize: void 0 !== BP_Nouveau.video.max_upload_size ? BP_Nouveau.video.max_upload_size : 2,
                dictInvalidFileType: BP_Nouveau.video.dictInvalidFileType,
                dictMaxFilesExceeded: BP_Nouveau.video.video_dict_file_exceeded,
                previewTemplate: e,
                dictCancelUploadConfirmation: BP_Nouveau.video.dictCancelUploadConfirmation
            },
            p("#bp-media-uploader").hasClass("bp-media-document-uploader") ? (t = document.getElementsByClassName("forum-post-document-template").length ? document.getElementsByClassName("forum-post-document-template")[0].innerHTML : "",
            this.options = {
                url: BP_Nouveau.ajaxurl,
                timeout: 108e5,
                dictFileTooBig: BP_Nouveau.media.dictFileTooBig,
                acceptedFiles: BP_Nouveau.media.document_type,
                createImageThumbnails: !1,
                dictDefaultMessage: BP_Nouveau.media.dropzone_document_message,
                autoProcessQueue: !0,
                addRemoveLinks: !0,
                uploadMultiple: !1,
                maxFiles: void 0 !== BP_Nouveau.document.maxFiles ? BP_Nouveau.document.maxFiles : 10,
                maxFilesize: void 0 !== BP_Nouveau.document.max_upload_size ? BP_Nouveau.document.max_upload_size : 2,
                dictInvalidFileType: bp_media_dropzone.dictInvalidFileType,
                dictMaxFilesExceeded: BP_Nouveau.media.document_dict_file_exceeded,
                previewTemplate: t,
                dictCancelUploadConfirmation: BP_Nouveau.media.dictCancelUploadConfirmation
            }) : (t = document.getElementsByClassName("forum-post-media-template").length ? document.getElementsByClassName("forum-post-media-template")[0].innerHTML : "",
            this.options = {
                url: BP_Nouveau.ajaxurl,
                timeout: 108e5,
                dictFileTooBig: BP_Nouveau.media.dictFileTooBig,
                dictDefaultMessage: BP_Nouveau.media.dropzone_media_message,
                acceptedFiles: "image/*",
                autoProcessQueue: !0,
                addRemoveLinks: !0,
                uploadMultiple: !1,
                maxFiles: void 0 !== BP_Nouveau.media.maxFiles ? BP_Nouveau.media.maxFiles : 10,
                maxFilesize: void 0 !== BP_Nouveau.media.max_upload_size ? BP_Nouveau.media.max_upload_size : 2,
                dictInvalidFileType: bp_media_dropzone.dictInvalidFileType,
                dictMaxFilesExceeded: BP_Nouveau.media.media_dict_file_exceeded,
                previewTemplate: t,
                dictCancelUploadConfirmation: BP_Nouveau.media.dictCancelUploadConfirmation,
                maxThumbnailFilesize: void 0 !== BP_Nouveau.media.max_upload_size ? BP_Nouveau.media.max_upload_size : 2
            }),
            void 0 !== BP_Nouveau.media.dropzone_options && Object.assign(this.options, BP_Nouveau.media.dropzone_options),
            this.dropzone_obj = [],
            this.dropzone_media = [],
            this.album_id = void 0 !== BP_Nouveau.media.album_id && BP_Nouveau.media.album_id,
            this.current_folder = void 0 !== BP_Nouveau.media.current_folder && BP_Nouveau.media.current_folder,
            this.current_group_id = void 0 !== BP_Nouveau.media.current_group_id && BP_Nouveau.media.current_group_id,
            this.group_id = void 0 !== BP_Nouveau.media.group_id && BP_Nouveau.media.group_id,
            this.bbp_is_reply_edit = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.bbp_is_reply_edit && window.BP_Forums_Nouveau.media.bbp_is_reply_edit,
            this.bbp_is_topic_edit = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.bbp_is_topic_edit && window.BP_Forums_Nouveau.media.bbp_is_topic_edit,
            this.bbp_is_forum_edit = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.bbp_is_forum_edit && window.BP_Forums_Nouveau.media.bbp_is_forum_edit,
            this.bbp_reply_edit_media = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.reply_edit_media ? window.BP_Forums_Nouveau.media.reply_edit_media : [],
            this.bbp_reply_edit_document = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.reply_edit_document ? window.BP_Forums_Nouveau.media.reply_edit_document : [],
            this.bbp_reply_edit_video = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.reply_edit_video ? window.BP_Forums_Nouveau.media.reply_edit_video : [],
            this.bbp_topic_edit_media = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.topic_edit_media ? window.BP_Forums_Nouveau.media.topic_edit_media : [],
            this.bbp_topic_edit_video = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.topic_edit_video ? window.BP_Forums_Nouveau.media.topic_edit_video : [],
            this.bbp_topic_edit_document = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.topic_edit_document ? window.BP_Forums_Nouveau.media.topic_edit_document : [],
            this.bbp_forum_edit_media = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.forum_edit_media ? window.BP_Forums_Nouveau.media.forum_edit_media : [],
            this.bbp_forum_edit_document = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.forum_edit_document ? window.BP_Forums_Nouveau.media.forum_edit_document : [],
            this.bbp_forum_edit_video = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.forum_edit_video ? window.BP_Forums_Nouveau.media.forum_edit_video : [],
            this.bbp_reply_edit_gif_data = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.reply_edit_gif_data ? window.BP_Forums_Nouveau.media.reply_edit_gif_data : [],
            this.bbp_topic_edit_gif_data = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.topic_edit_gif_data ? window.BP_Forums_Nouveau.media.topic_edit_gif_data : [],
            this.bbp_forum_edit_gif_data = void 0 !== window.BP_Forums_Nouveau && void 0 !== window.BP_Forums_Nouveau.media.forum_edit_gif_data ? window.BP_Forums_Nouveau.media.forum_edit_gif_data : [],
            this.giphy = null,
            this.gif_offset = 0,
            this.gif_q = null,
            this.gif_limit = 20,
            this.gif_requests = [],
            this.gif_data = [],
            this.gif_container_key = !1,
            this.reply_topic_allow_delete_media = !1,
            this.reply_topic_display_post = "edit",
            bp.Nouveau.Media.documentCodeMirror(),
            p(window).on("scroll resize", function() {
                bp.Nouveau.Media.documentCodeMirror()
            })
        },
        addListeners: function() {
            var e = p(".bp-nouveau")
              , t = p(".bp-existing-media-wrap");
            e.on("click", "#bp-add-media", this.openUploader.bind(this)),
            e.on("click", "#bp-add-document", this.openDocumentUploader.bind(this)),
            e.on("click", "#bp-media-submit", this.submitMedia.bind(this)),
            e.on("click", "#bp-media-document-submit", this.submitDocumentMedia.bind(this)),
            e.on("click", "#bp-media-uploader-close", this.closeUploader.bind(this)),
            e.on("click", "#bb-delete-media", this.deleteMedia.bind(this)),
            e.on("click", "#bb-select-deselect-all-media", this.toggleSelectAllMedia.bind(this)),
            p('#buddypress [data-bp-list="media"]').on("bp_ajax_request", this.bp_ajax_media_request),
            e.on("click", "#bb-create-album", this.openCreateAlbumModal.bind(this)),
            p(document).on("click", "#bb-create-folder", this.openCreateFolderModal.bind(this)),
            p(document).on("click", "#bb-create-folder-child", this.openCreateFolderChildModal.bind(this)),
            p(document).on("click", "#bp-edit-folder-open", this.openEditFolderChildModal.bind(this)),
            p(document).on("click", "#bp-media-create-album-submit", this.saveAlbum.bind(this)),
            p(document).on("click", "#bp-media-create-folder-submit", this.saveFolder.bind(this)),
            p(document).on("click", "#bp-media-create-child-folder-submit", this.saveChildFolder.bind(this)),
            e.on("click", "#bp-media-create-album-close", this.closeCreateAlbumModal.bind(this)),
            p(document).on("click", "#bp-media-create-folder-close", this.closeCreateFolderModal.bind(this)),
            p(document).on("click", "#bp-media-edit-folder-close", this.closeEditFolderModal.bind(this)),
            p(document).on("click", ".open-popup .errorPopup", this.closeErrorPopup.bind(this)),
            e.on("click", "#bp-media-add-more", this.triggerDropzoneSelectFileDialog.bind(this)),
            p("#bp-media-uploader").on("click", ".bp-media-upload-tab", this.changeUploadModalTab.bind(this)),
            p('.bp-nouveau [data-bp-list="media"]').on("click", "li.load-more", this.injectMedias.bind(this)),
            p(".bp-nouveau #albums-dir-list").on("click", "li.load-more", this.appendAlbums.bind(this)),
            t.on("click", "li.load-more", this.appendMedia.bind(this)),
            e.on("change", '.bb-media-check-wrap [name="bb-media-select"]', this.addSelectedClassToWrapper.bind(this)),
            t.on("change", '.bb-media-check-wrap [name="bb-media-select"]', this.toggleSubmitMediaButton.bind(this)),
            e.on("click", "#bp-edit-album-title", this.editAlbumTitle.bind(this)),
            p(document).on("click", "#bp-edit-folder-title", this.editFolderTitle.bind(this)),
            e.on("click", "#bp-cancel-edit-album-title", this.cancelEditAlbumTitle.bind(this)),
            e.on("click", "#bp-save-album-title", this.saveAlbum.bind(this)),
            p(document).on("click", "#bp-save-folder-title", this.saveFolder.bind(this)),
            e.on("change", "#bp-media-single-album select#bb-album-privacy", this.saveAlbum.bind(this)),
            e.on("change", "#media-stream select#bb-folder-privacy", this.savePrivacy.bind(this)),
            e.on("click", "#bb-delete-album", this.deleteAlbum.bind(this)),
            p(document).on("click", "#bb-delete-folder", this.deleteFolder.bind(this)),
            p(document).on("click", "ul.document-nav li", this.resetPageDocumentDirectory.bind(this)),
            p(document).on("click", "ul.document-nav li a", this.resetPageDocumentDirectory.bind(this)),
            p(document).on("click", "#forums-media-button", this.openForumsUploader.bind(this)),
            p(document).on("click", "#forums-document-button", this.openForumsDocumentUploader.bind(this)),
            p(document).on("click", "#forums-video-button", this.openForumsVideoUploader.bind(this)),
            p(document).on("click", "#forums-gif-button", this.toggleGifSelector.bind(this)),
            p(document).find("form #whats-new-toolbar, .forum form #whats-new-toolbar").on("keydown", ".search-query-input", this.searchGif.bind(this)),
            p(document).on("click", ".bbpress-forums-activity #whats-new-toolbar .found-media-item", this.selectGif.bind(this)),
            p(document).find("form #whats-new-toolbar, .forum form #whats-new-toolbar").on("click", ".found-media-item", this.selectGif.bind(this)),
            p(document).find("form #whats-new-toolbar .gif-search-results, .forum form #whats-new-toolbar .gif-search-results").scroll(this.loadMoreGif.bind(this)),
            p(".buddypress.groups.messages").length || p(document).find("form #whats-new-toolbar, .forum form #whats-new-toolbar").on("click", ".found-media-item", this.selectGif.bind(this)),
            p(document).find("form #whats-new-attachments .forums-attached-gif-container .gif-search-results, .forum form #whats-new-attachments .forums-attached-gif-container .gif-search-results").scroll(this.loadMoreGif.bind(this)),
            p(document).find("form #whats-new-attachments .forums-attached-gif-container, .forum form #whats-new-attachments .forums-attached-gif-container").on("click", ".gif-image-remove", this.removeSelectedGif.bind(this)),
            p(document).on("click", ".gif-image-container", this.playVideo.bind(this)),
            p(document).on("click", ".directory.document  .media-folder_action__anchor, .directory.document  .media-folder_action__anchor li a, .bb-media-container .media-folder_action__anchor, .bb-media-container  .media-folder_action__list li a", this.fileActionButton.bind(this)),
            p(document).on("click", ".bb-activity-media-elem .copy_download_file_url a, .media-folder_action__list .copy_download_file_url a, .media .bb-photo-thumb .copy_download_file_url a", this.copyDownloadLink.bind(this)),
            p(document).on("click", ".bb-activity-media-elem.media-activity .media-action-wrap .media-action_more, #media-stream.media .bb-photo-thumb .media-action-wrap .media-action_more, .bb-activity-media-elem.document-activity .document-action-wrap .document-action_more, .bb-activity-media-elem.document-activity .document-action-wrap .document-action_list li a", this.fileActivityActionButton.bind(this)),
            p(document).click(this.toggleFileActivityActionButton),
            p(document).on("click", ".bb-activity-media-elem.document-activity .document-expand .document-expand-anchor, .bb-activity-media-elem.document-activity .document-action-wrap .document-action_collapse", this.toggleCodePreview.bind(this)),
            p(document).on("click", ".activity .bp-document-move-activity, #media-stream .bp-document-move-activity", this.moveDocumentIntoFolder.bind(this)),
            p(document).on("click", '.bp-nouveau [data-bp-list="document"] .pager .dt-more-container.load-more', this.injectDocuments.bind(this)),
            p(document).on("click", '.bp-nouveau [data-bp-list="document"] .data-head', this.sortDocuments.bind(this)),
            p(document).on("click", ".modal-container .bb-field-steps-actions", this.documentPopupNavigate.bind(this)),
            p(document).on("click", ".bp-media-document-uploader .modal-container .bb-field-uploader-actions", this.uploadDocumentNavigate.bind(this)),
            p(document).on("click", ".bp-media-photo-uploader .modal-container .bb-field-uploader-actions", this.uploadMediaNavigate.bind(this)),
            p(document).on("click", ".modal-container #bp-media-edit-child-folder-submit", this.renameChildFolder.bind(this)),
            p(document).on("click", ".activity .bp-media-move-activity, #media-stream .bp-media-move-activity", this.moveMediaIntoAlbum.bind(this));
            var i = p("#bb-media-model-container .activity-list, #media-stream");
            p('#buddypress .activity-list, #buddypress [data-bp-list="activity"], #bb-media-model-container .activity-list, #media-stream').on("click", ".ac-document-move, .ac-folder-move", this.openDocumentMove.bind(this)),
            p('#buddypress .activity-list, #buddypress [data-bp-list="activity"], #bb-media-model-container .activity-list, #media-stream, .group-media #media-stream').on("click", ".ac-media-move", this.openMediaMove.bind(this)),
            p('#buddypress .activity-list, #buddypress [data-bp-list="activity"], #bb-media-model-container .activity-list, #media-stream').on("click", ".ac-document-close-button, .ac-folder-close-button", this.closeDocumentMove.bind(this)),
            p('#buddypress .activity-list, #buddypress [data-bp-list="activity"], #bb-media-model-container .activity-list, #media-stream').on("click", ".ac-media-close-button", this.closeMediaMove.bind(this)),
            i.on("click", ".ac-document-rename", this.renameDocument.bind(this)),
            i.on("click", ".ac-document-privacy", this.editPrivacyDocument.bind(this)),
            i.on("keyup", ".media-folder_name_edit", this.renameDocumentSubmit.bind(this)),
            i.on("click", ".name_edit_cancel, .name_edit_save", this.renameDocumentSubmit.bind(this)),
            p(document).on("click", ".document-file-delete", this.deleteDocument.bind(this)),
            p(document).on("click", ".media-file-delete", this.deleteMedia.bind(this)),
            p(document).on("click", ".bp-folder-move", this.folderMove.bind(this)),
            p(document).on("click", ".bp-document-open-create-popup-folder", this.createFolderInPopup.bind(this)),
            p(document).on("click", ".bp-media-open-create-popup-folder", this.createAlbumInPopup.bind(this)),
            p(document).on("click", ".close-create-popup-folder", this.closeCreateFolderInPopup.bind(this)),
            p(document).on("click", ".close-create-popup-album", this.closeCreateAlbumInPopup.bind(this)),
            p(document).on("click", ".bp-document-create-popup-folder-submit", this.submitCreateFolderInPopup.bind(this)),
            p(document).on("click", ".bp-media-create-popup-album-submit", this.submitCreateAlbumInPopup.bind(this));
            var a = p(".buddypress.groups.messages")
              , t = p(".buddypress.groups.messages form#send_group_message_form #whats-new-toolbar")
              , e = p(".buddypress.groups.messages form#send_group_message_form #whats-new-attachments .bp-group-messages-attached-gif-container .gif-search-results")
              , i = p(".buddypress.groups.messages form#send_group_message_form #whats-new-attachments .bp-group-messages-attached-gif-container");
            a.on("click", "#bp-group-messages-media-button", this.openGroupMessagesUploader.bind(this)),
            a.on("click", "#bp-group-messages-document-button", this.openGroupMessagesDocumentUploader.bind(this)),
            a.on("click", "#bp-group-messages-video-button", this.openGroupMessagesVideoUploader.bind(this)),
            a.on("click", "#bp-group-messages-gif-button", this.toggleGroupMessagesGifSelector.bind(this)),
            t.on("keyup", ".search-query-input", this.searchGroupMessagesGif.bind(this)),
            t.on("click", ".found-media-item", this.selectGroupMessagesGif.bind(this)),
            e.scroll(this.loadMoreGroupMessagesGif.bind(this)),
            p(".groups.messages form#send_group_message_form #whats-new-toolbar .bp-group-messages-attached-gif-container .gif-search-results").scroll(this.loadMoreGroupMessagesGif.bind(this)),
            i.on("click", ".gif-image-remove", this.removeGroupMessagesSelectedGif.bind(this)),
            p(".bp-existing-media-wrap").on("scroll", this.loadExistingMedia.bind(this)),
            document.addEventListener("keyup", this.closePopup.bind(this)),
            document.addEventListener("keyup", this.submitPopup.bind(this)),
            _.isUndefined(BP_Nouveau.media.gif_api_key) || (window.addEventListener("scroll", this.autoPlayGifVideos, !1),
            window.addEventListener("resize", this.autoPlayGifVideos, !1),
            document.addEventListener("keydown", _.bind(this.closePickersOnEsc, this)),
            p(document).on("click", _.bind(this.closePickersOnClick, this))),
            (this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit) && (this.bbp_reply_edit_media.length || this.bbp_topic_edit_media.length || this.bbp_forum_edit_media.length) && p("#forums-media-button").trigger("click"),
            (this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit) && (this.bbp_reply_edit_document.length || this.bbp_topic_edit_document.length || this.bbp_forum_edit_document.length) && p("#forums-document-button").trigger("click"),
            (this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit) && (this.bbp_reply_edit_video.length || this.bbp_topic_edit_video.length || this.bbp_forum_edit_video.length) && p("#forums-video-button").trigger("click"),
            (this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit) && (Object.keys(this.bbp_reply_edit_gif_data).length || Object.keys(this.bbp_topic_edit_gif_data).length || Object.keys(this.bbp_forum_edit_gif_data).length) && (this.editGifPreview(),
            (i = jQuery("#forums-gif-button").addClass("active").closest("form")).find("#forums-document-button") && i.find("#forums-document-button").parents(".post-elements-buttons-item").addClass("disable"),
            i.find("#forums-media-button") && i.find("#forums-media-button").parents(".post-elements-buttons-item").addClass("disable"),
            i.find("#forums-video-button") && i.find("#forums-video-button").parents(".post-elements-buttons-item").addClass("disable")),
            "#openEditFolder" == window.location.hash && p("#bp-media-edit-child-folder").length && (history.pushState(null, null, window.location.href.split("#")[0]),
            p("#bp-media-edit-child-folder").show()),
            (this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit) && (bp.Nouveau.Media.reply_topic_allow_delete_media = !0)
        },
        loadExistingMedia: function() {
            p(window).scroll()
        },
        resetPageDocumentDirectory: function(e) {
            e.preventDefault(),
            this.current_page = 1
        },
        submitCreateFolderInPopup: function(e) {
            e.preventDefault();
            var i = p(e.currentTarget).closest(".open-popup")
              , a = p(i).find(".bp-document-create-popup-folder-submit")
              , t = i.find(".bb-folder-selected-id").val()
              , o = p.trim(p(e.currentTarget).closest(".modal-container").find(".popup-on-fly-create-folder-title").val())
              , d = p(e.currentTarget).closest(".modal-container").find(".popup-on-fly-create-folder-title")
              , s = /[\\/?%*:|"<>]+/g.exec(d.val())
              , s = Boolean(s);
            if ("" === p.trim(d.val()) || s)
                return d.addClass("error"),
                !1;
            d.removeClass("error"),
            this.currentTargetParent = t = "" === t ? 0 : t;
            var n = this.currentTargetParent
              , r = 0
              , l = ""
              , c = ""
              , u = 0;
            if ("group" === this.moveToTypePopup ? (l = "grouponly",
            r = this.moveToIdPopup) : (l = p(e.currentTarget).closest(".modal-container").find(".popup-on-fly-create-folder #bb-folder-privacy").val(),
            c = p(e.currentTarget).closest(".modal-container").find(".popup-on-fly-create-folder #bb-folder-privacy")),
            "" === o)
                return alert(BP_Nouveau.media.create_folder_error_title),
                !1;
            a.addClass("loading"),
            setTimeout(function() {
                var e = {
                    action: "document_folder_save",
                    _wpnonce: BP_Nouveau.nonces.media,
                    title: o,
                    privacy: l,
                    parent: n,
                    group_id: r
                };
                p.ajax({
                    type: "POST",
                    url: BP_Nouveau.ajaxurl,
                    data: e,
                    async: !1,
                    success: function(e) {
                        var t;
                        e.success && (p(".document-data-table-head").length && parseInt(n) === parseInt(BP_Nouveau.media.current_folder) && (bp.Nouveau.inject("#media-stream div#media-folder-document-data-table", e.data.document, "prepend"),
                        jQuery(window).scroll()),
                        i.find(".location-folder-list-wrap .location-folder-list").remove(),
                        i.find(".location-folder-list-wrap").append(e.data.tree_view),
                        t = "#" + p(i).attr("id"),
                        bp.Nouveau.Media.folderLocationUI && bp.Nouveau.Media.folderLocationUI(t, e.data.folder_id),
                        u = e.data.folder_id,
                        "" === e.data.tree_view ? (i.find(".location-folder-list-wrap").hide(),
                        i.find(".location-folder-list-wrap-main span.no-folder-exists").show()) : (i.find(".location-folder-list-wrap-main span.no-folder-exists").hide(),
                        i.find(".location-folder-list-wrap").show()),
                        i.find("ul.location-folder-list span#" + u).trigger("click"),
                        i.find(".bb-model-footer").show(),
                        i.find(".bb-model-footer, #bp-media-document-prev").show(),
                        i.find(".bb-field-wrap-search").show(),
                        i.find(".bp-document-open-create-popup-folder").show(),
                        i.find(".location-folder-list-wrap-main").show(),
                        i.find(".create-popup-folder-wrap").hide(),
                        i.find(".bb-folder-selected-id").val(),
                        i.find(".bb-folder-selected-id").val(u),
                        i.find(".bb-model-header").children().show(),
                        i.find(".bb-model-header p").hide(),
                        d.val(""),
                        "" !== c && c.val("public"),
                        p(i).find(".breadcrumbs-append-ul-li .breadcrumb .item span:not(.hidden)").each(function(e) {
                            0 < e && p(i).find(".breadcrumbs-append-ul-li .breadcrumb .item").width() > p(i).find(".breadcrumbs-append-ul-li .breadcrumb").width() && (p(i).find(".breadcrumbs-append-ul-li .breadcrumb .item span.hidden").append(p(i).find(".breadcrumbs-append-ul-li .breadcrumb .item span").eq(2)),
                            p(i).find(".breadcrumbs-append-ul-li .breadcrumb .item .more_options").length || p('<span class="more_options">...</span>').insertAfter(p(i).find(".breadcrumbs-append-ul-li .breadcrumb .item span").eq(0)))
                        }),
                        a.removeClass("loading"),
                        setTimeout(function() {
                            var e = i.find("ul.location-folder-list span#" + u);
                            e.trigger("click");
                            var t = p(i).find("#bb-document-privacy");
                            0 !== Number(e.data("id")) ? (t.find("option").removeAttr("selected"),
                            t.val(e.parent().data("privacy")),
                            t.prop("disabled", !0)) : (t.find("option").removeAttr("selected"),
                            t.val("public"),
                            t.prop("disabled", !1))
                        }, 200))
                    }
                }),
                this.currentTargetParent = u,
                i.find(".location-folder-list li.is_active").show().children("span, i").show().siblings("ul").hide(),
                i.find(".location-folder-list li.is_active").siblings("li").show().children("span, i").show().siblings("ul").hide(),
                i.find(".location-folder-list li span.selected").removeClass("selected"),
                i.find(".location-folder-list li.is_active").children("span").addClass("selected")
            }, 0)
        },
        submitCreateAlbumInPopup: function(e) {
            e.preventDefault();
            var t = p(e.currentTarget).closest(".open-popup")
              , i = p(t).find(".bp-media-create-popup-album-submit")
              , a = t.find(".bb-album-selected-id").val();
            this.currentTargetParent = a = "" === a ? 0 : a;
            var o = this.currentTargetParent
              , d = 0
              , s = p.trim(p(e.currentTarget).closest(".modal-container").find(".popup-on-fly-create-album-title").val())
              , n = p(e.currentTarget).closest(".modal-container").find(".popup-on-fly-create-album-title")
              , r = ""
              , l = ""
              , c = 0;
            if ("group" === this.moveToTypePopup ? (r = "grouponly",
            d = this.moveToIdPopup) : (r = p(e.currentTarget).closest(".modal-container").find(".popup-on-fly-create-album #bb-album-privacy").val(),
            l = p(e.currentTarget).closest(".modal-container").find(".popup-on-fly-create-album #bb-album-privacy")),
            "" === s)
                return alert(BP_Nouveau.media.create_album_error_title),
                !1;
            i.addClass("loading"),
            setTimeout(function() {
                var e = {
                    action: "media_album_save",
                    _wpnonce: BP_Nouveau.nonces.media,
                    title: s,
                    privacy: r,
                    parent: o,
                    group_id: d
                };
                p.ajax({
                    type: "POST",
                    url: BP_Nouveau.ajaxurl,
                    data: e,
                    async: !1,
                    success: function(e) {
                        e.success && (t.find(".location-album-list-wrap .location-album-list").remove(),
                        t.find(".location-album-list-wrap").append(e.data.tree_view),
                        bp.Nouveau.Media.folderLocationUI && bp.Nouveau.Media.folderLocationUI(t, e.data.album_id),
                        c = e.data.album_id,
                        "" === e.data.tree_view ? (t.find(".location-album-list-wrap").hide(),
                        t.find(".location-album-list-wrap-main span.no-album-exists").show()) : (t.find(".location-album-list-wrap-main span.no-album-exists").hide(),
                        t.find(".location-album-list-wrap").show()),
                        t.find("ul.location-album-list span#" + c).trigger("click"),
                        t.find(".bb-model-footer").show(),
                        t.find(".bb-field-wrap-search").show(),
                        t.find(".bp-media-open-create-popup-album").show(),
                        t.find(".location-album-list-wrap-main").show(),
                        t.find(".create-popup-album-wrap").hide(),
                        t.find(".bb-field-steps-2 #bp-media-prev").show(),
                        t.find(".bb-album-selected-id").val(),
                        t.find(".bb-album-selected-id").val(c),
                        t.find(".bb-model-header").children().show(),
                        t.find(".bb-model-header p").hide(),
                        n.val(""),
                        "" !== l && l.val("public"),
                        p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item span:not(.hidden)").each(function(e) {
                            0 < e && p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item").width() > p(t).find(".breadcrumbs-append-ul-li .breadcrumb").width() && (p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item span.hidden").append(p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item span").eq(2)),
                            p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item .more_options").length || p('<span class="more_options">...</span>').insertAfter(p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item span").eq(0)))
                        })),
                        i.removeClass("loading")
                    }
                }),
                this.currentTargetParent = c,
                t.find(".location-album-list li.is_active").show().children("span, i").show().siblings("ul").hide(),
                t.find(".location-album-list li.is_active").siblings("li").show().children("span, i").show().siblings("ul").hide(),
                t.find(".location-album-list li span.selected").removeClass("selected"),
                t.find(".location-album-list li.is_active").children("span").addClass("selected")
            }, 0)
        },
        closeCreateFolderInPopup: function(e) {
            e.preventDefault(),
            p(".modal-container .bb-model-footer").show(),
            p(".bb-field-wrap-search").show(),
            p(".bp-document-open-create-popup-folder").show(),
            p(".location-folder-list-wrap-main").show(),
            p("#bp-media-document-prev").show(),
            p(".create-popup-folder-wrap").hide(),
            p(e.currentTarget).closest(".has-folderlocationUI").find(".bb-model-header").children().show(),
            p(e.currentTarget).closest(".has-folderlocationUI").find(".bb-model-header p").hide()
        },
        closeCreateAlbumInPopup: function(e) {
            e.preventDefault(),
            p(".modal-container .bb-model-footer").show(),
            p(".bb-field-wrap-search").show(),
            p(".bp-document-open-create-popup-folder").show(),
            p(".modal-container:visible .bp-video-open-create-popup-album").show(),
            p(".location-album-list-wrap-main").show(),
            p(".bb-field-steps-2 #bp-media-prev").show(),
            p(".bb-field-steps-2 #bp-video-next").show(),
            p(".create-popup-album-wrap").hide(),
            p(".bp-media-create-popup-album-submit.loading").removeClass("loading"),
            p(e.currentTarget).closest(".has-folderlocationUI").find(".bb-model-header").children().show(),
            p(e.currentTarget).closest(".has-folderlocationUI").find(".bb-model-header p").hide()
        },
        createFolderInPopup: function(e) {
            e.preventDefault();
            var t = parseInt(p(document).find(".open-popup .bb-folder-selected-id").val())
              , i = p(document).find(".open-popup .bb-folder-create-from").val();
            0 < t ? p(document).find(".open-popup .privacy-field-wrap-hide-show").hide() : p(document).find(".open-popup .privacy-field-wrap-hide-show").show(),
            "group" === i || 0 < t ? p(document).find(".popup-on-fly-create-folder .privacy-field-wrap-hide-show").hide() : p(document).find(".popup-on-fly-create-folder .privacy-field-wrap-hide-show").show(),
            p(".modal-container .bb-model-footer, .modal-container #bp-media-document-prev").hide(),
            p(".bb-field-wrap-search").hide(),
            p(".bp-document-open-create-popup-folder").hide(),
            p(".location-folder-list-wrap-main").hide(),
            p(".create-popup-folder-wrap").show(),
            p(e.currentTarget).closest(".has-folderlocationUI").find(".bb-model-header").children().hide(),
            p(e.currentTarget).closest(".has-folderlocationUI").find(".bb-model-header").append("<p>" + BP_Nouveau.media.create_folder + "</p>"),
            p(".modal-container #bb-folder-privacy").addClass("new-folder-create-privacy"),
            p(document).find(".open-popup .error").hide()
        },
        createAlbumInPopup: function(e) {
            e.preventDefault();
            var t = parseInt(p(document).find(".open-popup .bb-album-selected-id").val())
              , i = p(document).find(".open-popup .bb-album-create-from").val();
            0 < t ? p(document).find(".open-popup .privacy-field-wrap-hide-show").hide() : p(document).find(".open-popup .privacy-field-wrap-hide-show").show(),
            "group" === i ? p(document).find(".popup-on-fly-create-album .privacy-field-wrap-hide-show").hide() : p(document).find(".popup-on-fly-create-album .privacy-field-wrap-hide-show").show(),
            p(".modal-container .bb-model-footer").hide(),
            p(".bb-field-wrap-search").hide(),
            p(".bp-document-open-create-popup-folder").hide(),
            p(".location-album-list-wrap-main").hide(),
            p(".bb-field-steps-2 #bp-media-prev").hide(),
            p(".create-popup-album-wrap").show(),
            p(e.currentTarget).closest(".has-folderlocationUI").find(".bb-model-header").children().hide(),
            p(e.currentTarget).closest(".has-folderlocationUI").find(".bb-model-header").append("<p>" + BP_Nouveau.media.create_album_title + "</p>"),
            p(".modal-container #bb-folder-privacy").addClass("new-folder-create-privacy"),
            p(document).find(".open-popup .error").hide()
        },
        savePrivacy: function(e) {
            var t, i, a, o = p(e.currentTarget);
            if (e.preventDefault(),
            o.hasClass("new-folder-create-privacy"))
                return !1;
            t = parseInt(o.data("item-id")),
            a = o.data("item-type"),
            i = o.val(),
            e = p(e.currentTarget).find("option:selected").text(),
            this.privacySelectorSelect.addClass("hide"),
            this.privacySelectorSpan.text(""),
            this.privacySelectorSpan.text(e),
            this.privacySelectorSpan.show(),
            0 < t && (a = {
                action: "document_save_privacy",
                item_id: t,
                type: a,
                value: i,
                _wpnonce: BP_Nouveau.nonces.media
            },
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: a,
                success: function(e) {
                    e.success ? (p(document).find("#div-listing-" + t + " li#" + t + " a").attr("data-privacy", i),
                    e.data.document && e.data.document.video_symlink && p(document).find('a.bb-open-document-theatre[data-id="' + t + '"]').attr("data-video-preview", e.data.document.video_symlink)) : (o.find('option[value="' + o.attr("data-privacy") + '"]').attr("selected", "selected"),
                    o.siblings("span").text(o.find('option[value="' + o.attr("data-privacy") + '"]').text()),
                    alert(e.data.feedback.replace("&#039;", "'")))
                }
            }))
        },
        folderMove: function(e) {
            var i = p(e.currentTarget);
            e.preventDefault();
            var t = i.attr("id")
              , e = p("#media-folder-document-data-table #bp-media-move-folder .modal-mask .modal-wrapper #boss-media-create-album-popup .bb-field-wrap .bb-folder-selected-id").val();
            if ("" === t || "" === e)
                return alert(BP_Nouveau.media.i18n_strings.folder_move_error),
                !1;
            i.addClass("loading");
            e = {
                action: "document_folder_move",
                current_folder_id: t,
                folder_move_to_id: e,
                group_id: this.group_id,
                _wpnonce: BP_Nouveau.nonces.media
            };
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: e,
                success: function(e) {
                    if (!e.success)
                        return p(document).find(".open-popup .error").show(),
                        p(document).find(".open-popup .error").html(e.data.feedback),
                        i.removeClass("loading"),
                        !1;
                    var t;
                    "yes" === BP_Nouveau.media.is_document_directory ? "personal" === bp.Nouveau.getStorage("bp-document").scope ? (p(document).find("li#document-personal a").trigger("click"),
                    p(document).find("li#document-personal").trigger("click")) : (p(document).find("li#document-all a").trigger("click"),
                    p(document).find("li#document-all").trigger("click")) : ((t = p("#media-stream")).html(""),
                    t.html(e.data.html),
                    p(document).find(".open-popup .error").hide(),
                    p(document).find(".open-popup .error").html(""),
                    i.removeClass("loading"),
                    p(document).removeClass("open-popup"))
                }
            })
        },
        deleteDocument: function(e) {
            var t = p(e.currentTarget);
            e.preventDefault();
            var i = t.attr("data-type")
              , a = t.attr("data-item-id")
              , o = t.attr("data-item-attachment-id")
              , d = t.attr("data-item-preview-attachment-id")
              , s = [];
            if ("activity" !== t.attr("data-item-from")) {
                if ("folder" === i) {
                    if (!confirm(BP_Nouveau.media.i18n_strings.folder_delete_confirm))
                        return !1
                } else if ("document" === i && !confirm(BP_Nouveau.media.i18n_strings.document_delete_confirm))
                    return !1;
                s = {
                    action: "document_delete",
                    id: a,
                    preview_attachment_id: d,
                    type: i,
                    attachment_id: o,
                    _wpnonce: BP_Nouveau.nonces.media
                };
                "yes" === BP_Nouveau.media.is_document_directory && (e = bp.Nouveau.getStorage("bp-document").scope,
                s.scope = "" === e ? "all" : e),
                p.ajax({
                    type: "POST",
                    url: BP_Nouveau.ajaxurl,
                    asyc: !1,
                    data: s,
                    success: function(e) {
                        var t;
                        e.success && ((t = p("#media-stream")).html(""),
                        t.html(e.data.html))
                    }
                }),
                this.current_page = 1
            } else {
                if (!confirm(BP_Nouveau.media.i18n_strings.document_delete_confirm))
                    return !1;
                var n = t.attr("data-item-activity-id");
                s = {
                    action: "document_activity_delete",
                    id: a,
                    preview_attachment_id: d,
                    type: i,
                    activity_id: n,
                    attachment_id: o,
                    _wpnonce: BP_Nouveau.nonces.media
                },
                p.ajax({
                    type: "POST",
                    url: BP_Nouveau.ajaxurl,
                    data: s,
                    success: function(e) {
                        e.success && (p("body #buddypress .activity-list li#activity-" + n + " .document-activity .activity-inner .bb-activity-media-wrap .document-activity." + a).remove(),
                        p("body #buddypress .activity-list .activity-comments .document-activity." + a).remove(),
                        !0 === e.data.delete_activity ? (p("body #buddypress .activity-list li#activity-" + n).remove(),
                        p("body .bb-activity-media-elem.document-activity." + a).remove(),
                        p("body .activity-comments li#acomment-" + n).remove()) : p("body #buddypress .activity-list li#activity-" + n).replaceWith(e.data.activity_content))
                    }
                })
            }
        },
        bp_ajax_media_request: function(e, t) {
            BP_Nouveau.media.group_id && void 0 !== t && void 0 !== t.response.scopes.groups && 0 === t.response.scopes.groups ? p(".bb-photos-actions").hide() : BP_Nouveau.media.group_id && void 0 !== t && void 0 !== t.response.scopes.groups && 0 !== t.response.scopes.groups ? p(".bb-photos-actions").show() : void 0 !== t && void 0 !== t.response.scopes.personal && 0 === t.response.scopes.personal && p(".bb-photos-actions").hide()
        },
        addSelectedClassToWrapper: function(e) {
            var e = e.currentTarget;
            p(e).is(":checked") ? (p(e).closest(".bb-media-check-wrap").find(".bp-tooltip").attr("data-bp-tooltip", BP_Nouveau.media.i18n_strings.unselect),
            p(e).closest(".bb-item-thumb").addClass("selected")) : (p(e).closest(".bb-item-thumb").removeClass("selected"),
            p(e).closest(".bb-media-check-wrap").find(".bp-tooltip").attr("data-bp-tooltip", BP_Nouveau.media.i18n_strings.select),
            (e = p(".bp-nouveau #bb-select-deselect-all-media")).hasClass("selected") && e.removeClass("selected"))
        },
        moveDocumentIntoFolder: function(e) {
            var i = p(e.currentTarget);
            e.preventDefault();
            var a = i.attr("id")
              , e = i.closest(".bp-media-move-file").find(".bb-folder-selected-id").val();
            if ("" === a || "" === e)
                return i.closest(".modal-container").find(".location-folder-list").addClass("has-error"),
                !1;
            "yes" !== BP_Nouveau.media.is_document_directory && (this.current_page = 1),
            i.closest(".modal-container").find(".location-folder-list").removeClass("has-error"),
            i.addClass("loading");
            var o = p(document).find('a[data-media-id="' + a + '"]').attr("data-parent-activity-id")
              , e = {
                action: "document_move",
                _wpnonce: BP_Nouveau.nonces.media,
                document_id: a,
                folder_id: e,
                group_id: this.group_id,
                activity_id: o
            };
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: e,
                success: function(e) {
                    var t;
                    e.success ? ("yes" === BP_Nouveau.media.is_document_directory ? "personal" === bp.Nouveau.getStorage("bp-document").scope ? (p(document).find("li#document-personal a").trigger("click"),
                    p(document).find("li#document-personal").trigger("click")) : (p(document).find("li#document-all a").trigger("click"),
                    p(document).find("li#document-all").trigger("click")) : (0 < parseInt(BP_Nouveau.media.current_folder) ? p('#document-stream ul.media-list li[data-id="' + a + '"]').remove() : p('#activity-stream ul.activity-list li .activity-content .activity-inner .bb-activity-media-wrap div[data-id="' + a + '"]').length && !p('#activity-stream ul.activity-list li .activity-content .activity-inner .bb-activity-media-wrap div[data-id="' + a + '"]').parent().hasClass("bb-media-length-1") && (p('#activity-stream ul.activity-list li .activity-content .activity-inner .bb-activity-media-wrap div[data-id="' + a + '"]').remove(),
                    o && o.length && (p('#activity-stream ul.activity-list li[data-bp-activity-id="' + o + '"] .activity-content .activity-inner .bb-activity-media-wrap').remove(),
                    p('#activity-stream ul.activity-list li[data-bp-activity-id="' + o + '"] .activity-content .activity-inner').append(e.data.document_content))),
                    (t = p("#media-stream")).html(""),
                    t.html(e.data.html),
                    p(document).find(".open-popup .error").hide(),
                    p(document).find(".open-popup .error").html(""),
                    i.removeClass("loading"),
                    p(document).removeClass("open-popup")),
                    i.closest(".bp-media-move-file").find(".ac-document-close-button").trigger("click")) : alert(e.data.feedback.replace("&#039;", "'"))
                }
            })
        },
        moveMediaIntoAlbum: function(e) {
            var t = p(e.currentTarget);
            e.preventDefault();
            var i = t.attr("id")
              , a = t.closest(".bp-media-move-file").find(".bb-album-selected-id").val();
            if ("" === i || "" === a)
                return t.closest(".modal-container").find(".location-album-list").addClass("has-error"),
                !1;
            t.closest(".modal-container").find(".location-album-list").removeClass("has-error"),
            t.addClass("loading");
            var o = p(document).find('a[data-media-id="' + i + '"]').attr("data-parent-activity-id")
              , e = parseInt(this.group_id);
            e || (e = !1,
            "group" === p(document).find('a[data-media-id="' + i + '"]').attr("data-type") && (e = p(document).find('a[data-media-id="' + i + '"]').attr("id")));
            e = {
                action: "media_move",
                _wpnonce: BP_Nouveau.nonces.media,
                media_id: i,
                album_id: a,
                group_id: e,
                activity_id: o
            };
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: e,
                success: function(e) {
                    e.success ? ("yes" === BP_Nouveau.media.is_media_directory ? "personal" === bp.Nouveau.getStorage("bp-media").scope ? (p(document).find("li#media-personal a").trigger("click"),
                    p(document).find("li#media-personal").trigger("click")) : (p(document).find("li#media-all a").trigger("click"),
                    p(document).find("li#media-all").trigger("click")) : (0 < parseInt(BP_Nouveau.media.current_album) ? p('#media-stream ul.media-list li[data-id="' + i + '"]').remove() : p('#activity-stream ul.activity-list li .activity-content .activity-inner .bb-activity-media-wrap div[data-id="' + i + '"]').length && !p('#activity-stream ul.activity-list li .activity-content .activity-inner .bb-activity-media-wrap div[data-id="' + i + '"]').parent().hasClass("bb-media-length-1") && (p('#activity-stream ul.activity-list li .activity-content .activity-inner .bb-activity-media-wrap div[data-id="' + i + '"]').remove(),
                    o && o.length && (p('#activity-stream ul.activity-list li[data-bp-activity-id="' + o + '"] .activity-content .activity-inner .bb-activity-media-wrap').remove(),
                    p('#activity-stream ul.activity-list li[data-bp-activity-id="' + o + '"] .activity-content .activity-inner').append(e.data.media_content),
                    jQuery(window).scroll())),
                    p(document).find(".open-popup .error").hide(),
                    p(document).find(".open-popup .error").html(""),
                    t.removeClass("loading"),
                    p(document).removeClass("open-popup")),
                    t.closest(".bp-media-move-file").find(".ac-media-close-button").trigger("click"),
                    p(document).find('a.bb-open-media-theatre[data-id="' + i + '"]').data("album-id", a)) : alert(e.data.feedback.replace("&#039;", "'"))
                }
            })
        },
        deleteMedia: function(e) {
            var a = p(e.currentTarget)
              , o = this;
            e.preventDefault();
            var d, s = [], n = p("#buddypress"), e = a.attr("data-type"), r = a.data("item-from"), l = "";
            if ("album" === e) {
                if (!confirm(BP_Nouveau.media.i18n_strings.album_delete_confirm))
                    return !1
            } else if ("media" === e && !confirm(BP_Nouveau.media.i18n_strings.media_delete_confirm))
                return !1;
            if (a.hasClass("bb-delete")) {
                if (!confirm(BP_Nouveau.media.i18n_strings.media_delete_confirm))
                    return !1;
                n.find(".media-list:not(.existing-media-list)").find('.bb-media-check-wrap [name="bb-media-select"]:checked').each(function() {
                    p(this).closest(".bb-photo-thumb").addClass("loading deleting"),
                    s.push(p(this).val())
                })
            }
            if (d = a.data("parent-activity-id"),
            r && r.length && "activity" === r && 0 == s.length && (l = a.attr("data-item-id"),
            s.push(l)),
            0 == s.length && s.push(a.data("item-id")),
            0 == s.length)
                return !1;
            a.prop("disabled", !0),
            p("#buddypress #media-stream.media .bp-feedback").remove();
            e = {
                action: "media_delete",
                _wpnonce: BP_Nouveau.nonces.media,
                media: s,
                activity_id: d,
                from_where: r
            };
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: e,
                success: function(e) {
                    o.current_page = 1;
                    var t, i = "";
                    r && r.length && "activity" === r ? e.success && (p.each(s, function(e, t) {
                        p('#activity-stream ul.activity-list li.activity .activity-content .activity-inner .bb-activity-media-wrap div[data-id="' + t + '"]').length && p('#activity-stream ul.activity-list li.activity .activity-content .activity-inner .bb-activity-media-wrap div[data-id="' + t + '"]').remove(),
                        p("body .bb-activity-media-elem.media-activity." + t).length && p("body .bb-activity-media-elem.media-activity." + t).remove()
                    }),
                    p('#activity-stream ul.activity-list li[data-bp-activity-id="' + d + '"] .activity-content .activity-inner .bb-activity-media-wrap').remove(),
                    p('#activity-stream ul.activity-list li[data-bp-activity-id="' + d + '"] .activity-content .activity-inner').append(e.data.media_content),
                    0 == p('#activity-stream ul.activity-list li[data-bp-activity-id="' + d + '"] .activity-content .activity-inner .bb-activity-media-elem').length && p('#activity-stream ul.activity-list li[data-bp-activity-id="' + d + '"]').remove(),
                    !0 === e.data.delete_activity ? (p("body #buddypress .activity-list li#activity-" + d).remove(),
                    p("body .bb-activity-media-elem.media-activity." + l).remove(),
                    p("body .activity-comments li#acomment-" + d).remove()) : p("body #buddypress .activity-list li#activity-" + d).replaceWith(e.data.activity_content)) : r && r.length && "media" === r ? e.success && ("yes" === BP_Nouveau.media.is_media_directory ? "personal" === (t = bp.Nouveau.getStorage("bp-media").scope) ? (p(document).find("li#media-personal a").trigger("click"),
                    p(document).find("li#media-personal").trigger("click")) : "groups" === t ? (p(document).find("li#media-groups a").trigger("click"),
                    p(document).find("li#media-groups").trigger("click")) : (p(document).find("li#media-all a").trigger("click"),
                    p(document).find("li#media-all").trigger("click")) : (e.data.media_personal_count && p("#buddypress").find(".bp-wrap .users-nav ul li#media-personal-li a span.count").text(e.data.media_personal_count),
                    e.data.media_group_count && p("#buddypress").find(".bp-wrap .groups-nav ul li#photos-groups-li a span.count").text(e.data.media_group_count),
                    p.each(s, function(e, t) {
                        p('#media-stream ul.media-list li[data-id="' + t + '"]').length && p('#media-stream ul.media-list li[data-id="' + t + '"]').remove()
                    }),
                    0 == p("#buddypress").find(".media-list:not(.existing-media-list)").find("li:not(.load-more)").length && (p(".bb-photos-actions").hide(),
                    i = '<aside class="bp-feedback bp-messages info">\n\t<span class="bp-icon" aria-hidden="true"></span>\n\t<p>' + BP_Nouveau.media.i18n_strings.no_photos_found + "</p>\n\t</aside>",
                    p('#buddypress [data-bp-list="media"]').html(i)))) : (setTimeout(function() {
                        a.prop("disabled", !1)
                    }, 500),
                    e.success ? (void 0 !== e.data && void 0 !== e.data.media_personal_count && p("#buddypress").find(".bp-wrap .users-nav ul li#media-personal-li a span.count").text(e.data.media_personal_count),
                    void 0 !== e.data && void 0 !== e.data.media_group_count && p("#buddypress").find(".bp-wrap .groups-nav ul li#photos-groups-li a span.count").text(e.data.media_group_count),
                    n.find(".media-list:not(.existing-media-list)").find('.bb-media-check-wrap [name="bb-media-select"]:checked').each(function() {
                        p(this).closest("li").remove()
                    }),
                    0 == p("#buddypress").find(".media-list:not(.existing-media-list)").find("li:not(.load-more)").length && (p(".bb-photos-actions").hide(),
                    i = '<aside class="bp-feedback bp-messages info">\n\t<span class="bp-icon" aria-hidden="true"></span>\n\t<p>' + BP_Nouveau.media.i18n_strings.no_photos_found + "</p>\n\t</aside>",
                    p('#buddypress [data-bp-list="media"]').html(i))) : p("#buddypress #media-stream.media").prepend(e.data.feedback)),
                    jQuery(window).scroll()
                }
            })
        },
        toggleSelectAllMedia: function(e) {
            e.preventDefault(),
            p(e.currentTarget).hasClass("selected") ? (p(e.currentTarget).data("bp-tooltip", BP_Nouveau.media.i18n_strings.selectall),
            this.deselectAllMedia(e)) : (p(e.currentTarget).data("bp-tooltip", BP_Nouveau.media.i18n_strings.unselectall),
            this.selectAllMedia(e)),
            p(e.currentTarget).toggleClass("selected")
        },
        selectAllMedia: function(e) {
            e.preventDefault(),
            p("#buddypress").find(".media-list:not(.existing-media-list)").find('.bb-media-check-wrap [name="bb-media-select"]').each(function() {
                p(this).prop("checked", !0),
                p(this).closest(".bb-item-thumb").addClass("selected"),
                p(this).closest(".bb-media-check-wrap").find(".bp-tooltip").attr("data-bp-tooltip", BP_Nouveau.media.i18n_strings.unselect)
            })
        },
        deselectAllMedia: function(e) {
            e.preventDefault(),
            p("#buddypress").find(".media-list:not(.existing-media-list)").find('.bb-media-check-wrap [name="bb-media-select"]').each(function() {
                p(this).prop("checked", !1),
                p(this).closest(".bb-item-thumb").removeClass("selected"),
                p(this).closest(".bb-media-check-wrap").find(".bp-tooltip").attr("data-bp-tooltip", BP_Nouveau.media.i18n_strings.select)
            })
        },
        editAlbumTitle: function(e) {
            e.preventDefault(),
            p("#bb-album-title").show(),
            p("#bp-save-album-title").show(),
            p("#bp-cancel-edit-album-title").show(),
            p("#bp-edit-album-title").hide(),
            p("#bp-media-single-album #bp-single-album-title").hide()
        },
        editFolderTitle: function(e) {
            e.preventDefault(),
            p("#bb-album-title").show(),
            p("#bp-save-folder-title").show(),
            p("#bp-cancel-edit-album-title").show(),
            p("#bp-edit-folder-title").hide(),
            p("#bp-media-single-album #bp-single-album-title").hide()
        },
        cancelEditAlbumTitle: function(e) {
            e.preventDefault(),
            p("#bb-album-title").removeClass("error").hide(),
            p("#bp-save-album-title,#bp-save-folder-title").hide(),
            p("#bp-cancel-edit-album-title").hide(),
            p("#bp-edit-album-title,#bp-edit-folder-title").show(),
            p("#bp-media-single-album #bp-single-album-title").show()
        },
        triggerDropzoneSelectFileDialog: function() {
            this.dropzone_obj.hiddenFileInput.click()
        },
        closeUploader: function(e) {
            e.preventDefault(),
            p("#bp-media-uploader").hide(),
            p("#bp-media-add-more").hide(),
            p("#bp-media-uploader-modal-title").text(BP_Nouveau.media.i18n_strings.upload),
            p("#bp-media-uploader-modal-status-text").text(""),
            p("#bp-media-post-content").val(""),
            this.dropzone_obj.element && this.dropzone_obj.destroy(),
            this.dropzone_media = [];
            var t = p(e.currentTarget).closest("#bp-media-uploader");
            p(".close-create-popup-album").trigger("click"),
            p(".close-create-popup-folder").trigger("click"),
            t.find('.breadcrumbs-append-ul-li .item span[data-id="0"]').trigger("click"),
            t.find(".bb-field-steps").length && (t.find(".bb-field-steps-1").show().siblings(".bb-field-steps-2").hide(),
            t.find(".bb-field-steps-1 #bp-media-photo-next, .bb-field-steps-1 #bp-media-document-next ").hide(),
            t.find(".bb-field-steps-1").removeClass("controls-added"),
            t.find("#bp-media-document-prev, #bp-media-prev, #bp-media-document-submit, #bp-media-submit, .bp-media-open-create-popup-folder, .bp-document-open-create-popup-folder, .create-popup-folder-wrap, .create-popup-album-wrap, .bp-video-open-create-popup-album").hide()),
            this.clearFolderLocationUI(e)
        },
        closeChildFolderUploader: function(e) {
            e.preventDefault(),
            p(document).find(".open-popup #bb-album-child-title").val(""),
            p(document).find(".open-popup #bp-media-create-child-folder-submit").removeClass("loading"),
            p(document).find("#bp-media-create-child-folder").removeClass("open-popup"),
            p(document).find("#bp-media-create-child-folder").hide(),
            p(document).find(".open-popup #bb-album-title").text(""),
            p(document).find(".open-popup #bp-media-create-folder").hide(),
            p(document).find("#bp-media-create-folder").removeClass("open-popup")
        },
        closeFolderUploader: function(e) {
            e.preventDefault(),
            p(document).find(".open-popup #bb-album-title").val(""),
            p(document).find(".open-popup #bp-media-create-folder-submit").removeClass("loading"),
            p(document).find(".open-popup #bp-media-document-submit").hide(),
            p(document).find("#bp-media-create-folder").removeClass("open-popup"),
            p(document).find("#bp-media-create-folder").hide()
        },
        loadMoreGif: function(e) {
            var t = e.target
              , i = this
              , a = p(e.target).closest("form").find(".forums-attached-gif-container")
              , e = a.data("key");
            i.gif_container_key = e,
            t.scrollTop + t.offsetHeight >= t.scrollHeight && !a.hasClass("loading") && 0 < i.gif_data[e].total_count && i.gif_data[e].offset <= i.gif_data[e].total_count && (t = {
                offset: i.gif_data[e].offset,
                fmt: "json",
                limit: i.gif_data[e].limit
            },
            a.addClass("loading"),
            a = null,
            a = _.isNull(i.gif_data[e].q) ? i.giphy.trending(t, _.bind(i.loadMoreGifResponse, i)) : i.giphy.search(_.extend({
                q: i.gif_data[e].q
            }, t), _.bind(i.loadMoreGifResponse, i)),
            i.gif_data[e].requests.push(a),
            i.gif_data[e].offset = i.gif_data[e].offset + i.gif_data[e].limit)
        },
        loadMoreGroupMessagesGif: function(e) {
            var t = e.target
              , i = this
              , a = p(e.target).closest("form").find(".bp-group-messages-attached-gif-container").data("key");
            i.gif_container_key = a,
            t.scrollTop + t.offsetHeight >= t.scrollHeight && !p(e.target).closest(".bp-group-messages-attached-gif-container").hasClass("loading") && 0 < i.gif_total_count && i.gif_offset <= i.gif_total_count && (t = {
                offset: i.gif_offset,
                fmt: "json",
                limit: i.gif_limit
            },
            p(e.target).closest(".bp-group-messages-attached-gif-container").addClass("loading"),
            e = null,
            e = _.isNull(i.gif_q) ? i.giphy.trending(t, _.bind(i.loadMoreGroupMessagesGifResponse, i)) : i.giphy.search(_.extend({
                q: i.gif_q
            }, t), _.bind(i.loadMoreGroupMessagesGifResponse, i)),
            i.gif_requests.push(e),
            i.gif_offset = i.gif_offset + i.gif_limit,
            i.gif_data[a].requests.push(e),
            i.gif_data[a].offset = i.gif_data[a].offset + i.gif_data[a].limit)
        },
        loadMoreGroupMessagesGifResponse: function(e) {
            var t = 0;
            if (p(".bp-group-messages-attached-gif-container").removeClass("loading"),
            void 0 !== e.data && e.data.length) {
                for (var i = "", t = 0; t < e.data.length; t++)
                    i += '<li class="bg' + (Math.floor(6 * Math.random()) + 1) + '" style="height: ' + e.data[t].images.fixed_width.height + 'px;">\n\t<a class="found-media-item" href="' + e.data[t].images.original.url + '" data-id="' + e.data[t].id + '">\n\t\t<img src="' + e.data[t].images.fixed_width.url + '">\n\t</a>\n</li>',
                    e.data[t].saved = !1,
                    this.gif_data.push(e.data[t]);
                p(".bp-group-messages-attached-gif-container").find(".gif-search-results-list").append(i)
            }
            void 0 !== e.pagination && void 0 !== e.pagination.total_count && (this.gif_total_count = e.pagination.total_count)
        },
        loadMoreGifResponse: function(e) {
            var t = this
              , i = 0;
            if (p('div.forums-attached-gif-container[data-key="' + t.gif_container_key + '"]').removeClass("loading"),
            void 0 !== e.data && e.data.length) {
                for (var a = "", i = 0; i < e.data.length; i++)
                    a += '<li class="bg' + (Math.floor(6 * Math.random()) + 1) + '" style="height: ' + e.data[i].images.fixed_width.height + 'px;">\n\t<a class="found-media-item" href="' + e.data[i].images.original.url + '" data-id="' + e.data[i].id + '">\n\t\t<img src="' + e.data[i].images.fixed_width.url + '">\n\t</a>\n</li>',
                    e.data[i].saved = !1,
                    t.gif_data[t.gif_container_key].data.push(e.data[i]);
                p('div.forums-attached-gif-container[data-key="' + t.gif_container_key + '"]').closest("form").find(".gif-search-results-list").append(a)
            }
            void 0 !== e.pagination && void 0 !== e.pagination.total_count && (t.gif_data[t.gif_container_key].total_count = e.pagination.total_count)
        },
        editGifPreview: function() {
            var e = this
              , t = {};
            if (e.bbp_is_reply_edit && Object.keys(e.bbp_reply_edit_gif_data).length ? t = e.bbp_reply_edit_gif_data.gif_raw_data : e.bbp_is_topic_edit && Object.keys(e.bbp_topic_edit_gif_data).length ? t = e.bbp_topic_edit_gif_data.gif_raw_data : e.bbp_is_forum_edit && Object.keys(e.bbp_forum_edit_gif_data).length && (t = e.bbp_forum_edit_gif_data.gif_raw_data),
            void 0 === t.images)
                return !1;
            e = p("#whats-new-attachments .forums-attached-gif-container");
            e[0].style.backgroundImage = "url(" + t.images.fixed_width.url + ")",
            e[0].style.backgroundSize = "contain",
            e[0].style.height = t.images.original.height + "px",
            e[0].style.width = t.images.original.width + "px",
            e.find(".gif-image-container img").attr("src", t.images.original.url),
            e.removeClass("closed"),
            p("#bbp_media_gif").length && p("#bbp_media_gif").val(JSON.stringify(t))
        },
        selectGif: function(e) {
            var t = this
              , i = 0
              , a = p(e.currentTarget)
              , o = a.closest("form").find(".forums-attached-gif-container");
            e.preventDefault(),
            o.closest("form").find(".gif-media-search-dropdown").removeClass("open");
            var d = o.data("key");
            if (void 0 !== t.gif_data[d] && void 0 !== t.gif_data[d].data && t.gif_data[d].data.length) {
                for (i = 0; i < t.gif_data[d].data.length; i++)
                    if (t.gif_data[d].data[i].id == e.currentTarget.dataset.id) {
                        a.closest("form").find("#whats-new-attachments .forums-attached-gif-container")[0].style.backgroundImage = "url(" + t.gif_data[d].data[i].images.fixed_width.url + ")",
                        a.closest("form").find("#whats-new-attachments .forums-attached-gif-container")[0].style.backgroundSize = "contain",
                        a.closest("form").find("#whats-new-attachments .forums-attached-gif-container")[0].style.height = t.gif_data[d].data[i].images.original.height + "px",
                        a.closest("form").find("#whats-new-attachments .forums-attached-gif-container")[0].style.width = t.gif_data[d].data[i].images.original.width + "px",
                        a.closest("form").find("#whats-new-attachments .forums-attached-gif-container").find(".gif-image-container img").attr("src", t.gif_data[d].data[i].images.original.url),
                        a.closest("form").find("#whats-new-attachments .forums-attached-gif-container").removeClass("closed"),
                        a.closest("form").find("#bbp_media_gif").length && a.closest("form").find("#bbp_media_gif").val(JSON.stringify(t.gif_data[d].data[i]));
                        break
                    }
                o = a.closest("form");
                o.addClass("has-gif"),
                o.find("#forums-document-button") && o.find("#forums-document-button").parents(".post-elements-buttons-item").addClass("disable"),
                o.find("#forums-media-button") && o.find("#forums-media-button").parents(".post-elements-buttons-item").addClass("disable"),
                o.find("#forums-video-button") && o.find("#forums-video-button").parents(".post-elements-buttons-item").addClass("disable")
            }
        },
        selectGroupMessagesGif: function(e) {
            var t = this
              , i = 0;
            e.preventDefault();
            var a = p("#whats-new-attachments .bp-group-messages-attached-gif-container")
              , o = p("#bp_group_messages_gif");
            if (p("#whats-new-toolbar .bp-group-messages-attached-gif-container").parent().removeClass("open"),
            t.gif_data.length) {
                for (i = 0; i < t.gif_data.length; i++)
                    if (t.gif_data[i].id == e.currentTarget.dataset.id) {
                        a[0].style.backgroundImage = "url(" + t.gif_data[i].images.fixed_width.url + ")",
                        a[0].style.backgroundSize = "contain",
                        a[0].style.height = t.gif_data[i].images.original.height + "px",
                        a[0].style.width = t.gif_data[i].images.original.width + "px",
                        a.find(".gif-image-container img").attr("src", t.gif_data[i].images.original.url),
                        a.removeClass("closed"),
                        o.length && o.val(JSON.stringify(t.gif_data[i]));
                        break
                    }
                var d = p("#send_group_message_form");
                d.find("#bp-group-messages-media-button") && d.find("#bp-group-messages-media-button").parents(".post-elements-buttons-item").addClass("disable"),
                d.find("#bp-group-messages-document-button") && d.find("#bp-group-messages-document-button").parents(".post-elements-buttons-item").addClass("disable"),
                d.find("#bp-group-messages-video-button") && d.find("#bp-group-messages-video-button").parents(".post-elements-buttons-item").addClass("disable")
            }
        },
        removeSelectedGif: function(e) {
            e.preventDefault(),
            this.resetForumsGifComponent(e)
        },
        removeGroupMessagesSelectedGif: function(e) {
            e.preventDefault(),
            this.resetGroupMessagesGifComponent()
        },
        resetForumsGifComponent: function(e) {
            var t = p(e.target);
            t.closest("form").find("#whats-new-toolbar #forums-gif-button").removeClass("active"),
            t.closest("form").find(".gif-media-search-dropdown").removeClass("open");
            e = t.closest("form").find("#whats-new-attachments .forums-attached-gif-container");
            e.length && (e.addClass("closed"),
            e.find(".gif-image-container img").attr("src", ""),
            e[0].style = ""),
            t.closest("form").find("#bbp_media_gif").length && t.closest("form").find("#bbp_media_gif").val("");
            t = t.closest("form");
            t.removeClass("has-gif"),
            t.find("#forums-document-button") && t.find("#forums-document-button").parents(".post-elements-buttons-item").removeClass("disable"),
            t.find("#forums-media-button") && t.find("#forums-media-button").parents(".post-elements-buttons-item").removeClass("disable"),
            t.find("#forums-video-button") && t.find("#forums-video-button").parents(".post-elements-buttons-item").removeClass("disable"),
            t.find("#forums-gif-button") && t.find("#forums-gif-button").parents(".post-elements-buttons-item").removeClass("no-click")
        },
        resetGroupMessagesGifComponent: function() {
            var e = p("#whats-new-attachments .bp-group-messages-attached-gif-container")
              , t = p("#bp_group_messages_gif");
            p("#whats-new-toolbar .bp-group-messages-attached-gif-container").parent().removeClass("open"),
            p("#whats-new-toolbar #bp-group-messages-gif-button").removeClass("active"),
            e.addClass("closed"),
            e.find(".gif-image-container img").attr("src", ""),
            e[0].style = "",
            t.length && t.val("");
            t = p("#send_group_message_form");
            t.find("#bp-group-messages-media-button") && t.find("#bp-group-messages-media-button").parents(".post-elements-buttons-item").removeClass("disable"),
            t.find("#bp-group-messages-document-button") && t.find("#bp-group-messages-document-button").parents(".post-elements-buttons-item").removeClass("disable"),
            t.find("#bp-group-messages-video-button") && t.find("#bp-group-messages-video-button").parents(".post-elements-buttons-item").removeClass("disable")
        },
        searchGif: function(e) {
            if ("Enter" === e.key || 13 === e.keyCode)
                return e.preventDefault(),
                !1;
            var t = this;
            null != t.gif_timeout && clearTimeout(this.gif_timeout),
            t.gif_timeout = setTimeout(function() {
                t.gif_timeout = null,
                t.searchGifRequest(e, e.target.value)
            }, 1e3)
        },
        searchGroupMessagesGif: function(e) {
            var t = this;
            null != t.gif_timeout && clearTimeout(this.gif_timeout),
            "" !== e.target.value ? t.gif_timeout = setTimeout(function() {
                t.gif_timeout = null,
                t.searchGroupMessagesGifRequest(e, e.target.value)
            }, 1e3) : this.toggleGroupMessagesGifSelector(e)
        },
        searchGroupMessagesGifRequest: function(i) {
            var a = this;
            a.gif_q = i.target.value;
            var o = a.gif_offset = 0;
            a.clearGifRequests(),
            p(i.target).closest(".bp-group-messages-attached-gif-container").addClass("loading"),
            p(i.target).find(".gif-no-results").removeClass("show"),
            p(i.target).find(".gif-no-connection").removeClass("show");
            var e = a.giphy.search({
                q: a.gif_q,
                offset: a.gif_offset,
                fmt: "json",
                limit: a.gif_limit
            }, function(e) {
                if (void 0 !== e.data.length && 0 === e.data.length && p(i.target).find(".gif-no-results").addClass("show"),
                void 0 !== e.meta.status && 200 !== e.meta.status && p(i.target).find(".gif-no-connection").addClass("show"),
                void 0 !== e.data && e.data.length) {
                    var t = "";
                    for (o = 0; o < e.data.length; o++)
                        t += '<li class="bg' + (Math.floor(6 * Math.random()) + 1) + '" style="height: ' + e.data[o].images.fixed_width.height + 'px;">\n\t<a class="found-media-item" href="' + e.data[o].images.original.url + '" data-id="' + e.data[o].id + '">\n\t\t<img src="' + e.data[o].images.fixed_width.url + '">\n\t</a>\n</li>',
                        e.data[o].saved = !1,
                        a.gif_data.push(e.data[o]);
                    p(i.target).closest(".bp-group-messages-attached-gif-container").find(".gif-search-results-list").append(t)
                }
                void 0 !== e.pagination && void 0 !== e.pagination.total_count && (a.gif_total_count = e.pagination.total_count),
                p(i.target).closest(".bp-group-messages-attached-gif-container").removeClass("loading")
            }, function() {
                p(i.target).find(".gif-no-connection").addClass("show")
            });
            a.gif_requests.push(e),
            a.gif_offset = a.gif_offset + a.gif_limit
        },
        searchGifRequest: function(i) {
            var a = this
              , o = 0
              , d = p(i.target).closest("form").find(".forums-attached-gif-container");
            d.addClass("loading");
            var s = d.data("key");
            p(i.target).closest("form").find(".gif-no-results").removeClass("show"),
            p(i.target).closest("form").find(".gif-no-connection").removeClass("show"),
            a.clearGifRequests(s),
            a.gif_data[s].q = i.target.value,
            a.gif_data[s].offset = 0;
            var e = a.giphy.search({
                q: a.gif_data[s].q,
                offset: a.gif_data[s].offset,
                fmt: "json",
                limit: a.gif_data[s].limit
            }, function(e) {
                if (void 0 !== e.data.length && 0 === e.data.length && p(i.target).closest("form").find(".gif-no-results").addClass("show"),
                void 0 !== e.meta.status && 200 !== e.meta.status && p(i.target).closest("form").find(".gif-no-connection").addClass("show"),
                void 0 !== e.data && e.data.length) {
                    var t = "";
                    for (o = 0; o < e.data.length; o++)
                        t += '<li class="bg' + (Math.floor(6 * Math.random()) + 1) + '" style="height: ' + e.data[o].images.fixed_width.height + 'px;">\n\t<a class="found-media-item" href="' + e.data[o].images.original.url + '" data-id="' + e.data[o].id + '">\n\t\t<img src="' + e.data[o].images.fixed_width.url + '">\n\t</a>\n</li>',
                        e.data[o].saved = !1,
                        a.gif_data[s].data.push(e.data[o]);
                    p(i.target).closest(".gif-search-content").find(".gif-search-results-list").append(t)
                }
                void 0 !== e.pagination && void 0 !== e.pagination.total_count && (a.gif_data[s].total_count = e.pagination.total_count),
                d.removeClass("loading")
            }, function() {
                p(i.target).closest("form").find(".gif-no-connection").addClass("show")
            });
            a.gif_data[s].requests.push(e),
            a.gif_data[s].offset = a.gif_data[s].offset + a.gif_data[s].limit
        },
        clearGifRequests: function(e) {
            var t = this;
            if (void 0 !== t.gif_data[e] && void 0 !== t.gif_data[e].requests) {
                for (var i = 0; i < t.gif_data[e].requests.length; i++)
                    t.gif_data[e].requests[i].abort();
                p('[data-key="' + e + '"]').closest("form").find(".gif-search-results-list li").remove(),
                t.gif_data[e].requests = [],
                t.gif_data[e].data = [],
                t.gif_data.splice(e, 1)
            }
        },
        toggleGifSelector: function(e) {
            var i, a, o = this, d = p(e.currentTarget), t = d.closest("form").find(".gif-media-search-dropdown"), s = 0;
            e.preventDefault(),
            void 0 !== window.Giphy && void 0 !== BP_Nouveau.media.gif_api_key && (o.giphy = new window.Giphy(BP_Nouveau.media.gif_api_key),
            (i = d.closest("form").find(".forums-attached-gif-container")).addClass("loading"),
            a = i.data("key"),
            o.clearGifRequests(a),
            o.gif_data[a] = {
                q: null,
                offset: 0,
                limit: 20,
                requests: [],
                total_count: 0,
                data: []
            },
            e = o.giphy.trending({
                offset: o.gif_data[a].offset,
                fmt: "json",
                limit: o.gif_data[a].limit
            }, function(e) {
                if (void 0 !== e.data && e.data.length) {
                    var t = "";
                    for (s = 0; s < e.data.length; s++)
                        t += '<li class="bg' + (Math.floor(6 * Math.random()) + 1) + '" style="height: ' + e.data[s].images.fixed_width.height + 'px;">\n\t<a class="found-media-item" href="' + e.data[s].images.original.url + '" data-id="' + e.data[s].id + '">\n\t\t<img src="' + e.data[s].images.fixed_width.url + '">\n\t</a>\n</li>',
                        e.data[s].saved = !1,
                        o.gif_data[a].data.push(e.data[s]);
                    d.closest("form").find(".gif-search-results-list").append(t)
                }
                void 0 !== e.pagination && void 0 !== e.pagination.total_count && (o.gif_data[a].total_count = e.pagination.total_count),
                i.removeClass("loading")
            }),
            o.gif_data[a].requests.push(e),
            o.gif_data[a].offset = o.gif_data[a].offset + o.gif_data[a].limit),
            t.toggleClass("open");
            t = d.parents("form").find("#whats-new-attachments .forums-attached-gif-container img");
            0 < t.length && "" != t.attr("src") ? d.addClass("active") : d.toggleClass("active");
            t = d.closest("form").find("#forums-post-media-uploader");
            t.length && o.resetForumsMediaComponent(t.data("key"));
            t = d.closest("form").find("#forums-post-document-uploader");
            t.length && o.resetForumsDocumentComponent(t.data("key"));
            t = d.closest("form").find("#forums-post-video-uploader");
            t.length && o.resetForumsVideoComponent(t.data("key"))
        },
        closePickersOnEsc: function(e) {
            var t = p(e.currentTarget);
            "Escape" !== e.key && 27 !== e.keyCode || _.isUndefined(BP_Nouveau.media) || _.isUndefined(BP_Nouveau.media.gif_api_key) || (t.find("form").find(".gif-media-search-dropdown").removeClass("open"),
            t.find("#bbpress-forums form").each(function() {
                var e = jQuery(this)
                  , t = e.find("#whats-new-attachments .forums-attached-gif-container img");
                0 < t.length && "" != t.attr("src") ? e.find("#forums-gif-button").addClass("active") : e.find("#forums-gif-button").removeClass("active")
            }),
            t.find("#send_group_message_form").each(function() {
                var e = jQuery(this)
                  , t = e.find("#whats-new-attachments .bp-group-messages-attached-gif-container img");
                0 < t.length && "" != t.attr("src") ? e.find("#bp-group-messages-gif-button").addClass("active") : e.find("#bp-group-messages-gif-button").removeClass("active")
            }),
            t.find(".activity-comments form").each(function() {
                var e = jQuery(this)
                  , t = e.find(".ac-textarea").find(".ac-reply-attachments .activity-attached-gif-container");
                t.length && "" != p.trim(t.html()) ? e.find(".ac-reply-gif-button").addClass("active") : e.find(".ac-reply-gif-button").removeClass("active")
            }))
        },
        closePickersOnClick: function(e) {
            var t = p(e.target)
              , e = p(e.currentTarget);
            _.isUndefined(BP_Nouveau.media) || _.isUndefined(BP_Nouveau.media.gif_api_key) || t.closest(".post-gif").length || (e.find("form").find(".gif-media-search-dropdown").removeClass("open"),
            e.find("#bbpress-forums form").each(function() {
                var e = jQuery(this)
                  , t = e.find("#whats-new-attachments .forums-attached-gif-container img");
                0 < t.length && "" != t.attr("src") ? e.find("#forums-gif-button").addClass("active") : e.find("#forums-gif-button").removeClass("active")
            }),
            e.find("#send_group_message_form").each(function() {
                var e = jQuery(this)
                  , t = e.find("#whats-new-attachments .bp-group-messages-attached-gif-container img");
                0 < t.length && "" != t.attr("src") ? e.find("#bp-group-messages-gif-button").addClass("active") : e.find("#bp-group-messages-gif-button").removeClass("active")
            }),
            e.find(".activity-comments form").each(function() {
                var e = jQuery(this)
                  , t = e.find(".ac-textarea").find(".ac-reply-attachments .activity-attached-gif-container");
                t.length && "" != p.trim(t.html()) ? e.find(".ac-reply-gif-button").addClass("active") : e.find(".ac-reply-gif-button").removeClass("active")
            }))
        },
        toggleGroupMessagesGifSelector: function(e) {
            var i = this
              , a = p(e.currentTarget)
              , t = a.closest("form").find(".gif-media-search-dropdown")
              , o = 0;
            e.preventDefault(),
            void 0 !== window.Giphy && void 0 !== BP_Nouveau.media.gif_api_key && null == i.giphy && (i.giphy = new window.Giphy(BP_Nouveau.media.gif_api_key),
            i.gif_offset = 0,
            i.gif_q = null,
            i.gif_limit = 20,
            i.gif_requests = [],
            i.gif_data = [],
            i.clearGifRequests(),
            p(".gif-search-query").closest(".bp-group-messages-attached-gif-container").addClass("loading"),
            d = i.giphy.trending({
                offset: i.gif_offset,
                fmt: "json",
                limit: i.gif_limit
            }, function(e) {
                if (void 0 !== e.data && e.data.length) {
                    var t = "";
                    for (o = 0; o < e.data.length; o++)
                        t += '<li class="bg' + (Math.floor(6 * Math.random()) + 1) + '" style="height: ' + e.data[o].images.fixed_width.height + 'px;">\n\t<a class="found-media-item" href="' + e.data[o].images.original.url + '" data-id="' + e.data[o].id + '">\n\t\t<img src="' + e.data[o].images.fixed_width.url + '">\n\t</a>\n</li>',
                        e.data[o].saved = !1,
                        i.gif_data.push(e.data[o]);
                    a.closest("form").find(".gif-search-results-list").append(t)
                }
                void 0 !== e.pagination && void 0 !== e.pagination.total_count && (i.gif_total_count = e.pagination.total_count),
                p(".gif-search-query").closest(".bp-group-messages-attached-gif-container").removeClass("loading")
            }),
            i.gif_requests.push(d),
            i.gif_offset = i.gif_offset + i.gif_limit);
            var d = a.parents("form").find("#whats-new-attachments .bp-group-messages-attached-gif-container img");
            0 < d.length && "" != d.attr("src") ? a.addClass("active") : a.toggleClass("active"),
            t.toggleClass("open"),
            i.resetGroupMessagesMediaComponent(),
            i.resetGroupMessagesDocumentComponent(),
            i.resetGroupMessagesVideoComponent()
        },
        resetGroupMessagesMediaComponent: function() {
            this.dropzone_obj && void 0 !== this.dropzone_obj && this.dropzone_obj.destroy(),
            this.dropzone_media = [],
            p("div#bp-group-messages-post-media-uploader").html(""),
            p("div#bp-group-messages-post-media-uploader").addClass("closed").removeClass("open"),
            p("#bp-group-messages-media-button").removeClass("active"),
            p("#item-body #group-messages-container .bb-groups-messages-right #send_group_message_form .bb-groups-messages-right-bottom #bp_group_messages_media").val("")
        },
        resetGroupMessagesDocumentComponent: function() {
            this.document_dropzone_obj && void 0 !== this.document_dropzone_obj && this.document_dropzone_obj.destroy(),
            this.dropzone_media = [],
            p("div#bp-group-messages-post-document-uploader").html(""),
            p("div#bp-group-messages-post-document-uploader").addClass("closed").removeClass("open"),
            p("#bp-group-messages-document-button").removeClass("active"),
            p("#item-body #group-messages-container .bb-groups-messages-right #send_group_message_form .bb-groups-messages-right-bottom #bp_group_messages_document").val("")
        },
        resetGroupMessagesVideoComponent: function() {
            this.video_dropzone_obj && void 0 !== this.video_dropzone_obj && this.video_dropzone_obj.destroy(),
            this.dropzone_media = [],
            p("div#bp-group-messages-post-video-uploader").html(""),
            p("div#bp-group-messages-post-video-uploader").addClass("closed").removeClass("open"),
            p("#bp-group-messages-video-button").removeClass("active"),
            p("#item-body #group-messages-container .bb-groups-messages-right #send_group_message_form .bb-groups-messages-right-bottom #bp_group_messages_video").val("")
        },
        resetForumsMediaComponent: function(e) {
            p("#forums-media-button").removeClass("active"),
            void 0 !== e && (void 0 !== this.dropzone_obj[e] && (this.dropzone_obj[e].destroy(),
            this.dropzone_obj.splice(e, 1),
            this.dropzone_media.splice(e, 1)),
            (e = p("div#forums-post-media-uploader")).html(""),
            e.addClass("closed").removeClass("open"))
        },
        resetForumsDocumentComponent: function(e) {
            p("#forums-document-button").removeClass("active"),
            void 0 !== e && (void 0 !== this.dropzone_obj[e] && (this.dropzone_obj[e].destroy(),
            this.dropzone_obj.splice(e, 1),
            this.dropzone_media.splice(e, 1)),
            (e = p("div#forums-post-document-uploader")).html(""),
            e.addClass("closed").removeClass("open"))
        },
        resetForumsVideoComponent: function(e) {
            p("#forums-video-button").removeClass("active"),
            void 0 !== e && (void 0 !== this.dropzone_obj[e] && (this.dropzone_obj[e].destroy(),
            this.dropzone_obj.splice(e, 1),
            this.dropzone_media.splice(e, 1)),
            (e = p("div#forums-post-video-uploader")).html(""),
            e.addClass("closed").removeClass("open"))
        },
        openForumsUploader: function(e) {
            var a = this
              , o = p(e.currentTarget)
              , d = o.closest("form").find("#forums-post-media-uploader")
              , t = o.closest("form").find("#forums-post-document-uploader")
              , i = o.closest("form").find("#forums-post-video-uploader")
              , s = [];
            e.preventDefault(),
            o.toggleClass("active");
            t = t.data("key"),
            i = i.data("key");
            if (a.resetForumsDocumentComponent(t),
            a.resetForumsVideoComponent(i),
            void 0 !== window.Dropzone && d.length) {
                var n = d.data("key");
                if (d.hasClass("closed")) {
                    if (a.dropzone_obj[n] = new Dropzone(d[0],a.options),
                    a.dropzone_media[n] = [],
                    a.dropzone_obj[n].on("sending", function(e, t, i) {
                        i.append("action", "media_upload"),
                        i.append("_wpnonce", BP_Nouveau.nonces.media);
                        i = o.closest("form");
                        i.addClass("has-media"),
                        i.find("#forums-document-button") && i.find("#forums-document-button").parents(".post-elements-buttons-item").addClass("disable"),
                        i.find("#forums-gif-button") && i.find("#forums-gif-button").parents(".post-elements-buttons-item").addClass("disable"),
                        i.find("#forums-video-button") && i.find("#forums-video-button").parents(".post-elements-buttons-item").addClass("disable"),
                        i.find("#forums-media-button") && i.find("#forums-media-button").parents(".post-elements-buttons-item").addClass("no-click")
                    }),
                    a.dropzone_obj[n].on("uploadprogress", function(e) {
                        o.closest("form").addClass("media-uploading");
                        var t = p(e.previewElement).find(".dz-progress-ring circle")[0]
                          , i = 2 * t.r.baseVal.value * Math.PI;
                        t.style.strokeDasharray = i + " " + i;
                        i = (t.style.strokeDashoffset = i) - e.upload.progress.toFixed(0) / 100 * i;
                        t.style.strokeDashoffset = i
                    }),
                    a.dropzone_obj[n].on("error", function(e, t) {
                        e.accepted ? void 0 !== t && void 0 !== t.data && void 0 !== t.data.feedback ? p(e.previewElement).find(".dz-error-message span").text(t.data.feedback) : "Server responded with 0 code." == t && p(e.previewElement).find(".dz-error-message span").text(BP_Nouveau.media.connection_lost_error) : (jQuery(".forum-document-error-popup").length || p("body").append('<div id="bp-media-create-folder" style="display: block;" class="open-popup forum-document-error-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-media-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.media.invalid_media_type + '</h4><a class="bb-model-close-button errorPopup" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t + "</p></div></div></div></div></transition></div>"),
                        this.removeFile(e),
                        o.closest("form").removeClass("media-uploading"))
                    }),
                    a.dropzone_obj[n].on("success", function(e, t) {
                        t.data.id ? (e.id = t.id,
                        t.data.uuid = e.upload.uuid,
                        t.data.menu_order = p(e.previewElement).closest(".dropzone").find(e.previewElement).index() - 1,
                        t.data.album_id = a.album_id,
                        t.data.group_id = a.group_id,
                        t.data.saved = !1,
                        a.dropzone_media[n].push(t.data),
                        a.addMediaIdsToForumsForm(d)) : (jQuery(".forum-media-error-popup").length || p("body").append('<div id="bp-media-create-folder" style="display: block;" class="open-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-media-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.media.invalid_media_type + '</h4><a class="bb-model-close-button" id="bp-media-create-folder-close" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t.data.feedback + "</p></div></div></div></div></transition></div>"),
                        this.removeFile(e))
                    }),
                    a.dropzone_obj[n].on("removedfile", function(e) {
                        if (!0 === bp.Nouveau.Media.reply_topic_allow_delete_media) {
                            if (a.dropzone_media[n].length)
                                for (var t in a.dropzone_media[n])
                                    if (e.upload.uuid == a.dropzone_media[n][t].uuid) {
                                        this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit || void 0 === a.dropzone_media[n][t].saved || a.dropzone_media[n][t].saved || "edit" !== bp.Nouveau.Media.reply_topic_display_post || a.removeAttachment(a.dropzone_media[n][t].id),
                                        a.dropzone_media[n].splice(t, 1),
                                        a.addMediaIdsToForumsForm(d);
                                        break
                                    }
                            var i;
                            _.isNull(a.dropzone_obj[n].files) || 0 !== a.dropzone_obj[n].files.length || ((i = o.closest("form")).find("#forums-document-button") && i.find("#forums-document-button").parents(".post-elements-buttons-item").removeClass("disable"),
                            i.find("#forums-video-button") && i.find("#forums-video-button").parents(".post-elements-buttons-item").removeClass("disable"),
                            i.find("#forums-gif-button") && i.find("#forums-gif-button").parents(".post-elements-buttons-item").removeClass("disable"),
                            i.find("#forums-media-button") && i.find("#forums-media-button").parents(".post-elements-buttons-item").removeClass("no-click"))
                        }
                        _.isNull(a.dropzone_obj[n].files) || 0 !== a.dropzone_obj[n].files.length || o.closest("form").removeClass("has-media")
                    }),
                    a.dropzone_obj[n].on("complete", function() {
                        0 === this.getUploadingFiles().length && 0 === this.getQueuedFiles().length && 0 < this.files.length && o.closest("form").removeClass("media-uploading")
                    }),
                    d.removeClass("closed").addClass("open"),
                    a.resetForumsGifComponent(e),
                    (this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit) && (this.bbp_reply_edit_media.length || this.bbp_topic_edit_media.length || this.bbp_forum_edit_media.length) && (this.bbp_reply_edit_media.length ? s = this.bbp_reply_edit_media : this.bbp_topic_edit_media.length ? s = this.bbp_topic_edit_media : this.bbp_forum_edit_media.length && (s = this.bbp_forum_edit_media),
                    s.length)) {
                        for (var r, l = 0; l < s.length; l++)
                            a.dropzone_media[n].push({
                                id: s[l].attachment_id,
                                media_id: s[l].id,
                                name: s[l].title,
                                thumb: s[l].thumb,
                                url: s[l].full,
                                uuid: s[l].id,
                                menu_order: l,
                                saved: !!1
                            }),
                            r = {
                                name: s[l].title,
                                accepted: !0,
                                kind: "image",
                                upload: {
                                    filename: s[l].title,
                                    uuid: s[l].id
                                },
                                dataURL: s[l].url,
                                id: s[l].id
                            },
                            a.dropzone_obj[n].files.push(r),
                            a.dropzone_obj[n].emit("addedfile", r),
                            a.createThumbnailFromUrl(r, d);
                        a.addMediaIdsToForumsForm(d),
                        _.isNull(a.dropzone_obj[n].files) || 0 === a.dropzone_obj[n].files.length || ((e = o.closest("form")).find("#forums-document-button") && e.find("#forums-document-button").parents(".post-elements-buttons-item").addClass("disable"),
                        e.find("#forums-video-button") && e.find("#forums-video-button").parents(".post-elements-buttons-item").addClass("disable"),
                        e.find("#forums-gif-button") && e.find("#forums-gif-button").parents(".post-elements-buttons-item").addClass("disable"),
                        e.find("#forums-media-button") && e.find("#forums-media-button").parents(".post-elements-buttons-item").addClass("no-click"))
                    }
                } else
                    a.resetForumsMediaComponent(n)
            }
        },
        openGroupMessagesUploader: function(e) {
            var a = this
              , t = p("div#bp-group-messages-post-media-uploader")
              , i = p(e.currentTarget);
            e.preventDefault(),
            i.toggleClass("active"),
            void 0 !== window.Dropzone && t.length && (t.hasClass("closed") ? (a.dropzone_obj = new Dropzone("div#bp-group-messages-post-media-uploader",a.options),
            a.dropzone_obj.on("sending", function(e, t, i) {
                i.append("action", "media_upload"),
                i.append("_wpnonce", BP_Nouveau.nonces.media);
                i = p("#send_group_message_form");
                i.find("#bp-group-messages-document-button") && i.find("#bp-group-messages-document-button").parents(".post-elements-buttons-item").addClass("disable"),
                i.find("#bp-group-messages-video-button") && i.find("#bp-group-messages-video-button").parents(".post-elements-buttons-item").addClass("disable"),
                i.find("#bp-group-messages-gif-button") && i.find("#bp-group-messages-gif-button").parents(".post-elements-buttons-item").addClass("disable"),
                i.find("#bp-group-messages-media-button") && i.find("#bp-group-messages-media-button").parents(".post-elements-buttons-item").addClass("no-click")
            }),
            a.dropzone_obj.on("uploadprogress", function(e) {
                var t = p(e.previewElement).find(".dz-progress-ring circle")[0]
                  , i = 2 * t.r.baseVal.value * Math.PI;
                t.style.strokeDasharray = i + " " + i;
                i = (t.style.strokeDashoffset = i) - e.upload.progress.toFixed(0) / 100 * i;
                t.style.strokeDashoffset = i
            }),
            a.dropzone_obj.on("error", function(e, t) {
                e.accepted ? void 0 !== t && void 0 !== t.data && void 0 !== t.data.feedback ? p(e.previewElement).find(".dz-error-message span").text(t.data.feedback) : "Server responded with 0 code." == t && p(e.previewElement).find(".dz-error-message span").text(BP_Nouveau.media.connection_lost_error) : (jQuery(".group-media-error-popup").length || p("body").append('<div id="bp-media-create-folder" style="display: block;" class="open-popup group-media-error-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-media-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.media.invalid_media_type + '</h4><a class="bb-model-close-button errorPopup" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t + "</p></div></div></div></div></transition></div>"),
                this.removeFile(e))
            }),
            a.dropzone_obj.on("success", function(e, t) {
                t.data.id ? (e.id = t.id,
                t.data.uuid = e.upload.uuid,
                t.data.menu_order = p(e.previewElement).closest(".dropzone").find(e.previewElement).index() - 1,
                t.data.album_id = a.album_id,
                t.data.group_id = a.group_id,
                t.data.saved = !1,
                a.dropzone_media.push(t.data),
                a.addMediaIdsToGroupMessagesForm()) : (jQuery(".group-message-error-popup").length || p("body").append('<div id="bp-media-create-folder" style="display: block;" class="open-popup group-message-error-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-media-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.media.invalid_media_type + '</h4><a class="bb-model-close-button errorPopup" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t.data.feedback + "</p></div></div></div></div></transition></div>"),
                this.removeFile(e))
            }),
            a.dropzone_obj.on("removedfile", function(e) {
                if (a.dropzone_media.length)
                    for (var t in a.dropzone_media)
                        if (e.upload.uuid == a.dropzone_media[t].uuid) {
                            void 0 === a.dropzone_media[t].saved || a.dropzone_media[t].saved || a.removeAttachment(a.dropzone_media[t].id),
                            a.dropzone_media.splice(t, 1),
                            a.addMediaIdsToGroupMessagesForm();
                            break
                        }
                var i;
                _.isNull(a.dropzone_obj.files) || 0 !== a.dropzone_obj.files.length || ((i = p("#send_group_message_form")).find("#bp-group-messages-document-button") && i.find("#bp-group-messages-document-button").parents(".post-elements-buttons-item").removeClass("disable"),
                i.find("#bp-group-messages-video-button") && i.find("#bp-group-messages-video-button").parents(".post-elements-buttons-item").removeClass("disable"),
                i.find("#bp-group-messages-gif-button") && i.find("#bp-group-messages-gif-button").parents(".post-elements-buttons-item").removeClass("disable"),
                i.find("#bp-group-messages-media-button") && i.find("#bp-group-messages-media-button").parents(".post-elements-buttons-item").removeClass("no-click"))
            }),
            t.removeClass("closed").addClass("open"),
            a.resetGroupMessagesGifComponent(),
            a.resetGroupMessagesDocumentComponent(),
            a.resetGroupMessagesVideoComponent()) : a.resetGroupMessagesMediaComponent())
        },
        openGroupMessagesDocumentUploader: function(e) {
            var r = this
              , t = p("div#bp-group-messages-post-document-uploader")
              , i = p(e.currentTarget);
            e.preventDefault(),
            i.toggleClass("active"),
            void 0 !== window.Dropzone && t.length && (t.hasClass("closed") ? (r.document_dropzone_obj = new Dropzone("div#bp-group-messages-post-document-uploader",r.documentOptions),
            r.document_dropzone_obj.on("addedfile", function(e) {
                var t = e.upload.filename
                  , t = t.substr(t.lastIndexOf(".") + 1);
                p(e.previewElement).find(".dz-details .dz-icon .bb-icon-file").removeClass("bb-icon-file").addClass("bb-icon-file-" + t)
            }),
            r.document_dropzone_obj.on("sending", function(e, t, i) {
                i.append("action", "document_document_upload"),
                i.append("_wpnonce", BP_Nouveau.nonces.media);
                i = p("#send_group_message_form");
                i.find("#bp-group-messages-media-button") && i.find("#bp-group-messages-media-button").parents(".post-elements-buttons-item").addClass("disable"),
                i.find("#bp-group-messages-video-button") && i.find("#bp-group-messages-video-button").parents(".post-elements-buttons-item").addClass("disable"),
                i.find("#bp-group-messages-gif-button") && i.find("#bp-group-messages-gif-button").parents(".post-elements-buttons-item").addClass("disable"),
                i.find("#bp-group-messages-document-button") && i.find("#bp-group-messages-document-button").parents(".post-elements-buttons-item").addClass("no-click")
            }),
            r.document_dropzone_obj.on("uploadprogress", function(e) {
                var t = p(e.previewElement).find(".dz-progress-ring circle")[0]
                  , i = 2 * t.r.baseVal.value * Math.PI;
                t.style.strokeDasharray = i + " " + i;
                i = (t.style.strokeDashoffset = i) - e.upload.progress.toFixed(0) / 100 * i;
                t.style.strokeDashoffset = i
            }),
            r.document_dropzone_obj.on("error", function(e, t) {
                e.accepted ? void 0 !== t && void 0 !== t.data && void 0 !== t.data.feedback ? p(e.previewElement).find(".dz-error-message span").text(t.data.feedback) : "Server responded with 0 code." == t && p(e.previewElement).find(".dz-error-message span").text(BP_Nouveau.media.connection_lost_error) : (jQuery(".group-document-error-popup").length || p("body").append('<div id="bp-media-create-folder" style="display: block;" class="open-popup group-document-error-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-media-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.media.invalid_file_type + '</h4><a class="bb-model-close-button errorPopup" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t + "</p></div></div></div></div></transition></div>"),
                this.removeFile(e))
            }),
            r.document_dropzone_obj.on("accept", function(e, t) {
                0 == e.size ? t(BP_Nouveau.media.empty_document_type) : t()
            }),
            r.document_dropzone_obj.on("success", function(e, t) {
                if (!t.data.id) {
                    var i, a, o, d, s, n = t.data.feedback;
                    for (e.previewElement.classList.add("dz-error"),
                    s = [],
                    a = 0,
                    o = (d = e.previewElement.querySelectorAll("[data-dz-errormessage]")).length; a < o; a++)
                        i = d[a],
                        s.push(i.textContent = n);
                    return s
                }
                e.id = t.id,
                t.data.uuid = e.upload.uuid,
                t.data.menu_order = p(e.previewElement).closest(".dropzone").find(e.previewElement).index() - 1,
                t.data.folder_id = r.current_folder,
                t.data.group_id = r.current_group_id,
                t.data.saved = !1,
                r.dropzone_media.push(t.data),
                r.addDocumentIdsToGroupMessagesForm()
            }),
            r.document_dropzone_obj.on("removedfile", function(e) {
                if (r.dropzone_media.length)
                    for (var t in r.dropzone_media)
                        if (e.upload.uuid == r.dropzone_media[t].uuid) {
                            void 0 === r.dropzone_media[t].saved || r.dropzone_media[t].saved || r.removeAttachment(r.dropzone_media[t].id),
                            r.dropzone_media.splice(t, 1),
                            r.addDocumentIdsToGroupMessagesForm();
                            break
                        }
                var i;
                _.isNull(r.document_dropzone_obj.files) || 0 !== r.document_dropzone_obj.files.length || ((i = p("#send_group_message_form")).find("#bp-group-messages-media-button") && i.find("#bp-group-messages-media-button").parents(".post-elements-buttons-item").removeClass("disable"),
                i.find("#bp-group-messages-video-button") && i.find("#bp-group-messages-video-button").parents(".post-elements-buttons-item").removeClass("disable"),
                i.find("#bp-group-messages-gif-button") && i.find("#bp-group-messages-gif-button").parents(".post-elements-buttons-item").removeClass("disable"),
                i.find("#bp-group-messages-document-button") && i.find("#bp-group-messages-document-button").parents(".post-elements-buttons-item").removeClass("no-click"))
            }),
            t.removeClass("closed").addClass("open"),
            r.resetGroupMessagesGifComponent(),
            r.resetGroupMessagesMediaComponent(),
            r.resetGroupMessagesVideoComponent()) : r.resetGroupMessagesDocumentComponent())
        },
        openGroupMessagesVideoUploader: function(e) {
            var r = this
              , t = p("div#bp-group-messages-post-video-uploader")
              , i = p(e.currentTarget);
            e.preventDefault(),
            i.toggleClass("active"),
            void 0 !== window.Dropzone && t.length && (t.hasClass("closed") ? (r.video_dropzone_obj = new Dropzone("div#bp-group-messages-post-video-uploader",r.videoOptions),
            r.video_dropzone_obj.on("sending", function(e, t, i) {
                i.append("action", "video_upload"),
                i.append("_wpnonce", BP_Nouveau.nonces.video);
                i = p("#send_group_message_form");
                i.find("#bp-group-messages-document-button") && i.find("#bp-group-messages-document-button").parents(".post-elements-buttons-item").addClass("disable"),
                i.find("#bp-group-messages-gif-button") && i.find("#bp-group-messages-gif-button").parents(".post-elements-buttons-item").addClass("disable"),
                i.find("#bp-group-messages-media-button") && i.find("#bp-group-messages-media-button").parents(".post-elements-buttons-item").addClass("disable"),
                i.find("#bp-group-messages-video-button") && i.find("#bp-group-messages-video-button").parents(".post-elements-buttons-item").addClass("no-click")
            }),
            r.video_dropzone_obj.on("error", function(e, t) {
                e.accepted ? void 0 !== t && void 0 !== t.data && void 0 !== t.data.feedback ? p(e.previewElement).find(".dz-error-message span").text(t.data.feedback) : "Server responded with 0 code." == t && p(e.previewElement).find(".dz-error-message span").text(BP_Nouveau.media.connection_lost_error) : (p("body").append('<div id="bp-video-create-album" style="display: block;" class="open-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-video-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.video.invalid_video_type + '</h4><a class="bb-model-close-button errorPopup" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t + "</p></div></div></div></div></transition></div>"),
                this.removeFile(e))
            }),
            r.video_dropzone_obj.on("accept", function(e, t) {
                0 == e.size ? t(BP_Nouveau.video.empty_video_type) : t()
            }),
            r.video_dropzone_obj.on("addedfile", function(e) {
                e.dataURL || bp.Nouveau.getVideoThumb && bp.Nouveau.getVideoThumb(e, ".dz-video-thumbnail")
            }),
            r.video_dropzone_obj.on("uploadprogress", function(e) {
                var t = p(e.previewElement).find(".dz-progress-ring circle")[0]
                  , i = 2 * t.r.baseVal.value * Math.PI;
                t.style.strokeDasharray = i + " " + i;
                var a = i - e.upload.progress.toFixed(0) / 100 * i;
                e.upload.progress <= 99 ? (p(e.previewElement).find(".dz-progress-count").text(e.upload.progress.toFixed(0) + "% " + BP_Nouveau.video.i18n_strings.video_uploaded_text),
                t.style.strokeDashoffset = a) : 100 === e.upload.progress && (t.style.strokeDashoffset = i - .99 * i,
                p(e.previewElement).find(".dz-progress-count").text("99% " + BP_Nouveau.video.i18n_strings.video_uploaded_text))
            }),
            r.video_dropzone_obj.on("success", function(e, t) {
                if (100 === e.upload.progress && (p(e.previewElement).find(".dz-progress-ring circle")[0].style.strokeDashoffset = 0,
                p(e.previewElement).find(".dz-progress-count").text("100% " + BP_Nouveau.video.i18n_strings.video_uploaded_text),
                p(e.previewElement).closest(".dz-preview").addClass("dz-complete")),
                !t.data.id) {
                    var i, a, o, d, s, n = t.data.feedback;
                    for (e.previewElement.classList.add("dz-error"),
                    s = [],
                    a = 0,
                    o = (d = e.previewElement.querySelectorAll("[data-dz-errormessage]")).length; a < o; a++)
                        i = d[a],
                        s.push(i.textContent = n);
                    return s
                }
                e.id = t.id,
                t.data.uuid = e.upload.uuid,
                t.data.menu_order = p(e.previewElement).closest(".dropzone").find(e.previewElement).index() - 1,
                t.data.album_id = r.album_id,
                t.data.group_id = r.group_id,
                t.data.js_preview = p(e.previewElement).find(".dz-video-thumbnail img").attr("src"),
                t.data.saved = !1,
                r.dropzone_media.push(t.data),
                r.addVideoIdsToGroupMessagesForm()
            }),
            r.video_dropzone_obj.on("removedfile", function(e) {
                if (r.dropzone_media.length)
                    for (var t in r.dropzone_media)
                        if (e.upload.uuid == r.dropzone_media[t].uuid) {
                            void 0 === r.dropzone_media[t].saved || r.dropzone_media[t].saved || r.removeAttachment(r.dropzone_media[t].id),
                            r.dropzone_media.splice(t, 1),
                            r.addVideoIdsToGroupMessagesForm();
                            break
                        }
                var i;
                _.isNull(r.video_dropzone_obj.files) || 0 !== r.video_dropzone_obj.files.length || ((i = p("#send_group_message_form")).find("#bp-group-messages-document-button") && i.find("#bp-group-messages-document-button").parents(".post-elements-buttons-item").removeClass("disable"),
                i.find("#bp-group-messages-gif-button") && i.find("#bp-group-messages-gif-button").parents(".post-elements-buttons-item").removeClass("disable"),
                i.find("#bp-group-messages-media-button") && i.find("#bp-group-messages-media-button").parents(".post-elements-buttons-item").removeClass("disable"),
                i.find("#bp-group-messages-video-button") && i.find("#bp-group-messages-video-button").parents(".post-elements-buttons-item").removeClass("no-click"))
            }),
            t.removeClass("closed").addClass("open"),
            r.resetGroupMessagesMediaComponent(),
            r.resetGroupMessagesGifComponent(),
            r.resetGroupMessagesDocumentComponent()) : r.resetGroupMessagesVideoComponent())
        },
        openForumsDocumentUploader: function(e) {
            var r = this
              , a = p(e.currentTarget)
              , l = a.closest("form").find("#forums-post-document-uploader")
              , t = a.closest("form").find("#forums-post-media-uploader")
              , i = a.closest("form").find("#forums-post-video-uploader")
              , o = [];
            e.preventDefault(),
            a.toggleClass("active");
            t = t.data("key"),
            i = i.data("key");
            if (r.resetForumsMediaComponent(t),
            r.resetForumsVideoComponent(i),
            void 0 !== window.Dropzone && l.length) {
                var c = l.data("key");
                if (l.hasClass("closed")) {
                    if (r.dropzone_obj[c] = new Dropzone(l[0],r.documentOptions),
                    r.dropzone_media[c] = [],
                    r.dropzone_obj[c].on("addedfile", function(e) {
                        var t = e.upload.filename
                          , t = t.substr(t.lastIndexOf(".") + 1);
                        p(e.previewElement).find(".dz-details .dz-icon .bb-icon-file").removeClass("bb-icon-file").addClass("bb-icon-file-" + t)
                    }),
                    r.dropzone_obj[c].on("sending", function(e, t, i) {
                        i.append("action", "document_document_upload"),
                        i.append("_wpnonce", BP_Nouveau.nonces.media);
                        i = a.closest("form");
                        i.addClass("has-media"),
                        i.find("#forums-media-button") && i.find("#forums-media-button").parents(".post-elements-buttons-item").addClass("disable"),
                        i.find("#forums-gif-button") && i.find("#forums-gif-button").parents(".post-elements-buttons-item").addClass("disable"),
                        i.find("#forums-video-button") && i.find("#forums-video-button").parents(".post-elements-buttons-item").addClass("disable"),
                        i.find("#forums-document-button") && i.find("#forums-document-button").parents(".post-elements-buttons-item").addClass("no-click")
                    }),
                    r.dropzone_obj[c].on("uploadprogress", function(e) {
                        a.closest("form").addClass("media-uploading");
                        var t = p(e.previewElement).find(".dz-progress-ring circle")[0]
                          , i = 2 * t.r.baseVal.value * Math.PI;
                        t.style.strokeDasharray = i + " " + i;
                        i = (t.style.strokeDashoffset = i) - e.upload.progress.toFixed(0) / 100 * i;
                        t.style.strokeDashoffset = i
                    }),
                    r.dropzone_obj[c].on("error", function(e, t) {
                        e.accepted ? void 0 !== t && void 0 !== t.data && void 0 !== t.data.feedback ? p(e.previewElement).find(".dz-error-message span").text(t.data.feedback) : "Server responded with 0 code." == t && p(e.previewElement).find(".dz-error-message span").text(BP_Nouveau.media.connection_lost_error) : (jQuery(".forum-document-error-popup").length || p("body").append('<div id="bp-media-create-folder" style="display: block;" class="open-popup forum-document-error-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-media-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.media.invalid_file_type + '</h4><a class="bb-model-close-button errorPopup" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t + "</p></div></div></div></div></transition></div>"),
                        this.removeFile(e),
                        a.closest("form").removeClass("media-uploading"))
                    }),
                    r.dropzone_obj[c].on("accept", function(e, t) {
                        0 == e.size ? t(BP_Nouveau.media.empty_document_type) : t()
                    }),
                    r.dropzone_obj[c].on("success", function(e, t) {
                        if (!t.data.id) {
                            var i, a, o, d, s, n = t.data.feedback;
                            for (e.previewElement.classList.add("dz-error"),
                            s = [],
                            a = 0,
                            o = (d = e.previewElement.querySelectorAll("[data-dz-errormessage]")).length; a < o; a++)
                                i = d[a],
                                s.push(i.textContent = n);
                            return s
                        }
                        e.id = t.id,
                        t.data.uuid = e.upload.uuid,
                        t.data.menu_order = p(e.previewElement).closest(".dropzone").find(e.previewElement).index() - 1,
                        t.data.folder_id = r.current_folder,
                        t.data.group_id = r.current_group_id,
                        t.data.saved = !1,
                        r.dropzone_media[c].push(t.data),
                        r.addDocumentIdsToForumsForm(l)
                    }),
                    r.dropzone_obj[c].on("removedfile", function(e) {
                        if (!0 === bp.Nouveau.Media.reply_topic_allow_delete_media) {
                            if (r.dropzone_media[c].length)
                                for (var t in r.dropzone_media[c])
                                    if (e.upload.uuid == r.dropzone_media[c][t].uuid) {
                                        this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit || void 0 === r.dropzone_media[c][t].saved || r.dropzone_media[c][t].saved || "edit" !== bp.Nouveau.Media.reply_topic_display_post || r.removeAttachment(r.dropzone_media[c][t].id),
                                        r.dropzone_media[c].splice(t, 1),
                                        r.addDocumentIdsToForumsForm(l);
                                        break
                                    }
                            var i;
                            _.isNull(r.dropzone_obj[c].files) || 0 !== r.dropzone_obj[c].files.length || ((i = a.closest("form")).find("#forums-media-button") && i.find("#forums-media-button").parents(".post-elements-buttons-item").removeClass("disable"),
                            i.find("#forums-video-button") && i.find("#forums-video-button").parents(".post-elements-buttons-item").removeClass("disable"),
                            i.find("#forums-gif-button") && i.find("#forums-gif-button").parents(".post-elements-buttons-item").removeClass("disable"),
                            i.find("#forums-document-button") && i.find("#forums-document-button").parents(".post-elements-buttons-item").removeClass("no-click"))
                        }
                        _.isNull(r.dropzone_obj[c].files) || 0 !== r.dropzone_obj[c].files.length || a.closest("form").removeClass("has-media")
                    }),
                    r.dropzone_obj[c].on("complete", function() {
                        0 === this.getUploadingFiles().length && 0 === this.getQueuedFiles().length && 0 < this.files.length && a.closest("form").removeClass("media-uploading")
                    }),
                    l.removeClass("closed").addClass("open"),
                    r.resetForumsGifComponent(e),
                    (this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit) && (this.bbp_reply_edit_document.length || this.bbp_topic_edit_document.length || this.bbp_forum_edit_document.length) && (this.bbp_reply_edit_document.length ? o = this.bbp_reply_edit_document : this.bbp_topic_edit_document.length ? o = this.bbp_topic_edit_document : this.bbp_forum_edit_document.length && (o = this.bbp_forum_edit_document),
                    o.length)) {
                        for (var d, s = 0; s < o.length; s++)
                            r.dropzone_media[c].push({
                                id: o[s].attachment_id,
                                document_id: o[s].id,
                                name: o[s].name,
                                type: "document",
                                title: o[s].name,
                                size: o[s].size,
                                url: o[s].url,
                                uuid: o[s].id,
                                menu_order: s,
                                saved: !!1
                            }),
                            d = {
                                name: o[s].name,
                                size: o[s].size,
                                accepted: !0,
                                kind: "document",
                                upload: {
                                    name: o[s].name,
                                    filename: o[s].name,
                                    title: o[s].name,
                                    size: o[s].size,
                                    uuid: o[s].id
                                },
                                dataURL: o[s].url,
                                id: o[s].id
                            },
                            r.dropzone_obj[c].files.push(d),
                            r.dropzone_obj[c].emit("addedfile", d),
                            r.dropzone_obj[c].emit("complete", d);
                        r.addDocumentIdsToForumsForm(l),
                        _.isNull(r.dropzone_obj[c].files) || 0 === r.dropzone_obj[c].files.length || ((e = a.closest("form")).find("#forums-media-button") && e.find("#forums-media-button").parents(".post-elements-buttons-item").addClass("disable"),
                        e.find("#forums-video-button") && e.find("#forums-video-button").parents(".post-elements-buttons-item").addClass("disable"),
                        e.find("#forums-gif-button") && e.find("#forums-gif-button").parents(".post-elements-buttons-item").addClass("disable"),
                        e.find("#forums-document-button") && e.find("#forums-document-button").parents(".post-elements-buttons-item").addClass("no-click"))
                    }
                } else
                    r.resetForumsDocumentComponent(c)
            }
        },
        openForumsVideoUploader: function(e) {
            var r = this
              , o = p(e.currentTarget)
              , l = o.closest("form").find("#forums-post-video-uploader")
              , t = o.closest("form").find("#forums-post-media-uploader")
              , i = o.closest("form").find("#forums-post-document-uploader")
              , a = [];
            e.preventDefault(),
            o.toggleClass("active");
            t = t.data("key"),
            i = i.data("key");
            if (r.resetForumsMediaComponent(t),
            r.resetForumsDocumentComponent(i),
            void 0 !== window.Dropzone && l.length) {
                var c = l.data("key");
                if (l.hasClass("closed")) {
                    if (r.dropzone_obj[c] = new Dropzone(l[0],r.videoOptions),
                    r.dropzone_media[c] = [],
                    r.dropzone_obj[c].on("sending", function(e, t, i) {
                        i.append("action", "video_upload"),
                        i.append("_wpnonce", BP_Nouveau.nonces.video);
                        i = o.closest("form");
                        i.addClass("has-media"),
                        i.find("#forums-media-button") && i.find("#forums-media-button").parents(".post-elements-buttons-item").addClass("disable"),
                        i.find("#forums-gif-button") && i.find("#forums-gif-button").parents(".post-elements-buttons-item").addClass("disable"),
                        i.find("#forums-document-button") && i.find("#forums-document-button").parents(".post-elements-buttons-item").addClass("disable"),
                        i.find("#forums-video-button") && i.find("#forums-video-button").parents(".post-elements-buttons-item").addClass("no-click")
                    }),
                    r.dropzone_obj[c].on("error", function(e, t) {
                        e.accepted ? void 0 !== t && void 0 !== t.data && void 0 !== t.data.feedback ? p(e.previewElement).find(".dz-error-message span").text(t.data.feedback) : "Server responded with 0 code." == t && p(e.previewElement).find(".dz-error-message span").text(BP_Nouveau.media.connection_lost_error) : (jQuery(".forum-video-error-popup").length || p("body").append('<div id="bp-video-create-album" style="display: block;" class="open-popup forum-video-error-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-video-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.video.invalid_video_type + '</h4><a class="bb-model-close-button errorPopup" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t + "</p></div></div></div></div></transition></div>"),
                        this.removeFile(e),
                        o.closest("form").removeClass("media-uploading"))
                    }),
                    r.dropzone_obj[c].on("accept", function(e, t) {
                        0 == e.size ? t(BP_Nouveau.video.empty_video_type) : t()
                    }),
                    r.dropzone_obj[c].on("addedfile", function(e) {
                        e.dataURL && e.dataThumb && e.dataThumb.length ? p(e.previewElement).find(".dz-video-thumbnail").prepend('<img src=" ' + e.dataThumb + ' " />') : bp.Nouveau.getVideoThumb && bp.Nouveau.getVideoThumb(e, ".dz-video-thumbnail")
                    }),
                    r.dropzone_obj[c].on("uploadprogress", function(e) {
                        o.closest("form").addClass("media-uploading");
                        var t = p(e.previewElement).find(".dz-progress-ring circle")[0]
                          , i = 2 * t.r.baseVal.value * Math.PI;
                        t.style.strokeDasharray = i + " " + i;
                        var a = i - e.upload.progress.toFixed(0) / 100 * i;
                        e.upload.progress <= 99 ? (p(e.previewElement).find(".dz-progress-count").text(e.upload.progress.toFixed(0) + "% " + BP_Nouveau.video.i18n_strings.video_uploaded_text),
                        t.style.strokeDashoffset = a) : 100 === e.upload.progress && (t.style.strokeDashoffset = i - .99 * i,
                        p(e.previewElement).find(".dz-progress-count").text("99% " + BP_Nouveau.video.i18n_strings.video_uploaded_text))
                    }),
                    r.dropzone_obj[c].on("success", function(e, t) {
                        if (100 === e.upload.progress && (p(e.previewElement).find(".dz-progress-ring circle")[0].style.strokeDashoffset = 0,
                        p(e.previewElement).find(".dz-progress-count").text("100% " + BP_Nouveau.video.i18n_strings.video_uploaded_text),
                        p(e.previewElement).closest(".dz-preview").addClass("dz-complete")),
                        !t.data.id) {
                            var i, a, o, d, s, n = t.data.feedback;
                            for (e.previewElement.classList.add("dz-error"),
                            s = [],
                            a = 0,
                            o = (d = e.previewElement.querySelectorAll("[data-dz-errormessage]")).length; a < o; a++)
                                i = d[a],
                                s.push(i.textContent = n);
                            return s
                        }
                        e.id = t.id,
                        t.data.uuid = e.upload.uuid,
                        t.data.menu_order = p(e.previewElement).closest(".dropzone").find(e.previewElement).index() - 1,
                        t.data.album_id = r.album_id,
                        t.data.group_id = r.group_id,
                        t.data.js_preview = p(e.previewElement).find(".dz-video-thumbnail img").attr("src"),
                        t.data.saved = !1,
                        r.dropzone_media[c].push(t.data),
                        r.addVideoIdsToForumsForm(l)
                    }),
                    r.dropzone_obj[c].on("removedfile", function(e) {
                        if (!0 === bp.Nouveau.Media.reply_topic_allow_delete_media) {
                            if (r.dropzone_media[c].length)
                                for (var t in r.dropzone_media[c])
                                    if (e.upload.uuid == r.dropzone_media[c][t].uuid) {
                                        this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit || void 0 === r.dropzone_media[c][t].saved || r.dropzone_media[c][t].saved || "edit" !== bp.Nouveau.Media.reply_topic_display_post || r.removeAttachment(r.dropzone_media[c][t].id),
                                        r.dropzone_media[c].splice(t, 1),
                                        r.addVideoIdsToForumsForm(l);
                                        break
                                    }
                            var i;
                            _.isNull(r.dropzone_obj[c].files) || 0 !== r.dropzone_obj[c].files.length || ((i = o.closest("form")).find("#forums-media-button") && i.find("#forums-media-button").parents(".post-elements-buttons-item").removeClass("disable"),
                            i.find("#forums-gif-button") && i.find("#forums-gif-button").parents(".post-elements-buttons-item").removeClass("disable"),
                            i.find("#forums-document-button") && i.find("#forums-document-button").parents(".post-elements-buttons-item").removeClass("disable"),
                            i.find("#forums-video-button") && i.find("#forums-video-button").parents(".post-elements-buttons-item").removeClass("no-click"))
                        }
                        _.isNull(r.dropzone_obj[c].files) || 0 !== r.dropzone_obj[c].files.length || o.closest("form").removeClass("has-media")
                    }),
                    r.dropzone_obj[c].on("complete", function() {
                        0 === this.getUploadingFiles().length && 0 === this.getQueuedFiles().length && 0 < this.files.length && o.closest("form").removeClass("media-uploading")
                    }),
                    l.removeClass("closed").addClass("open"),
                    r.resetForumsGifComponent(e),
                    (this.bbp_is_reply_edit || this.bbp_is_topic_edit || this.bbp_is_forum_edit) && (this.bbp_reply_edit_video.length || this.bbp_topic_edit_video.length || this.bbp_forum_edit_video.length) && (this.bbp_reply_edit_video.length ? a = this.bbp_reply_edit_video : this.bbp_topic_edit_video.length ? a = this.bbp_topic_edit_video : this.bbp_forum_edit_video.length && (a = this.bbp_forum_edit_video),
                    a.length)) {
                        for (var d, s = 0; s < a.length; s++)
                            r.dropzone_media[c].push({
                                id: a[s].attachment_id,
                                video_id: a[s].id,
                                name: a[s].name,
                                type: "video",
                                title: a[s].name,
                                size: a[s].size,
                                url: a[s].url,
                                uuid: a[s].id,
                                thumb: a[s].thumb,
                                menu_order: s,
                                saved: !!1
                            }),
                            d = {
                                name: a[s].name,
                                size: a[s].size,
                                accepted: !0,
                                kind: "video",
                                upload: {
                                    name: a[s].name,
                                    title: a[s].name,
                                    size: a[s].size,
                                    uuid: a[s].id
                                },
                                dataURL: a[s].url,
                                dataThumb: a[s].thumb,
                                id: a[s].id
                            },
                            r.dropzone_obj[c].files.push(d),
                            r.dropzone_obj[c].emit("addedfile", d),
                            r.dropzone_obj[c].emit("complete", d);
                        r.addVideoIdsToForumsForm(l),
                        _.isNull(r.dropzone_obj[c].files) || 0 === r.dropzone_obj[c].files.length || ((e = o.closest("form")).find("#forums-media-button") && e.find("#forums-media-button").parents(".post-elements-buttons-item").addClass("disable"),
                        e.find("#forums-gif-button") && e.find("#forums-gif-button").parents(".post-elements-buttons-item").addClass("disable"),
                        e.find("#forums-document-button") && e.find("#forums-document-button").parents(".post-elements-buttons-item").addClass("disable"),
                        e.find("#forums-video-button") && e.find("#forums-video-button").parents(".post-elements-buttons-item").addClass("no-click"))
                    }
                } else
                    r.resetForumsVideoComponent(c)
            }
        },
        addMediaIdsToForumsForm: function(e) {
            var t = e.data("key");
            e.closest("#whats-new-attachments").find("#bbp_media").length && e.closest("#whats-new-attachments").find("#bbp_media").val(JSON.stringify(this.dropzone_media[t]))
        },
        addDocumentIdsToForumsForm: function(e) {
            var t = e.data("key");
            e.closest("#whats-new-attachments").find("#bbp_document").length && e.closest("#whats-new-attachments").find("#bbp_document").val(JSON.stringify(this.dropzone_media[t]))
        },
        addVideoIdsToForumsForm: function(e) {
            var t = e.data("key");
            e.closest("#whats-new-attachments").find("#bbp_video").length && e.closest("#whats-new-attachments").find("#bbp_video").val(JSON.stringify(this.dropzone_media[t]))
        },
        createThumbnailFromUrl: function(t, e) {
            var i = this
              , a = e.data("key");
            i.dropzone_obj[a].createThumbnailFromUrl(t, i.dropzone_obj[a].options.thumbnailWidth, i.dropzone_obj[a].options.thumbnailHeight, i.dropzone_obj[a].options.thumbnailMethod, !0, function(e) {
                i.dropzone_obj[a].emit("thumbnail", t, e),
                i.dropzone_obj[a].emit("complete", t)
            })
        },
        openUploader: function(e) {
            var t, a, i = this;
            e.preventDefault(),
            void 0 !== window.Dropzone && p("div#media-uploader").length && (p("#bp-media-uploader").addClass("open-popup").show(),
            p(e.currentTarget).closest("#bp-media-single-album").length && p("#bb-media-privacy").hide(),
            p("#bp-media-uploader").find(".bb-field-steps.bb-field-steps-2").length && (t = "#bp-media-uploader.bp-media-photo-uploader",
            0 !== Number(p(t).find(".bb-album-selected-id").data("value")) ? (a = p(t).find(".bb-album-selected-id").data("value"),
            p(t).find("#bb-document-privacy").prop("disabled", !0)) : a = 0,
            "" !== this.moveToIdPopup && p.ajax({
                url: BP_Nouveau.ajaxurl,
                type: "post",
                data: {
                    action: "media_get_album_view",
                    id: this.moveToIdPopup,
                    type: this.moveToTypePopup
                },
                success: function(e) {
                    p(document).find(".location-album-list-wrap h4 span.where-to-move-profile-or-group-media").html(e.data.first_span_text),
                    "" === e.data.html ? (p(document).find(".open-popup .location-album-list-wrap").hide(),
                    p(document).find(".open-popup .location-album-list-wrap-main span.no-album-exists").show()) : (p(document).find(".open-popup .location-album-list-wrap-main span.no-album-exists").hide(),
                    p(document).find(".open-popup .location-album-list-wrap").show()),
                    !1 === e.data.create_album ? (p(document).find(".open-popup .bp-media-open-create-popup-folder").removeClass("create-album"),
                    p(document).find(".open-popup .bp-media-open-create-popup-folder").hide()) : p(document).find(".open-popup .bp-media-open-create-popup-folder").addClass("create-album"),
                    p(document).find(".popup-on-fly-create-album .privacy-field-wrap-hide-show").show(),
                    p(document).find(".open-popup .bb-album-create-from").val("profile"),
                    p(t).find(".location-album-list-wrap .location-album-list").remove(),
                    p(t).find(".location-album-list-wrap").append(e.data.html),
                    p(t).find('ul.location-album-list span[data-id="' + a + '"]').trigger("click"),
                    p(t).find(".bb-album-selected-id").val(a)
                }
            })),
            p(document).on("click", t + " .location-album-list li span", function(e) {
                var t;
                e.preventDefault(),
                p(this).parent().hasClass("is_active") || (0 != p(this).closest(".location-album-list-wrap").find(".breadcrumb .item span:last-child").data("id") && p(this).closest(".location-album-list-wrap").find(".breadcrumb .item span:last-child").remove(),
                p(this).closest(".location-album-list-wrap").find(".breadcrumb .item").append('<span class="is-disabled" data-id="' + p(this).attr("id") + '">' + p(this).text() + "</span>"),
                p(this).addClass("selected").parent().addClass("is_active").siblings().removeClass("is_active").children("span").removeClass("selected"),
                a == p(e.currentTarget).data("id") ? p(e.currentTarget).closest(".bb-field-wrap").find(".bb-model-footer .bp-media-move").addClass("is-disabled") : p(e.currentTarget).closest(".bb-field-wrap").find(".bb-model-footer .bp-media-move").removeClass("is-disabled"),
                p(e.currentTarget).closest(".bb-field-wrap").find(".bb-model-footer .bp-media-move").hasClass("is-disabled") || (p(e.currentTarget).closest(".bb-field-wrap").find(".bb-album-selected-id").val(p(e.currentTarget).data("id")),
                t = p(e.currentTarget).closest("#bp-media-uploader").find("#bb-media-privacy"),
                0 !== Number(p(e.currentTarget).data("id")) ? (t.find("option").removeAttr("selected"),
                t.val(p(e.currentTarget).parent().data("privacy")),
                t.prop("disabled", !0)) : (t.find("option").removeAttr("selected"),
                t.val("public"),
                t.prop("disabled", !1))))
            }),
            p(document).on("click", t + " .breadcrumb .item > span", function(e) {
                var t, i;
                p(this).hasClass("is-disabled") || (p(e.currentTarget).closest(".bb-field-wrap").find(".bb-album-selected-id").val(0),
                p(e.currentTarget).closest(".bb-field-wrap").find(".location-album-list li span").removeClass("selected").parent().removeClass("is_active"),
                p(this).closest(".location-album-list-wrap").find(".breadcrumb .item span:last-child").hasClass("is-disabled") && p(this).closest(".location-album-list-wrap").find(".breadcrumb .item span:last-child").remove(),
                a == p(e.currentTarget).data("id") ? p(e.currentTarget).closest(".bb-field-wrap").find(".bb-model-footer .bp-media-move").addClass("is-disabled") : p(e.currentTarget).closest(".bb-field-wrap").find(".bb-model-footer .bp-media-move").removeClass("is-disabled"),
                t = p(e.currentTarget).closest("#bp-media-uploader").find("#bb-media-privacy"),
                i = p(e.currentTarget).closest("#bp-media-uploader").find(".location-album-list li.is_active").data("privacy"),
                0 !== Number(p(e.currentTarget).closest(".bb-field-wrap").find(".bb-album-selected-id").val()) ? (t.find("option").removeAttr("selected"),
                t.val(void 0 === i ? "public" : i),
                t.prop("disabled", !0)) : (t.find("option").removeAttr("selected"),
                t.val("public"),
                t.prop("disabled", !1)))
            }),
            e = document.getElementsByClassName("uploader-post-media-template").length ? document.getElementsByClassName("uploader-post-media-template")[0].innerHTML : "",
            i.options.previewTemplate = e,
            i.dropzone_obj = new Dropzone("div#media-uploader",i.options),
            i.dropzone_obj.on("sending", function(e, t, i) {
                i.append("action", "media_upload"),
                i.append("_wpnonce", BP_Nouveau.nonces.media)
            }),
            i.dropzone_obj.on("uploadprogress", function(e) {
                var t = p(e.previewElement).find(".dz-progress-ring circle")[0]
                  , i = 2 * t.r.baseVal.value * Math.PI;
                t.style.strokeDasharray = i + " " + i;
                i = (t.style.strokeDashoffset = i) - e.upload.progress.toFixed(0) / 100 * i;
                t.style.strokeDashoffset = i
            }),
            i.dropzone_obj.on("addedfile", function() {
                setTimeout(function() {
                    i.dropzone_obj.getAcceptedFiles().length && p("#bp-media-uploader-modal-status-text").text(wp.i18n.sprintf(BP_Nouveau.media.i18n_strings.upload_status, i.dropzone_media.length, i.dropzone_obj.getAcceptedFiles().length)).show()
                }, 1e3)
            }),
            i.dropzone_obj.on("error", function(e, t) {
                e.accepted ? void 0 !== t && void 0 !== t.data && void 0 !== t.data.feedback ? p(e.previewElement).find(".dz-error-message span").text(t.data.feedback) : "Server responded with 0 code." == t && p(e.previewElement).find(".dz-error-message span").text(BP_Nouveau.media.connection_lost_error) : (jQuery(".media-error-popup").length || p("body").append('<div id="bp-media-create-folder" style="display: block;" class="open-popup media-error-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-media-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.media.invalid_media_type + '</h4><a class="bb-model-close-button errorPopup" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t + "</p></div></div></div></div></transition></div>"),
                this.removeFile(e))
            }),
            i.dropzone_obj.on("queuecomplete", function() {
                p("#bp-media-uploader-modal-title").text(BP_Nouveau.media.i18n_strings.upload)
            }),
            i.dropzone_obj.on("processing", function() {
                p("#bp-media-uploader-modal-title").text(BP_Nouveau.media.i18n_strings.uploading + "...")
            }),
            i.dropzone_obj.on("success", function(e, t) {
                t.data.id ? (e.id = t.id,
                t.data.uuid = e.upload.uuid,
                t.data.menu_order = i.dropzone_media.length,
                t.data.album_id = i.album_id,
                t.data.group_id = i.group_id,
                t.data.saved = !1,
                i.dropzone_media.push(t.data)) : (jQuery(".media-error-popup").length || p("body").append('<div id="bp-media-create-folder" style="display: block;" class="open-popup media-error-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-media-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.media.invalid_media_type + '</h4><a class="bb-model-close-button errorPopup" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t.data.feedback + "</p></div></div></div></div></transition></div>"),
                this.removeFile(e)),
                p(".bb-field-steps-1 #bp-media-photo-next, #bp-media-submit").show(),
                p(".modal-container").addClass("modal-container--alert"),
                p(".bb-field-steps-1").addClass("controls-added"),
                p("#bp-media-add-more").show(),
                p("#bp-media-uploader-modal-title").text(BP_Nouveau.media.i18n_strings.uploading + "..."),
                p("#bp-media-uploader-modal-status-text").text(wp.i18n.sprintf(BP_Nouveau.media.i18n_strings.upload_status, i.dropzone_media.length, i.dropzone_obj.getAcceptedFiles().length)).show()
            }),
            i.dropzone_obj.on("removedfile", function(e) {
                if (i.dropzone_media.length)
                    for (var t in i.dropzone_media)
                        if (e.upload.uuid == i.dropzone_media[t].uuid) {
                            void 0 === i.dropzone_media[t].saved || i.dropzone_media[t].saved || i.removeAttachment(i.dropzone_media[t].id),
                            i.dropzone_media.splice(t, 1);
                            break
                        }
                i.dropzone_obj.getAcceptedFiles().length ? p("#bp-media-uploader-modal-status-text").text(wp.i18n.sprintf(BP_Nouveau.media.i18n_strings.upload_status, i.dropzone_media.length, i.dropzone_obj.getAcceptedFiles().length)).show() : (p("#bp-media-uploader-modal-status-text").text(""),
                p("#bp-media-add-more, #bp-media-photo-next").hide(),
                p(".bb-field-steps-1").removeClass("controls-added"),
                p("#bp-media-submit").hide(),
                p(".modal-container").removeClass("modal-container--alert"))
            }))
        },
        openDocumentUploader: function(e) {
            var a, t, r = this;
            e.preventDefault(),
            void 0 !== window.Dropzone && p("div#media-uploader").length && (p("#bp-media-uploader").hasClass("bp-media-document-uploader") && (this.currentTargetParent || (this.currentTargetParent = 0)),
            p(e.currentTarget).closest("#bp-media-single-folder").length && p("#bb-document-privacy").hide(),
            p(document).removeClass("open-popup"),
            p("#bp-media-uploader").show(),
            p("#bp-media-uploader").addClass("open-popup"),
            p("#bp-media-uploader.bp-media-document-uploader").find(".bb-field-steps.bb-field-steps-2").length && (t = "#bp-media-uploader.bp-media-document-uploader",
            0 !== Number(p(t).find(".bb-folder-selected-id").data("value")) ? (a = p(t).find(".bb-folder-selected-id").data("value"),
            p(t).find("#bb-document-privacy").prop("disabled", !0)) : a = 0,
            "" !== this.moveToIdPopup && p.ajax({
                url: BP_Nouveau.ajaxurl,
                type: "GET",
                data: {
                    action: "document_get_folder_view",
                    id: this.moveToIdPopup,
                    type: this.moveToTypePopup
                },
                success: function(e) {
                    p(document).find(".bp-media-document-uploader .location-folder-list-wrap h4 span.where-to-move-profile-or-group-document").html(e.data.first_span_text),
                    "" === e.data.html ? (p(document).find(".bp-media-document-uploader.open-popup .location-folder-list-wrap").hide(),
                    p(document).find(".bp-media-document-uploader.open-popup .location-folder-list-wrap-main span.no-folder-exists").show()) : (p(document).find(".bp-media-document-uploader.open-popup .location-folder-list-wrap-main span.no-folder-exists").hide(),
                    p(document).find(".bp-media-document-uploader.open-popup .location-folder-list-wrap").show()),
                    p(document).find(".bp-media-document-uploader .popup-on-fly-create-album .privacy-field-wrap-hide-show").show(),
                    p(document).find(".bp-media-document-uploader .open-popup .bb-folder-create-from").val("profile"),
                    p(t).find(".location-folder-list-wrap .location-folder-list").remove(),
                    p(t).find(".location-folder-list-wrap").append(e.data.html),
                    bp.Nouveau.Media.folderLocationUI && bp.Nouveau.Media.folderLocationUI(t, a),
                    p(t).find("ul.location-folder-list span#" + a).trigger("click"),
                    p(t).find(".bb-folder-selected-id").val(a)
                }
            })),
            p(document).on("click", t + " .location-folder-list li span", function(e) {
                var t;
                e.preventDefault(),
                p(this).parent().hasClass("is_active") || (0 != p(this).closest(".location-folder-list-wrap").find(".breadcrumb .item span:last-child").data("id") && p(this).closest(".location-folder-list-wrap").find(".breadcrumb .item span:last-child").remove(),
                p(this).closest(".location-folder-list-wrap").find(".breadcrumb .item").append('<span class="is-disabled" data-id="' + p(this).attr("id") + '">' + p(this).text() + "</span>"),
                p(this).addClass("selected").parent().addClass("is_active").siblings().removeClass("is_active").children("span").removeClass("selected"),
                a == p(e.currentTarget).data("id") ? p(e.currentTarget).closest(".bb-field-wrap").find(".bb-model-footer .bp-media-move").addClass("is-disabled") : p(e.currentTarget).closest(".bb-field-wrap").find(".bb-model-footer .bp-media-move").removeClass("is-disabled"),
                p(e.currentTarget).closest(".bb-field-wrap").find(".bb-model-footer .bp-media-move").hasClass("is-disabled") || (p(e.currentTarget).closest(".bb-field-wrap").find(".bb-folder-selected-id").val(p(e.currentTarget).data("id")),
                t = p(e.currentTarget).closest("#bp-media-uploader").find("#bb-document-privacy"),
                0 !== Number(p(e.currentTarget).data("id")) ? (t.find("option").removeAttr("selected"),
                t.val(p(e.currentTarget).parent().data("privacy")),
                t.prop("disabled", !0)) : (t.find("option").removeAttr("selected"),
                t.val("public"),
                t.prop("disabled", !1))))
            }),
            p(document).on("click", t + " .breadcrumb .item > span", function(e) {
                var t, i;
                p(this).hasClass("is-disabled") || (p(e.currentTarget).closest(".bb-field-wrap").find(".bb-folder-selected-id").val(p(e.currentTarget).data("id")),
                p(e.currentTarget).closest(".bb-field-wrap").find(".location-folder-list li span").removeClass("selected").parent().removeClass("is_active"),
                p(e.currentTarget).closest(".bb-field-wrap").find('.location-folder-list li[data-id="' + p(e.currentTarget).data("id") + '"]').addClass("is_active"),
                p(this).closest(".location-folder-list-wrap").find(".breadcrumb .item span:last-child").hasClass("is-disabled") && p(this).closest(".location-folder-list-wrap").find(".breadcrumb .item span:last-child").remove(),
                a == p(e.currentTarget).data("id") ? p(e.currentTarget).closest(".bb-field-wrap").find(".bb-model-footer .bp-media-move").addClass("is-disabled") : p(e.currentTarget).closest(".bb-field-wrap").find(".bb-model-footer .bp-media-move").removeClass("is-disabled"),
                t = p(e.currentTarget).closest("#bp-media-uploader").find("#bb-document-privacy"),
                i = p(e.currentTarget).closest("#bp-media-uploader").find(".location-folder-list li.is_active").data("privacy"),
                0 !== Number(p(e.currentTarget).closest(".bb-field-wrap").find(".bb-folder-selected-id").val()) ? (t.find("option").removeAttr("selected"),
                t.val(void 0 === i ? "public" : i),
                t.prop("disabled", !0)) : (t.find("option").removeAttr("selected"),
                t.val("public"),
                t.prop("disabled", !1)))
            }),
            e = document.getElementsByClassName("uploader-post-document-template").length ? document.getElementsByClassName("uploader-post-document-template")[0].innerHTML : "",
            r.options.previewTemplate = e,
            r.dropzone_obj = new Dropzone("div#media-uploader",r.options),
            r.dropzone_obj.on("sending", function(e, t, i) {
                i.append("action", "document_document_upload"),
                i.append("_wpnonce", BP_Nouveau.nonces.media)
            }),
            r.dropzone_obj.on("uploadprogress", function(e) {
                var t = p(e.previewElement).find(".dz-progress-ring circle")[0]
                  , i = 2 * t.r.baseVal.value * Math.PI;
                t.style.strokeDasharray = i + " " + i;
                i = (t.style.strokeDashoffset = i) - e.upload.progress.toFixed(0) / 100 * i;
                t.style.strokeDashoffset = i
            }),
            r.dropzone_obj.on("addedfile", function(e) {
                setTimeout(function() {
                    r.dropzone_obj.getAcceptedFiles().length && p("#bp-media-uploader-modal-status-text").text(wp.i18n.sprintf(BP_Nouveau.media.i18n_strings.upload_status, r.dropzone_media.length, r.dropzone_obj.getAcceptedFiles().length)).show()
                }, 1e3);
                var t = e.upload.filename
                  , t = t.substr(t.lastIndexOf(".") + 1);
                p(e.previewElement).find(".dz-details .dz-icon .bb-icon-file").length && p(e.previewElement).find(".dz-details .dz-icon .bb-icon-file").removeClass("bb-icon-file").addClass("bb-icon-file-" + t)
            }),
            r.dropzone_obj.on("error", function(e, t) {
                e.accepted ? void 0 !== t && void 0 !== t.data && void 0 !== t.data.feedback ? p(e.previewElement).find(".dz-error-message span").text(t.data.feedback) : "Server responded with 0 code." == t && p(e.previewElement).find(".dz-error-message span").text(BP_Nouveau.media.connection_lost_error) : (jQuery(".document-error-popup").length || p("body").append('<div id="bp-media-create-album" style="display: block;" class="open-popup document-error-popup"><transition name="modal"><div class="modal-mask bb-white bbm-model-wrap"><div class="modal-wrapper"><div id="boss-media-create-album-popup" class="modal-container has-folderlocationUI"><header class="bb-model-header"><h4>' + BP_Nouveau.media.invalid_file_type + '</h4><a class="bb-model-close-button errorPopup" href="#"><span class="dashicons dashicons-no-alt"></span></a></header><div class="bb-field-wrap"><p>' + t + "</p></div></div></div></div></transition></div>"),
                this.removeFile(e))
            }),
            r.dropzone_obj.on("accept", function(e, t) {
                0 == e.size ? t(BP_Nouveau.media.empty_document_type) : t()
            }),
            r.dropzone_obj.on("queuecomplete", function() {
                p("#bp-media-uploader-modal-title").text(BP_Nouveau.media.i18n_strings.upload)
            }),
            r.dropzone_obj.on("processing", function() {
                p("#bp-media-uploader-modal-title").text(BP_Nouveau.media.i18n_strings.uploading + "...")
            }),
            r.dropzone_obj.on("success", function(e, t) {
                if (!t.data.id) {
                    var i, a, o, d, s, n = t.data.feedback;
                    for (e.previewElement.classList.add("dz-error"),
                    s = [],
                    a = 0,
                    o = (d = e.previewElement.querySelectorAll("[data-dz-errormessage]")).length; a < o; a++)
                        i = d[a],
                        s.push(i.textContent = n);
                    return s
                }
                e.id = t.id,
                t.data.uuid = e.upload.uuid,
                t.data.menu_order = r.dropzone_media.length,
                t.data.folder_id = r.current_folder,
                t.data.group_id = r.current_group_id,
                t.data.saved = !1,
                r.dropzone_media.push(t.data),
                p(".bb-field-steps-1 #bp-media-document-next, #bp-media-document-submit").show(),
                p(".modal-container").addClass("modal-container--alert"),
                p(".bb-field-steps-1").addClass("controls-added"),
                p("#bp-media-uploader-modal-title").text(BP_Nouveau.media.i18n_strings.uploading + "..."),
                p("#bp-media-uploader-modal-status-text").text(wp.i18n.sprintf(BP_Nouveau.media.i18n_strings.upload_status, r.dropzone_media.length, r.dropzone_obj.getAcceptedFiles().length)).show()
            }),
            r.dropzone_obj.on("removedfile", function(e) {
                if (r.dropzone_media.length)
                    for (var t in r.dropzone_media)
                        if (e.upload.uuid == r.dropzone_media[t].uuid) {
                            void 0 === r.dropzone_media[t].saved || r.dropzone_media[t].saved || r.removeAttachment(r.dropzone_media[t].id),
                            r.dropzone_media.splice(t, 1);
                            break
                        }
                r.dropzone_obj.getAcceptedFiles().length ? p("#bp-media-uploader-modal-status-text").text(wp.i18n.sprintf(BP_Nouveau.media.i18n_strings.upload_status, r.dropzone_media.length, r.dropzone_obj.getAcceptedFiles().length)).show() : (p("#bp-media-uploader-modal-status-text").text(""),
                p("#bp-media-document-submit").hide(),
                p(".modal-container").removeClass("modal-container--alert"))
            }))
        },
        openMediaMove: function(e) {
            var i, t, a, o;
            e.preventDefault(),
            this.moveToIdPopup = p(e.currentTarget).attr("id"),
            this.moveToTypePopup = p(e.currentTarget).attr("data-type"),
            0 < p(e.currentTarget).closest(".activity-inner").length ? i = p(e.currentTarget).closest(".activity-inner") : 0 < p(e.currentTarget).closest("#media-stream.media").length ? i = p(e.currentTarget).closest("#media-stream.media") : 0 < p(e.currentTarget).closest(".comment-item").length && (i = p(e.currentTarget).closest(".comment-item")),
            p(i).find(".bp-media-move-file").addClass("open").show(),
            a = p(e.currentTarget).closest(".media-action-wrap").siblings("a").data("id"),
            t = p(e.currentTarget).closest(".media-action-wrap").siblings("a").data("album-id"),
            i.find(".bp-media-move").attr("id", a),
            i.find(".bb-model-footer .bp-media-move").addClass("is-disabled"),
            o = p(e.currentTarget).closest(".conflict-activity-ul-li-comment").closest("li.comment-item").length ? "#" + p(e.currentTarget).closest(".conflict-activity-ul-li-comment").closest("li").attr("id") + ".comment-item .bp-media-move-file" : "#" + p(e.currentTarget).closest("li.activity-item").attr("id") + " > .activity-content .bp-media-move-file",
            p(o).find(".bp-document-move").attr("id", p(e.currentTarget).closest(".document-activity").attr("data-id")),
            0 < p(e.currentTarget).closest(".media-list").length && (o = ".bp-media-move-file"),
            "group" === this.moveToTypePopup ? p(document).find(".location-album-list-wrap h4").show() : p(document).find(".location-album-list-wrap h4").hide(),
            p(o).addClass("open-popup"),
            p(o).find(".location-album-list-wrap .location-album-list").remove(),
            p(o).find(".location-album-list-wrap").append('<ul class="location-album-list is-loading"><li><i class="bb-icon-l bb-icon-spinner animate-spin"></i></li></ul>');
            var d = t
              , s = this.moveToTypePopup;
            "" !== this.moveToIdPopup && p.ajax({
                url: BP_Nouveau.ajaxurl,
                type: "post",
                data: {
                    action: "media_get_album_view",
                    id: this.moveToIdPopup,
                    type: this.moveToTypePopup
                },
                success: function(e) {
                    p(document).find(".location-album-list-wrap h4 span.where-to-move-profile-or-group-media").html(e.data.first_span_text),
                    "" === e.data.html ? (p(document).find(".open-popup .location-album-list-wrap").hide(),
                    p(document).find(".open-popup .location-album-list-wrap-main span.no-album-exists").show()) : (p(document).find(".open-popup .location-album-list-wrap-main span.no-album-exists").hide(),
                    p(document).find(".open-popup .location-album-list-wrap").show()),
                    "group" === s ? (p(document).find(".popup-on-fly-create-album .privacy-field-wrap-hide-show").hide(),
                    p(document).find(".open-popup .bb-album-create-from").val("group")) : (p(document).find(".popup-on-fly-create-album .privacy-field-wrap-hide-show").show(),
                    p(document).find(".open-popup .bb-album-create-from").val("profile")),
                    !1 === e.data.create_album ? (p(o + ".open-popup").find(".bp-media-open-create-popup-folder").removeClass("create-album"),
                    p(o + ".open-popup").find(".bp-media-open-create-popup-folder").hide()) : (p(o + ".open-popup").find(".bp-media-open-create-popup-folder").addClass("create-album"),
                    p(o + ".open-popup").find(".bp-media-open-create-popup-folder").show()),
                    p(o).find(".location-album-list-wrap .location-album-list").remove(),
                    p(o).find(".location-album-list-wrap").append(e.data.html),
                    p(o).find("ul.location-album-list span#" + d).trigger("click")
                }
            }),
            p(document).on("click", o + " .location-album-list li span", function(e) {
                var t;
                e.preventDefault(),
                p(this).parent().hasClass("is_active") || (0 != p(this).closest(".location-album-list-wrap").find(".breadcrumb .item span:last-child").data("id") && p(this).closest(".location-album-list-wrap").find(".breadcrumb .item span:last-child").remove(),
                p(this).closest(".location-album-list-wrap").find(".breadcrumb .item").append('<span class="is-disabled" data-id="' + p(this).attr("id") + '">' + p(this).text() + "</span>"),
                p(this).addClass("selected").parent().addClass("is_active").siblings().removeClass("is_active").children("span").removeClass("selected"),
                t = p(document).find('a.bb-open-media-theatre[data-id="' + i.find(".bp-media-move").attr("id") + '"]').data("album-id"),
                Number(t) == Number(p(e.currentTarget).data("id")) ? p(e.currentTarget).closest(".bp-media-move-file").find(".bb-model-footer .bp-media-move").addClass("is-disabled") : p(e.currentTarget).closest(".bp-media-move-file").find(".bb-model-footer .bp-media-move").removeClass("is-disabled"),
                p(e.currentTarget).closest(".bp-media-move-file").find(".bb-model-footer .bp-media-move").hasClass("is-disabled") || p(e.currentTarget).closest(".bp-media-move-file").find(".bb-album-selected-id").val(p(e.currentTarget).data("id")))
            }),
            p(document).on("click", o + " .breadcrumb .item > span", function(e) {
                p(this).hasClass("is-disabled") || (p(e.currentTarget).closest(".bp-media-move-file").find(".bb-album-selected-id").val(0),
                p(e.currentTarget).closest(".bp-media-move-file").find(".location-album-list li span").removeClass("selected").parent().removeClass("is_active"),
                p(this).closest(".location-album-list-wrap").find(".breadcrumb .item span:last-child").hasClass("is-disabled") && p(this).closest(".location-album-list-wrap").find(".breadcrumb .item span:last-child").remove(),
                d == p(e.currentTarget).data("id") ? p(e.currentTarget).closest(".bp-media-move-file").find(".bb-model-footer .bp-media-move").addClass("is-disabled") : p(e.currentTarget).closest(".bp-media-move-file").find(".bb-model-footer .bp-media-move").removeClass("is-disabled"))
            })
        },
        openDocumentMove: function(e) {
            e.preventDefault();
            p(e.currentTarget).closest(".bb-activity-media-elem").find(".document-title").text();
            this.moveToIdPopup = p(e.currentTarget).attr("id"),
            this.moveToTypePopup = p(e.currentTarget).attr("data-type");
            var t = p(e.currentTarget).attr("data-action")
              , i = p(e.currentTarget).closest(".conflict-activity-ul-li-comment").closest("li.comment-item").length ? "#" + p(e.currentTarget).closest(".conflict-activity-ul-li-comment").closest("li").attr("id") + ".comment-item .bp-media-move-file" : "#" + p(e.currentTarget).closest("li.activity-item").attr("id") + " > .activity-content .bp-media-move-file";
            p(i).find(".bp-document-move").attr("id", p(e.currentTarget).closest(".document-activity").attr("data-id")),
            this.currentTargetParent = p(e.currentTarget).closest(".bb-activity-media-elem").attr("data-parent-id"),
            0 < p(e.currentTarget).closest(".media-folder_items").length && (p(e.currentTarget).closest(".media-folder_items").find(".media-folder_name").text(),
            this.currentTargetParent = p(e.currentTarget).closest(".media-folder_items").attr("data-parent-id"),
            (p(e.currentTarget).hasClass("ac-document-move") ? p(i = ".bp-media-move-file").find(".bp-document-move") : p(i = ".bp-media-move-folder").find(".bp-folder-move")).attr("id", p(e.currentTarget).closest(".media-folder_items").attr("data-id"))),
            p(i).find(".location-folder-list-wrap .location-folder-list").remove(),
            p(i).find(".location-folder-list-wrap").append('<ul class="location-folder-list is-loading"><li><i class="bb-icon-l bb-icon-spinner animate-spin"></i></li></ul>'),
            "document" === t ? p(i).find(".bb-model-header h4 .target_name").text(BP_Nouveau.media.move_to_file) : p(i).find(".bb-model-header h4 .target_name").text(BP_Nouveau.media.move_to_folder),
            p(i).show(),
            p(i).addClass("open-popup"),
            "group" === this.moveToTypePopup ? (p(document).find(".location-folder-list-wrap h4").show(),
            p(i).addClass("move-folder-popup-group")) : (p(document).find(".location-folder-list-wrap h4").hide(),
            p(".move-folder-popup-group").removeClass("move-folder-popup-group"));
            var a = this.currentTargetParent
              , o = this.moveToTypePopup;
            "" !== this.moveToIdPopup && p.ajax({
                url: BP_Nouveau.ajaxurl,
                type: "GET",
                data: {
                    action: "document_get_folder_view",
                    id: this.moveToIdPopup,
                    type: this.moveToTypePopup
                },
                success: function(e) {
                    p(document).find(".location-folder-list-wrap h4 span.where-to-move-profile-or-group-document").html(e.data.first_span_text),
                    "" === e.data.html ? (p(document).find(".open-popup .location-folder-list-wrap").hide(),
                    p(document).find(".open-popup .location-folder-list-wrap-main span.no-folder-exists").show()) : (p(document).find(".open-popup .location-folder-list-wrap-main span.no-folder-exists").hide(),
                    p(document).find(".open-popup .location-folder-list-wrap").show()),
                    "group" === o ? (p(document).find(".popup-on-fly-create-folder .privacy-field-wrap-hide-show").hide(),
                    p(document).find(".open-popup .bb-folder-create-from").val("group")) : (p(document).find(".popup-on-fly-create-folder .privacy-field-wrap-hide-show").show(),
                    p(document).find(".open-popup .bb-folder-create-from").val("profile")),
                    p(i).find(".location-folder-list-wrap .location-folder-list").remove(),
                    p(i).find(".location-folder-list-wrap").append(e.data.html),
                    bp.Nouveau.Media.folderLocationUI && (bp.Nouveau.Media.folderLocationUI(i, a),
                    p(i).find("ul.location-folder-list span#" + a).trigger("click"))
                }
            })
        },
        closeMediaMove: function(e) {
            e.preventDefault(),
            0 != p(e.currentTarget).closest(".bp-media-move-file").find(".location-album-list-wrap .breadcrumb .item span:last-child").data("id") && p(e.currentTarget).closest(".bp-media-move-file").find(".location-album-list-wrap .breadcrumb .item span:last-child").remove(),
            p(e.currentTarget).closest(".bp-media-move-file").hide()
        },
        closeDocumentMove: function(e) {
            e.preventDefault();
            var t = jQuery(e.currentTarget).closest(".has-folderlocationUI");
            (p(e.currentTarget).hasClass("ac-document-close-button") ? p(e.currentTarget).closest(".bp-media-move-file").hide().find(".bp-document-move") : p(e.currentTarget).closest(".bp-media-move-folder").hide().find(".bp-folder-move")).attr("id", ""),
            t.find(".bp-document-move.loading").removeClass("loading"),
            this.clearFolderLocationUI(e)
        },
        renameDocument: function(e) {
            var t = p(e.currentTarget).closest(".media-folder_items").find(".media-folder_name")
              , i = t.children("span").text();
            t.hide().siblings(".media-folder_name_edit_wrap").show().children(".media-folder_name_edit").val(i).focus().select(),
            e.preventDefault()
        },
        editPrivacyDocument: function(e) {
            e.preventDefault(),
            p(e.currentTarget).closest("#media-folder-document-data-table").find(".media-folder_visibility .media-folder_details__bottom span").show().siblings("select").addClass("hide");
            var t = p(e.currentTarget).closest(".media-folder_items").find(".media-folder_visibility");
            t.find(".media-folder_details__bottom span").hide().siblings("select").removeClass("hide"),
            t.find(".media-folder_details__bottom span").hide().siblings("select").val(p(e.currentTarget).attr("data-privacy")),
            t.find(".media-folder_details__bottom #bb-folder-privacy").attr("data-privacy", p(e.currentTarget).attr("data-privacy")),
            this.privacySelectorSelect = t.find(".media-folder_details__bottom span").hide().siblings("select"),
            this.privacySelectorSpan = t.find(".media-folder_details__bottom span")
        },
        editPrivacyDocumentSubmit: function(e) {
            e = p(e.currentTarget);
            "true" == e.attr("data-mouseup") ? (e.attr("data-mouseup", "false"),
            e.addClass("hide").siblings("span").show().text(e.find("option:selected").text())) : e.attr("data-mouseup", "true")
        },
        renameDocumentSubmit: function(e) {
            var t = p(e.currentTarget).closest(".media-folder_items").find(".media-folder_name_edit")
              , i = p(e.currentTarget).closest(".media-folder_items").find(".media-folder_name > span")
              , a = p(e.currentTarget).closest(".media-folder_items").find(".media-folder_name")
              , o = p(e.currentTarget).closest(".media-folder_items").find(".media-folder_name > i.media-document-id").attr("data-item-id")
              , d = p(e.currentTarget).closest(".media-folder_items").find(".media-folder_name > i.media-document-attachment-id").attr("data-item-id")
              , s = p(e.currentTarget).closest(".media-folder_items").find(".media-folder_name > i.media-document-type").attr("data-item-id")
              , n = t.val().trim()
              , r = "";
            p(e.currentTarget).closest(".ac-document-list").length ? r = /[?\[\]=<>:;,'"&$#*()|~`!{}%+ \/]+/g : p(e.currentTarget).closest(".ac-folder-list").length && (r = /[\\/?%*:|"<>]+/g);
            r = r.exec(n),
            r = Boolean(r);
            if (r ? t.addClass("error") : t.removeClass("error"),
            p(e.currentTarget).closest(".ac-document-list").length && (-1 != n.indexOf("\\\\") || r ? t.addClass("error") : t.removeClass("error")),
            !p(e.currentTarget).hasClass("name_edit_cancel") && 27 != e.keyCode || (t.removeClass("error"),
            t.parent().hide().siblings(".media-folder_name").show()),
            p(e.currentTarget).hasClass("name_edit_save") || 13 == e.keyCode) {
                if (r)
                    return;
                t.parent().addClass("submitting").append('<i class="animate-spin bb-icon-l bb-icon-spinner"></i>'),
                p.ajax({
                    url: BP_Nouveau.ajaxurl,
                    type: "post",
                    data: {
                        action: "document_update_file_name",
                        document_id: o,
                        attachment_document_id: d,
                        document_type: s,
                        name: n,
                        _wpnonce: BP_Nouveau.nonces.media
                    },
                    success: function(e) {
                        e.success ? (a.attr("data-document-title", e.data.response.title + "." + a.data("extension")),
                        i.html(e.data.response.title),
                        t.removeClass("submitting"),
                        t.parent().find(".animate-spin").remove(),
                        t.parent().hide().siblings(".media-folder_name").show()) : (t.removeClass("submitting"),
                        t.parent().find(".animate-spin").remove(),
                        t.parent().hide().siblings(".media-folder_name").show(),
                        alert(e.data.feedback.replace("&#039;", "'")))
                    }
                })
            }
            e.preventDefault()
        },
        removeAttachment: function(e) {
            e = {
                action: "media_delete_attachment",
                _wpnonce: BP_Nouveau.nonces.media,
                id: e
            };
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: e
            })
        },
        changeUploadModalTab: function(e) {
            e.preventDefault();
            var t = p(e.currentTarget).data("content")
              , i = p(e.currentTarget).closest("#bp-media-uploader");
            p(".bp-media-upload-tab-content").hide(),
            p("#" + t).show(),
            this.current_tab = t,
            i.find(".bp-media-upload-tab").removeClass("selected"),
            p(e.currentTarget).addClass("selected"),
            this.toggleSubmitMediaButton(),
            i.find(".bb-field-steps-2").slideUp(200),
            i.find("#bb-media-privacy").hide(),
            i.find(".bp-media-open-create-popup-folder").hide(),
            "bp-dropzone-content" === t && (i.find(".bb-field-steps-1").show(),
            i.find("#bb-media-privacy").show(),
            i.find(".bp-media-open-create-popup-folder, .bp-document-open-create-popup-folder, #bb-media-privacy").hide()),
            "bp-existing-media-content" === t && i.find(".bb-field-uploader-actions").hide(),
            jQuery(window).scroll()
        },
        openCreateAlbumModal: function(e) {
            e.preventDefault(),
            this.openUploader(e),
            p("#bp-media-create-album").show(),
            p("body").hasClass("directory") && p("#bp-media-uploader").hide()
        },
        openCreateFolderModal: function(e) {
            e.preventDefault(),
            p("#bp-media-create-folder").show(),
            p("#bp-media-create-folder").addClass("open-popup"),
            p(document).find(".open-popup #boss-media-create-album-popup #bb-album-title").show(),
            p(document).find(".open-popup #boss-media-create-album-popup #bb-album-title").removeClass("error")
        },
        openCreateFolderChildModal: function(e) {
            e.preventDefault(),
            p("#bp-media-create-child-folder").show(),
            p("#bp-media-create-child-folder").addClass("open-popup"),
            p(document).find(".open-popup #boss-media-create-album-popup #bb-album-child-title").show(),
            p(document).find(".open-popup #boss-media-create-album-popup #bb-album-child-title").removeClass("error")
        },
        openEditFolderChildModal: function(t) {
            t.preventDefault();
            var e = BP_Nouveau.media.current_user_id
              , i = BP_Nouveau.media.current_group_id
              , a = BP_Nouveau.media.current_type
              , o = 0;
            "group" === a ? (o = i,
            p(document).find(".location-folder-list-wrap h4").show()) : (o = e,
            p(document).find(".location-folder-list-wrap h4").hide()),
            p.ajax({
                url: BP_Nouveau.ajaxurl,
                type: "GET",
                data: {
                    action: "document_get_folder_view",
                    id: o,
                    type: a
                },
                success: function(e) {
                    p(document).find(".location-folder-list-wrap h4 span.where-to-move-profile-or-group-document").html(e.data.first_span_text),
                    p(".location-folder-list-wrap .location-folder-list").remove(),
                    p(".location-folder-list-wrap").append(e.data.html),
                    bp.Nouveau.Media.folderLocationUI && (bp.Nouveau.Media.folderLocationUI("#bp-media-edit-child-folder", BP_Nouveau.media.current_folder),
                    p(t.currentTarget).closest("#bp-media-single-folder").find("ul.location-folder-list span#" + BP_Nouveau.media.current_folder).trigger("click")),
                    "group" === a ? (p(document).find(".popup-on-fly-create-folder .privacy-field-wrap-hide-show").hide(),
                    p(document).find(".open-popup .bb-folder-create-from").val("group")) : (p(document).find(".popup-on-fly-create-folder .privacy-field-wrap-hide-show").show(),
                    p(document).find(".open-popup .bb-folder-create-from").val("profile"))
                }
            }),
            p("#bp-media-edit-child-folder").show()
        },
        folderLocationUI: function(a, o) {
            var e, i;
            0 < p(a).find(".bb-folder-destination").length && (p(a).find(".location-folder-list-wrap").hasClass("is_loaded") || (p(document).on("click", a + " .bb-folder-destination", function() {
                p(this).parent().find(".location-folder-list-wrap").slideToggle()
            }),
            p(a).find(".location-folder-list-wrap").addClass("is_loaded"),
            p(document).on("click", a + " .location-folder-list span", function() {
                this.currentTargetParent = p(this).attr("id");
                var e = p(this)
                  , i = p('<div class="item"></div>');
                e.parents("li").each(function(e, t) {
                    t = p(t).children("span").clone();
                    i.prepend("", t)
                }),
                p(a).find(".breadcrumbs-append-ul-li .breadcrumb").html(i.prepend('<span data-id="0">' + BP_Nouveau.media.target_text + "</span>")),
                p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span.hidden").length || p(a).find(".breadcrumbs-append-ul-li .breadcrumb").find(".item").append('<span class="hidden"></span>'),
                p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span:not(.hidden)").each(function(e) {
                    0 < e && p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item").width() > p(a).find(".breadcrumbs-append-ul-li .breadcrumb").width() && (p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span.hidden").append(p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span").eq(2)),
                    p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item .more_options").length || p('<span class="more_options">...</span>').insertAfter(p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span").eq(0)))
                }),
                p(this).hasClass("selected") && !p(this).hasClass("disabled") ? (p(this).closest(".location-folder-list-wrap-main").find(".bb-folder-destination").val(""),
                p(this).closest(".location-folder-list-wrap-main").find(".bb-folder-selected-id").val("0"),
                p(a).find(".location-folder-list li.is_active").length ? p(a).find(".bb-folder-selected-id").val(p(a).find(".location-folder-list li.is_active").attr("data-id")) : p(a).find(".bb-folder-selected-id").val("0")) : (p(this).closest(".location-folder-list-wrap-main").find(".location-folder-list li span").removeClass("selected"),
                p(this).addClass("selected"),
                p(this).closest(".location-folder-list-wrap-main").find(".bb-folder-destination").val(p(this).text()),
                p(this).closest(".location-folder-list-wrap-main").find(".bb-folder-selected-id").val(p(this).parent().attr("data-id"))),
                p(this).closest(".location-folder-list-wrap").find(".location-folder-title").text(p(this).siblings("span").text()).siblings(".location-folder-back").css("display", "inline-block"),
                p(this).siblings("ul").show().siblings("span, i").hide().parent().siblings().hide(),
                p(this).siblings("ul").children("li").show().children("span,i").show(),
                p(this).closest(".is_active").removeClass("is_active"),
                p(a).find("li.is_active").removeClass("is_active"),
                p(this).parent().addClass("is_active"),
                p(a).find(".bb-folder-selected-id").val(p(a).find(".location-folder-list li.is_active").attr("data-id")),
                p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span").each(function() {
                    p(this).show()
                }),
                o === p(a).find(".breadcrumbs-append-ul-li .item > span:last-child").attr("data-id") && (p(a).hasClass("bp-media-move-file") || p(a).hasClass("bp-media-move-folder")) ? (p(a).find(".bp-document-move").addClass("is-disabled"),
                p(a).find(".bp-folder-move").addClass("is-disabled")) : (p(a).find(".bp-document-move").removeClass("is-disabled"),
                p(a).find(".bp-folder-move").removeClass("is-disabled")),
                setTimeout(function() {
                    var e = 0
                      , e = (p(a).find(".breadcrumbs-append-ul-li .item > span:last-child").hasClass("hidden") ? p(a).find(".breadcrumbs-append-ul-li .item > span:last-child").prev() : p(a).find(".breadcrumbs-append-ul-li .item > span:last-child")).attr("id");
                    o === e && (p(a).hasClass("bp-media-move-file") || p(a).hasClass("bp-media-move-folder")) ? (p(a).find(".bp-document-move").addClass("is-disabled"),
                    p(a).find(".bp-folder-move").addClass("is-disabled")) : (p(a).find(".bp-document-move").removeClass("is-disabled"),
                    p(a).find(".bp-folder-move").removeClass("is-disabled"))
                }, 100)
            }),
            p(document).on("click", a + " .breadcrumbs-append-ul-li .item span", function(e) {
                var t, i;
                p(this).parent().hasClass("is-disabled") || p(this).hasClass("more_options") || (t = p(e.currentTarget).attr("data-id"),
                p(a).find(".location-folder-list-wrap").find(".location-folder-title").text(p(a).find(".location-folder-list li.is_active").closest(".has-ul").children("span").text()).siblings(".location-folder-back").css("display", "inline-block"),
                p(a).find(".bb-folder-selected-id").val(t),
                p(a).find(".location-folder-list li").hide(),
                p(a).find(".location-folder-list li.is_active").removeClass("is_active"),
                p(a).find(".location-folder-list li > span.selected").removeClass("selected"),
                p(a).find('.location-folder-list li[data-id="' + t + '"]').addClass("is_active").children("span").addClass("selected"),
                p(a).find(".location-folder-list li.is_active").parents(".has-ul").show().children("ul").show().siblings("span,i").hide(),
                p(a).find(".location-folder-list li.is_active").children("ul").length && !p(a).find(".location-folder-list li.is_active").children("ul").hasClass("no-folder-list") ? setTimeout(function() {
                    p(a).find(".location-folder-list li.is_active").show().children("ul").show().children("li").show().children("span,i").show().closest("ul").siblings("span, i").hide()
                }, 100) : p(a).find(".location-folder-list li.is_active").hasClass("has-ul").length ? p(a).find(".location-folder-list li.is_active").children("span,i").hide().parent().children("ul").show().children("li").show() : setTimeout(function() {
                    p(a).find(".location-folder-list li.is_active").show().children("span").show().parent().siblings("li").show().children("span,i").show()
                }, 10),
                "0" === t && (p(a).find(".location-folder-list").children("li").show().children("span,i").show(),
                p(a).find(".location-folder-list-wrap").find(".location-folder-title").text(BP_Nouveau.media.target_text),
                p(a).find(".location-folder-back").hide()),
                p(e.currentTarget).nextAll().remove(),
                o === p(a).find(".breadcrumbs-append-ul-li .item > span:last-child").attr("data-id") && (p(a).hasClass("bp-media-move-file") || p(a).hasClass("bp-media-move-folder")) ? (p(a).find(".bp-document-move").addClass("is-disabled"),
                p(a).find(".bp-folder-move").addClass("is-disabled")) : (p(a).find(".bp-document-move").removeClass("is-disabled"),
                p(a).find(".bp-folder-move").removeClass("is-disabled")),
                e = p(a).find(".location-folder-list .is_active > span"),
                i = p('<div class="item"></div>'),
                e.parents("li").each(function(e, t) {
                    t = p(t).children("span").clone();
                    i.prepend("", t)
                }),
                p(a).find(".breadcrumbs-append-ul-li .breadcrumb").html(i.prepend('<span data-id="0">' + BP_Nouveau.media.target_text + "</span>")),
                0 === p(a).find('.breadcrumbs-append-ul-li .breadcrumb .item > span[data-id="' + t + '"]').length && p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item").append(p(a).find('.location-folder-list li[data-id="' + t + '"]').children("span").clone()),
                p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span.hidden").length || p(a).find(".breadcrumbs-append-ul-li .breadcrumb").find(".item").append('<span class="hidden"></span>'),
                p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span:not(.hidden)").each(function(e) {
                    0 < e && p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item").width() > p(a).find(".breadcrumbs-append-ul-li .breadcrumb").width() && (p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span.hidden").append(p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span").eq(2)),
                    p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item .more_options").length || p('<span class="more_options">...</span>').insertAfter(p(a).find(".breadcrumbs-append-ul-li .breadcrumb .item span").eq(0)))
                }),
                p(a).find(".bb-folder-selected-id").val(t))
            })),
            p(a).find(".location-folder-list li").each(function() {
                p(this).children("ul").parent().addClass("has-ul").append('<i class="bb-icon-l bb-icon-angle-right sub-menu-anchor"></i>')
            }),
            p(a).hasClass("bp-media-move-folder") && (p(a).find(".location-folder-list li>span").removeClass("is-disabled"),
            p(a).find('.location-folder-list li>span[id="' + p(a).find(".bp-folder-move").attr("id") + '"]').parent().addClass("is-disabled")),
            e = p(a).find(".bp-folder-move").attr("id"),
            0 == p(a).find('.location-folder-list li[data-id="' + e + '"]').siblings().length && p(a).find('.location-folder-list li[data-id="' + e + '"]').parent("ul").addClass("no-folder-list a"),
            o && (p(a).find(".location-folder-list li").hide(),
            p(a).find(".location-folder-list li.is_active").removeClass("is_active"),
            p(a).find('.location-folder-list li[data-id="' + o + '"]').addClass("is_active"),
            p(a).find(".location-folder-list li.is_active").parents(".has-ul").show().children("ul").show().siblings("span,i").hide(),
            p(a).find(".location-folder-list li.is_active").children("ul").length && !p(a).find(".location-folder-list li.is_active").children("ul").hasClass("no-folder-list") ? setTimeout(function() {
                p(a).find(".location-folder-list li.is_active").show().children("ul").show().children("li").show().children("span,i").show().closest("ul").siblings("span, i").hide()
            }, 100) : p(a).find(".location-folder-list li.is_active").hasClass("has-ul").length ? p(a).find(".location-folder-list li.is_active").children("span,i").hide().parent().children("ul").show().children("li").show() : setTimeout(function() {
                p(a).find(".location-folder-list li.is_active").show().children("span").show().parent().siblings("li").show().children("span,i").show()
            }, 10),
            p(a).find(".location-folder-list-wrap").find(".location-folder-title").text(p(a).find(".location-folder-list li.is_active").closest(".has-ul").children("span").text()).siblings(".location-folder-back").css("display", "inline-block"),
            p(a).find(".bb-folder-selected-id").val(p(a).find(".location-folder-list li.is_active").attr("data-id")),
            p(a).find('.location-folder-list li[data-id="' + e + '"]').children().hide()),
            "0" === o && (p(a).find(".location-folder-list").children("li").show(),
            p(a).find(".location-folder-list-wrap").find(".location-folder-title").text(BP_Nouveau.media.target_text),
            p(a).find(".location-folder-back").hide()),
            setTimeout(function() {
                var e = 0
                  , e = (p(a).find(".breadcrumbs-append-ul-li .item > span:last-child").hasClass("hidden") ? p(a).find(".breadcrumbs-append-ul-li .item > span:last-child").prev() : p(a).find(".breadcrumbs-append-ul-li .item > span:last-child")).attr("id");
                o === e && (p(a).hasClass("bp-media-move-file") || p(a).hasClass("bp-media-move-folder")) ? (p(a).find(".bp-document-move").addClass("is-disabled"),
                p(a).find(".bp-folder-move").addClass("is-disabled")) : (p(a).find(".bp-document-move").removeClass("is-disabled"),
                p(a).find(".bp-folder-move").removeClass("is-disabled"))
            }, 100),
            e = p(a).find(".location-folder-list .is_active > span"),
            i = p('<div class="item"></div>'),
            e.parents("li").each(function(e, t) {
                t = p(t).children("span").clone();
                i.prepend("", t)
            }),
            p(a).find(".breadcrumbs-append-ul-li .breadcrumb").html(i.prepend('<span data-id="0">' + BP_Nouveau.media.target_text + "</span>")))
        },
        clearFolderLocationUI: function(e) {
            e = jQuery(e.currentTarget).closest(".has-folderlocationUI");
            0 < e.length && (e.find(".location-folder-list-wrap-main .location-folder-list-wrap .location-folder-list li").each(function() {
                jQuery(this).removeClass("is_active").find("span.selected:not(.disabled)").removeClass("selected"),
                jQuery(this).find("ul").hide()
            }),
            e.find(".location-folder-list-wrap-main .location-folder-list-wrap .location-folder-list li").show().children("span, i").show(),
            e.find(".location-folder-title").text(BP_Nouveau.media.target_text),
            e.find(".location-folder-back").hide().closest(".has-folderlocationUI").find(".bb-folder-selected-id").val("0"),
            e.find(".ac_document_search_folder").val(""),
            e.find(".bb-model-header h4 span").text("..."),
            e.find(".ac_document_search_folder_list ul").html("").parent().hide().siblings(".location-folder-list-wrap").find(".location-folder-list").show())
        },
        closeCreateAlbumModal: function(e) {
            e.preventDefault(),
            this.closeUploader(e),
            p("#bp-media-create-album").hide(),
            p("#bb-album-title").val("").removeClass("error")
        },
        closeCreateFolderModal: function(e) {
            e.preventDefault(),
            p("#bp-media-create-folder, #bp-media-create-child-folder").hide(),
            p("#bb-album-title, #bb-album-child-title").val(""),
            p("#bp-media-create-child-folder-submit").removeClass("loading")
        },
        closeEditFolderModal: function(e) {
            e.preventDefault();
            var t = p(e.currentTarget).closest("#bp-media-edit-child-folder");
            p("#bp-media-edit-child-folder").hide(),
            t.find(".bb-field-steps-1").show().siblings(".bb-field-steps").hide(),
            this.clearFolderLocationUI(e)
        },
        closeErrorPopup: function(e) {
            e.preventDefault(),
            p(e.currentTarget).closest(".open-popup").remove()
        },
        submitMedia: function(o) {
            var e, d = this, s = p(o.currentTarget), t = p("#bb-media-privacy");
            if (o.preventDefault(),
            s.hasClass("saving"))
                return !1;
            if (s.addClass("saving"),
            "bp-dropzone-content" === d.current_tab) {
                var i = p("#bp-media-post-content").val()
                  , n = p(o.currentTarget).closest(".open-popup")
                  , a = n.find(".bb-album-selected-id").val();
                if (a.length && 0 < parseInt(a))
                    for (var r = 0; r < d.dropzone_media.length; r++)
                        d.dropzone_media[r].album_id = a;
                else
                    a = d.album_id;
                i = {
                    action: "media_save",
                    _wpnonce: BP_Nouveau.nonces.media,
                    medias: d.dropzone_media,
                    content: i,
                    album_id: a,
                    group_id: d.group_id,
                    privacy: t.val()
                },
                p("#bp-dropzone-content .bp-feedback").remove(),
                p.ajax({
                    type: "POST",
                    url: BP_Nouveau.ajaxurl,
                    data: i,
                    success: function(e) {
                        if (e.success) {
                            var t, i;
                            p("#media-stream ul.media-list").length || (p("#media-stream").html(p("<ul></ul>").addClass("media-list item-list bp-list bb-photo-list grid")),
                            p(".bb-photos-actions").show()),
                            bp.Nouveau.inject("#media-stream ul.media-list", e.data.media, "prepend"),
                            e.data.media_personal_count && (p("#buddypress").find(".bp-wrap .users-nav ul li#media-personal-li a span.count").length ? p("#buddypress").find(".bp-wrap .users-nav ul li#media-personal-li a span.count").text(e.data.media_personal_count) : ((i = document.createElement("span")).setAttribute("class", "count"),
                            t = document.createTextNode(e.data.media_personal_count),
                            i.appendChild(t),
                            p("#buddypress").find(".bp-wrap .users-nav ul li#media-personal-li a").append(i))),
                            e.data.media_group_count && (p("#buddypress").find(".bp-wrap .groups-nav ul li#photos-groups-li a span.count").length ? p("#buddypress").find(".bp-wrap .groups-nav ul li#photos-groups-li a span.count").text(e.data.media_group_count) : ((t = document.createElement("span")).setAttribute("class", "count"),
                            i = document.createTextNode(e.data.media_group_count),
                            t.appendChild(i),
                            p("#buddypress").find(".bp-wrap .users-nav ul li#photos-groups-li a").append(t))),
                            "yes" === BP_Nouveau.media.is_media_directory && (p("#buddypress").find(".media-type-navs ul.media-nav li#media-all a span.count").text(e.data.media_all_count),
                            p("#buddypress").find(".media-type-navs ul.media-nav li#media-personal a span.count").text(e.data.media_personal_count),
                            p("#buddypress").find(".media-type-navs ul.media-nav li#media-groups a span.count").text(e.data.media_group_count));
                            for (var a = 0; a < d.dropzone_media.length; a++)
                                d.dropzone_media[a].saved = !0;
                            n.find(".bb-album-selected-id").val(0),
                            d.closeUploader(o),
                            jQuery(window).scroll()
                        } else
                            p("#bp-dropzone-content").prepend(e.data.feedback);
                        s.removeClass("saving")
                    }
                })
            } else
                "bp-existing-media-content" === d.current_tab ? (e = [],
                p('.bp-existing-media-wrap .bb-media-check-wrap [name="bb-media-select"]:checked').each(function() {
                    e.push(p(this).val())
                }),
                i = {
                    action: "media_move_to_album",
                    _wpnonce: BP_Nouveau.nonces.media,
                    medias: e,
                    album_id: d.album_id,
                    group_id: d.group_id
                },
                p("#bp-existing-media-content .bp-feedback").remove(),
                p.ajax({
                    type: "POST",
                    url: BP_Nouveau.ajaxurl,
                    data: i,
                    success: function(e) {
                        e.success ? (p("#media-stream ul.media-list").length || (p("#media-stream").html(p("<ul></ul>").addClass("media-list item-list bp-list bb-photo-list grid")),
                        p(".bb-photos-actions").show()),
                        bp.Nouveau.inject("#media-stream ul.media-list", e.data.media, "prepend"),
                        p('.bp-existing-media-wrap .bb-media-check-wrap [name="bb-media-select"]:checked').each(function() {
                            parseInt(p(this).closest("li").data("id")) === parseInt(p(this).val()) && p(this).closest("li").remove()
                        }),
                        jQuery(window).scroll(),
                        d.closeUploader(o)) : p("#bp-existing-media-content").prepend(e.data.feedback),
                        s.removeClass("saving")
                    }
                })) : d.current_tab || (d.closeUploader(o),
                s.removeClass("saving"))
        },
        submitDocumentMedia: function(i) {
            var a = this
              , o = p(i.currentTarget)
              , d = p(i.currentTarget).closest("#bp-media-uploader");
            if (i.preventDefault(),
            o.hasClass("saving"))
                return !1;
            if (o.addClass("saving"),
            "bp-dropzone-content" === a.current_tab) {
                var e = p("#bp-media-post-content").val()
                  , t = p("#bb-document-privacy").val()
                  , s = p(i.currentTarget).closest(".open-popup")
                  , n = s.find(".bb-folder-selected-id").val()
                  , s = s.find(".bb-folder-selected-id").data("value")
                  , r = !0;
                if (n.length && 0 < parseInt(n)) {
                    void 0 !== s && parseInt(n) !== parseInt(s) && (r = !1);
                    for (var l = 0; l < a.dropzone_media.length; l++)
                        a.dropzone_media[l].folder_id = n
                } else
                    n = a.album_id;
                t = {
                    action: "document_document_save",
                    _wpnonce: BP_Nouveau.nonces.media,
                    documents: a.dropzone_media,
                    content: e,
                    privacy: t,
                    folder_id: a.current_folder,
                    group_id: a.current_group_id
                },
                p("#bp-dropzone-content .bp-feedback").remove(),
                p.ajax({
                    type: "POST",
                    url: BP_Nouveau.ajaxurl,
                    data: t,
                    success: function(e) {
                        if (e.success) {
                            p("#media-stream div#media-folder-document-data-table").length || (p("#media-stream").html(p("<div></div>").addClass("display")),
                            p("#media-stream div").attr("id", "media-folder-document-data-table"),
                            p(".bb-photos-actions").show()),
                            p(".document-data-table-head").length ? "yes" === BP_Nouveau.media.is_document_directory && "groups" === bp.Nouveau.getStorage("bp-document").scope ? (p(document).find("li#document-personal a").trigger("click"),
                            p(document).find("li#document-personal").trigger("click")) : r && bp.Nouveau.inject("#media-stream div#media-folder-document-data-table", e.data.document, "prepend") : location.reload(!0),
                            p("#bp-media-post-content").val("");
                            for (var t = 0; t < a.dropzone_media.length; t++)
                                a.dropzone_media[t].saved = !0;
                            a.closeUploader(i),
                            p(document).removeClass("open-popup"),
                            jQuery(window).scroll()
                        } else
                            p(document).removeClass("open-popup"),
                            p("#bp-dropzone-content").prepend(e.data.feedback);
                        o.removeClass("saving"),
                        d.find("#bp-media-document-submit").hide()
                    }
                })
            } else
                a.current_tab || (a.closeUploader(i),
                o.removeClass("saving"))
        },
        saveAlbum: function(t) {
            var i = p(t.currentTarget)
              , a = this
              , o = p("#bb-album-title")
              , d = p("#bb-album-privacy");
            if (i.hasClass("saving"))
                return !1;
            if (t.preventDefault(),
            "" === p.trim(o.val()))
                return o.addClass("error"),
                !1;
            if (o.removeClass("error"),
            !a.group_id && "" === p.trim(d.val()))
                return d.addClass("error"),
                !1;
            d.removeClass("error"),
            i.addClass("saving"),
            i.attr("disabled", !0);
            var e = {
                action: "media_album_save",
                _wpnonce: BP_Nouveau.nonces.media,
                title: o.val(),
                medias: a.dropzone_media,
                privacy: d.val()
            };
            a.album_id && (e.album_id = a.album_id),
            a.group_id && (e.group_id = a.group_id),
            p("#bp-media-single-album .bp-feedback").remove(),
            p("#boss-media-create-album-popup .bp-feedback").remove(),
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: e,
                success: function(e) {
                    setTimeout(function() {
                        i.removeClass("saving"),
                        i.prop("disabled", !1)
                    }, 500),
                    e.success ? a.album_id ? (p("#bp-single-album-title").text(o.val()),
                    p("#bb-album-privacy").val(d.val()),
                    a.cancelEditAlbumTitle(t)) : (p("#buddypress .bb-albums-list").prepend(e.data.album),
                    window.location.href = e.data.redirect_url) : a.album_id ? p("#bp-media-single-album").prepend(e.data.feedback) : p("#boss-media-create-album-popup .bb-model-header").after(e.data.feedback)
                }
            })
        },
        saveFolder: function(t) {
            var i = p(t.currentTarget)
              , a = this
              , e = p("#bb-album-title")
              , o = p(t.currentTarget).parents().find(".open-popup #bb-folder-privacy option:selected");
            t.preventDefault();
            var d = /[\\/?%*:|"<>]+/g.exec(e.val())
              , d = Boolean(d);
            if ("" === p.trim(e.val()) || d)
                return e.addClass("error"),
                !1;
            if (e.removeClass("error"),
            !a.group_id && "" === p.trim(o.val()))
                return o.addClass("error"),
                !1;
            o.removeClass("error"),
            i.prop("disabled", !0).addClass("loading");
            o = {
                action: "document_folder_save",
                _wpnonce: BP_Nouveau.nonces.media,
                title: e.val().trim(),
                privacy: o.val(),
                album_id: a.current_folder,
                group_id: a.current_group_id
            };
            p(".bb-single-album-header .bp-feedback").remove(),
            p("#boss-media-create-album-popup .bp-feedback").remove(),
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: o,
                success: function(e) {
                    setTimeout(function() {
                        i.prop("disabled", !1)
                    }, 500),
                    e.success ? (a.closeFolderUploader(t),
                    p(".document-data-table-head").length ? "yes" === BP_Nouveau.media.is_document_directory && "groups" === bp.Nouveau.getStorage("bp-document").scope ? (p(document).find("li#document-personal a").trigger("click"),
                    p(document).find("li#document-personal").trigger("click")) : (bp.Nouveau.inject("#media-stream div#media-folder-document-data-table", e.data.document, "prepend"),
                    jQuery(window).scroll()) : location.reload(!0)) : alert(e.data.feedback.replace("&#039;", "'"))
                }
            })
        },
        saveChildFolder: function(t) {
            var e = p(t.currentTarget)
              , i = this
              , a = p("#bp-media-create-child-folder #bb-album-child-title");
            t.preventDefault();
            var o = /[\\/?%*:|"<>]+/g.exec(a.val())
              , o = Boolean(o);
            if ("" === p.trim(a.val()) || o)
                return a.addClass("error"),
                !1;
            a.removeClass("error"),
            e.prop("disabled", !0).addClass("loading");
            a = {
                action: "document_child_folder_save",
                _wpnonce: BP_Nouveau.nonces.media,
                title: a.val(),
                folder_id: i.current_folder,
                group_id: i.current_group_id
            };
            p(".bb-single-album-header .bp-feedback").remove(),
            p("#boss-media-create-album-popup .bp-feedback").remove(),
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: a,
                success: function(e) {
                    e.success ? (i.closeChildFolderUploader(t),
                    location.reload(!0)) : alert(e.data.feedback.replace("&#039;", "'"))
                }
            })
        },
        renameChildFolder: function(e) {
            e.preventDefault();
            var t = p(e.currentTarget)
              , i = this
              , a = p("#bp-media-edit-child-folder #bb-album-child-title")
              , o = p("#bp-media-edit-child-folder #bb-folder-privacy")
              , d = this.currentTargetParent
              , e = /[\\/?%*:|"<>]+/g.exec(a.val())
              , e = Boolean(e);
            if ("" === p.trim(a.val()) || e)
                return a.addClass("error"),
                !1;
            a.removeClass("error"),
            t.prop("disabled", !0).addClass("loading");
            d = {
                action: "document_edit_folder",
                _wpnonce: BP_Nouveau.nonces.media,
                title: a.val(),
                privacy: o.val(),
                id: d,
                group_id: i.current_group_id
            };
            p(".bb-single-album-header .bp-feedback").remove(),
            p("#boss-media-create-album-popup .bp-feedback").remove(),
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: d,
                success: function(e) {
                    setTimeout(function() {
                        t.prop("disabled", !1)
                    }, 500),
                    e.success ? window.location.reload(!0) : i.current_folder ? p("#bp-media-single-album").prepend(e.data.feedback) : p("#boss-media-create-album-popup .bb-model-header").after(e.data.feedback)
                }
            })
        },
        deleteAlbum: function(t) {
            if (t.preventDefault(),
            !this.album_id)
                return !1;
            if (!confirm(BP_Nouveau.media.i18n_strings.album_delete_confirm))
                return !1;
            p(t.currentTarget).prop("disabled", !0);
            var e = {
                action: "media_album_delete",
                _wpnonce: BP_Nouveau.nonces.media,
                album_id: this.album_id,
                group_id: this.group_id
            };
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: e,
                success: function(e) {
                    e.success ? window.location.href = e.data.redirect_url : (alert(BP_Nouveau.media.i18n_strings.album_delete_error),
                    p(t.currentTarget).prop("disabled", !1))
                }
            })
        },
        deleteFolder: function(t) {
            if (t.preventDefault(),
            !BP_Nouveau.media.current_folder)
                return !1;
            if (!confirm(BP_Nouveau.media.i18n_strings.folder_delete_confirm))
                return !1;
            p(t.currentTarget).prop("disabled", !0);
            var e = {
                action: "document_folder_delete",
                _wpnonce: BP_Nouveau.nonces.media,
                folder_id: BP_Nouveau.media.current_folder,
                group_id: BP_Nouveau.media.current_group_id
            };
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: e,
                success: function(e) {
                    e.success ? window.location.href = e.data.redirect_url : (alert(BP_Nouveau.media.i18n_strings.folder_delete_error),
                    p(t.currentTarget).prop("disabled", !1))
                }
            })
        },
        addMediaIdsToGroupMessagesForm: function() {
            p("#bp_group_messages_media").length && p("#bp_group_messages_media").val(JSON.stringify(this.dropzone_media))
        },
        addDocumentIdsToGroupMessagesForm: function() {
            p("#bp_group_messages_document").length && p("#bp_group_messages_document").val(JSON.stringify(this.dropzone_media))
        },
        addVideoIdsToGroupMessagesForm: function() {
            p("#bp_group_messages_video").length && p("#bp_group_messages_video").val(JSON.stringify(this.dropzone_media))
        },
        injectMedias: function(t) {
            var i, a, e = bp.Nouveau.getStorage("bp-media"), o = e.scope || null, d = e.filter || null;
            p(t.currentTarget).hasClass("load-more") && (i = +Number(this.current_page) + 1,
            a = this,
            e = "",
            t.preventDefault(),
            p(t.currentTarget).find("a").first().addClass("loading"),
            p("#buddypress .dir-search input[type=search]").length && (e = p("#buddypress .dir-search input[type=search]").val()),
            bp.Nouveau.objectRequest({
                object: "media",
                scope: o,
                filter: d,
                search_terms: e,
                page: i,
                method: "append",
                target: "#buddypress [data-bp-list] ul.bp-list"
            }).done(function(e) {
                !0 === e.success && (p(t.currentTarget).remove(),
                a.current_page = i,
                jQuery(window).scroll())
            }))
        },
        injectDocuments: function(e) {
            var t, i, a, o = bp.Nouveau.getStorage("bp-document"), d = "", s = "", n = o.scope || null, r = o.filter || null, l = p(e.currentTarget);
            l.hasClass("load-more") && (t = +Number(this.current_page) + 1,
            i = this,
            a = "",
            e.preventDefault(),
            l.find("a").first().addClass("loading"),
            p("#buddypress .dir-search input[type=search]").length && (a = p("#buddypress .dir-search input[type=search]").val()),
            s = this.order_by && this.sort_by ? (d = this.sort_by,
            this.order_by) : void 0 !== o.extras ? (d = o.extras.sort,
            o.extras.orderby) : (d = "ASC",
            "title"),
            bp.Nouveau.objectRequest({
                object: "document",
                scope: n,
                filter: r,
                search_terms: a,
                page: t,
                method: "append",
                target: "#buddypress [data-bp-list] div#media-folder-document-data-table",
                order_by: s,
                sort: d
            }).done(function(e) {
                !0 === e.success && (l.parent(".pager").remove(),
                i.current_page = t,
                jQuery(window).scroll())
            }))
        },
        sortDocuments: function(e) {
            var t = p(e.currentTarget)
              , i = t.data("target")
              , a = ""
              , o = "date_created";
            t.attr("class");
            switch (i) {
            case "name":
                o = "title";
                break;
            case "modified":
                o = "date_modified";
                break;
            case "visibility":
                o = "privacy";
                break;
            case "group":
                o = "group_id"
            }
            t.hasClass("asce") ? t.removeClass("asce") : t.addClass("asce");
            var d = t.hasClass("asce") ? "DESC" : "ASC"
              , i = (bp.Nouveau.getStorage("bp-document"),
            {});
            i.orderby = o,
            i.sort = d,
            "group" !== o && bp.Nouveau.setStorage("bp-document", "extras", i);
            t = bp.Nouveau.getStorage("bp-document"),
            i = t.scope || null,
            t = t.filter || null;
            p(e.currentTarget);
            p("#buddypress .bp-dir-search-form input[type=search]").length && (a = p("#buddypress .bp-dir-search-form input[type=search]").val()),
            this.sort_by = d,
            this.order_by = o,
            this.current_page = 1,
            bp.Nouveau.objectRequest({
                object: "document",
                scope: i,
                filter: t,
                search_terms: a,
                page: 1,
                order_by: o,
                sort: d,
                method: "reset",
                target: "#buddypress [data-bp-list]"
            }).done()
        },
        documentPopupNavigate: function(e) {
            e.preventDefault();
            var t = p(e.currentTarget)
              , i = t.closest(".bb-field-steps")
              , e = 0 == t.closest(".bp-document-listing").length ? "#bb-album-child-title" : "#bb-album-title";
            t.closest(".document-options").length && (e = "#bb-album-title"),
            t.hasClass("bb-field-steps-next") && "" == i.find(e).val().trim() ? i.find(e).addClass("error") : (i.find(e).removeClass("error"),
            i.slideUp(200).siblings(".bb-field-steps").slideDown(200))
        },
        uploadDocumentNavigate: function(e) {
            e.preventDefault();
            var e = p(e.currentTarget)
              , t = p(e).closest("#bp-media-uploader");
            p(e).hasClass("bb-field-uploader-next") ? (t.find(".bb-field-steps-1").slideUp(200).siblings(".bb-field-steps").slideDown(200),
            t.find("#bp-media-document-submit, #bp-media-document-prev, .bp-document-open-create-popup-folder, #bb-document-privacy").show(),
            0 !== Number(p(t).find(".bb-folder-selected-id")) && p(t).find(".location-folder-list li.is_active").length && p(t).find(".location-folder-list").scrollTop(p(t).find(".location-folder-list li.is_active").offset().top - p(t).find(".location-folder-list").offset().top),
            p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item span:not(.hidden)").each(function(e) {
                0 < e && p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item").width() > p(t).find(".breadcrumbs-append-ul-li .breadcrumb").width() && (p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item span.hidden").append(p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item span").eq(2)),
                p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item .more_options").length || p('<span class="more_options">...</span>').insertAfter(p(t).find(".breadcrumbs-append-ul-li .breadcrumb .item span").eq(0)))
            })) : (p(e).hide(),
            t.find("#bp-media-document-prev, .bp-document-open-create-popup-folder").hide(),
            t.find(".bb-field-steps-2").slideUp(200).siblings(".bb-field-steps").slideDown(200),
            t.closest("#bp-media-single-folder").length && p("#bb-document-privacy").hide())
        },
        uploadMediaNavigate: function(e) {
            e.preventDefault();
            var t = p(e.currentTarget)
              , e = p(t).closest(".bp-media-photo-uploader");
            p(t).hasClass("bb-field-uploader-next") ? (e.find(".bb-field-steps-1").slideUp(200).siblings(".bb-field-steps").slideDown(200),
            e.find("#bp-media-submit, #bp-media-prev, .bp-media-open-create-popup-folder.create-album").show(),
            e.find("#bb-media-privacy").show(),
            0 !== Number(p(e).find(".bb-album-selected-id")) && p(e).find(".location-album-list li.is_active").length && p(e).find(".location-album-list").scrollTop(p(e).find(".location-album-list li.is_active").offset().top - p(e).find(".location-album-list").offset().top)) : (p(t).hide(),
            e.find("#bp-media-prev, .bp-media-open-create-popup-folder").hide(),
            e.find(".bb-field-steps-2").slideUp(200).siblings(".bb-field-steps").slideDown(200),
            e.closest("#bp-media-single-album").length && p("#bb-media-privacy").hide())
        },
        appendMedia: function(t) {
            var i, a, e = bp.Nouveau.getStorage("bp-media"), o = e.scope || null, d = e.filter || null;
            p(t.currentTarget).hasClass("load-more") && (i = +Number(this.current_page_existing_media) + 1,
            a = this,
            e = "",
            t.preventDefault(),
            p(t.currentTarget).find("a").first().addClass("loading"),
            p("#buddypress .dir-search input[type=search]").length && (e = p("#buddypress .dir-search input[type=search]").val()),
            bp.Nouveau.objectRequest({
                object: "media",
                scope: o,
                filter: d,
                search_terms: e,
                page: i,
                method: "append",
                caller: "bp-existing-media",
                target: ".bp-existing-media-wrap ul.bp-list"
            }).done(function(e) {
                !0 === e.success && (p(t.currentTarget).remove(),
                a.current_page_existing_media = i,
                jQuery(window).scroll())
            }))
        },
        appendAlbums: function(t) {
            var i = +Number(this.current_page_albums) + 1
              , a = this;
            t.preventDefault(),
            p(t.currentTarget).find("a").first().addClass("loading");
            var e = {
                action: "media_albums_loader",
                _wpnonce: BP_Nouveau.nonces.media,
                page: i
            };
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: e,
                success: function(e) {
                    !0 === e.success && (p(t.currentTarget).remove(),
                    p("#albums-dir-list ul.bb-albums-list").fadeOut(100, function() {
                        p("#albums-dir-list ul.bb-albums-list").append(e.data.albums),
                        p(this).fadeIn(100)
                    }),
                    a.current_page_albums = i)
                }
            })
        },
        toggleSubmitMediaButton: function() {
            var e = p("#bp-media-submit")
              , t = p("#bp-media-add-more");
            "bp-dropzone-content" === this.current_tab ? this.dropzone_obj.getAcceptedFiles().length ? (e.show(),
            t.show()) : (e.hide(),
            t.hide()) : "bp-existing-media-content" === this.current_tab && (p('.bp-existing-media-wrap .bb-media-check-wrap [name="bb-media-select"]:checked').length ? e.show() : e.hide(),
            t.hide())
        },
        playVideo: function(e) {
            e.preventDefault();
            var t = p(e.currentTarget).find("video").get(0)
              , e = p(e.currentTarget).find(".gif-play-button");
            1 == t.paused ? (t.play(),
            e.hide()) : (t.pause(),
            e.show())
        },
        autoPlayGifVideos: function() {
            p(".gif-player").each(function() {
                var e = p(this).find("video").get(0)
                  , t = p(this).find(".gif-play-button");
                p(this).is(":in-viewport") ? (e.play(),
                t.hide()) : (e.pause(),
                t.show())
            })
        },
        fileActionButton: function(e) {
            p(e.currentTarget).parent().hasClass("download_file") || p(e.currentTarget).parent().hasClass("copy_download_file_url") || p(e.currentTarget).parent().hasClass("redirect-activity-privacy-change") || (e.preventDefault(),
            p(e.currentTarget).closest(".media-folder_items").toggleClass("is-visible").siblings(".media-folder_items").removeClass("is-visible"))
        },
        copyDownloadLink: function(e) {
            e.preventDefault();
            var t = e.currentTarget
              , e = "document_copy_link";
            p("body").append('<textarea style="position:absolute;opacity:0;" id="' + e + '"></textarea>');
            var i = p(t).text();
            return p(t).text(BP_Nouveau.media.copy_to_clip_board_text),
            p("#" + e).val(p(t).attr("href")),
            p("#" + e).select(),
            document.execCommand("copy"),
            setTimeout(function() {
                p(t).text(i)
            }, 2e3),
            !1
        },
        fileActivityActionButton: function(e) {
            e.preventDefault(),
            p(e.currentTarget).parent().hasClass("copy_download_file_url") || (p(e.currentTarget).closest(".bb-activity-media-elem").toggleClass("is-visible").siblings().removeClass("is-visible").closest(".activity-item").siblings().find(".bb-activity-media-elem").removeClass("is-visible"),
            p(e.currentTarget).closest(".bb-activity-media-elem").length < 1 && p(e.currentTarget).closest(".bb-photo-thumb").toggleClass("is-visible").parent().siblings().find(".bb-photo-thumb").removeClass("is-visible").removeClass("is-visible"),
            "a" != e.currentTarget.tagName.toLowerCase() || p(e.currentTarget).hasClass("document-action_more") || p(e.currentTarget).hasClass("media-action_more") || (p(e.currentTarget).closest(".bb-activity-media-elem").removeClass("is-visible"),
            p(e.currentTarget).closest(".bb-photo-thumb").removeClass("is-visible")))
        },
        toggleFileActivityActionButton: function(e) {
            var t;
            return (e = e || window.event).target ? t = e.target : e.srcElement && (t = e.srcElement),
            3 === t.nodeType && (t = t.parentNode),
            !0 === e.altKey || !0 === e.metaKey || p(t).hasClass("document-action_more") || p(t).parent().hasClass("document-action_more") || p(t).hasClass("media-folder_action__anchor") || p(t).parent().hasClass("media-folder_action__anchor") || p(t).hasClass("media-action_more") || p(t).parent().hasClass("media-action_more") || p(t).hasClass("video-action_more") || p(t).parent().hasClass("video-action_more") ? e : (p(".bb-activity-media-elem.is-visible").removeClass("is-visible"),
            p(".media-folder_items.is-visible").removeClass("is-visible"),
            p(".bb-photo-thumb.is-visible").removeClass("is-visible"),
            p(".bb-item-thumb.is-visible").removeClass("is-visible"),
            p(".bb-activity-video-elem.is-visible").removeClass("is-visible"),
            void p(".video-action-wrap.item-action-wrap.is-visible").removeClass("is-visible"))
        },
        toggleCodePreview: function(e) {
            e.preventDefault(),
            p(e.currentTarget).closest(".document-activity").toggleClass("code-full-view")
        },
        documentCodeMirror: function() {
            p(".document-text:not(.loaded)").each(function() {
                var e = p(this)
                  , t = e.attr("data-extension")
                  , i = e.attr("data-extension");
                "html" != t && "htm" != t || (i = "text/html"),
                "js" == t ? CodeMirror(e[0], {
                    value: e.find(".document-text-file-data-hidden").val(),
                    lineNumbers: !0,
                    theme: "default",
                    readOnly: !0,
                    lineWrapping: !0
                }) : CodeMirror(e[0], {
                    value: e.find(".document-text-file-data-hidden").val(),
                    mode: i,
                    lineNumbers: !0,
                    theme: "default",
                    readOnly: !0,
                    lineWrapping: !0
                }),
                e.addClass("loaded"),
                150 < e.parent().height() && (e.closest(".document-text-wrap").addClass("is_large"),
                e.closest(".document-activity").addClass("is_large"))
            })
        },
        closePopup: function(e) {
            27 == e.keyCode && (p(".bp-media-move-folder.open-popup .ac-folder-close-button:visible, .bp-media-move-file .ac-media-close-button:visible, .bp-media-move-folder.open-popup .close-create-popup-folder:visible,.bp-media-move-file.open-popup .ac-document-close-button:visible, .bp-media-move-file .close-create-popup-folder:visible, .bp-media-move-photo.open .close-create-popup-album:visible").trigger("click"),
            p("#bp-media-create-folder #bp-media-create-folder-close:visible, #bp-media-create-child-folder #bp-media-create-folder-close:visible").trigger("click"),
            p("#bp-media-uploader #bp-media-uploader-close:visible").trigger("click"),
            p("#bp-media-edit-child-folder #bp-media-edit-folder-close:visible").trigger("click"),
            p("#bp-media-create-album #bp-media-create-album-close:visible").trigger("click"),
            p(".media-folder_visibility select#bb-folder-privacy:not(.hide)").each(function() {
                p(this).attr("data-mouseup", "false").addClass("hide").siblings("span").show().text(p(this).find("option:selected").text())
            }),
            p(".bp-video-thumbnail-uploader .bp-video-thumbnail-uploader-close:visible").trigger("click"),
            p(".bb-action-popup .bb-close-action-popup:visible").trigger("click"))
        },
        submitPopup: function(e) {
            p(document).find(".modal-wrapper:visible").length < 1 || 13 == e.keyCode && (p(".bp-media-move-folder.open-popup .bp-document-move:not(.is-disabled):visible, .bp-media-move-folder.open-popup  .bp-folder-move:not(.is-disabled):visible,.bp-media-move-file.open-popup .bp-document-move:not(.is-disabled):visible, .bp-media-move-file.open-popup .bp-document-create-popup-folder-submit:visible, .bp-media-move-folder.open-popup .bp-document-create-popup-folder-submit:visible, .bp-media-move-file.open .bp-media-move:not(.is-disabled):visible, .bp-media-move-file.open .bp-media-create-popup-album-submit:visible").trigger("click"),
            p("#bp-media-create-folder #bp-media-create-folder-submit:visible, #bp-media-create-child-folder #bp-media-create-child-folder-submit:visible").trigger("click"),
            p("#bp-media-uploader #bp-media-document-submit:visible, #bp-media-uploader #bp-media-submit:visible").trigger("click"),
            p("#bp-media-edit-child-folder #bp-media-edit-child-folder-submit:visible").trigger("click"),
            p("#bp-media-create-album #bp-media-create-album-submit:visible").trigger("click"))
        }
    },
    bp.Nouveau.Media.Theatre = {
        start: function() {
            this.setupGlobals(),
            this.addListeners()
        },
        setupGlobals: function() {
            this.medias = [],
            this.documents = [],
            this.current_media = !1,
            this.current_document = !1,
            this.current_index = 0,
            this.current_document_index = 0,
            this.is_open_media = !1,
            this.is_open_document = !1,
            this.nextLink = p(".bb-next-media"),
            this.nextDocumentLink = p(".bb-next-document"),
            this.previousDocumentLink = p(".bb-prev-document"),
            this.previousLink = p(".bb-prev-media"),
            this.activity_ajax = !1,
            this.group_id = void 0 !== BP_Nouveau.media.group_id && BP_Nouveau.media.group_id,
            this.manage_media = void 0 !== BP_Nouveau.media.can_manage_media && BP_Nouveau.media.can_manage_media,
            this.manage_document = void 0 !== BP_Nouveau.media.can_manage_document && BP_Nouveau.media.can_manage_document
        },
        addListeners: function() {
            p(document).on("click", ".bb-open-media-theatre", this.openTheatre.bind(this)),
            p(document).on("click", ".bb-open-document-theatre", this.openDocumentTheatre.bind(this)),
            p(document).on("click", ".document-detail-wrap-description-popup", this.openDocumentTheatre.bind(this)),
            p(document).on("click", ".bb-close-media-theatre", this.closeTheatre.bind(this)),
            p(document).on("click", ".bb-close-document-theatre", this.closeDocumentTheatre.bind(this)),
            p(document).on("click", ".bb-prev-media", this.previous.bind(this)),
            p(document).on("click", ".bb-next-media", this.next.bind(this)),
            p(document).on("click", ".bb-prev-document", this.previousDocument.bind(this)),
            p(document).on("click", ".bb-next-document", this.nextDocument.bind(this)),
            p(document).on("bp_activity_ajax_delete_request", this.activityDeleted.bind(this)),
            p(document).on("click", "#bb-media-model-container .media-privacy>li", this.mediaPrivacyChange.bind(this)),
            p(document).on("click", "#bb-media-model-container .document-privacy>li", this.documentPrivacyChange.bind(this)),
            p(document).on("click", "#bb-media-model-container .bb-media-section span.privacy", bp.Nouveau, this.togglePrivacyDropdown.bind(this)),
            p(document).on("click", "#bb-media-model-container .bb-document-section span.privacy", bp.Nouveau, this.toggleDocumentPrivacyDropdown.bind(this)),
            p(document).on("click", ".bp-add-media-activity-description", this.openMediaActivityDescription.bind(this)),
            p(document).on("click", "#bp-activity-description-new-reset", this.closeMediaActivityDescription.bind(this)),
            p(document).on("keyup", ".bp-edit-media-activity-description #add-activity-description", this.MediaActivityDescriptionUpdate.bind(this)),
            p(document).on("click", "#bp-activity-description-new-submit", this.submitMediaActivityDescription.bind(this)),
            p(document).click(this.togglePopupDropdown),
            document.addEventListener("keyup", this.checkPressedKeyDocuments.bind(this)),
            document.addEventListener("keyup", this.checkPressedKey.bind(this))
        },
        checkPressedKey: function(e) {
            var t = this;
            if (e = e || window.event,
            !t.is_open_media)
                return !1;
            var i = p("#add-activity-description").length && p("#add-activity-description").is(":focus") || p(".ac-reply-content .ac-textarea > .ac-input").length && p(".ac-reply-content .ac-textarea > .ac-input").hasClass("focus-visible");
            switch (e.keyCode) {
            case 27:
                t.closeTheatre(e);
                break;
            case 37:
                if (void 0 === t.medias[t.current_index - 1] || i)
                    return !1;
                t.previous(e);
                break;
            case 39:
                if (void 0 === t.medias[t.current_index + 1] || i)
                    return !1;
                t.next(e)
            }
        },
        checkPressedKeyDocuments: function(e) {
            e = e || window.event;
            var t = this;
            if (!t.is_open_document)
                return !1;
            var i = p("#add-activity-description").length && p("#add-activity-description").is(":focus") || p(".ac-reply-content .ac-textarea > .ac-input").length && p(".ac-reply-content .ac-textarea > .ac-input").hasClass("focus-visible");
            switch (e.keyCode) {
            case 27:
                t.closeDocumentTheatre(e);
                break;
            case 37:
                if (void 0 === t.documents[t.current_document_index - 1] || i)
                    return !1;
                t.previousDocument(e);
                break;
            case 39:
                if (void 0 === t.documents[t.current_document_index + 1] || i)
                    return !1;
                t.nextDocument(e)
            }
        },
        openTheatre: function(e) {
            e.preventDefault();
            var t = p(e.currentTarget)
              , i = this;
            if (t.closest("#bp-existing-media-content").length)
                return !1;
            i.setupGlobals(),
            i.setMedias(t),
            e = t.data("id"),
            i.setCurrentMedia(e),
            i.showMedia(),
            i.navigationCommands(),
            i.getParentActivityHtml(t),
            i.getMediasDescription(),
            p(".bb-media-model-wrapper.document").hide();
            t = document.getElementById(p(".bb-media-model-wrapper.video video").attr("id"));
            t && t.pause(),
            p(".bb-media-model-wrapper.video").hide(),
            p(".bb-media-model-wrapper.media").show(),
            i.is_open_media = !0
        },
        getParentActivityHtml: function(e) {
            var t = p("#hidden_parent_id").val()
              , e = e.closest(".bb-media-model-wrapper").find("#bb-media-model-container .activity-list li.activity-item").data("bp-activity-id");
            parseInt(t) === parseInt(e) && (e = p('#bb-media-model-container [data-bp-activity-id="' + t + '"]'),
            p('[data-bp-activity-id="' + t + '"] > .activity-state').html(p(e).find(".activity-state").html()),
            p('[data-bp-activity-id="' + t + '"] > .activity-meta').html(p(e).find(".activity-meta").html()),
            p('[data-bp-activity-id="' + t + '"] > .activity-comments').html(p(e).find(".activity-comments").html())),
            p("#hidden_parent_id").length && p("#hidden_parent_id").remove()
        },
        getMediasDescription: function() {
            var e = this;
            p(".bb-media-info-section .activity-list").addClass("loading").html('<i class="bb-icon-l bb-icon-spinner animate-spin"></i>'),
            0 != e.activity_ajax && e.activity_ajax.abort();
            var t = p('[data-bp-activity-id="' + e.current_media.activity_id + '"] .activity-comments');
            t.length && (e.current_media.parent_activity_comments = !0,
            t.html("")),
            !0 === e.current_media.parent_activity_comments && p(".bb-media-model-wrapper:last").after('<input type="hidden" value="' + e.current_media.activity_id + '" id="hidden_parent_id"/>'),
            e.activity_ajax = p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: {
                    action: "media_get_media_description",
                    id: e.current_media.id,
                    attachment_id: e.current_media.attachment_id,
                    nonce: BP_Nouveau.nonces.media
                },
                success: function(e) {
                    e.success ? (p(".bb-media-info-section:visible .activity-list").removeClass("loading").html(e.data.description),
                    p(".bb-media-info-section:visible").show(),
                    p(window).scroll(),
                    setTimeout(function() {
                        bp.Nouveau.reportPopUp(),
                        bp.Nouveau.reportedPopup()
                    }, 10)) : p(".bb-media-info-section.media").hide()
                }
            })
        },
        openDocumentTheatre: function(e) {
            e.preventDefault();
            var t, i = p(e.currentTarget), a = this;
            if (i.closest("#bp-existing-document-content").length)
                return !1;
            i.closest(".document.document-theatre").length && a.closeDocumentTheatre(e),
            t = i.data("id"),
            a.setupGlobals(),
            a.setDocuments(i),
            a.setCurrentDocument(t),
            a.showDocument(),
            a.navigationDocumentCommands(),
            a.getParentActivityHtml(i),
            a.getDocumentsDescription(),
            -1 !== p.inArray(a.current_document.extension, BP_Nouveau.document.mp3_preview_extension.split(",")) && p(e.currentTarget).closest(".bb-activity-media-elem.document-activity").length && p(e.currentTarget).closest(".bb-activity-media-elem.document-activity").find(".document-audio-wrap").length && p(e.currentTarget).closest(".bb-activity-media-elem.document-activity").find(".document-audio-wrap audio")[0].pause(),
            p(".bb-media-model-wrapper.media").hide(),
            p(".bb-media-model-wrapper.document").show();
            e = document.getElementById(p(".bb-media-model-wrapper.video video").attr("id"));
            e && (e.pause(),
            e.src = ""),
            p(".bb-media-model-wrapper.video").hide(),
            a.is_open_document = !0
        },
        resetRemoveActivityCommentsData: function() {
            var e = this
              , t = !1
              , i = !1
              , a = !1
              , o = !1
              , d = !1
              , s = !1;
            e.current_media.parent_activity_comments && ((t = (o = p('.bb-media-model-wrapper.media [data-bp-activity-id="' + e.current_media.activity_id + '"]')).find(".activity-comments")).length && (d = t.html(),
            s = t.attr("class"),
            t.remove(),
            (t = p('[data-bp-activity-id="' + e.current_media.activity_id + '"] .activity-comments')).length && (t.html(d),
            t.attr("class", s),
            t.children("form").removeClass("events-initiated").hide())),
            (a = o.find(".activity-state")).length && (d = a.html(),
            s = a.attr("class"),
            a.remove(),
            (a = p('[data-bp-activity-id="' + e.current_media.activity_id + '"] .activity-state')).length && (a.html(d),
            a.attr("class", s))),
            (i = o.find(".activity-meta")).length && (d = i.html(),
            s = i.attr("class"),
            i.remove(),
            (i = p('[data-bp-activity-id="' + e.current_media.activity_id + '"] > .activity-meta')).length && (i.html(d),
            i.attr("class", s))),
            o.remove()),
            e.current_document.parent_activity_comments && ((t = (o = p('.bb-media-model-wrapper.document [data-bp-activity-id="' + e.current_document.activity_id + '"]')).find(".activity-comments")).length && (d = t.html(),
            s = t.attr("class"),
            t.remove(),
            (t = p('[data-bp-activity-id="' + e.current_document.activity_id + '"] .activity-comments')).length && (t.html(d),
            t.attr("class", s),
            t.children("form").removeClass("events-initiated").hide(),
            t.find(".document-text.loaded").removeClass("loaded").find(".CodeMirror").remove(),
            jQuery(window).scroll())),
            (a = o.find(".activity-state")).length && (d = a.html(),
            s = a.attr("class"),
            a.remove(),
            (a = p('[data-bp-activity-id="' + e.current_document.activity_id + '"] .activity-state')).length && (a.html(d),
            a.attr("class", s))),
            (i = o.find(".activity-meta")).length && (d = i.html(),
            s = i.attr("class"),
            i.remove(),
            (i = p('[data-bp-activity-id="' + e.current_document.activity_id + '"] > .activity-meta')).length && (i.html(d),
            i.attr("class", s))),
            o.remove()),
            bp.Nouveau.reportPopUp(),
            bp.Nouveau.reportActions()
        },
        closeTheatre: function(e) {
            e.preventDefault();
            e = p(e.currentTarget);
            if (p(e).closest(".bb-media-model-wrapper").hasClass("video-theatre"))
                return !1;
            p(".bb-media-model-wrapper.media .bb-media-section").find("img").attr("src", ""),
            p(".bb-media-model-wrapper.video .bb-media-section").find("video").length && videojs(p(".bb-media-model-wrapper.video .bb-media-section").find("video").attr("id")).reset(),
            p(".bb-media-model-wrapper").hide(),
            this.is_open_media = !1,
            this.resetRemoveActivityCommentsData(),
            this.current_media = !1,
            this.getParentActivityHtml(e)
        },
        closeDocumentTheatre: function(e) {
            e.preventDefault();
            var t = p(document).find(".document-theatre");
            t.find(".bb-media-section").removeClass("bb-media-no-preview").find(".document-preview").html(""),
            p(".bb-media-info-section.document").show(),
            t.hide(),
            this.is_open_document = !1,
            this.resetRemoveActivityCommentsData(),
            this.current_document = !1,
            this.getParentActivityHtml(p(e.currentTarget))
        },
        setMedias: function(e) {
            var t = p(".bb-open-media-theatre")
              , i = 0;
            if (void 0 !== (t = p("body").hasClass("activity") ? p(e).closest(".bb-activity-media-wrap").find(".bb-open-media-theatre") : t))
                for (this.medias = [],
                i = 0; i < t.length; i++) {
                    var a, o = p(t[i]);
                    o.closest("#bp-existing-media-content").length || (a = {
                        id: o.data("id"),
                        attachment: o.data("attachment-full"),
                        activity_id: o.data("activity-id"),
                        attachment_id: o.data("attachment-id"),
                        privacy: o.data("privacy"),
                        parent_activity_id: o.data("parent-activity-id"),
                        album_id: o.data("album-id"),
                        group_id: o.data("group-id"),
                        can_edit: o.data("can-edit"),
                        is_forum: !1
                    },
                    o.closest(".forums-media-wrap").length && (a.is_forum = !0),
                    void 0 !== a.privacy && "message" == a.privacy ? a.is_message = !0 : a.is_message = !1,
                    this.medias.push(a))
                }
        },
        setDocuments: function(e) {
            var t = p(".bb-open-document-theatre")
              , i = 0;
            if (p(e).closest(".bp-search-ac-header").length ? t = p(e).closest(".bp-search-ac-header").find(".bb-open-document-theatre") : p("body").hasClass("activity") && 0 === p(e).closest(".search-document-list").length && (t = p(e).closest(".bb-activity-media-wrap").find(".bb-open-document-theatre")),
            void 0 !== t)
                for (this.documents = [],
                i = 0; i < t.length; i++) {
                    var a, o = p(t[i]);
                    t.closest("#bp-existing-document-content").length || (a = {
                        id: o.data("id"),
                        attachment: o.data("attachment-full"),
                        activity_id: o.data("activity-id"),
                        attachment_id: o.data("attachment-id"),
                        privacy: o.data("privacy"),
                        parent_activity_id: o.data("parent-activity-id"),
                        album_id: o.data("album-id"),
                        group_id: o.data("group-id"),
                        extension: o.data("extension"),
                        target_text: o.data("document-title"),
                        preview: o.data("preview"),
                        full_preview: o.data("full-preview"),
                        text_preview: o.data("text-preview"),
                        mirror_text: o.data("mirror-text"),
                        target_icon_class: o.data("icon-class"),
                        author: o.data("author"),
                        download: o.attr("href"),
                        mp3: o.data("mp3-preview"),
                        can_edit: o.data("can-edit"),
                        video: o.attr("data-video-preview"),
                        is_forum: !1
                    },
                    o.closest(".forums-media-wrap").length && (a.is_forum = !0),
                    void 0 !== a.privacy && "message" == a.privacy ? a.is_message = !0 : a.is_message = !1,
                    this.documents.push(a))
                }
        },
        setCurrentMedia: function(e) {
            for (var t = this, i = 0, i = 0; i < t.medias.length; i++)
                if (e === t.medias[i].id) {
                    t.current_media = t.medias[i],
                    t.current_index = i;
                    break
                }
        },
        setCurrentDocument: function(e) {
            for (var t = this, i = 0, i = 0; i < t.documents.length; i++)
                if (e === t.documents[i].id) {
                    t.current_document = t.documents[i],
                    t.current_document_index = i;
                    break
                }
        },
        showMedia: function() {
            var e = this;
            if (void 0 === e.current_media)
                return !1;
            p(".bb-media-model-wrapper.media .bb-media-section").find("img").attr("src", e.current_media.attachment);
            var t, i = p(".bb-media-section .bb-media-privacy-wrap");
            i.length && (i.show(),
            i.find("ul.media-privacy li").removeClass("selected"),
            i.find(".bp-tooltip").attr("data-bp-tooltip", ""),
            (t = i.find("ul.media-privacy").find("li[data-value=" + e.current_media.privacy + "]")).addClass("selected"),
            i.find(".bp-tooltip").attr("data-bp-tooltip", t.text()),
            i.find(".privacy").removeClass("public").removeClass("loggedin").removeClass("onlyme").removeClass("friends").addClass(e.current_media.privacy),
            !(void 0 !== BP_Nouveau.activity && void 0 !== e.current_media.activity_id && 0 != e.current_media.activity_id || e.group_id || e.current_media.is_forum || e.current_media.group_id || e.current_media.album_id || e.current_media.is_message) && e.can_manage_media && e.current_media.can_edit || i.hide()),
            e.navigationCommands()
        },
        showDocument: function() {
            var e = this;
            if (void 0 === e.current_document)
                return !1;
            var t = e.current_document.target_text
              , i = e.current_document.target_icon_class
              , a = p(document).find(".document-theatre")
              , o = e.current_document.extension
              , d = e.current_document.mirror_text;
            a.find(".bb-document-section").removeClass("bb-video-preview"),
            -1 !== p.inArray(e.current_document.extension, ["css", "txt", "js", "html", "htm", "csv"]) ? (a.find(".bb-document-section .document-preview").html('<i class="bb-icon-l bb-icon-spinner animate-spin"></i>'),
            a.find(".bb-document-section").removeClass("bb-media-no-preview"),
            a.find(".bb-document-section .document-preview").html(""),
            a.find(".bb-document-section .document-preview").html("<h3>" + t + '</h3><div class="document-text"><textarea class="document-text-file-data-hidden"></textarea></div>'),
            a.find(".bb-document-section .document-preview .document-text").attr("data-extension", o),
            a.find(".bb-document-section .document-preview .document-text textarea").html(d),
            setTimeout(function() {
                bp.Nouveau.Media.documentCodeMirror()
            }, 1e3)) : -1 !== p.inArray(e.current_document.extension, BP_Nouveau.document.mp3_preview_extension.split(",")) ? (a.find(".bb-document-section .document-preview").html('<i class="bb-icon-l bb-icon-spinner animate-spin"></i>'),
            a.find(".bb-document-section").removeClass("bb-media-no-preview"),
            a.find(".bb-document-section .document-preview").html(""),
            a.find(".bb-document-section .document-preview").html('<div class="img-section"><h3>' + t + '</h3><div class="document-audio"><audio src="' + e.current_document.mp3 + '" controls controlsList="nodownload"></audio></div></div>')) : -1 !== p.inArray("." + e.current_document.extension, BP_Nouveau.video.video_type.split(",")) ? (a.find(".bb-document-section").addClass("bb-video-preview"),
            a.find(".bb-document-section .document-preview").html('<i class="bb-icon-l bb-icon-spinner animate-spin"></i>'),
            a.find(".bb-document-section").removeClass("bb-media-no-preview"),
            a.find(".bb-document-section .document-preview").html(""),
            "mov" === e.current_document.extension || "m4v" === e.current_document.extension ? a.find(".bb-document-section .document-preview").html('<video playsinline id="video-' + e.current_document.id + '" class="video-js video-loading" controls  data-setup=\'{"aspectRatio": "16:9", "fluid": true,"playbackRates": [0.5, 1, 1.5, 2] }\' ><source src="' + e.current_document.video + '" type="video/mp4" ></source></video><span class="video-loader"><i class="bb-icon-l bb-icon-spinner animate-spin"></i></span>') : a.find(".bb-document-section .document-preview").html('<video playsinline id="video-' + e.current_document.id + '" class="video-js video-loading" controls  data-setup=\'{"aspectRatio": "16:9", "fluid": true,"playbackRates": [0.5, 1, 1.5, 2] }\' ><source src="' + e.current_document.video + '" type="video/' + e.current_document.extension + '" ></source></video><span class="video-loader"><i class="bb-icon-l bb-icon-spinner animate-spin"></i></span>'),
            p(window).scroll()) : e.current_document.full_preview ? (a.find(".bb-document-section").removeClass("bb-media-no-preview"),
            a.find(".bb-document-section .document-preview").html(""),
            a.find(".bb-document-section .document-preview").html("<h3>" + t + '</h3><div class="img-section"><div class="img-block-wrap"> <img src="' + e.current_document.full_preview + '" /></div></div>')) : (a.find(".bb-document-section").addClass("bb-media-no-preview"),
            a.find(".bb-document-section .document-preview").html(""),
            a.find(".bb-document-section .document-preview").html('<div class="img-section"> <i class="' + i + '"></i><p>' + t + "</p></div>"));
            i = p(".bb-document-section .bb-document-privacy-wrap");
            i.length && (i.show(),
            i.parent().show(),
            i.find("ul.document-privacy li").removeClass("selected"),
            i.find(".bp-tooltip").attr("data-bp-tooltip", ""),
            (t = i.find("ul.document-privacy").find("li[data-value=" + e.current_document.privacy + "]")).addClass("selected"),
            i.find(".bp-tooltip").attr("data-bp-tooltip", t.text()),
            i.find(".privacy").removeClass("public").removeClass("loggedin").removeClass("onlyme").removeClass("friends").addClass(e.current_document.privacy),
            (void 0 !== BP_Nouveau.activity && void 0 !== e.current_document.activity_id && 0 != e.current_document.activity_id || e.group_id || e.current_document.is_forum || e.current_document.group_id || e.current_document.album_id || !e.can_manage_document || !e.current_document.can_edit || e.current_document.is_message) && i.parent().hide()),
            e.navigationDocumentCommands()
        },
        next: function(e) {
            e.preventDefault();
            e = this;
            e.resetRemoveActivityCommentsData(),
            void 0 !== e.medias[e.current_index + 1] ? (e.current_index = e.current_index + 1,
            e.current_media.activity_id,
            e.current_media = e.medias[e.current_index],
            e.showMedia(),
            e.getMediasDescription()) : e.nextLink.hide()
        },
        previous: function(e) {
            e.preventDefault();
            e = this;
            e.resetRemoveActivityCommentsData(),
            void 0 !== e.medias[e.current_index - 1] ? (e.current_index = e.current_index - 1,
            e.current_media.activity_id,
            e.current_media = e.medias[e.current_index],
            e.showMedia(),
            e.getMediasDescription()) : e.previousLink.hide()
        },
        nextDocument: function(e) {
            e.preventDefault();
            e = this;
            e.resetRemoveActivityCommentsData(),
            void 0 !== e.documents[e.current_document_index + 1] ? (e.current_document_index = e.current_document_index + 1,
            e.current_document.activity_id,
            e.current_document = e.documents[e.current_document_index],
            e.showDocument(),
            e.getDocumentsDescription()) : e.nextDocumentLink.hide()
        },
        previousDocument: function(e) {
            e.preventDefault();
            e = this;
            e.resetRemoveActivityCommentsData(),
            void 0 !== e.documents[e.current_document_index - 1] ? (e.current_document_index = e.current_document_index - 1,
            e.current_document.activity_id,
            e.current_document = e.documents[e.current_document_index],
            e.showDocument(),
            e.getDocumentsDescription()) : e.previousDocumentLink.hide()
        },
        navigationCommands: function() {
            var e = this;
            0 == e.current_index && e.current_index != e.medias.length - 1 ? (e.previousLink.hide(),
            e.nextLink.show()) : 0 == e.current_index && e.current_index == e.medias.length - 1 ? (e.previousLink.hide(),
            e.nextLink.hide()) : e.current_index == e.medias.length - 1 ? (e.previousLink.show(),
            e.nextLink.hide()) : (e.previousLink.show(),
            e.nextLink.show())
        },
        navigationDocumentCommands: function() {
            var e = this;
            0 == e.current_document_index && e.current_document_index != e.documents.length - 1 ? (e.previousDocumentLink.hide(),
            e.nextDocumentLink.show()) : 0 == e.current_document_index && e.current_document_index == e.documents.length - 1 ? (e.previousDocumentLink.hide(),
            e.nextDocumentLink.hide()) : e.current_document_index == e.documents.length - 1 ? (e.previousDocumentLink.show(),
            e.nextDocumentLink.hide()) : (e.previousDocumentLink.show(),
            e.nextDocumentLink.show())
        },
        getActivity: function() {
            var e, t = this;
            p(".bb-media-info-section .activity-list").addClass("loading").html('<i class="bb-icon-l bb-icon-spinner"></i>'),
            void 0 !== BP_Nouveau.activity && t.current_media && void 0 !== t.current_media.activity_id && 0 != t.current_media.activity_id && !t.current_media.is_forum ? (0 != t.activity_ajax && t.activity_ajax.abort(),
            (e = p('[data-bp-activity-id="' + t.current_media.activity_id + '"] .activity-comments')).length && (t.current_media.parent_activity_comments = !0,
            e.html("")),
            !0 === t.current_media.parent_activity_comments && p(".bb-media-model-wrapper:last").after('<input type="hidden" value="' + t.current_media.activity_id + '" id="hidden_parent_id"/>'),
            t.activity_ajax = p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: {
                    action: "media_get_activity",
                    id: t.current_media.activity_id,
                    group_id: _.isUndefined(t.current_media.group_id) ? 0 : t.current_media.group_id,
                    nonce: BP_Nouveau.nonces.media
                },
                success: function(e) {
                    e.success && (p(".bb-media-info-section:visible .activity-list").removeClass("loading").html(e.data.activity),
                    p(".bb-media-info-section:visible").show(),
                    jQuery(window).scroll(),
                    setTimeout(function() {
                        bp.Nouveau.reportPopUp(),
                        bp.Nouveau.reportedPopup()
                    }, 10))
                }
            })) : p(".bb-media-info-section.media").hide()
        },
        getDocumentsActivity: function() {
            var e, t = this;
            p(".bb-media-info-section .activity-list").addClass("loading").html('<i class="bb-icon-l bb-icon-spinner animate-spin"></i>'),
            void 0 !== BP_Nouveau.activity && t.current_document && void 0 !== t.current_document.activity_id && 0 != t.current_document.activity_id && !t.current_document.is_forum ? (0 != t.activity_ajax && t.activity_ajax.abort(),
            (e = p('[data-bp-activity-id="' + t.current_document.activity_id + '"] .activity-comments')).length && (t.current_document.parent_activity_comments = !0,
            e.html("")),
            !0 === t.current_document.parent_activity_comments && p(".bb-media-model-wrapper:last").after('<input type="hidden" value="' + t.current_document.activity_id + '" id="hidden_parent_id"/>'),
            t.activity_ajax = p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: {
                    action: "document_get_activity",
                    id: t.current_document.activity_id,
                    group_id: _.isUndefined(t.current_document.group_id) ? 0 : t.current_document.group_id,
                    nonce: BP_Nouveau.nonces.media
                },
                success: function(e) {
                    e.success && (p(".bb-media-info-section:visible .activity-list").removeClass("loading").html(e.data.activity),
                    p(".bb-media-info-section:visible").show(),
                    jQuery(window).scroll(),
                    setTimeout(function() {
                        bp.Nouveau.reportPopUp(),
                        bp.Nouveau.reportedPopup()
                    }, 10))
                }
            })) : p(".bb-media-info-section.document").hide()
        },
        getDocumentsDescription: function() {
            var e = this;
            p(".bb-media-info-section .activity-list").addClass("loading").html('<i class="bb-icon-l bb-icon-spinner animate-spin"></i>'),
            0 != e.activity_ajax && e.activity_ajax.abort();
            var t = p('[data-bp-activity-id="' + e.current_document.activity_id + '"] .activity-comments');
            t.length && (e.current_document.parent_activity_comments = !0,
            t.html("")),
            !0 === e.current_document.parent_activity_comments && p(".bb-media-model-wrapper:last").after('<input type="hidden" value="' + e.current_document.activity_id + '" id="hidden_parent_id"/>'),
            e.activity_ajax = p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: {
                    action: "document_get_document_description",
                    id: e.current_document.id,
                    attachment_id: e.current_document.attachment_id,
                    nonce: BP_Nouveau.nonces.media
                },
                success: function(e) {
                    e.success ? (p(".bb-media-info-section:visible .activity-list").removeClass("loading").html(e.data.description),
                    p(".bb-media-info-section:visible").show(),
                    p(window).scroll(),
                    setTimeout(function() {
                        bp.Nouveau.reportPopUp(),
                        bp.Nouveau.reportedPopup()
                    }, 10)) : p(".bb-media-info-section.document").hide()
                }
            })
        },
        activityDeleted: function(e, t) {
            var i = this
              , a = 0;
            if (i.is_open_media && void 0 !== t && "delete_activity" === t.action && i.current_media.activity_id == t.id) {
                for (p(document).find('[data-bp-list="media"] .bb-open-media-theatre[data-id="' + i.current_media.id + '"]').closest("li").remove(),
                p(document).find('[data-bp-list="activity"] .bb-open-media-theatre[data-id="' + i.current_media.id + '"]').closest(".bb-activity-media-elem").remove(),
                a = 0; a < i.medias.length; a++)
                    if (i.medias[a].activity_id == t.id) {
                        i.medias.splice(a, 1);
                        break
                    }
                0 == i.current_index && i.current_index != i.medias.length ? (i.current_index = -1,
                i.next(e)) : 0 == i.current_index && i.current_index == i.medias.length ? (p(document).find('[data-bp-list="activity"] li.activity-item[data-bp-activity-id="' + i.current_media.activity_id + '"]').remove(),
                i.closeTheatre(e)) : i.current_index == i.medias.length ? i.previous(e) : (i.current_index = -1,
                i.next(e))
            }
            if (i.is_open_document && void 0 !== t && "delete_activity" === t.action && i.current_document.activity_id == t.id) {
                for (p(document).find('[data-bp-list="document"] .bb-open-document-theatre[data-id="' + i.current_document.id + '"]').closest('div.ac-document-list[data-activity-id="' + i.current_document.activity_id + '"]').remove(),
                p(document).find('[data-bp-list="activity"] .bb-open-document-theatre[data-id="' + i.current_document.id + '"]').closest(".bb-activity-media-elem").remove(),
                a = 0; a < i.documents.length; a++)
                    if (i.documents[a].activity_id == t.id) {
                        i.documents.splice(a, 1);
                        break
                    }
                0 == i.current_document_index && i.current_document_index != i.documents.length ? (i.current_document_index = -1,
                i.nextDocument(e)) : 0 == i.current_document_index && i.current_document_index == i.documents.length ? (p(document).find('[data-bp-list="activity"] li.activity-item[data-bp-activity-id="' + i.current_document.activity_id + '"]').remove(),
                i.closeDocumentTheatre(e)) : i.current_document_index == i.documents.length ? i.previousDocument(e) : (i.current_document_index = -1,
                i.nextDocument(e))
            }
        },
        togglePopupDropdown: function(e) {
            var t;
            return (e = e || window.event).target ? t = e.target : e.srcElement && (t = e.srcElement),
            3 === t.nodeType && (t = t.parentNode),
            !0 === e.altKey || !0 === e.metaKey || p(t).hasClass("privacy-wrap") || p(t).parent().hasClass("privacy-wrap") ? e : (p("ul.media-privacy").removeClass("bb-open"),
            void p("ul.document-privacy").removeClass("bb-open"))
        },
        togglePrivacyDropdown: function(e) {
            var t = p(e.target);
            e.preventDefault(),
            t.closest(".bb-media-privacy-wrap").find(".media-privacy").toggleClass("bb-open")
        },
        mediaPrivacyChange: function(e) {
            var t, i = p(e.target), a = i.data("value");
            if (e.preventDefault(),
            i.hasClass("selected"))
                return !1;
            i.closest(".bb-media-privacy-wrap").find(".privacy").addClass("loading"),
            t = i.closest(".bb-media-privacy-wrap").find("ul.media-privacy li.selected").data("value"),
            i.closest(".bb-media-privacy-wrap").find("ul.media-privacy li").removeClass("selected"),
            i.addClass("selected"),
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: {
                    action: "media_update_privacy",
                    id: this.current_media.id,
                    _wpnonce: BP_Nouveau.nonces.media,
                    privacy: a
                },
                success: function() {
                    i.closest(".bb-media-privacy-wrap").find(".privacy").removeClass("loading").removeClass(t),
                    i.closest(".bb-media-privacy-wrap").find(".privacy").addClass(a),
                    i.closest(".bb-media-privacy-wrap").find(".bp-tooltip").attr("data-bp-tooltip", i.text())
                },
                error: function() {
                    i.closest(".bb-media-privacy-wrap").find(".privacy").removeClass("loading")
                }
            })
        },
        openMediaActivityDescription: function(e) {
            e.preventDefault();
            e = p(e.currentTarget);
            if (e.parents(".activity-media-description").find(".bp-edit-media-activity-description").length < 1)
                return !1;
            e.parents(".activity-media-description").find(".bp-edit-media-activity-description").show().addClass("open"),
            e.parents(".activity-media-description").find(".bp-media-activity-description").hide(),
            e.hide()
        },
        closeMediaActivityDescription: function(e) {
            e.preventDefault();
            var t = p(e.currentTarget);
            if (t.parents(".activity-media-description").length < 1)
                return !1;
            e = t.parents(".activity-media-description").find("#add-activity-description").get(0).defaultValue;
            t.parents(".activity-media-description").find(".bp-add-media-activity-description").show(),
            t.parents(".activity-media-description").find(".bp-media-activity-description").show(),
            t.parents(".activity-media-description").find("#add-activity-description").val(e),
            t.parents(".activity-media-description").find(".bp-edit-media-activity-description").hide().removeClass("open")
        },
        MediaActivityDescriptionUpdate: function(e) {
            "" !== p(e.currentTarget).val().trim() ? p(e.currentTarget).closest(".bp-edit-media-activity-description").addClass("has-content") : p(e.currentTarget).closest(".bp-edit-media-activity-description").removeClass("has-content")
        },
        submitMediaActivityDescription: function(e) {
            e.preventDefault();
            var t = p(e.currentTarget)
              , i = t.parents(".activity-media-description")
              , e = {
                action: "media_description_save",
                description: i.find("#add-activity-description").val(),
                attachment_id: i.find("#bp-attachment-id").val(),
                _wpnonce: BP_Nouveau.nonces.media
            };
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: e,
                async: !1,
                success: function(e) {
                    e.success ? (t.parents(".activity-media-description").find(".bp-media-activity-description").html(e.data.description).show(),
                    t.parents(".activity-media-description").find(".bp-add-media-activity-description").show(),
                    i.find("#add-activity-description").val(e.data.description),
                    i.find("#add-activity-description").get(0).defaultValue = e.data.description,
                    "" == e.data.description ? t.parents(".activity-media-description").find(".bp-add-media-activity-description").removeClass("show-edit").addClass("show-add") : t.parents(".activity-media-description").find(".bp-add-media-activity-description").addClass("show-edit").removeClass("show-add"),
                    t.parents(".activity-media-description").find(".bp-edit-media-activity-description").hide().removeClass("open"),
                    t.parents(".activity-media-description").find(".bp-media-activity-description").show(),
                    t.parents(".activity-media-description").find(".bp-feedback.error").remove()) : t.parents(".activity-media-description").prepend(e.data.feedback)
                }
            })
        },
        toggleDocumentPrivacyDropdown: function(e) {
            var t = p(e.target);
            e.preventDefault(),
            t.closest(".bb-document-privacy-wrap").find(".document-privacy").toggleClass("bb-open")
        },
        documentPrivacyChange: function(e) {
            var t, i = p(e.target), a = i.data("value");
            if (e.preventDefault(),
            i.hasClass("selected"))
                return !1;
            i.closest(".bb-document-privacy-wrap").find(".privacy").addClass("loading"),
            t = i.closest(".bb-document-privacy-wrap").find("ul.document-privacy li.selected").data("value"),
            i.closest(".bb-document-privacy-wrap").find("ul.document-privacy li").removeClass("selected"),
            i.addClass("selected"),
            p.ajax({
                type: "POST",
                url: BP_Nouveau.ajaxurl,
                data: {
                    action: "document_save_privacy",
                    item_id: this.current_document.id,
                    _wpnonce: BP_Nouveau.nonces.media,
                    value: a,
                    type: "document"
                },
                success: function() {
                    i.closest(".bb-document-privacy-wrap").find(".privacy").removeClass("loading").removeClass(t),
                    i.closest(".bb-document-privacy-wrap").find(".privacy").addClass(a),
                    i.closest(".bb-document-privacy-wrap").find(".bp-tooltip").attr("data-bp-tooltip", i.text())
                },
                error: function() {
                    i.closest(".bb-document-privacy-wrap").find(".privacy").removeClass("loading")
                }
            })
        }
    },
    bp.Nouveau.Media.start(),
    bp.Nouveau.Media.Theatre.start())
}((bp,
jQuery));
