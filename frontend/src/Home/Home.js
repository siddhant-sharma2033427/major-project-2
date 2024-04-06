import React, { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { updateRelay, getRelay,getCaptureImage,UpdateCaptureImage,getmorter,UpdateMorter,getMoisture,getHumidity,getTemp,streamAllLogs } from '../utils/api'
import FlashlightOnIcon from '@mui/icons-material/FlashlightOn';
import FlashlightOffIcon from '@mui/icons-material/FlashlightOff';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled';
import RefreshIcon from '@mui/icons-material/Refresh';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

import Showimage from './Showimage'
import ShowAllImage from './Showall'
const Home = () => {
    const [checked, setChecked] = useState(false);
    const [captureimage, setCaptureimage] = useState(false);
    const [morter, setMorter] = useState(false);
    const [moistureData, setMoistureData] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [temp, setTemp] = useState(null);

    useEffect(() => {
        const timeoutId = setInterval(() => {
            fetchData();
            // fetImage();
            fetMorter();
            fetchMoitureData();
            fetchHumidity();
            fetTemperature();
        }, 2000);

        return () => clearInterval(timeoutId);
    }, []);
    const fetMorter = async ()=>{
        try {
            const data = await getmorter();
            console.log(data)
            // fetchRecentImage();
        } catch (error) {
            console.log("error while fetching while fetmorter")
        }
    }
    const fetImage = async () =>{
        try {
            const temp = await getCaptureImage();
            setCaptureimage(temp.data.ImageData.captureImage);
            console.log(captureimage)
            // console.log("getcaptureimage",temp.data.ImageData.captureImage)
        } catch (error) {
            console.log("error occurred", error);
        }
    }
    const fetchData = async () => {
        try {
            const temp = await getRelay();
            setChecked(temp.data.relayData.relay);
        } catch (error) {
            console.log("error occurred", error);
        }
    };
    const fetchMoitureData = async ()=>{
        try {
            const data = await getMoisture();
            console.log("moisture data",data.data.result[0].moisture);
            setMoistureData(data.data.result[0].moisture)
        } catch (error) {
            console.log("error occured while fetching moisture")
        }
    }
    const fetchHumidity = async () =>{
        try {
            const data = await getHumidity();
            // console.log("Humidity",data.data.result[0].humidity)
            setHumidity(data.data.result[0].humidity)
        } catch (error) {
            console.log("error occured humidity")
        }
    }
    const fetTemperature = async () =>{
        try {
            const data = await getTemp();
            console.log("temp",data.data.result[0].temperature)
            setTemp(data.data.result[0].temperature)
        } catch (error) {
            console.log("error occured humidity")
        }
    }
    
    const handleChange = async () => {
        const newChecked = !checked;
        setChecked(newChecked);
        await updateRelay(newChecked);
    };
    const handleChangecamera = async ()=>{
        const newcaptureimage = !captureimage;
        setCaptureimage(newcaptureimage)
        await UpdateCaptureImage(newcaptureimage);
    }

    const handleChangeMorter = async ()=>{
        const newmorter = !morter;
        setMorter(newmorter);
        await UpdateMorter(newmorter);
    }
    return (
        <>
            <div>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="Grow Light"
                />
                {checked ? <FlashlightOnIcon /> : <FlashlightOffIcon />}
            </div>
            <div>
                <FormControlLabel
                    control={<Switch checked={captureimage} onChange={handleChangecamera} />}
                    label="Capture Image"
                />
                {captureimage ? <CameraAltIcon /> : <NoPhotographyIcon />}
            </div>
            <div>
                <FormControlLabel
                    control={<Switch checked={morter} onChange={handleChangeMorter} />}
                    label="Start Morter"
                />
                {morter ? <RefreshIcon /> : <UpdateDisabledIcon />}
            </div>
            <div>
            <Typography><CloudQueueIcon/> {`Humidity ${humidity}% `}</Typography>
            <Typography><ThermostatIcon/>{`temprature ${temp}F`}</Typography>
            </div>
            <div>
                <WaterDropIcon/>{
                    moistureData===1?"Need water":"sufficient water"
                }
            </div>
            <div>
                <h1>Latest Image</h1>
                <Showimage/>
            </div>
            <div>
                <h1>All Image</h1>
                <ShowAllImage/>
            </div>
        </>
    )
}
