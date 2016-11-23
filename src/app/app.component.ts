import {Component, OnInit} from '@angular/core';
import '../../public/css/pr.css';
import {getAppCfg} from '../../src/app/utils/utility-functions';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
    
    ngOnInit(){
        this.loadScriptFooter();
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
}

