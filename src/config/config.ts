export const ENVIRONMENT = process.env.APP_ENV || 'development'
export const IS_PRODUCTION = ENVIRONMENT === 'production'
export const IS_TEST = ENVIRONMENT === 'test'
export const APP_PORT = Number(process.env.APP_PORT) || 9000

export const APP_NAME = process.env.APP_NAME || 'Credit Card Validation Service'
export const APP_URL = process.env.APP_URL || 'http://localhost:9000'
export const FRONT_END_URL = process.env.FRONT_END_URL || 'http://localhost:9001'
