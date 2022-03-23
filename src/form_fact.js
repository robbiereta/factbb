import React, { useState } from "react";
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
var notas = {
  partidas: []
};

var tickets = [];
var $ = jquery;

var live = "sk_live_NpE3r9Rl4KadW4JQNm5WM17oXQVng6xZ";
var test = "sk_test_VN9W1bQmxaKq2e4j6x81ry870rkwYEXe:";
for (let index = 0; index < tickets.length; index++) {
  const element = tickets[index];
}
var fecha = moment().format("MMMM Do YYYY, h:mm:ss a");
const Facturapi = require("facturapi");
const receipt = require("receipt");
const facturapi = new Facturapi(test);
var total;
var url;
var result;
var cambio;
async function recibo() {
  const receipt2 = await facturapi.receipts.create({
    payment_form: Facturapi.PaymentForm.EFECTIVO,
    items: notas.partidas
  });
  url = "<h5 id='url'>" + receipt2.self_invoice_url + "</h5>";

  console.log(url);

  $("#factura").append(url);
  result = prompt("¿con cuanto pago?");
  cambio = result - total;
  alert("el cambio es de :" + cambio);
  jquery("#pago").text(result);
  jquery("#cambio").text(cambio);
  $("#recibo").click();
}

var ticket = (
  <div id="ticket">
    <div id="invoice-POS">
      <div id="mid">
        <div class="info">
          <h5>Alma Alicia Flores Zavala</h5>
          <h6>
            FOZA8801257C2 Carrera Torres 742 Heroe de Nacozari Ciudad Victoria
            Tamps. c.p.87030
          </h6>
          <h6 id="fecha">Fecha:</h6>
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
                  <h5>Total</h5>
                  <h5>Pago:</h5>
                  <h5>Cambio:</h5>
                </td>
                <td class="payment">
                  <h5 id="total">0</h5>
                  <h5 id="pago">0</h5>
                  <h5 id="cambio">0</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="factura">
          <h3>Si necesita factura de este recibo favor de entrar a :</h3>
          <p>
            <h4>https://factura.space/bicivic/</h4>
          </p>
          <p>
            <h4>Introduce el siguiente codigo(Ticket id):</h4>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function Fact() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => jsonCambio(data);
  const [basicModal, setBasicModal] = useState(false);
  function reload() {
    // var location = Location;
    // location.reload();
  }
  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" {...register("precio")} placeholder="Precio" />
        <input
          type="text"
          {...register("descripcion")}
          placeholder="producto"
        />
        <input type="number" {...register("cantidad")} placeholder="cantidad" />

        <MDBBtn color="success" type="submit" value="agregar">
          Agregar{""}
        </MDBBtn>
      </form>
      <div id="ticket_content"></div>
      <MDBBtn onClick={recibo}>Hacer recibo</MDBBtn>

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
                <MDBBtn color="secondary" onClick={reload}>
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

async function jsonCambio(data) {
  var imp = data.precio;
  var d1 = new Date();
  var d2 = Date.now();
  var precio = Number(imp);
  var can = Number(data.cantidad);
  var imp_prod = can * precio;

  var clave;
  var unidad;
  if (data.descripcion === "reparacion") {
    clave = "78181500";
    unidad = "E48";
  } else {
    clave = "25174700";
    unidad = "H87";
  }

  var newCon = {
    product: {
      description: data.descripcion,
      product_key: clave,
      price: Number(imp_prod),
      unit_key: unidad
    },
    fecha: d1.toString(),
    seconds: d2
  };
  var newCon2 = {
    item: data.descripcion,
    qty: Number(data.cantidad),
    cost: Number(imp_prod)
  };
  notas.partidas.push(newCon);

  tickets.push(newCon2);
  console.log(notas.partidas);

  total = 0;
  notas.partidas.forEach(function (obj) {
    total += Number(obj.product.price);
  });

  console.log("Ultimo" + imp + "total:" + total);
  // db.insert(newCon, function (err, newDoc) {   // Callback is optional
  //   console.log(newDoc);
  // });

  jquery("#totalTicket").prepend(
    "<tr class='service'><td class='tableitem'><h4 class='itemtext'>" +
      data.cantidad +
      "</h4></td> <td class='tableitem'><h4 class='itemtext'>" +
      data.descripcion +
      "</h4></td><td class='tableitem'><h4 class='itemtext'>" +
      imp_prod +
      "</h5></td> </tr>"
  );
  jquery("#ticket_content").append(
    "<tr class='service'><td class='tableitem'><h4 class='itemtext'>" +
      data.cantidad +
      "</h4></td> <td class='tableitem'><h4 class='itemtext'>" +
      data.descripcion +
      "</h4></td><td class='tableitem'><h4 class='itemtext'>" +
      imp_prod +
      "</h4></td> </tr>"
  );
  jquery("#ticket_content").append("total:" + total);
  jquery("#fecha").text(fecha);
  jquery("#total").text(total);
}
