//Server for API call to database
require("dotenv").config();
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
const ibmdb = require("ibm_db");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let connStr =
  "DATABASE=" +
  process.env.DB_DATABASE +
  ";HOSTNAME=" +
  process.env.DB_HOSTNAME +
  ";PORT=" +
  process.env.DB_PORT +
  ";PROTOCOL=TCPIP;UID=" +
  process.env.DB_UID +
  ";PWD=" +
  process.env.DB_PWD +
  ";";

// app.post('/closeConnection', function(req,res){
//   conn.close(function(err){
//     if (err){
//       res.json({success:-1, message:err});
//     }else{
//       conn = null;
//       console.log('Connection Closed')
//       res.json({success:1, message:'Connection Closed'});
//     }
//   })
// })


//Maps APIs
app.post("/getFamilyLatLng", function (request, response) {
  
  let ngoid = request.body.NGOId;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `  SELECT A.NO_OF_PACKAGES, B."Family_id", B."Lat", B."Long"
      FROM ` +
          process.env.DB_SCHEMA +
          `.TRANSACTION A INNER JOIN `+
          process.env.DB_SCHEMA +
         `.USERS C ON C.ID = A.USER_ID 
      INNER JOIN `+
      process.env.DB_SCHEMA +
     `.FAMILY B ON B."Family_id"= C."Family_id"
      GROUP BY A.NO_OF_PACKAGES, B."Family_id", B."Lat", B."Long",STATUS,NGO_ID
      HAVING STATUS = 'Completed' AND NGO_ID=` +
          Number(ngoid) +
          `;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
 
});

app.get("/getNGOLatLng", function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query("SELECT * FROM " + process.env.DB_SCHEMA + ".NGO;", function (
        err,
        data
      ) {
        if (err) {
          return response.json({ success: -2, message: err });
        } else {
          conn.close(function () {
            return response.json({
              success: 1,
              message: "Data Received!",
              data: data,
            });
          })
        }
      });
    }
  });
 
});

app.get('/getFamilyLatLngForGovernment',function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `  SELECT A.NO_OF_PACKAGES, B."Family_id", B."Lat", B."Long"
      FROM ` +
          process.env.DB_SCHEMA +
          `.TRANSACTION A INNER JOIN `+
          process.env.DB_SCHEMA +
         `.USERS C ON C.ID = A.USER_ID 
      INNER JOIN `+
      process.env.DB_SCHEMA +
     `.FAMILY B ON B."Family_id"= C."Family_id"
      GROUP BY A.NO_OF_PACKAGES, B."Family_id", B."Lat", B."Long",STATUS
      HAVING STATUS = 'Completed'`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        })
    }
  });
  
  });




//DONOR APIs
app.get("/getUsers", function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query("SELECT * FROM " + process.env.DB_SCHEMA + ".USERS;", function (
        err,
        data
      ) {
        if (err) {
          return response.json({ success: -2, message: err });
        } else {
          conn.close(function () {
            return response.json({
              success: 1,
              message: "Data Received!",
              data: data,
            });
          })
        }
      });
    }
  });
  
});

app.post("/getNGOCapacity", function (request, response) {
  let ngoname = request.body.NGOId;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT * FROM ` +
          process.env.DB_SCHEMA +
          `.NGO where "NGO_ID" =` +
          Number(ngoname) +
          `;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
  
});

app.post("/getNGOBeneficiaries", function(request,response){
  let ngoid = request.body.NGOId;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT COUNT(distinct(USER_ID)) AS Beneficiaries
      FROM ` +
          process.env.DB_SCHEMA +
          `.TRANSACTION
      WHERE STATUS ='Completed' AND NGO_ID=` +
          Number(ngoid) +
          `;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
  
});

app.get('/getNGOUnprocessedRequests', function(request,response){
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT COUNT(*) AS requestBags
      FROM ` +
          process.env.DB_SCHEMA +
          `.TRANSACTION
      GROUP BY STATUS
      HAVING  STATUS ='Requested';`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
  
})

app.post("/getUserRequest", function (request, response) {
  let NGOId = request.body.NGOId;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "SELECT * FROM " +
          process.env.DB_SCHEMA +
          ".TRANSACTION where ID =" +
          NGOId +
          ";",
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
  
});

app.post("/getDonorLogin",  function (request, response) {
  const regno = request.body.regno;
  const pass = request.body.pass;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT  "Name", ID FROM ` +
          process.env.DB_SCHEMA +
          `."NGO"  where "NGO_ID" =` +
          Number(regno) +
          ` AND "Password" = ` +
          Number(pass) +
          `;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
  
});

app.post("/getRequestStatusCountForNGO", function (request, response) {
  const regno = request.body.regno;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT A.STATUS, COUNT(*) as COUNT
        FROM ` +
          process.env.DB_SCHEMA +
          `."TRANSACTION" A INNER JOIN NGO B ON B.ID = A.NGO_ID
        GROUP BY A. NGO_ID, STATUS, B. NGO_ID HAVING B.NGO_ID = ` +
          Number(regno) +
          `;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
  
});

app.post("/getRequestDateChart",function(request,response){
  var mergeQuery = []
  var ngoID = request.body.NGOId

  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT COUNT(*) AS completedBags, DATE
        FROM ` +
          process.env.DB_SCHEMA +
          `."TRANSACTION" GROUP BY STATUS, DATE, NGO_ID
          HAVING  STATUS ='Completed' AND NGO_ID = `+Number(ngoID)+`
          ORDER BY DATE;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            mergeQuery.push(data);
            conn.query(
              `  SELECT Count(*) as requestedBags,date
            FROM ` +
                process.env.DB_SCHEMA +
                `."TRANSACTION"
            GROUP BY status,date
            having  STATUS ='Requested'
            ORDER BY DATE;`,
              function (err, data2) {
                if (err) {
                  return response.json({ success: -2, message: err });
                } else {
                  mergeQuery.push(data2)
                  conn.close(function () {
                    return response.json({
                      success: 1,
                      message: "Data Received!",
                      data: mergeQuery,
                    });
                  });
                }
              }
            );
            
          }
        }
      );
    }
  });
 
})

app.post("/getTransactions", function (request, response) {
  let NGOId = request.body.NGOId;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        ` SELECT  B.ID ,B.DATE, A."First_Name", A."Last_Name",A."ID_cnic", A."Family_id", B.NO_OF_PACKAGES, B.STATUS
      FROM USERS A 
      INNER JOIN TRANSACTION B ON A.ID = B.USER_ID INNER JOIN NGO C ON B.NGO_ID = C.ID
      WHERE C.NGO_ID=` +
          NGOId +
          `
      UNION
    ( 
      SELECT B.ID,B.DATE, A."First_Name", A."Last_Name",A."ID_cnic", A."Family_id", B.NO_OF_PACKAGES, B.STATUS
      FROM USERS A INNER JOIN TRANSACTION B ON A.ID = B.USER_ID
      WHERE STATUS='Requested')
      ORDER BY ID,DATE;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
 
});

app.post("/updateTransaction", function(request,response){
  let tId = request.body.tId;
  let status = request.body.status;
  let key = request.body.key;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query("UPDATE "+process.env.DB_SCHEMA+".TRANSACTION SET STATUS= '"+status+"', NGO_ID = "+Number(key)+" where ID ="+Number(tId)+";", function (err, data) {
        if (err){
          return response.json({success:-2, message:err});
        }
        else{
          conn.close(function () {
            return response.json({
              success: 1,
              message: "Data Received!",
              data: data,
            });
          })
  
        }
    });
    }
  });
 
 
   
});

app.post("/getMonthlyRequest",function(request,response){
  let NGOId = request.body.NGOId;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(`  SELECT '01'||'-0'||MONTH("DATE")||'-'||YEAR("DATE") as date, COUNT(*) as total, STATUS
    FROM TRANSACTION
    GROUP BY  '01'||'-0'||MONTH("DATE")||'-'|| YEAR("DATE"),STATUS, NGO_ID
    Having NGO_ID=`+Number(NGOId)+`;`, function (err, data) {
      if (err){
        return response.json({success:-2, message:err});
      }
      else{
        
        conn.close(function () {
          return response.json({
            success: 1,
            message: "Data Received!",
            data: data,
          });
        })

      }
  });
    }
  });

  
   
});

app.post("/getProvinceData",function (request,response){
  let NGOId = request.body.NGOId;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `  SELECT P."Name", SUM(NO_OF_PACKAGES) as total
        FROM NGO N INNER JOIN TRANSACTION T ON N.ID = T.NGO_ID INNER JOIN PROVINCE P  ON P."ID" = N."province_id"
        WHERE T.NGO_ID = `+Number(NGOId)+`
        GROUP BY P."Name" ;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
  
  
 
})



//Government APIS

app.get("/getNGOCapacityForGovernment", function (request, response) { //done
  
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT SUM("Capacity") as total FROM ` +
          process.env.DB_SCHEMA +
          `.NGO;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
            
          }
        }
      );
    }
  });
 
  
});

app.get("/getNGOBeneficiariesForGovernment", function(request,response){//done
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT COUNT(distinct(USER_ID)) AS Beneficiaries
      FROM ` +
          process.env.DB_SCHEMA +
          `.TRANSACTION
      WHERE STATUS ='Completed';`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
  
  
});

app.get('/getNGOUnprocessedRequestsForGovernment', function(request,response){//done
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT COUNT(*) AS requestBags
      FROM ` +
          process.env.DB_SCHEMA +
          `.TRANSACTION
      GROUP BY STATUS
      HAVING  STATUS ='Requested';`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
  
  
})

app.get("/getUserRequestForGovernment", function (request, response) {//done
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "SELECT * FROM " +
          process.env.DB_SCHEMA +
          ".TRANSACTION ;",
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
 
  
});

app.get("/getRequestStatusCountForGovernment", function (request, response) {//done
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT A.STATUS, COUNT(*) as COUNT
        FROM ` +
          process.env.DB_SCHEMA +
          `."TRANSACTION" A 
        GROUP BY STATUS`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });
  
  
});

app.get("/getRequestDateChartForGovernment",function(request,response){
  var mergeQuery = []
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT COUNT(*) AS completedBags, DATE
        FROM ` +
          process.env.DB_SCHEMA +
          `."TRANSACTION" GROUP BY STATUS, DATE
          HAVING  STATUS ='Completed'
          ORDER BY DATE;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            mergeQuery.push(data);
            conn.query(
              `  SELECT Count(*) as requestedBags,date
            FROM ` +
                process.env.DB_SCHEMA +
                `."TRANSACTION"
            GROUP BY status,date
            having  STATUS ='Requested'
            ORDER BY DATE;`,
              function (err, data2) {
                if (err) {
                  return response.json({ success: -2, message: err });
                } else {
                  mergeQuery.push(data2);
                  conn.close(function () {
                    return response.json({
                      success: 1,
                      message: "Data Received!",
                      data: mergeQuery,
                    });
                  })
                 
                }
              }
            );
            
          }
        }
      );
    }
  });
  
})

app.get("/getTransactionsForGovernment", function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `  SELECT B.ID, B.DATE, A."First_Name", A."Last_Name", A."ID_cnic", A."Family_id", B.NO_OF_PACKAGES,C."Name", B.STATUS
        FROM USERS A 
        INNER JOIN TRANSACTION B ON A.ID = B.USER_ID INNER JOIN NGO C ON B.NGO_ID = C.ID
      UNION
      (
        SELECT B.ID, B.DATE, A."First_Name", A."Last_Name", A."ID_cnic", A."Family_id", B.NO_OF_PACKAGES,Null as NGOName, B.STATUS
        FROM USERS A INNER JOIN TRANSACTION B ON A.ID = B.USER_ID
        WHERE STATUS='Requested')
        ORDER BY ID,DATE ASC;`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });

});

app.get("/getProvinceDataForGovernment",function (request,response){
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT P."Name", SUM(NO_OF_PACKAGES) as total
        FROM NGO N INNER JOIN TRANSACTION T ON N.ID = T.NGO_ID INNER JOIN PROVINCE P  ON P."ID" = N."province_id"
        GROUP BY P."Name" `,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.close(function () {
              return response.json({
                success: 1,
                message: "Data Received!",
                data: data,
              });
            })
          }
        }
      );
    }
  });

})

app.get("/getMonthlyRequestForGovernment",function(request,response){
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(`  SELECT MONTH("DATE")||'-'||YEAR("DATE") as date, COUNT(*) as total, STATUS
    FROM TRANSACTION
    GROUP BY MONTH("DATE")||'-'|| YEAR("DATE"),STATUS;`, function (err, data) {
      if (err){
        return response.json({success:-2, message:err});
      }
      else{
        conn.close(function () {
          return response.json({
            success: 1,
            message: "Data Received!",
            data: data,
          });
        });
      }
  });
    }
  });
    
});
//  let NGOId = request.body.NGOId;
//     conn.query("SELECT * FROM "+process.env.DB_SCHEMA+".TRANSACTION where ID ="+NGOId+";", function (err, data) {
//       if (err){
//         return response.json({success:-2, message:err});
//       }
//       else{
//           return response.json({success:1, message:'Data Received!', data:data});

//       }
//   });

//uncomment when running locally

// app.listen(8888, function () {
//   console.log("Server is listening on port 8888");
//   // openConnection();
// });

 function openConnection() {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn = connection;
    }
  });
}
app.listen(process.env.PORT || 8888, function () {
  console.log('App running');
  // openConnection();
});
