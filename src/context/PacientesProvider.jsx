import {createContext, useState, useEffect} from 'react'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const {auth} = useAuth();

    useEffect(()=>{
        const obtenerPacientes = async () => {

            try {
                const  token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.get('/pacientes', config)
                setPacientes(data);

            } catch (error) {
                console.log(error)
            }
        }

        obtenerPacientes()
    }, [auth])

    const guardarPaciente = async (paciente) =>{

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }else{
            try{
                
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
    
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado} = data // Crear un nuevo objeto excluyendo los otros valores detras del ...
    
                setPacientes([pacienteAlmacenado, ...pacientes]) // Muestra el paciente actual y el arreglo de pacientes con los ya almacenados
           }catch(error){
                console.log(error.response.data.msg)
           }
        }
    }

    const setEdicion = (paciente) =>{
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar ?')

        if(confirmar){
            try{
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`,config)

                console.log(data);
                
            }catch(error){
                console.log(error)
            }
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;



