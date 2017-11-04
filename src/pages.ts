

export class Pages {

    static handlers:any;

    static routes : { [hashRegex:string]:IPage; } = {}

    static currentPage:IPage;

    static gotoPage(pageName?:string) {
        if (pageName == undefined){
            pageName = Pages.currentPageName();
        }
        let page = document.getElementById('page');
        let foundMatch = false;
        for (let hashRegex in Pages.routes){
            if (pageName.match(hashRegex)){
                if (Pages.currentPage){
                    Pages.currentPage.exit();
                }
                let newPage = Pages.routes[hashRegex];
                Pages.currentPage = newPage;
                newPage.enter();
                foundMatch = true;
                break;
            }
        }
        if (!foundMatch){
            console.log('No such pagefunc: ' + pageName);
        }
    }

    static gotoInitialPage(defaultPage:string){
        let pageName = Pages.currentPageName() || defaultPage;
        if (!window.location.hash){
            window.location.hash = pageName;
        }
        Pages.gotoPage(pageName);
    }

    static hashParam(key:string):string{
        return Pages.hashParams()[key];
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
    Pages.gotoPage();
}

export interface IPage {

    enter():void;

    exit():void;

}

export class Page implements IPage {


    enter(){

    }

    exit(){

    }

}