import httpClent from 'app/src/plugins/httpClient'
import FileService from 'app/src/plugins/fileService'

import {
    Dialog,
    Platform,
    Loading,
    QSpinnerTail
} from 'quasar'

function pad(num, n) {
    var i = (num + "").length;
    while (i++ < n) num = num + "0";
    return num;
}

function versionToNumber(version) {
    let numStr = version.replace(/\./g, '');
    return Number(pad(numStr, 5));
}

/**
 * 将XML的Document对象转换为JSON字符串
 * @param xmlDoc xml的Document对象
 * @return string
 */
function convertToJSON(xmlDoc) {
    //准备JSON字符串和缓存（提升性能）
    var jsonStr = "";
    var buffer = new Array();

    buffer.push("{");
    //获取xml文档的所有子节点
    var nodeList = xmlDoc.childNodes;

    generate(nodeList);

    /**
     * 中间函数，用于递归解析xml文档对象，并附加到json字符串中
     * @param node_list xml文档的的nodeList
     */
    function generate(node_list) {

        for (var i = 0; i < node_list.length; i++) {
            var curr_node = node_list[i];
            //忽略子节点中的换行和空格
            if (curr_node.nodeType == 3) {
                continue;
            }
            //如果子节点还包括子节点，则继续进行遍历
            if (curr_node.childNodes.length > 1) {
                buffer.push("\"" + curr_node.nodeName + "\": {");
                generate(curr_node.childNodes);
            } else {
                var firstChild = curr_node.childNodes[0];

                if (firstChild != null) {
                    //nodeValue不为null
                    buffer.push("\"" + curr_node.nodeName + "\":\"" + firstChild.nodeValue + "\"");
                } else {
                    //nodeValue为null
                    buffer.push("\"" + curr_node.nodeName + "\":\"\"");
                }

            }
            if (i < (node_list.length - 2)) {
                buffer.push(",");
            } else {
                break;
            }
        }
        //添加末尾的"}"
        buffer.push("}");
    }

    jsonStr = buffer.join("");
    return jsonStr;
}



export default class Common {

    /**
     * APP 升级
     * @param {*} url 
     */
    static async updated(url) {
        var res = await httpClent.get(url, null, true);
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(res.trim(), 'text/xml');
        let data = JSON.parse(convertToJSON(xmlDoc).trim())
        var curentVersion = await this.getVersion();
        if (versionToNumber(curentVersion) < versionToNumber(data.update.version)) {
            Dialog.create({
                title: '检测到新版本',
                message: data.update.description,
                ok: '升级',
                cancel: true,
                persistent: true
            }).onOk(() => {
                let fileService = new FileService()
                fileService.downloadAndOpenFile(data.update.apkurl, 'app.apk', true)
            })
        }
    }

    /**
     *
     *获取当前版本号
     * @static
     * @memberof Common
     */
    static async getVersion() {
        return new Promise((resolve, reject) => {
            if (Platform.is.cordova && cordova.getAppVersion) {
                cordova.getAppVersion.getVersionNumber().then(function(version) {
                    return resolve(version)
                });
            } else {
                return resolve('1.1.0');
            }
        })

    }


}