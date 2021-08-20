import React from "react";
import Select from "react-select";
const Facturapi = require("facturapi");
const facturapi = new Facturapi("sk_test_VN9W1bQmxaKq2e4j6x81ry870rkwYEXe");
var lista= []
async function prods() {
  const searchResult = await facturapi.products.list();
  var doubles = searchResult.data.map(function (x) {
  
    var description = JSON.stringify(x.description);
    var id = JSON.stringify(x.id);

    //agregar aqui los campos para las columnas
    var newCon = {
      descripcion: description,
      id: id,
     value:description,
     label:description,

    };
    lista.push(newCon);
  });

  console.log(lista.recibos);
}
prods();
const options = [
  {
    value: "bomba",
    label: "bomba",
    description: "bomba",
    product_key: "25174700",
    unit_key: "PZA"
  },
  {
    value: "asiento",
    label: "asiento",
    description: "asiento",
    product_key: "25174700",
    unit_key: "PZA"
  }
];

export default class DropDown extends React.Component {
  state = {
    selectedOption: null
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
