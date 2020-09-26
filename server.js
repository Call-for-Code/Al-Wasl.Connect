//Server for API call to database
require("dotenv").config();
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
const ibmdb = require("ibm_db");
const axios = require("axios").default;
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const MessagingResponse = require("twilio").twiml.MessagingResponse;
//const async = require("async");
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
app.get("/sms/:id", async (req, res) => {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "SELECT * FROM " +
          process.env.DB_SCHEMA +
          ".MSGS" +
          ` WHERE USER_ID = ${req.params.id};`,
        async function (err, data) {
          if (err) {
            return res.json({ success: -2, message: err });
          } else {
            res.json({
              data,
            });
          }
        }
      );
    }
  });
});

app.post("/sms", (req, res) => {
  const { user_id, body } = req.body;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT * FROM ${process.env.DB_SCHEMA}.USERS WHERE ID=${user_id}`,
        (err, user) => {
          const phone = user[0].phone.replace(/-/g, "");
          const msg = client.messages
            .create({
              to: String(`+${phone}`),
              from: "+18582833095",
              body,
            })
            .then(() => {
              console.log("Sent successfully");
            });
        }
      );
      conn.query(
        `insert into MSGS values ( ${user_id} , '${body}' );`,
        (err, msg) => {
          if (err) {
            res.json(err);
          } else {
            conn.close();
            res.json(body);
          }
        }
      );
    }
  });
});

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("Hello world");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

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
          `.TRANSACTION A INNER JOIN ` +
          process.env.DB_SCHEMA +
          `.USERS C ON C.ID = A.USER_ID 
      INNER JOIN ` +
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
            });
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
          });
        }
      });
    }
  });
});

app.get("/getFamilyLatLngForGovernment", function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `  SELECT A.NO_OF_PACKAGES, B."Family_id", B."Lat", B."Long"
      FROM ` +
          process.env.DB_SCHEMA +
          `.TRANSACTION A INNER JOIN ` +
          process.env.DB_SCHEMA +
          `.USERS C ON C.ID = A.USER_ID 
      INNER JOIN ` +
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
            });
          }
        }
      );
    }
  });
});

//DONOR APIs
app.get("/getUsers", function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "SELECT * FROM " + process.env.DB_SCHEMA + ".USERS;",
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
            });
          }
        }
      );
    }
  });
});

app.get("/getUsers/:id", function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "SELECT * FROM " +
          process.env.DB_SCHEMA +
          ".USERS" +
          ` WHERE ID = ${request.params.id};`,
        function (err, data) {
          if (err) {
            return response.json({ success: -2, message: err });
          } else {
            conn.query(
              `SELECT * FROM ${process.env.DB_SCHEMA}.MSGS WHERE USER_ID=${data[0].ID};`,
              (err, msgs) => {
                if (err) {
                  return res.json({ success: -2, message: err });
                } else {
                  if (data[0].phone) {
                    const phone = data[0].phone.replace(/-/g, "");
                    data.phone = phone;
                  }
                  conn.close(function () {
                    return response.json({
                      success: 1,
                      message: "Data Received!",
                      data: data,
                      msgs,
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
});

app.post("/trans", function (req, res) {
  const { id, status } = req.body;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "SELECT * FROM " +
          process.env.DB_SCHEMA +
          ".TRANSACTION" +
          ` WHERE ID = ${id};`,
        function (err, data) {
          if (err) {
            return res.json({ success: -2, message: err });
          } else {
            console.log(data);
            const userId = data[0]["USER_ID"];
            conn.query(
              `SELECT * FROM ${process.env.DB_SCHEMA}.USERS WHERE ID=${userId}`,
              (err, user) => {
                if (err) {
                  console.log(err);
                } else {
                  let phone;
                  if (parseInt(id) % 2 === 0) {
                    phone = "971544585334";
                  } else {
                    phone = "971509342888";
                  }
                  conn.close(() => {
                    client.messages
                      .create({
                        to: `+${phone}`,
                        from: "+18582833095",
                        body: `Your transaction #${data[0]["ID"]} is now ${status}`,
                      })
                      .then((msg) => {
                        res.json({
                          data,
                          user,
                          phone,
                          msg,
                        });
                      })
                      .catch((err) => res.json(err));
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

app.post("/trans/add", (req, res) => {
  const { nop, status } = req.body;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT  *                 
        FROM  ${process.env.DB_SCHEMA}.TRANSACTION  
        ORDER BY ID DESC 
        FETCH FIRST 1 ROW ONLY`,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const id = parseInt(data[0]["ID"]) + 1;
            conn.query(
              `INSERT INTO ${process.env.DB_SCHEMA}.TRANSACTION (ID,DATE,USER_ID,NGO_ID,NO_OF_PACKAGES,STATUS) VALUES ('${id}','2020-04-23','543','2','${nop}','${status}')`,
              (err, created) => {
                conn.close(() => {
                  res.json({
                    data,
                    id,
                  });
                });
              }
            );
          }
        }
      );
    }
  });
});

app.post("/transaction", (req, res) => {
  const id = req.body.id;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT  *                 
        FROM  ${process.env.DB_SCHEMA}.TRANSACTION 
        WHERE ID = ${id};
        `,
        // FETCH FIRST 1 ROW ONLY
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            status = data[0]["STATUS"];
            console.log(data);
            console.log(data[0]["STATUS"]);
            conn.close();
            res.json({
              status: data[0]["STATUS"],
            });
          }
        }
      );
    }
  });
});

app.post("/voice", (req, res) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  var status;
  /** helper function to set up a <Gather> */
  function gather() {
    const gatherNode = twiml.gather({ numDigits: 5 });
    gatherNode.say("Enter your transaction I d");

    // If the user doesn't enter input, loop
    twiml.redirect("/voice");
  }

  // If the user entered digits, process their request
  if (req.body.Digits) {
    twiml.say(`We will send sms with your transaction status now`);
    ibmdb.open(connStr, function (err, conn) {
      if (err) {
        console.log(err);
      } else {
        conn.query(
          `SELECT  *                 
          FROM  ${process.env.DB_SCHEMA}.TRANSACTION 
          WHERE ID = ${Number(req.body.Digits)};
          `,
          // FETCH FIRST 1 ROW ONLY
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              status = data[0]["STATUS"];
              console.log(data);
              console.log(data[0]["STATUS"]);
              conn.close();
              console.log("sms:");
              const msg = client.messages
                .create({
                  to: `${req.body.Caller}`,
                  from: "+18582833095",
                  body: `Your transaction#${data[0]["ID"]} status is ${status}`,
                })
                .then(() => {
                  console.log("Sent successfully");
                })
                .catch((err) => console.log(err));
            }
          }
        );
      }
    });
  } else {
    gather();
  }

  res.type("text/xml");
  res.send(twiml.toString());
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
            });
          }
        }
      );
    }
  });
});

app.post("/getNGOBeneficiaries", function (request, response) {
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
            });
          }
        }
      );
    }
  });
});

app.get("/getNGOUnprocessedRequests", function (request, response) {
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
            });
          }
        }
      );
    }
  });
});

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
            });
          }
        }
      );
    }
  });
});

app.post("/getDonorLogin", function (request, response) {
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
            });
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
            });
          }
        }
      );
    }
  });
});

app.post("/getRequestDateChart", function (request, response) {
  var mergeQuery = [];
  var ngoID = request.body.NGOId;

  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `SELECT COUNT(*) AS completedBags, DATE
        FROM ` +
          process.env.DB_SCHEMA +
          `."TRANSACTION" GROUP BY STATUS, DATE, NGO_ID
          HAVING  STATUS ='Completed' AND NGO_ID = ` +
          Number(ngoID) +
          `
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
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

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
            });
          }
        }
      );
    }
  });
});

app.post("/updateTransaction", function (request, response) {
  let tId = request.body.tId;
  let status = request.body.status;
  let key = request.body.key;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "UPDATE " +
          process.env.DB_SCHEMA +
          ".TRANSACTION SET STATUS= '" +
          status +
          "', NGO_ID = " +
          Number(key) +
          " where ID =" +
          Number(tId) +
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
            });
          }
        }
      );
    }
  });
});

app.post("/getMonthlyRequest", function (request, response) {
  let NGOId = request.body.NGOId;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `  SELECT '01'||'-0'||MONTH("DATE")||'-'||YEAR("DATE") as date, COUNT(*) as total, STATUS
    FROM TRANSACTION
    GROUP BY  '01'||'-0'||MONTH("DATE")||'-'|| YEAR("DATE"),STATUS, NGO_ID
    Having NGO_ID=` +
          Number(NGOId) +
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
            });
          }
        }
      );
    }
  });
});

app.post("/getProvinceData", function (request, response) {
  let NGOId = request.body.NGOId;
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `  SELECT P."Name", SUM(NO_OF_PACKAGES) as total
        FROM NGO N INNER JOIN TRANSACTION T ON N.ID = T.NGO_ID INNER JOIN PROVINCE P  ON P."ID" = N."province_id"
        WHERE T.NGO_ID = ` +
          Number(NGOId) +
          `
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
            });
          }
        }
      );
    }
  });
});

//Government APIS

app.get("/getNGOCapacityForGovernment", function (request, response) {
  //done

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
            });
          }
        }
      );
    }
  });
});

app.get("/getNGOBeneficiariesForGovernment", function (request, response) {
  //done
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
            });
          }
        }
      );
    }
  });
});

app.get("/getNGOUnprocessedRequestsForGovernment", function (
  request,
  response
) {
  //done
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
            });
          }
        }
      );
    }
  });
});

app.get("/getUserRequestForGovernment", function (request, response) {
  //done
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "SELECT * FROM " + process.env.DB_SCHEMA + ".TRANSACTION ;",
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
            });
          }
        }
      );
    }
  });
});

app.get("/getRequestStatusCountForGovernment", function (request, response) {
  //done
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
            });
          }
        }
      );
    }
  });
});

app.get("/getRequestDateChartForGovernment", function (request, response) {
  var mergeQuery = [];
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
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

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
            });
          }
        }
      );
    }
  });
});

app.get("/getProvinceDataForGovernment", function (request, response) {
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
            });
          }
        }
      );
    }
  });
});

app.get("/getMonthlyRequestForGovernment", function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        `  SELECT MONTH("DATE")||'-'||YEAR("DATE") as date, COUNT(*) as total, STATUS
    FROM TRANSACTION
    GROUP BY MONTH("DATE")||'-'|| YEAR("DATE"),STATUS;`,
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
            });
          }
        }
      );
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

/*
app.listen(8888, function () {
  console.log('App running');
  // openConnection();
});
*/

app.listen(process.env.PORT || 8888);
module.exports.app = app;
