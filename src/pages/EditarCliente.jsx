
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../Components/Formulario";

const EditarCliente = () => {
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
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3 font-bold">Utilizar este formulario para editar datos del cliente</p>

            {cliente?.nombre ? (
                <Formulario cliente={cliente} cargando={cargando}/>
            ) : <p>Cliente ID no valido</p>}
        </>
    );
}

export default EditarCliente;