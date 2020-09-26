import {
    Component,
    OnInit,
    Directive,
    Input,
    Output,
    EventEmitter,
    ViewChildren,
    QueryList,
} from "@angular/core";
import Chart from "chart.js";
import { HttpService } from "../../http.service";
import { ngxLoadingAnimationTypes } from "ngx-loading";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, forkJoin } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import "chartjs-plugin-labels";
import * as _ from "lodash";
import * as moment from "moment";
declare var $: any;

export type SortDirection = "asc" | "desc" | "";
const rotate: { [key: string]: SortDirection } = {
    asc: "desc",
    desc: "",
    "": "asc",
};
export const compare = (v1, v2) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
    column: string;
    direction: SortDirection;
}

@Directive({
    selector: "th[sortable]",
    host: {
        "[class.asc]": 'direction === "asc"',
        "[class.desc]": 'direction === "desc"',
        "(click)": "rotate()",
    },
})
export class NgbdSortableHeader {
    @Input() sortable: string;
    @Input() direction: SortDirection = "";
    @Output() sort = new EventEmitter<SortEvent>();

    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
}

@Component({
    selector: "inventory-cmp",
    moduleId: module.id,
    templateUrl: "inventory.component.html",
})
export class InventoryComponent implements OnInit {
    public loading = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    public toastr: ToastrService;
    constructor(private _httpService: HttpService, private router: Router) { }

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    rationbags = 0;
    bagsdistributed = 0;
    beneficiaries = 0;
    totalunprocessedrequests = 0;
    tableloaded = false;

    page = 1;
    pageSize = 10;
    transactionData = [];
    NGOData = [];
    requestStatus = [];
    requestDateData = [];
    requestDateMontlyData = [];
    requestProvinceData = [];
    requestStatusLabel = [];
    statusSelection = [
        { val: "Completed", selected: false },
        { val: "Invalid", selected: false },
        { val: "Underway", selected: false },
        { val: "Requested", selected: false },
    ];
    previousStatus = "";
    newStatus = "";

    ngOnInit() {

        this.loading = true;
        // let capacityNGO =  this._httpService.getNGOCapacity(this.NGOId);
        // let beneficiaries = this._httpService.getNGOBeneficiaries(this.NGOKEY)
        // let unprocessed = this._httpService.getNGOUnprocessedRequests();
        // let statuscount = this._httpService.getRequestStatusCountForNGO(this.NGOId);
        // let  datechart = this._httpService.getRequestDateChart(this.NGOKEY);
        // let monthly = this._httpService.getMonthlyRequest(this.NGOKEY);
        // let tabledata = this._httpService.getTransactions(this.NGOId);


        // forkJoin([capacityNGO, beneficiaries,unprocessed,statuscount,datechart,monthly,tabledata]).subscribe(results => {
        //   // results[0] is our character
        //   // results[1] is our character homeworld
        //   this.rationbags = results[0]["data"][0].Capacity;
        //   this.beneficiaries = results[1]["data"][0].BENEFICIARIES;
        //   this.totalunprocessedrequests = results[2]["data"][0].REQUESTBAGS;
        //   this.requestStatus = results[3]["data"];
        //   this.bagsdistributed = _.find(this.requestStatus, {"STATUS": "Completed"})['COUNT'];
        //   this.requestDateData = results[4]["data"];
        //   this.requestDateMontlyData = results[5]["data"];
        //   this.userData = results[6]["data"];
        //   this.transactionData = this.userData;
        //   this.tableloaded = true;
        //   this.chartRendering();

        // });

        this.getNGOsFromDB();
        this.utilFunction();
    }

    getNGOsFromDB() {
        this._httpService.getNGOs().subscribe((data) => {
            if (data["success"] != 1) {
                console.log("bad");
                console.log(data["message"]);
            } else {
                this.NGOData = data["data"];
                this.tableloaded = true;
                console.log("good");
            }
        });
    }

    utilFunction() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    onSort({ column, direction }: SortEvent) {
        // resetting other headers
        this.headers.forEach((header) => {
            if (header.sortable !== column) {
                header.direction = "";
            }
        });

        // sorting countries
        if (direction === "") {
            this.NGOData = this.transactionData;
        } else {
            this.NGOData = this.transactionData.sort((a, b) => {
                const res = compare(a[column], b[column]);
                return direction === "asc" ? res : -res;
            });
        }
    }
}
