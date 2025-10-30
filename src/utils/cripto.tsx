import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import { setCookie } from 'nookies';


const SECRET_KEY = process.env.SECRET_KEY as string;


export function Criptograph(key: string, value: string) {

  const encryptedValue = CryptoJS?.AES?.encrypt(value, SECRET_KEY).toString()
  setCookie(null, key,encryptedValue, {
    maxAge: 60 * 60 * 1, 
    path: '/'
});
}

export function Descriptograh(key: string): string | null {
  const encryptedValue = Cookies.get(key)
  if (!encryptedValue) return null

  const decryptedBytes = CryptoJS?.AES?.decrypt(encryptedValue, SECRET_KEY)
  return decryptedBytes.toString(CryptoJS.enc.Utf8)
}