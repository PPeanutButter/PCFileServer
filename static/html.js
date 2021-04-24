const file_html_data =  "<div class=\"mdc-card\"\n" +
                        "     style=\"margin-left: 20px;margin-right: 0;margin-top: 20px;cursor: pointer;width: 440px;background-color: #333333\">\n" +
                        "    <img class=\"mdc-card__media mdc-card__media--16-9\" src=\"/getAssets?res=mime-type-icon/{1}&path={2}\" alt=\"cover\"/>\n" +
                        "    <ul class=\"mdc-list\">\n" +
                        "        <li class=\"{6} mdc-list-item file-dialog-name__text demo-card__title\" style=\"padding-left: 20px;width: auto;\">\n" +
                        "            {0}\n" +
                        "        </li>\n" +
                        "    </ul>\n" +
                        "    <div class=\"mdc-card__actions mdc-dialog__actions_\">\n" +
                        "        <div class=\"mdc-dialog__actions\">\n" +
                        "            <button type=\"button\" class=\"material-icons mdc-icon-button mdc-dialog__button mdc-card__action--icon\"\n" +
                        "                    onclick=\"onDialogButtonClick('{3}','play')\">\n" +
                        "                play_circle\n" +
                        "            </button>\n" +
                        "        </div>\n" +
                        "        <div class=\"mdc-card__action-icons\">\n" +
                        "            <button class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon dialog-copy\"\n" +
                        "                    data-mdc-dialog-action=\"1\" title=\"copy link\"\n" +
                        "                    onclick=\"onDialogButtonClick('{3}','copy')\">link\n" +
                        "            </button>\n" +
                        "            <button class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon\"\n" +
                        "                    data-mdc-dialog-action=\"2\" title=\"download\"\n" +
                        "                    onclick=\"onDialogButtonClick('{3}','download')\">\n" +
                        "                download\n" +
                        "            </button>\n" +
                        "            <button class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon\"\n" +
                        "                    data-mdc-dialog-action=\"3\" title=\"add/remove bookmark\"\n" +
                        "                    onclick=\"onDialogButtonClick('{4}','bookmark')\">{5}\n" +
                        "            </button>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</div>";
const directory_html_data = "<div class=\"mdc-card\" style=\"height: fit-content;margin-left: 20px;margin-right: 0;margin-top: 20px;cursor: pointer;width: 220px;background-color: #333333\" onclick=\"onItemClick('{0}','Directory','')\">\n" +
                            "    <img class=\"mdc-card__media\" src=\"/getCover?cover={0}\" style=\"width: 220px;height: 310px;\" alt=\"{0}\"/>\n" +
                            "    <span class=\"ipc-rating-star ipc-rating-star--baseAlt ipc-rating-star--imdb\" style=\"padding: 10px 5px;\"><svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" class=\"ipc-icon ipc-icon--star-inline\" viewBox=\"0 0 24 24\" fill=\"currentColor\" role=\"presentation\"><path d=\"M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z\"></path></svg>   8.9</span>\n" +
                            "    <div class=\"mdc-card-wrapper__text-section\">\n" +
                            "        <div class=\"demo-card__title\">{0}</div>\n" +
                            "    </div>\n" +
                            "</div>";
