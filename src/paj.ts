

export class Paj {

    static handler:any;

    static gotoPage(pageName?:string) {
        if (pageName == undefined){
            pageName = Paj.currentPageName();
        }
        let page = document.getElementById('page');
        let pageFunc = Paj.handler['page_' + pageName];
        if (pageFunc !== undefined && typeof (pageFunc) == 'function') {
            pageFunc.call(this.handler, pageName, page);
        }
        else {
            console.log('No such pagefunc: ' + pageName);
        }
    }

    static gotoInitialPage(defaultPage:string){
        let pageName = Paj.currentPageName() || defaultPage;
        if (!window.location.hash){
            window.location.hash = pageName;
        }
        Paj.gotoPage(pageName);
    }

    static hashParam(key:string):string{
        return Paj.hashParams()[key];
    }

    static hashParams(){
        let hash = window.location.hash.substring(1);
        let paramString = hash.replace(/.*\?/, '')
        let result:any = {};
        for (let part of paramString.split('&')){
            let keyVal = part.split('=');
            let key = keyVal[0];
            let val = keyVal.length > 1 ? keyVal[1] : null;
            result[key] = val;
        }
        return result;
    }

    static currentPageName() {
        let hash = window.location.hash.substring(1);
        return hash.replace(/\?.*/, '');
    }

}

window.onhashchange = function () {
    Paj.gotoPage();
}