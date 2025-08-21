import axios from "axios"
import { useEffect, useState } from "react";

export default function JobCard(props){

    
    return(
        <div class="card mb-3 w-100 " idx={props.index} ref={props.ref} >
            <div class="row g-0">
                <div class="col-md-4 d-flex flex-column align-items-center justify-content-center ">
                <img src={`src/assets/ct${props.category}.png`} className="img-fluid rounded" style={{ maxWidth: '60px', height: 'auto' }} alt="..." />

                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{props.jobTitle}</h5>
                    <p class="card-text">{props.description}</p>
                    <p class="card-text"><small class="text-body-secondary">{props.country}</small></p>
                    <p class="card-text"><small class="text-body-secondary">{props.salary}</small></p>
                    <p class="card-text"><small class="text-body-secondary">{props.requirements}</small></p>
                    <p class="card-text"><small class="text-body-secondary">{props.deadline}</small></p>
                    
                </div>
                </div>
            </div>
       </div>
    )
}