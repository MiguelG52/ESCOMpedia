import {foroIcon, postIcon, usersIcon, chatIcon, arrowRightIcon} from '../../assets'
import temasFavoritos from '../../const/img';
import Image from '../../components/img';
import Card from './Card';
import Foros from './Foros'

const Foro = () => {
    return (
        <section className="bg-gray-200 w-full h-full md:h-screen flex flex-col items-center">
            <div className="flex flex-col justify-center items-center m-2 h-1/3">
                <h2 className="md:text-3xl text-xl font-bold">Bienvenido a nuestro foro de ESCOM!</h2>
                <p className=" text-gray-500 text-center m-2">Aquí puedes postear ideas, resolver dudas o cualquier cosa relacionada a los temas principales</p>
                <button className="bg-blue-500 text-white rounded-md h-14 w-28 hover:bg-gray-800 transition-all ease-in-out duration-300 m-3"> Ir a foros</button>
            </div>
            <div className="flex-col items-center w-full p-5">
                <section className="flex flex-col gap-3 md:flex-row md:justify-between">
                    <Card icon={foroIcon} label1="Total de posts" label2="48"/>
                    <Card icon={usersIcon} label1="Usuarios Registrados" label2="48"/>
                    <Card icon={postIcon} label1="Total de Foros" label2="4"/>
                </section>
                <section className="grid md:grid-cols-2 gap-2 mt-5">
                    <div className="bg-white rounded-2xl">
                        <p className="p-5 text-2xl font-semibold">Temas Favoritos de la comunidad</p>
                        <div className="p-5 flex flex-col items-center gap-3 md:flex-row md:justify-between">
                            {temasFavoritos.map((elemento, index) =>{
                                return(
                                    <Image id={index} img={elemento.img}/>
                                );
                            })}
                        </div>
                    </div>          
                    <div className="bg-white rounded-2xl">
                        <p className="p-5 text-2xl font-semibold">Foros activos</p>
                        <div className="flex flex-col md:justify-around p-2 gap-5 md:h-80">
                            <Foros icon={chatIcon} label="Reglas y normativa" cursor={arrowRightIcon} enlace="/foros/reglas"/>  
                            <Foros icon={chatIcon} label="Foro General" cursor={arrowRightIcon} enlace="/foros/general"/>  
                            <Foros icon={chatIcon} label="Foro de Libros" cursor={arrowRightIcon} enlace="/foros/libros"/>  
                            <Foros icon={chatIcon} label="Ayuda y soporte" cursor={arrowRightIcon} enlace="/foros/ayuda"/> 
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default Foro
