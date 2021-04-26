class Carro {}

let carro = new Carro({
  "marca": "Hyundai",
  "modelo": "HB20"
});

function mostraCarro(carro){
  console.log(carro.marca);
}

carro => {
    console.log(carro.marca);
}

mostraCarro(carro);