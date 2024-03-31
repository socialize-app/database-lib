import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Prisma } from "@prisma/client";

@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((exception) => {
        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
          // Handle Prisma Client known request errors here
          console.error("Prisma Client Error:", exception.message);
        } else if (
          exception instanceof Prisma.PrismaClientUnknownRequestError
        ) {
          // Handle Prisma Client unknown request errors here
          console.error("Unknown Prisma Error:", exception.message);
        } else if (
          exception instanceof Prisma.PrismaClientInitializationError
        ) {
          // Handle Prisma Client initialization errors here
          console.error("Prisma Initialization Error:", exception.message);
        } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
          // Handle Prisma Client Rust panic errors here
          console.error("Prisma Rust Panic Error:", exception.message);
        }
        return throwError(() => exception);
      })
    );
  }
}
