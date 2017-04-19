import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SessionInfoDto } from '../../generated_module/dtos/session-info-dto';
import { SessionService } from '../../generated_module/services/session-service';
import { AppConfigService } from '../../base_module/services/app-config-service';
import { AppApiService } from '../../base_module/services/app-api-service';

// 获取会话信息的服务
@Injectable()
export class AppSessionService {
	private sessionId: string;
	private sessionInfo: SessionInfoDto;

	constructor(
		private appConfigService: AppConfigService,
		private sessionService: SessionService) { }

	// 获取当前的会话信息
	getSessionInfo(): Observable<SessionInfoDto> {
		// 如果本地已有会话信息则直接返回
		var newSessionId = this.appConfigService.getSessionId();
		if (newSessionId == this.sessionId && this.sessionInfo) {
			return new Observable<SessionInfoDto>(o => {
				o.next(this.sessionInfo);
				o.complete();
			});
		}
		// 调用api重新获取
		var observable = this.sessionService.GetSessionInfo();
		observable.subscribe(result => {
			this.sessionInfo = result;
		});
		return observable;
	}
}