/**
 * crypto aes 加/解密
 */

import CryptoJS from 'crypto-js';

const secretKey = "hTpEwwDYRovUjGyQ";

//解密方法
export function deCrypt(encryptStr) {
  let key = CryptoJS.enc.Utf8.parse(secretKey);
  let decrypt = CryptoJS.AES.decrypt(encryptStr, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

//加密方法
export function enCrypt(content) {
  let key = CryptoJS.enc.Utf8.parse(secretKey);
  let src = CryptoJS.enc.Utf8.parse(content);
  let encrypted = CryptoJS.AES.encrypt(src, key, { mode:CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}
