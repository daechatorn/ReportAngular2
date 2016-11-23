export class BreadCrumbService {
    static instance: BreadCrumbService;

    constructor() {
        if (!BreadCrumbService.instance == null){
            throw new Error("You can't call new instance for BreadCrumbService. Call BreadCrumbService.getInstance() instead.")
        }
    }

    static getInstance(){
        if (BreadCrumbService.instance == null){
            BreadCrumbService.instance = new BreadCrumbService();
        }
        return BreadCrumbService.instance;
    }
}