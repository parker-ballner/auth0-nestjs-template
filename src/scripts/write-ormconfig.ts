import { useFactory } from '../module.db'
import fs = require('fs')

require('dotenv').config()

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(
    {
      ...useFactory(),
      host: '127.0.0.1',
      entities: ['dist/entities/*.js'],
    },
    null,
    2,
  ),
)
