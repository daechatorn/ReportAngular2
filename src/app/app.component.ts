import {Component, OnInit} from '@angular/core';
import '../assets/css/pr.css';

import {getCookie, getAppCfg} from '../../src/app/utils/utility-functions';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
    
    ngOnInit(){
        this.loadScriptFooter();
        //this.manageSessionStorage();
    }

    loadScriptFooter(): void {
        let footer = document.getElementById('footer'); 
        var script = document.createElement("script");
        script.type = "text/javascript";

        var footerScript = `var currentTime = new Date();
                            var labelVersion = "`+ getAppCfg().VERSION +`";`+
                            `DAfooter( '&copy;' + currentTime.getFullYear() + ' Broadridge Financial Solutions, Inc. All rights reserved.<br /> Version ' + labelVersion);`;

        var textScript = document.createTextNode(footerScript);
        script.appendChild(textScript);
        footer.appendChild(script);
    }
	/*
    manageSessionStorage(): void {
        var webSessionId = getCookie("web_session_id");
        var webSessionIdOnStorage = JSON.parse(window.sessionStorage.getItem("webSessionId"));
        var reportTracker = JSON.parse(window.sessionStorage.getItem("reportTracker"));
        if(webSessionIdOnStorage != null && reportTracker != null && webSessionId != webSessionIdOnStorage){
            window.sessionStorage.removeItem("reportTracker");
        }
        window.sessionStorage.setItem("webSessionId", webSessionId);
    }
	*/
}

