import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { usarContexto } from "../context";
import { useState } from "react";
import Swal from "sweetalert2";

const Carrito = () => {
  const { productosCarrito, setProductosCarrito } = usarContexto();

  const Button = styled.button`
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    position: relative;
    background-color: ${(props) => (props.isSelected ? "#DFAF67" : "#424242")};
    color: ${(props) => (props.isSelected ? "white" : "#DFAF67")};
  `;
  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  function EliminarProducto(id) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevosProductos = productosCarrito.filter(
          (producto) => producto.id !== id
        );
        setProductosCarrito(nuevosProductos);
  
        Swal.fire("Eliminado", "El producto se ha eliminado del carrito.", "success");
      }
    });
  }

  function ComprarProducto(id){
    const productoComprado = productosCarrito.find((producto)=> producto.id === id)

    Swal.fire({
      title: `¿Quieres comprar ${productoComprado.titulo} con precio ${productoComprado.precio} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevosProductos = productosCarrito.filter(
          (producto) => producto.id !== id
        );
        setProductosCarrito(nuevosProductos);
  
        Swal.fire("¡Compra exitosa!", `${productoComprado.titulo} se ha comprado.`, "success");
      }
    });
  }
  return (
    <div>
      <div className="wrapper">
        <header className="header-mobile">
          <h1 className="logo">Xclusive</h1>
          <button className="open-menu" id="open-menu"></button>
        </header>
        <aside>
          <button className="close-menu" id="close-menu"></button>
          <header>
            <h1 className="logo">Xclusive</h1>
          </header>
          <nav>
            <ul>
              <li>
                <Link to={"/Inicio"} className="boton-menu boton-volver">
                  Seguir comprando
                </Link>
              </li>
              <li>
                <Button
                  isSelected={selectedButton === 1}
                  onClick={() => handleButtonClick(1)}
                  className="boton-menu-carrito"
                >
                  Carrito
                </Button>
              </li>
            </ul>
            <ul>
              <li>
                <Link>
                  
                </Link>
              </li>
            </ul>

          </nav>
          <footer>
            <p className="texto-footer">© 2023 Xclusive</p>
          </footer>
        </aside>
        <div className="contenedor-main">
          <h2 className="titulo-principal">Carrito</h2>
          <div className="contenedor-carrito">
            <p id="carrito-vacio" className="carrito-vacio">
              {productosCarrito.length === 0
                ? "Tu carrito está vacío."
                : "Productos en tu carrito:"}
            </p>

            <div id="contenedor-productos" className="contenedor-productos">
              {productosCarrito.map((producto) => (
                <div key={producto.id}>
                  <img
                    className="producto-imagen"
                    src={producto.imagen}
                    alt={producto.titulo}
                  />
                  <div className="producto-detalles">
                    <h3 className="producto-titulo">{producto.titulo}</h3>
                    <p className="producto-precio">$ {producto.precio}</p>
                    <div className="botones-carrito">
                      <button
                        onClick={() => EliminarProducto(producto.id)}
                        className="producto-agregar"
                      >
                        eliminar
                      </button>
                      <button className="producto-agregar" onClick={() => ComprarProducto(producto.id)} >Comprar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
