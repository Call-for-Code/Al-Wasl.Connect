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
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  public loading = false;
  public NGOId = null;
  public NGOKEY = null;
  public NGONAME = null;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public toastr: ToastrService;
  constructor(private _httpService: HttpService, private router: Router) {}

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  public piecanvas1: any;
  public linecanvas1: any;
  public barcanvas1: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  rationbags = 0;
  bagsdistributed = 0;
  beneficiaries = 0;
  totalunprocessedrequests = 0;
  tableloaded = false;

  page = 1;
  pageSize = 10;
  transactionData = [];
  userData = [];
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
    this.NGOId = localStorage.getItem("NGOID");
    this.NGOKEY = localStorage.getItem("NGOKEY");
    this.NGONAME = localStorage.getItem("NGONAME");

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

    this.getNGOStats();
    this.getTransactionsFromDB();
    this.utilFunction();
    // this.getNGOStats();
    // this.getTransactionsFromDB();
    // this.utilFunction();
  }

  getTransactionsFromDB() {
    this._httpService.getTransactions(this.NGOId).subscribe((data) => {
      if (data["success"] != 1) {
        console.log(data["message"]);
      } else {
        this.userData = data["data"];
        this.transactionData = this.userData;
        this.tableloaded = true;
      }
    });
  }

  getNGOStats() {
    this.loading = true;
    this._httpService.getNGOCapacity(this.NGOId).subscribe((data) => {
      if (data["success"] != 1) {
      } else {
        this.rationbags = data["data"][0].Capacity;
        this._httpService.getNGOBeneficiaries(this.NGOKEY).subscribe((data) => {
          if (data["success"] != 1) {
          } else {
            this.beneficiaries = data["data"][0].BENEFICIARIES;
            this._httpService.getNGOUnprocessedRequests().subscribe((data) => {
              if (data["success"] != 1) {
              } else {
                this.totalunprocessedrequests = data["data"][0].REQUESTBAGS;
                this._httpService
                .getRequestStatusCountForNGO(this.NGOId)
                .subscribe((data) => {
                  if (data["success"] != 1) {
                  } else {
                    this.requestStatus = data["data"];
                    this.bagsdistributed = _.find(this.requestStatus, {"STATUS": "Completed"})['COUNT'];
                    this._httpService
                    .getRequestDateChart(this.NGOKEY)
                    .subscribe((data) => {
                      if (data["success"] != 1) {
                      } else {
                        this.requestDateData = data["data"];
                        this._httpService
                        .getMonthlyRequest(this.NGOKEY)
                        .subscribe((data) => {
                          if (data["success"] != 1) {
                          } else {
                            this.requestDateMontlyData = data["data"];
                            this.chartRendering();
                            
                            
                          }
                        });
                        
                        
                      }
                    });
                    
                  }
                });
              }
            });
          }
        });
      }
    });
  }


  getRequestStatusPieChartData() {
    var json = [];
    this.requestStatus.map(function (data) {
      json.push(data.COUNT);
    });
    return json;
  }

  getRequestStatusPieChartLabels(ui) {
    var json = [];
    var color = ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"];

    if (ui) {
      this.requestStatus.map(function (data, index) {
        json.push({ status: data.STATUS, color: color[index] });
      });
    } else {
      this.requestStatus.map(function (data, index) {
        json.push(data.STATUS);
      });
    }

    return json;
  }

  getRequestDateData(num){
    var json = [];

    if(num == 0){
      this.requestDateData[0].map(function (data) {
        json.push({x:moment(data.DATE.replace("[\\s\\p{Z}]+", " ").trim()).format('LLLL'), y:data.COMPLETEDBAGS});
      });
      
    }else{
      this.requestDateData[1].map(function (data) {
        json.push({x:moment(data.DATE.replace("[\\s\\p{Z}]+", " ").trim()).format('LLLL'), y:data.REQUESTEDBAGS});
      });
      // moment(data.DATE.trim(),'DD-MM-YYYY').format('LLLL') == 'Invalid date'? data.DATE.trim(): moment(data.DATE.trim()).format('LLLL')
    }
    
    var sortedjson = json.sort((a, b) => a.valueOf() - b.valueOf())
    // console.log(sortedjson)
    return sortedjson;
    
  }

  getRequestDateDataMonthly(){
    var json = [
      {
        type: 'bar',
        label: 'Completed',
        data: [],
        backgroundColor: "#45B39D",
        fill: false
      }, {
        type: 'bar',
        label: 'Invalid',
        backgroundColor: "#DC7633",
        data: [],
      }, {
        type: 'bar',
        label: 'Underway',
        backgroundColor: "#5499C7",
        data: []
      }
    ]
    this.requestDateMontlyData.map(function(d){
      if(d.STATUS == "Completed"){
        json[0].data.push(d.TOTAL);
      }else if(d.STATUS == "Invalid"){
        json[1].data.push(d.TOTAL);
      }else if(d.STATUS == "Underway"){
        json[2].data.push(d.TOTAL);
      }
    });

    return json;
  }

  
  chartRendering() {
    this.chartColor = "#FFFFFF";

    Chart.defaults.global.defaultFontFamily =
      "IBM Plex Sans, Roboto, sans-serif";
    Chart.defaults.global.legend.labels.usePointStyle = true;

    //Bar chart
    this.barcanvas1 = document.getElementById('requestDateChartMonthly')
    this.ctx  = this.barcanvas1.getContext('2d');
    var datasetMontly = this.getRequestDateDataMonthly();
     var config = {
     type: 'bar',
     data: {
       labels: ['Feburary','March','April'],
       datasets: datasetMontly
     },
     options: {
      plugins: {
        labels: {
          render: "value",
          fontColor: 'black'
        },
      },
       legend:{
         position:"bottom"
       }
     }
   };
   var monthlyChart = new Chart(this.ctx, config); 

    //Pie chart
    this.piecanvas1 = document.getElementById("chartRequestStatus");
    this.ctx = this.piecanvas1.getContext("2d");
    var requestStatusdata = this.getRequestStatusPieChartData();
    this.requestStatusLabel = this.getRequestStatusPieChartLabels(true);
    var requestlabels = this.getRequestStatusPieChartLabels(false);
    this.chartEmail = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: requestlabels,
        datasets: [
          {
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
            borderWidth: 0,
            data: requestStatusdata,
          },
        ],
      },
      options: {
        plugins: {
          labels: {
            render: "percentage",
            precision: 2,
          },
        },
        legend: {
          display: false,
          position: "bottom",
          labels: {
            fontSize: 14,
          },
          usePointStyle: true,
        },
      },
    });

   

   //Line time series chart

   this.linecanvas1 = document.getElementById('requestDateChart')
   this.ctx  = this.linecanvas1.getContext('2d');
   var reqdateData1 = this.getRequestDateData(0);
   var reqdateDate2 = this.getRequestDateData(1);
		var cfg = {
			data: {
				datasets: [{
					label: 'Daily Completed Requests',
					backgroundColor: '#FCC468',
					borderColor: '#FCC468',
					data: reqdateData1,
					type: 'line',
					pointRadius: 1,
					fill: false,
					lineTension: 0,
					borderWidth: 2
				},{
          label: 'Daily Incoming Requests ',
					backgroundColor: '#FF6384',
					borderColor: '#FF6384',
					data: reqdateDate2,
					type: 'line',
					pointRadius: 1,
					fill: false,
					lineTension: 0,
					borderWidth: 2
        }]
			},
			options: {
				scales: {
					xAxes: [{
						type: 'time',
						distribution: 'series',
						ticks: {
							major: {
								enabled: true,
								fontStyle: 'bold'
							},
              source: 'data',
              autoSkip: true,
							autoSkipPadding: 80,
							maxRotation: 0,
							sampleSize: 100
						}
					}],
					yAxes: [{
						gridLines: {
							drawBorder: false
						},
						scaleLabel: {
							display: true,
							labelString: 'Requests Count (#)'
						}
					}]
        },
        
				tooltips: {
					intersect: false,
					mode: 'index',
					callbacks: {
						label: function(tooltipItem, myData) {
							var label = myData.datasets[tooltipItem.datasetIndex].label || '';
							if (label) {
								label += ': ';
							}
							label += parseFloat(tooltipItem.value);
							return label;
						}
					}
				}
			}
		};

    var chart = new Chart(this.ctx, cfg);
    this.loading = false;
  }


 

  editRequest(id) {
    var editlist = _.find(this.userData, { ID: id });
    $("#tID").val(editlist.ID);
    $("#tDate").val(editlist.DATE.trim());
    $("#tFirstName").val(editlist.First_Name);
    $("#tLastName").val(editlist.Last_Name);
    $("#tPackages").val(editlist.NO_OF_PACKAGES);
    this.previousStatus = editlist.STATUS;
    $("#tstatusSelection").val(editlist.STATUS);

    $("#editRequestModal").modal("toggle");
    const component = this;
    this.newStatus = "";
    $("#tstatusSelection").change(function () {
      let selected = $("#tstatusSelection").val();
      component.newStatus = selected;
    });
  }

  updateTransactionData() {
    if (this.newStatus != "") {
      if (this.previousStatus != this.newStatus) {
        let transactionID = $("#tID").val();
        
        this._httpService
          .updateTransaction(transactionID, this.newStatus, this.NGOKEY)
          .subscribe((data) => {
            if (data["success"] != 1) {
              console.log(data["message"]);
            } else {
              this.getTransactionsFromDB();
              $("#editRequestModal").modal("toggle");
            }
          });
      } else {
        $("#editRequestModal").modal("toggle");
      }
    } else {
      $("#editRequestModal").modal("toggle");
    }
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
      this.userData = this.transactionData;
    } else {
      this.userData = this.transactionData.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === "asc" ? res : -res;
      });
    }
  }
}
