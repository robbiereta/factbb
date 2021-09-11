import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
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
import { useForm } from "react-hook-form";
import jquery from "jquery";
const axios = require("axios").default;
axios.defaults.baseURL = "https://posserver2.herokuapp.com/api/";
var $ = jquery;
var lista = {
  recibos: []
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));
// componentDidMount()
function recibo() {
  // Make a request for a user with a given ID
  axios
    .get("/all")
    .then(function (response) {
      // handle success

      var doubles = response.data.map(function (x) {
        var descripcion = JSON.stringify(x.descripcion);
        var codigo = JSON.stringify(x.codigo);
        var precio = JSON.stringify(x.precio);
        var id = JSON.stringify(x.id);
        var newCon = {
          descripcion: descripcion,
          codigo: codigo,
          precio: precio,
          id: id
        };
        lista.recibos.push(newCon);
        $("#add").click();
        //agregar aqui los campos para las columnas
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

recibo();

const columns = [
  { field: "id", headerName: "id", width: 250 },
  { field: "codigo", headerName: "codigo", width: 150 },
  { field: "descripcion", headerName: "descripcion ", width: 250 },
  { field: "precio", headerName: "precio", width: 250 }
];
const rows = lista.recibos;
var precios;
var precios = [];

export default function Recibo() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => procesarForm(data);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <MDBBtn id="add" color="none" onClick={fill}>
        Mostrar productos
      </MDBBtn>
      <MDBBtn
        onClick={toggleShow}
        color="success"
        type="submit"
        value="agregar"
      >
        Agregar producto{""}
      </MDBBtn>
      <h1>Recibos</h1>

      {/* <button onClick={global}>Global</button> */}
      <table class="table" id="table">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">descripcion</th>
            <th scope="col">precio</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
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
            <MDBModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  {...register("codigo")}
                  placeholder="Codigo"
                />
                <input
                  type="text"
                  {...register("descripcion")}
                  placeholder="producto"
                />
                <input
                  type="number"
                  {...register("precio")}
                  placeholder="precio"
                />

                <MDBBtn color="success" type="submit" value="agregar">
                  Agregar{""}
                </MDBBtn>
              </form>
            </MDBModalBody>

            <MDBModalFooter></MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
function procesarForm(data) {
  console.log(data.codigo);
  axios
    .post("/new", {
      codigo: data.codigo,
      descripcion: data.descripcion,
      precio: data.precio
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function fill(params) {
  for (let index = 0; index < lista.recibos.length; index++) {
    const element = lista.recibos[index];
    $("#table").append(
      "<tr><td>" +
        element.codigo +
        "</td><td>" +
        element.descripcion +
        "</td><td>" +
        element.precio +
        "</td></tr>"
    );
  }
}
