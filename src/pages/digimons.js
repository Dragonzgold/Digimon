import '../Assent/digimon.scss';
import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Input, value } from 'reactstrap';
import axios from 'axios';
import { fontAwesonIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Digimons() {
  const [digimon, setDigimon] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [digimonLevels, setDigimonLevels] = useState('All');
  const [digimonStatus, setDigimonStatus] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [busqueda2, setBusqueda2] = useState([]);
  const [existencia, setExistencia] = useState(true);

  const toggle = () => setDropdownOpen(!dropdownOpen)

  const toggleStatus = (param) => {
    if (param === undefined){
      setDigimonStatus(undefined);
      setDigimonLevels(undefined) 
    }
    if (param === 'All'){
      setDigimonStatus(true);
      setDigimonLevels('All')
    }else{
      setDigimonLevels(param);
      setDigimonStatus(false);
    }
  }

  const statusExistencia = (param) => {
    if (param === ''){
      setExistencia(true);
      setBusqueda2('')
    }else{
      setBusqueda2(param);
      setExistencia(false);
    }
  }

  const buscar=(terminoBusqueda)=>{
    var resultadoBusqueda = digimon.filter((digimon)=>{
      if(digimon.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        statusExistencia(terminoBusqueda+"n");
      }
    });
    console.log(terminoBusqueda)
  }

  const Buscar=e=>{
    e.preventDefault();
    setBusqueda(e.target.value);
    buscar(busqueda);
    console.log(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          'https://digimon-api.vercel.app/api/digimon'
        )
        setDigimon(result.data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [setDigimon]);

  return (
    <Container>
      <div className='p-5 boton'>
        <h1 className='niveles'>Nivel de los digimon</h1>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="right">
          <DropdownToggle caret>Niveles</DropdownToggle>
          <DropdownMenu>
          <DropdownItem header>Niveles evolutivos</DropdownItem>
            <DropdownItem onClick={ ()=> toggleStatus('In Training')}>In training</DropdownItem>
            <DropdownItem onClick={ ()=> toggleStatus('Rookie')}>Rookie</DropdownItem>
            <DropdownItem onClick={ ()=> toggleStatus('Ultimate')}>Ultimate</DropdownItem>
            <DropdownItem onClick={ ()=> toggleStatus('Fresh')}>Fresh</DropdownItem>
            <DropdownItem onClick={ ()=> toggleStatus('Mega')}>Mega</DropdownItem>
            <DropdownItem onClick={ ()=> toggleStatus('All')}>All</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem header>evoluciones con materiales</DropdownItem>
            <DropdownItem onClick={()=> toggleStatus('Armor')}>Armor</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem header>Fusiones</DropdownItem>
            <DropdownItem disabled>Jogress (mantenimiento) </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <Form className='busqueda'>
        <FormGroup style={{display:"flex", flexDirection:"row"}}>
          <Input type="text"
          placeholder="Buscar por el nombre del digimon"
          value={busqueda}
          onChange={Buscar}
          />
          <Button className='btn btn-danger' style={{marginLeft:"1rem"}} onClick={()=>toggleStatus(undefined)}>
            buscar
            <fontAwesonIcon icon = {faSearch}/>
          </Button>
        </FormGroup>
      </Form>

      <Row>
      {
        digimonStatus === true ? (
          digimon.map((digimon) => (
            <Col className="bg-light border" style={{marginBottom:"3rem"}}>
              <Card
                outline
                style={{
                  width: 'fitContent',
                  margin: '1rem'
                }}
              >
                <img src={digimon.img} alt={digimon.name} />
                <CardBody>
                  <h6 className="text-center">{digimon.name}</h6>
                </CardBody>
                <CardSubtitle className="text-center">
                  {digimon.level}
                </CardSubtitle>
              </Card>
            </Col>
        ))
        ) :(
            digimon.filter(digimon => digimon.level === digimonLevels).map((digimon)=>(
              <Col className='prueba' style={{marginBottom:"3rem"}}>
                <Card
                  outline
                  style={{
                    width: "fitContent",
                    margin: "1 rem"
                  }}
                >

                  <img src={digimon.img} alt={digimon.name}/>
                  <CardBody>
                    <h6 className='prueba2'>{digimon.name}</h6>
                  </CardBody>
                  <CardSubtitle className='prueba3'>
                    {digimon.level}
                  </CardSubtitle>
                </Card>
              </Col>
            ))
          )
        }
        {
        existencia === true ? (
          digimon.map((digimon) => (
            <Col className="bg-light border" style={{marginBottom:"3rem"}}>
              <Card
                outline
                style={{
                  width: 'fitContent',
                  margin: '1rem'
                }}
              >
                <img src={digimon.img} alt={digimon.name} />
                <CardBody>
                  <h6 className="text-center">{digimon.name}</h6>
                </CardBody>
                <CardSubtitle className="text-center">
                  {digimon.level}
                </CardSubtitle>
              </Card>
            </Col>
        ))
        ) :(
            digimon.filter(digimon => digimon.name.toLowerCase() === busqueda2.toLowerCase()).map((digimon)=>(
              <Col className='prueba' style={{marginBottom:"3rem"}}>
                <Card
                  outline
                  style={{
                    width: "fitContent",
                    margin: "1 rem"
                  }}
                >

                  <img src={digimon.img} alt={digimon.name}/>
                  <CardBody>
                    <h6 className='prueba2'>{digimon.name}</h6>
                  </CardBody>
                  <CardSubtitle className='prueba3'>
                    {digimon.level}
                  </CardSubtitle>
                </Card>
              </Col>
            ))
          )
        } 
        </Row>
      </Container>
    )
  }

export default Digimons