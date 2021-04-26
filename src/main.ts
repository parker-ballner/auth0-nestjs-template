import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ValidationError } from 'class-validator'
import * as express from 'express'
import { RootModule } from 'src/module'
import { EntityNotFoundExceptionFilter } from './middleware/filters/entity-not-found'
import { QueryFailedExceptionFilter } from './middleware/filters/query-failed'
import { TransformInterceptor } from './middleware/interceptors/response-transform'

require('dotenv').config()

async function letsgetitstarted() {
  const app = await NestFactory.create(RootModule)

  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const message = Object.values(validationErrors.pop().constraints)
          .values()
          .next()
        return new BadRequestException(message.value)
      },
    }),
  )
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(
    new QueryFailedExceptionFilter(),
    new EntityNotFoundExceptionFilter(),
  )

  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ limit: '1mb', extended: true }))
  await app.listen(process.env.SERVER_PORT)
}
void letsgetitstarted()
