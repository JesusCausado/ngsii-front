import React, { useState, useEffect } from 'react';
import {    
  Header, 
  Table,
  Grid, 
  Form, 
  Button, 
  Message,
  Image,
  Input,
  Label
 } from 'semantic-ui-react';
import '../../assets/css/index.css'
import imgLogo from '../../assets/EVOLUCION_BIOLOGICA.webp';
import client from "../../client";

const InputTable = ( { posicion, val, onChangeInp, disabled } ) => {
  const [pos, setPos] = useState(val != undefined ? val : '' );
  const HCPos = (e, { value }) => {   
    setPos(value)
    onChangeInp(posicion, value)
  } 
  useEffect(() => {
    /*return () => {
      console.log('limpia')
    }*/
  }, [])
  //console.log(pos)
  return (    
    <Input placeholder='pos...' fluid onChange={HCPos} name='pos' 
      value={pos} className="celda" disabled={disabled != undefined ? true: false} />
  );
}

const useEsquema = (valor) => {
  const [esq, setEsq] = useState([]); 
  const modEsquema = (valor) => {
    console.log(valor)
    setEsq(valor)
    console.log(esq)
  }

  return { esq, modEsquema }
}

const Home = () => {
  const [numActividades, setNumActividades] = useState(1);
  const [numAlternativas, setNumAlternativas] = useState(1);
  const [lenBinary, setLenBinary] = useState(1);
  //const { esquema, modEsquema } = useEsquema([]);  
  const [esquema, setEsquema] = useState([]); 
  const [perfectGen, setPerfectGen] = useState([]);
  const [costos, setCostos] = useState([]);
  const [sostenibilidad, setSostenibilidad] = useState([]);
  const [tiempo, setTiempo] = useState([]);  
  const [poblacionOrder, setPoblacionOrder] = useState();
  const [maxEjecuciones, setMaxEjecuciones] = useState();
  const [maxGeneraciones, setMaxGeneraciones] = useState();  
  const [tableResp, setTableResp] = useState([]); 
  //const [email, setEmail] = useState('');
  const [err, setErr] = useState(false);
  const [menErr, setMenErr] = useState('');
  const [loading, setLoading] = useState(false);
  const data = {
    numActividades: '',
    numAlternativas: '',
    esquema: [],
    perfectGen: [],
    costos: [],
    sostenibilidad: [],
    tiempo: [],
    maxEjecuciones: '',
    maxGeneraciones: '',
    poblacionOrder: ''
  }
  const disabled = () => {
    //if (!validateEmail(email)) return true;
    if (numActividades === null ||  numActividades === '') {
      return true;      
    } else if (numAlternativas === null ||  numAlternativas === '') {
      return true;      
    } else {
      return false;
    }    
  };

  const handleClick = () => () => {  
    //setLoading(true);
    /*var matrix = Array(3).fill(Array(3).fill(0));
    console.log(matrix);*/
    //console.log(lenBinary)
    var dataEsquema = []
    var dataPerfectGen = []
    var dataCost = []
    var dataSos = []
    var dataTiempo = []    
    var act = 1
    var alt = 1    
    for (let i = 0; i < lenBinary; i++) {
      dataEsquema.push('A' + act + alt)
      dataPerfectGen.push('V'); 
      dataCost.push(parseInt(i)); 
      dataSos.push(parseInt(i * 2)); 
      dataTiempo.push(parseInt(i * 3));       
      if (alt == numAlternativas) {
        alt = 1
        act++
      } else{
        alt++
      } 
      //console.log(i)
    }
    console.log(dataEsquema)
    setEsquema(dataEsquema)
    setCostos(dataCost)
    setSostenibilidad(dataSos)
    setTiempo(dataTiempo)
    setPerfectGen(dataPerfectGen)
    /*setTimeout(() => {
      getSession(); 
    }, 2000); */
  }

  const OCPEsquema = ( pos, value ) => {
    const Temp = [...esquema]
    Temp[pos] = value
    setEsquema(Temp)
  }

  const OCPerfectGen = ( pos, value ) => {
    const Temp = [...perfectGen]
    Temp[pos] = value
    setPerfectGen(Temp)
  }

  const OCPCostos = ( pos, value ) => {
    const Temp = [...costos]
    Temp[pos] = value
    setCostos(Temp)
  }

  const OCPSostenibilidad = ( pos, value ) => {
    const Temp = [...sostenibilidad]
    Temp[pos] = value
    setSostenibilidad(Temp)
  }

  const OCPTiempo = ( pos, value ) => {
    const Temp = [...tiempo]
    Temp[pos] = value
    setTiempo(Temp)
  }

  const HCEjecutar = () => () => {  
    //setLoading(true);
    runProcess();
  }

  const HCNumActividades = (e, { value }) => {
    setNumActividades(parseInt(value));    
    setLenBinary(parseInt(value * numAlternativas))
  }
    
  const HCNumAlternativas = (e, { value }) => { 
    setNumAlternativas(parseInt(value))
    setLenBinary(parseInt(value * numActividades))
    //console.log(lenBinary)
  }

  const HCPoblacionOrder = (e, { value }) => { 
    setPoblacionOrder(parseInt(value))
  }

  const HCMaxEjecuciones = (e, { value }) => { 
    setMaxEjecuciones(parseInt(value))
  }

  const HCMaxGeneraciones = (e, { value }) => { 
    setMaxGeneraciones(parseInt(value))
  }

  const runProcess = async () => {
    try {      
      data.numActividades = numActividades;  
      data.numAlternativas = numAlternativas;
      data.esquema = esquema; 
      data.perfectGen = perfectGen; 
      data.costos = costos; 
      data.sostenibilidad = sostenibilidad; 
      data.tiempo = tiempo; 
      data.maxEjecuciones = maxEjecuciones; 
      data.maxGeneraciones = maxGeneraciones; 
      data.poblacionOrder = poblacionOrder;
      console.log(data)
      const response = await client('post', data, 'generate');              
      if (response.status === 200) {
        setErr(false)
        const dat = response.data.response;
        setTableResp(dat)
        console.log(dat);
      } 
    } catch (error) {
      setTableResp([])
      setErr(true)
      setMenErr(error.response.data.response)
      console.log(error.response.data.response);
    }
  }

  useEffect(() => {
    setLoading(false);
    /*var current = localStorage.getItem('currentUser');
    if (!current) {      
      history.replace('/', { user });     
    }*/
    /*return () =>{
      console.log('limpiando')
    }*/
  }, [])

  return (
      <Grid style={{ padding: '5em 5em' }}>
        <Grid.Row>
          <Grid.Column width={4}>
              {/*<Image src='https://i.pinimg.com/originals/1c/15/38/1c1538c925d6865603a120e06053cb3f.jpg' />*/}
              <Image src={imgLogo} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Form loading={loading}> 
              {/*<Form.Input
                name='email'
                label='Email'
                type='email'
                onChange={handleChangeEmail}
                placeholder='example@corre.com'
                error={email.length && !validateEmail(email) ? errors.email : null} />*/}
              <Form.Input name='numActividades' 
                label='Numero Actividades' 
                placeholder='5' 
                type='number' 
                fluid
                onChange={HCNumActividades} />  
              <Form.Input name='numAlternativas' 
                label='Numero Alternativas' 
                placeholder='3' 
                type='number'
                fluid
                onChange={HCNumAlternativas} />    
              <Form.Input name='lenBinary' 
                label='Tamaño del Individuo' 
                placeholder='3' 
                type='number'
                fluid
                value = {lenBinary}
                readOnly />                  
              <Button disabled={disabled()} type='submit' color='blue' fluid onClick={handleClick()}>Calcular</Button>       
              <br/>             
              <div id="tableEsquema" className="container_table" >   
                <Table celled selectable striped compact color="blue">   
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan={esquema.length}>Actividades</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>                             
                    <Table.Row>
                      {esquema && esquema.map((esq, i) =>
                        <Table.Cell key={i}>                               
                          <InputTable posicion={i} val={esq} onChangeInp={OCPEsquema} disabled/>
                        </Table.Cell> 
                      )}
                    </Table.Row>
                  </Table.Body>                            
                </Table> 
              </div>
              <div id="tablePerfectGen" className="container_table" >    
                <Table celled selectable striped sortable color="blue">   
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan={perfectGen.length}>Esquema</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>                           
                  <Table.Body>                             
                    <Table.Row>
                      {perfectGen && perfectGen.map((per, i) =>
                        <Table.Cell key={i}>                               
                          <InputTable posicion={i} val={per} onChangeInp={OCPerfectGen}/>
                        </Table.Cell> 
                      )}
                    </Table.Row>
                  </Table.Body>                         
                </Table> 
              </div>
              <div id="tableCostos" className="container_table" >   
                <Table celled selectable striped sortable color="blue">   
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan={costos.length}>Costos</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>                               
                  <Table.Body>                             
                    <Table.Row>
                      {costos && costos.map((cos, i) =>
                        <Table.Cell key={i}>                               
                          <InputTable posicion={i} val={cos} onChangeInp={OCPCostos}/>
                        </Table.Cell> 
                      )}
                    </Table.Row>
                  </Table.Body>                            
                </Table>
              </div>
              <div id="tableSostenibilidad" className="container_table" >  
                <Table celled selectable striped sortable color="blue">   
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan={sostenibilidad.length}>Sostenibilidad</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>                            
                  <Table.Body>                             
                    <Table.Row>
                      {sostenibilidad && sostenibilidad.map((sos, i) =>
                        <Table.Cell key={i}>                               
                          <InputTable posicion={i} val={sos} onChangeInp={OCPSostenibilidad}/>
                        </Table.Cell> 
                      )}
                    </Table.Row>
                  </Table.Body>                               
                </Table>  
              </div>
              <div id="tableTiempo" className="container_table" >  
                <Table celled selectable striped sortable color="blue">   
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan={tiempo.length}>Tiempo</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>                           
                  <Table.Body>                             
                    <Table.Row>
                      {tiempo && tiempo.map((tm, i) =>
                        <Table.Cell key={i}>                               
                          <InputTable posicion={i} val={tm} onChangeInp={OCPTiempo}/>
                        </Table.Cell> 
                      )}
                    </Table.Row>
                  </Table.Body>                            
                </Table>                         
              </div>
              <br/>
              <Header as='h4'> Configuración Ejecución </Header>
              <Form.Input name='poblacionOrder' 
                label='Individuos x ordenamientos' 
                placeholder='Individuos max por ordenamientos' 
                type='number' 
                fluid
                onChange={HCPoblacionOrder} />  
              <Form.Input name='maxEjecuciones' 
                label='Maximo ejecuciones' 
                placeholder='Maximo ejecuciones' 
                type='number'
                fluid
                onChange={HCMaxEjecuciones} /> 
              <Form.Input name='maxGeneraciones' 
                label='Maximo generaciones' 
                placeholder='Maximo generaciones' 
                type='number'
                fluid
                onChange={HCMaxGeneraciones} />  
              <Button disabled={disabled()} type='submit' color='blue' fluid onClick={HCEjecutar()}>Ejecutar</Button>      
              <div id="tableReps" className="container_table" >  
                <Table celled selectable striped sortable color="blue">   
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan={tableResp.length}>Respuesta</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>                            
                  <Table.Body>  
                    {tableResp && tableResp.map((resp, i) =>                      
                      <Table.Row key={i}> 
                        {resp && resp.map((val, j) =>                           
                        <Table.Cell key={j} >                               
                          <div id="divResp" className="celdaTable">
                            {val}
                          </div>                          
                        </Table.Cell> 
                        )}                   
                      </Table.Row>
                    )}
                  </Table.Body>                            
                </Table>  
              </div> 
              {err &&
                <Message negative>
                  <Message.Header>{menErr}</Message.Header>                    
                </Message>
              }                    
            </Form>   
            <br/>
            <br/>
            {/*<Table celled selectable striped sortable color="blue">   
              <Table.HeaderCell>Resultado</Table.HeaderCell>
              <Table.Body>                        
                <Table.Row>
                {esquema && esquema.map((esquema, i) =>
                    <Table.Cell key={i}>
                      {i}
                    </Table.Cell> 
                )} 
                </Table.Row> 
              </Table.Body>                            
            </Table>
            <Button disabled={disabled()} type='submit' color='blue' fluid onClick={handleClick()}>Ejecutar</Button> */ }                 
          </Grid.Column>
        </Grid.Row>          
      </Grid>
  );
}

export default Home

{
  /*
  
  */
}