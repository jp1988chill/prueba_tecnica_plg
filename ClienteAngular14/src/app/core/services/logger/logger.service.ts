import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class LoggerService {

    private _uuid = 'firmadigital-app';

    constructor(private ngxLogger: NGXLogger) {
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    debug(text: any, ...additional: any[]): void {
        this.ngxLogger.debug(this.uuid, text, ...additional);
    }

    error(text: any, ...additional: any[]): void {
        this.ngxLogger.error(this.uuid, text, ...additional);
    }

    warn(text: any, ...additional: any[]): void {
        this.ngxLogger.warn(this.uuid, text, ...additional);
    }

    httpLog(statusCode: number, text: any, ...additional: any[]): void {

        switch (statusCode) {
            case 400:
                this.warn(text, ...additional);
                break;
            case 500:
                this.error(text, ...additional);
                break;
            default:
                this.debug(text, ...additional);
        }

    }
}
