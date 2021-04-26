import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'
import { QueryFailedError } from 'typeorm'

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  public catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    console.log(exception)
    if (exception.message.includes('duplicate key')) {
      return response.status(409).json({
        error: 'Conflict',
        statusCode: 409,
        message: 'duplicate entry',
      })
    }
    return response.status(500).json({
      error: 'Internal Server Error',
      statusCode: 500,
      message: 'internal server error',
    })
  }
}
