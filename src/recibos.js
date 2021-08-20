import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const Facturapi = require("facturapi");
const facturapi = new Facturapi("sk_live_NpE3r9Rl4KadW4JQNm5WM17oXQVng6xZ");
var folio;
var lista = {
  recibos: []
};

async function recibo() {
  const searchResult = await facturapi.receipts.list();
  var doubles = searchResult.data.map(function (x) {
    folio = JSON.stringify(x.folio_number);
    var id = JSON.stringify(x.id);
    var total = JSON.stringify(x.total);
    var status = JSON.stringify(x.status);
    var at = JSON.stringify(x.created_at);
    var prod = x.items;
    prod.map(function (x) {
      var prod2 = x.product.description;
      var newCon = {
        folio: folio,
        id: id,
        total: total,
        status: status,
        at: at,
        prod: prod2
      };
      lista.recibos.push(newCon);
    });
    //agregar aqui los campos para las columnas
  });

  console.log(lista.recibos);
}

recibo();

const columns = [
  { field: "folio", headerName: "folio", width: 150 },
  { field: "total", headerName: "total", width: 150 },
  { field: "id", headerName: "id", width: 250 },
  { field: "status", headerName: "Estado", width: 150 },
  { field: "at", headerName: "Fecha de creaciòn ", width: 250 },
  { field: "prod", headerName: "Productos", width: 250 }
];
const rows = lista.recibos;
export default function Recibo() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1>Recibos</h1>
      {/* <button onClick={global}>Global</button> */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
