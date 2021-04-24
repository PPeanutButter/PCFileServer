const file_html_data = "<c-wiz class=\"pmHCK\" onclick=\"onItemClick('{0}','file','{1}')\">\n" +
                       "    <div class=\"WYuW0e dPmH0b\">\n" +
                       "        <div role=\"row\">\n" +
                       "            <div role=\"gridcell\" class=\"file jGNTYb ACGwFc\">\n" +
                       "                <div class=\"gudAKb\">\n" +
                       "                    <div class=\"V1mwke\">\n" +
                       "                        <div class=\"l-u-Ab-zb-x l-ta-wa\">\n" +
                       "                            <div class=\"l-u-Ab-zb l-u-Ab-ul\">\n" +
                       "                                <div class=\"l-u-Ab-zb-Pn-ve\"></div>\n" +
                       "                                <div class=\"l-u-Ab-zb-Lu\"></div>\n" +
                       "                                <img class=\"l-u-Ab-zb-c\" src=\"/getAssets?res=mime-type-icon/{1}&path={2}\"></div>\n" +
                       "                        </div>\n" +
                       "                    </div>\n" +
                       "                </div>\n" +
                       "                <div class=\"bSmy5\">\n" +
                       "                    <div class=\"a-Oa-qd-Nd\">\n" +
                       "                        <svg height=\"100%\" width=\"100%\" viewBox=\"0 0 10 10\" preserveAspectRatio=\"none\"\n" +
                       "                             focusable=\"false\">\n" +
                       "                            <rect width=\"10\" height=\"10\"></rect>\n" +
                       "                        </svg>\n" +
                       "                    </div>\n" +
                       "                    <div class=\"tohzcb\">\n" +
                       "                        <div class=\"a-c\">\n" +
                       "                            <img class=\"a-Ua-c\" src=\"/getAssets?res=mime-type-icon/{1}\"></div>\n" +
                       "                    </div>\n" +
                       "                    <div class=\"TBiAlb\"></div>\n" +
                       "                    <div class=\"Q5txwe {3}\">{0}\n" +
                       "                    </div>\n" +
                       "                </div>\n" +
                       "            </div>\n" +
                       "        </div>\n" +
                       "    </div>\n" +
                       "</c-wiz>";
const directory_html_data = "<div class=\"mdc-card\" style=\"height: fit-content;margin-left: 20px;margin-right: 0;margin-top: 20px;cursor: pointer;width: 220px;background-color: #333333\" onclick=\"onItemClick('{0}','Directory','')\">\n" +
                            "    <img class=\"mdc-card__media\" src=\"/getCover?cover={0}\" style=\"width: 220px;height: 310px;\" alt=\"{0}\"/>\n" +
                            "    <span class=\"ipc-rating-star ipc-rating-star--baseAlt ipc-rating-star--imdb\" style=\"padding: 10px 5px;\"><svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" class=\"ipc-icon ipc-icon--star-inline\" viewBox=\"0 0 24 24\" fill=\"currentColor\" role=\"presentation\"><path d=\"M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z\"></path></svg>   8.9</span>\n" +
                            "    <div class=\"mdc-card-wrapper__text-section\">\n" +
                            "        <div class=\"demo-card__title\">{0}</div>\n" +
                            "    </div>\n" +
                            "</div>";
const file_detail_icon_html = "<div class=\"V1mwke\">\n" +
                              "    <div class=\"l-u-Ab-zb-x l-ta-wa\">\n" +
                              "        <div class=\"l-u-Ab-zb l-u-Ab-ul\">\n" +
                              "            <div class=\"l-u-Ab-zb-Pn-ve\"></div>\n" +
                              "            <div class=\"l-u-Ab-zb-Lu\"></div>\n" +
                              "            <img class=\"l-u-Ab-zb-c\" src=\"{0}\"></div>\n" +
                              "    </div>\n" +
                              "</div>";
const file_detail_icon_video_html = "<div class=\"V1mwke\">\n" +
                              "    <div class=\"l-u-Ab-zb-x l-ta-wa\">\n" +
                              "        <div class=\"l-u-Ab-zb l-u-Ab-ul\">\n" +
                              "            <img class=\"l-u-Ab-zb-c\" src=\"{0}\" style=\"width: inherit;height: inherit;\"></div>\n" +
                              "    </div>\n" +
                              "</div>";
const file_detail_html = "<li class=\"mdc-list-item\">\n" +
                         "    <span style=\"width: 150px;min-width: 150px;\" class=\"mdc-list-item__text\">{0}</span>\n" +
                         "    <span style=\"max-width: 400px\" class=\"mdc-list-item__text\">{1}</span>\n" +
                         "</li>";
const dialog_actions_html = "<div class=\"mdc-dialog__actions\">\n" +
                            "<button type=\"button\" {1} class=\"mdc-button mdc-dialog__button\" onclick=\"onDialogButtonClick('{0}','play')\">\n" +
                            "    <div class=\"mdc-button__ripple\"></div>\n" +
                            "    <span class=\"mdc-button__label\">使用PotPlayer播放</span>\n" +
                            "</button>\n" +
                            "</div>\n" +
                            "<div class=\"mdc-card__action-icons\">\n" +
                            "    <button class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon dialog-copy\"\n" +
                            "            data-mdc-dialog-action=\"1\" title=\"copy link\" onclick=\"onDialogButtonClick('{0}','copy')\">link\n" +
                            "    </button>\n" +
                            "    <button class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon\"\n" +
                            "            data-mdc-dialog-action=\"2\" title=\"download\" onclick=\"onDialogButtonClick('{0}','download')\">download\n" +
                            "    </button>\n" +
                            "    <button class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon\"\n" +
                            "            data-mdc-dialog-action=\"3\" title=\"add/remove bookmark\" onclick=\"onDialogButtonClick('{2}','bookmark')\">{3}\n" +
                            "    </button>\n" +
                            "</div>"
const menu_list_html = "<li class=\"mdc-list-item\" role=\"menuitem\" onclick=\"getSettings('SHOW_HIDDEN_FILES','{1}')\">\n" +
                       "    <span class=\"mdc-list-item__ripple\"></span>\n" +
                       "    <span class=\"mdc-list-item__text\">{0}</span>\n" +
                       "</li>\n";;
