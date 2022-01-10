
import React, { useState, useEffect } from "react";
import Cliente from "../Components/Cliente";
import Spinner from "../Components/Spinner";

const Inicio = () => {
    const [clientes, setClientes] = useState([]);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = "http://localhost:4000/clientes";
                const respuesta = await fetch( url );
                const resultado = await respuesta.json();

                setClientes( resultado );
            } catch (e) {
                console.log( e );
            }

            setTimeout( () => {
                setCarga(!carga);
            }, 100)
        }

        obtenerClientesAPI();
    }, []);

    const handleEliminar = async ( id ) => {
        const confirmar = confirm("Deseas eliminar este cliente?");

        if( confirmar ) {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch( url, {
                    method: "DELETE"
                });
                await respuesta.json();
                const arrayCLientes = clientes.filter( cliente => cliente.id !== id );
                setClientes(arrayCLientes);
            } catch( e ) {
                console.log( e );
            }
        }
    }

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Cliente</h1>
            <p className="mt-3 font-bold">Administra tus cliente</p>

            <table className="w-full mt-5 table`-auto shadow bg-white">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2" >Nombre</th>
                        <th className="p-2" >Contacto</th>
                        <th className="p-2" >Empresa</th>
                        <th className="p-2" >Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    { carga ? <Spinner /> : clientes.map( cliente => (
                        <Cliente key={cliente.id} cliente={cliente} handleEliminar={handleEliminar  } />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Inicio;