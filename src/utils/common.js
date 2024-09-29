import { getToken } from '@/utils/auth';
// 通过name获取url参数
export function GetQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 字符串截取
export function cusStringsub(str, len) {
    str = str.substring(0, len + 1);
    return str;
}

//时间戳转换方法    date:时间戳数字
export function formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + "-";
    var MM =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
    var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return YY + MM + DD;
}

export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
}

//设置表格第一行的颜色
export function getRowClass({ row, column, rowIndex, columnIndex }) {
    if (rowIndex == 0) {
        return "background:#F2F3F5; color: #303133;font-weight:600;";
    } else {
        return "";
    }
}

// 判断arr是否为一个数组，返回一个bool值
export function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

// 深度克隆
export function deepClone(obj) {
    // 对常见的“非”值，直接返回原来值
    if ([null, undefined, NaN, false].includes(obj)) return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
        //原始类型直接返回
        return obj;
    }
    var o = isArray(obj) ? [] : {};
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
        }
    }
    return o;
}

// flag 为传参标志，true表示转化成formData格式
export function exportExcelPost(url, params, flag) {
    let formData, config;

    if (flag) {
        formData = new FormData();
        for (let key in params) {
            formData.append(key, params[key]);
        }
        //必须设置此参数，否则会无法正确解析二进制文件
        config = {
            responseType: "blob"
        };
    } else {
        formData = params;
        let token = getToken('token') || '';
        config = { 
            responseType: "arraybuffer", 
            headers: {
                Authorization: token
            }
        };
    }

    return new Promise((resolve, reject) => {
        axios
            .post(url, formData, config)
            .then(res => {
                try {
                    let enc = new TextDecoder("utf-8");
                    res = JSON.parse(enc.decode(new Uint8Array(res.data))); //转化成json对象
                    console.log("异常返回", res);
                } catch (err) {}
                resolve(res.data);
                if (res.data.size <= 2000) {
                    return;
                }
                //获取下载文件的名称并进行相应的解码
                let con = "content-disposition";
                let num = res.headers[con].indexOf("filename=") + 9;
                let str = res.headers[con].slice(num);
                //处理字符串包含的文件名
                if (str.indexOf('"') >= 0 || str.indexOf("'") >= 0) {
                    str = str.substring(1, str.length - 1);
                }
                let fileName = decodeURI(str);

                console.log(
                    "下载文件的名称：",
                    res.headers[con],
                    res.headers[con].indexOf("filename="),
                    str,
                    str.indexOf('/"'),
                    str.indexOf("/'")
                );

                const blob = new Blob([res.data], {
                    type: "application/ms-excel"
                });
                const elink = document.createElement("a");
                if ("download" in elink) {
                    elink.download = fileName;
                    elink.style.display = "none";
                    elink.href = URL.createObjectURL(blob);
                    console.log("解析的文件", URL.createObjectURL(blob));
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                } else {
                    //IE10+下载
                    navigator.msSaveBlob(blob, fileName);
                }
            })
            .catch(error => {
                reject(error);
                console.log("文件错误", error);
            });
    });
}
