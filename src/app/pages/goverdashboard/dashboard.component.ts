import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
} from "@angular/core";
import Chart from "chart.js";
import { HttpService } from "../../http.service";
import { ngxLoadingAnimationTypes } from "ngx-loading";
import { Router } from "@angular/router";
import { Observable, forkJoin } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import "chartjs-plugin-labels";
import * as _ from "lodash";
import * as moment from "moment";
import { NgbdSortableHeader, SortEvent, compare } from '../dashboard/dashboard.component';
declare var $: any;
@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class GovernDashboardComponent implements OnInit{

  public loading = false;
  public NGOId = null;
  public NGOKEY = null;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public toastr: ToastrService;
  constructor(private _httpService: HttpService, private router: Router) {}

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  public piecanvas1: any;
  public piecanvas2: any;
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

  ngOnInit() {
    this.loading = true;
    // let capacityNGO =  this._httpService.getNGOCapacityForGovernment();
    // let beneficiaries = this._httpService.getNGOBeneficiariesForGovernment();
    // let unprocessed = this._httpService.getNGOUnprocessedRequests();
    // let statuscount = this._httpService.getRequestStatusCountForNGOForGovernment();
    // let  datechart = this._httpService.getRequestDateChartForGovernment();
    // let province = this._httpService.getProvinceDataForGovernment();
    // let monthly = this._httpService.getMonthlyRequestForGovernment();
    // let tabledata = this._httpService.getTransactionsForGovernment();


    // forkJoin([capacityNGO, beneficiaries,unprocessed,statuscount,datechart,province,monthly,tabledata]).subscribe(results => {
    //   // results[0] is our character
    //   // results[1] is our character homeworld
    //   this.rationbags = results[0]["data"][0].TOTAL;
    //   this.beneficiaries = results[1]["data"][0].BENEFICIARIES;
    //   this.totalunprocessedrequests = results[2]["data"][0].REQUESTBAGS;
    //   this.requestStatus = results[3]["data"];
    //   this.bagsdistributed = _.find(this.requestStatus, {"STATUS": "Completed"})['COUNT'];
    //   this.requestDateData = results[4]["data"];
    //   this.requestProvinceData = results[5]["data"];
    //   this.requestDateMontlyData = results[6]["data"];
    //   this.userData = results[7]["data"];
    //   this.transactionData = this.userData;
    //   this.tableloaded = true;
    //   this.chartRendering();

    // });

    this.getNGOStats();
    this.getTransactionsFromDB();
    this.utilFunction();
  }

  getTransactionsFromDB() {
    this.loading = true;
    this._httpService.getTransactionsForGovernment().subscribe((data) => {
      if (data["success"] != 1) {
        console.log(data["message"]);
      } else {
        this.userData = data["data"];
        this.transactionData = this.userData;
        this.loading = false;
        this.tableloaded = true;
      }
    });
  }

  getNGOStats() {
    this.loading = true;
    this._httpService.getNGOCapacityForGovernment().subscribe((data) => {
      if (data["success"] != 1) {
      } else {
        this.rationbags = data["data"][0].TOTAL;
        this._httpService.getNGOBeneficiariesForGovernment().subscribe((data) => {
          if (data["success"] != 1) {
          } else {
            this.beneficiaries = data["data"][0].BENEFICIARIES;
            this._httpService.getNGOUnprocessedRequests().subscribe((data) => {
              if (data["success"] != 1) {
              } else {
                this.totalunprocessedrequests = data["data"][0].REQUESTBAGS;
                this._httpService
                .getRequestStatusCountForNGOForGovernment()
                .subscribe((data) => {
                  if (data["success"] != 1) {
                  } else {
                    this.requestStatus = data["data"];
                    this.bagsdistributed = _.find(this.requestStatus, {"STATUS": "Completed"})['COUNT'];
                    this._httpService
                    .getRequestDateChartForGovernment()
                    .subscribe((data) => {
                      if (data["success"] != 1) {
                      } else {
                        this.requestDateData = data["data"];
                        this._httpService
                            .getProvinceDataForGovernment()
                            .subscribe((data) => {
                              if (data["success"] != 1) {
                              } else {
                                this.requestProvinceData = data["data"];
                                this._httpService
                                  .getMonthlyRequestForGovernment()
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

  getRequestProvinceData(){
    var json = [];
    this.requestProvinceData.map(function(d){
      json.push(d.TOTAL)
    });

    return json
  }

  getRequestProvinceLabels(){
    var json = [];
    this.requestProvinceData.map(function(d){
      json.push(d.Name)
    });

    return json
  }


  chartRendering() {
    this.chartColor = "#FFFFFF";

    Chart.defaults.global.defaultFontFamily =
      "IBM Plex Sans, Roboto, sans-serif";
    Chart.defaults.global.legend.labels.usePointStyle = true;


       //Pie chart Province
   
   this.piecanvas2 = document.getElementById("chartRequestStatusProvince");
   this.ctx = this.piecanvas2.getContext("2d");
   var requestProvince = this.getRequestProvinceData();
   var requestProvinceLabels = this.getRequestProvinceLabels();
   var provincechart = new Chart(this.ctx, {
     type: "pie",
     data: {
       labels: requestProvinceLabels,
       datasets: [
         {
           pointRadius: 0,
           pointHoverRadius: 0,
           backgroundColor: ["#4BCCCD","#FCC468"],
           borderWidth: 0,
           data: requestProvince,
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
         display: true,
         position: "bottom",
         labels: {
           fontSize: 14,
         },
         usePointStyle: true,
       },
     },
   });

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
    $("#tStatus").val(editlist.STATUS);
    $('#tNGOName').val(editlist.Name);
    $('#tFamilyId').val(editlist.Family_id)
    $("#editRequestModal").modal("toggle");
   
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
