'use strict'

module.exports = class Cookie {
  constructor (cookieOpts) {
    this.originalMaxAge = cookieOpts.maxAge || null
    this.path = cookieOpts.path || '/'
    this.httpOnly = cookieOpts.httpOnly !== undefined ? cookieOpts.httpOnly : true
    this.secure = cookieOpts.secure
    this.expires = getExpires(cookieOpts)
    this.sameSite = cookieOpts.sameSite || null
    this.domain = cookieOpts.domain || null
  }

  options (secureConnection) {
    let secure = this.secure
    let sameSite = this.sameSite
    if (secure === 'auto') {
      if (secureConnection === true) {
        secure = true
      } else {
        sameSite = 'Lax'
        secure = false
      }
    } else {
      secure = this.secure
    }
    return {
      path: this.path,
      httpOnly: this.httpOnly,
      secure,
      expires: this.expires,
      sameSite,
      domain: this.domain
    }
  }
}

function getExpires (cookieOpts) {
  if (cookieOpts.maxAge) {
    return new Date(Date.now() + cookieOpts.maxAge)
  }
  if (cookieOpts.expires) {
    return cookieOpts.expires
  }
  return null
}
