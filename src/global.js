import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import jquery from "jquery";
import moment from "moment";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from "mdb-react-ui-kit";

import "./styles.css";
import "./styles.css";
import DropDown from "./select";
var notas = {
  partidas: []
};
var output;
var tickets = [];
var $ = jquery;
var elements;
for (let index = 0; index < tickets.length; index++) {
  const element = tickets[index];
}
var fecha = moment().format("MMMM Do YYYY, h:mm:ss a");
const Facturapi = require("facturapi");
const receipt = require("receipt");
const facturapi = new Facturapi("sk_live_NpE3r9Rl4KadW4JQNm5WM17oXQVng6xZ");

function nuevoCorte(params) {
  var fechaCorte = Date.now();
}
var url;
var folio;
var fecha_fin;
var fecha_inicio;
async function recibo() {
  const receipt2 = await facturapi.receipts.create({
    payment_form: Facturapi.PaymentForm.EFECTIVO,
    items: notas.partidas
  });
  url = "<h6>" + receipt2.self_invoice_url + "</h61>";
  folio = receipt2.folio_number;
  console.log(url);

  $("#factura").append(url);
  $("#recibo").click();
}

async function global() {
  const invoice = await facturapi.receipts.createGlobalInvoice({
    from: fecha_inicio,
    to: fecha_fin
  });
}

var ticket = (
  <div id="ticket">
    <div id="invoice-POS">
      <div id="mid">
        <div class="info">
          <p>Alma Alicia Flores Zavala</p>
          <p>
            FOZA8801257C2 Carrera Torres 742 Heroe de Nacozari Ciudad Victoria
            Tamps. c.p.87030
          </p>
        </div>
      </div>

      <div id="bot">
        <div id="table">
          <table id="tableElement">
            <tbody>
              <tr class="tabletitle">
                <td class="item">Cantidad</td>
                <td class="Hours">Producto</td>
                <td class="Rate">Importe</td>
              </tr>

              <tr class="tabletitle" id="totalTicket">
                <td class="Rate">
                  <p>Total</p>
                </td>
                <td class="payment">
                  <p id="total">0</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="factura">
          <h3>Si necesita factura de este recibo favor de entrar a :</h3>
        </div>
      </div>
    </div>
  </div>
);

export default function Global() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => jsonCambio(data);
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("fecha_inicio")}
          placeholder="fecha inicio"
        />

        <input type="text" {...register("fecha_fin")} placeholder="fecha fin" />

        <MDBBtn color="success" type="submit" value="agregar">
          Agregar{""}
        </MDBBtn>
      </form>
      <div id="ticket_content"></div>
      <MDBBtn onClick={global}>Hacer Factura global</MDBBtn>

      <>
        <MDBBtn id="recibo" onClick={toggleShow}>
          Ver recibo
        </MDBBtn>
        <MDBModal
          show={basicModal}
          getOpenState={(e: any) => setBasicModal(e)}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Recibo</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>{ticket}</MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShow}>
                  Cerrar
                </MDBBtn>
                <MDBBtn onClick={print}>Imprimir</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    </div>
  );
}
function print(ticket) {
  var printContents = document.getElementById("ticket").innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}
var total;
var rec;

async function jsonCambio(data) {
  fecha_inicio = data.fecha_inicio;
  fecha_fin = data.fecha_fin;

  var total2 = 0;
  async function totales() {
    const searchResult = await facturapi.receipts.list({
      date: {
        lte: new Date(fecha_fin),
        gte: new Date(fecha_inicio)
      }
    });
    var doubles = searchResult.data.map(function (x) {
      folio = JSON.stringify(x.folio_number);
      var id = JSON.stringify(x.id);
      var total = JSON.stringify(x.total);
      var status = JSON.stringify(x.status);
      var at = JSON.stringify(x.created_at);
      total2 = total2 + Number(total);
    });

    console.log("total:" + total2);
    alert("El Total de este dia es de :" + total2);
    jquery("#root").append("Total de hoy:" + total2);
  }

  totales();
}
