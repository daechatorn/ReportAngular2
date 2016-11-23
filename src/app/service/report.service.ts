import {Injectable} from '@angular/core'

import {REPORTS} from './data'
import {Report} from './data-transfer-object'

@Injectable()
export class ReportService{
    getReports(): Promise<Report[]> {
        return Promise.resolve(REPORTS);
    }
}