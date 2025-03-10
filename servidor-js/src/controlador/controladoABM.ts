import  { getPool }  from '../conexion/conexionBD';
class ABM {
    
   public async consultar(sql: string){
    const conexion = getPool()
    try { 
        let lista =  await conexion.query(sql);
        conexion.end()
            return lista
    } catch (error) {
        conexion.end()
        console.error("ocurrio un error en la consulta: "+error)
    }
 
    }

    public async insertar(sql: string,valores:{}){
        let mensaje='Los datos se guardaron correctamente'
        const conexion =  getPool()
        try { 
            let agregar =  await conexion.query(sql,valores);
            conexion.end()
            //return mensaje
            
        } catch (error) {
            conexion.end()
          // console.error("ocurrio un error en la consulta: "+error)
           return error
           
        }
        }

        public async modificar(sql: string,valores:{}){
            let mensaje='Los datos se modificaron correctamente'
            const conexion =  getPool()
            try { 
                let agregar =  await conexion.query(sql,valores);
                conexion.end()
                return mensaje
                
            } catch (error) {
                conexion.end()
               console.error("ocurrio un error en la consulta: "+error)
               return mensaje="Ocurio un error "+error
               
            }
            }
}
export const abm = new ABM();
