/* eslint-disable @typescript-eslint/no-namespace */
export namespace Env {
  export const DB_HOST = 'DB_HOST'
  export const DB_PORT = 'DB_PORT'
  export const DB_USERNAME = 'DB_USERNAME'
  export const DB_PASSWORD = 'DB_PASSWORD'
  export const DB_NAME = 'DB_NAME'

  export const DEFAULT_REDIRECT = 'DEFAULT_REDIRECT'

  export const SHORT_THROTTLE = 'SHORT_THROTTLE'
  export const MEDIUM_THROTTLE = 'MEDIUM_THROTTLE'
  export const LONG_THROTTLE = 'LONG_THROTTLE'

  export const PASSWORD_SALT = 'PASSWORD_SALT'
  export const JWT_SECRET = 'JWT_SECRET'
  export const JWT_TTL = 'JWT_TTL'
}

export namespace Events {
  export const URL_CLICKED = 'url.visited'
}
