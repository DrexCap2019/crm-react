
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../Components/Spinner";

const VerCliente = () => {
    // Extrae los parametros de la url
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch( url );
                const resultado = await respuesta.json();
                console.log(resultado);
                setCliente(resultado);
            } catch (e) {
                console.log( e );
            }
            setTimeout( () => {
                setCargando(!cargando);
            }, 1000)
        }
        obtenerClientesAPI();
    }, []);

    return (
        cargando ? <Spinner /> :
        Object.keys(cliente).length === 0 ? <p>No hay resultado</p> : (
            <div>
                {cargando ? "Cargando..." : (
                    <>
                        <h1 className="font-black text-4xl text-blue-900">Ver Cliente: { cliente.nombre }</h1>
                        <p className="mt-3 font-bold">Informacion del CLiente</p>

                        <p className="text-4xl text-gray-600 mt-10">
                            <span className="text-gray-800 uppercase font-bold">Cliente: </span>
                            {cliente.nombre}
                        </p>
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Email: </span>
                            {cliente.email}
                        </p>
                            {/* Estas 3 ultimas se verifica si viene con datos o no, debido
                            a que algunos campos del formulario no era obligatorio */}
                        {cliente.telefono && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Télefono: </span>
                                {cliente.telefono}
                            </p>
                        )}
                        {cliente.empresa && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Empresa: </span>
                                {cliente.empresa}
                            </p>
                        )}
                        {cliente.notas && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Notas: </span>
                                {cliente.notas}
                            </p>
                        )}
                    </>
                )}
            </div>

        )
    );
}

export default VerCliente;


