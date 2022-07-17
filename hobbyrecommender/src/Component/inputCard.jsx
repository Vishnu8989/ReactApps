import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as React from 'react';
import {Slider} from "@mui/material";


export default function MyCard({data,setData, topic, min, max,step=5}) {
    return (
        <>
            <div className="col-12 col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h3>{topic}</h3>
                    </div>
                    <div className="card-body">
                        <Slider
                            name={topic}
                            aria-label="Temperature"
                            value={data}
                            valueLabelDisplay="auto"
                            step={step}
                            marks
                            min={min+1}
                            max={max}
                            onChange={(event, value) => setData(value)}
                        />
                    </div>
                    <div className="card-footer">
                        {data}
                    </div>
                </div>
            </div>
        </>
    )
}