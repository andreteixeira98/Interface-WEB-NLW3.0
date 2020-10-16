import React, {useEffect, useState} from 'react';
import {Link, useHistory } from 'react-router-dom';
import {FiPlus,FiArrowRight, FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';



import mapMarkerImg from "../images/map-marker.svg";

import "../styles/pages/orphanages-map.css"


import mapIcon from '../utils/mapIcon';

import api from '../services/api';


//import { tileLayer } from 'leaflet';

interface Orphanage{
    id: number,
    latitude:number,
    longitude:number,
    name:string,
}

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    console.log(orphanages);
    useEffect(() =>{
        api.get('orphanages').then(response =>{
            setOrphanages(response.data);
        })
    },[]);

    const {goBack} =useHistory();

    return(
        <div id="page-map">
            <aside>

                <header>
                    <img src={mapMarkerImg} alt='Happy'/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Quixadá</strong>
                    <span>Ceará</span>
                    <button type='button' onClick={goBack}>
                    <FiArrowLeft  size={24} color='#FFF'/>
                    </button>
                </footer>
            </aside>
            
                <Map center = {[-4.9610752,-39.0182078]} zoom = {15} style = {{width:'100%', height:'100%'}}>     
                    <TileLayer url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {orphanages.map(orphanage =>{
                        return(
                            <Marker
                                key={orphanage.id}
                                icon={mapIcon}
                                position={[orphanage.latitude,orphanage.longitude]}
                            >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                                    {orphanage.name}
                                        <Link to= {`/orphanages/${orphanage.id}`}>
                                            <FiArrowRight  size={20} color="#FFF"/>
                                        </Link>
                                </Popup>
                            </Marker>
                        )
                    })}
                </Map>
                <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    );
}
export default OrphanagesMap;