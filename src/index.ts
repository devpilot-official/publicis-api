import app from './app'
import { APP_PORT, IS_TEST } from '@/config/config'
import logger from './config/logger'

logger.info('App starting...')

app.listen(APP_PORT, () => {
  logger.info(`App listening on ${APP_PORT}`)
})

logger.info('App started...')

// If the Node process ends, close the Mongoose connection (ctrl + c)
process.on('SIGINT', () => {
  logger.info('all process has been closed...')
})

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: ' + err)
})
