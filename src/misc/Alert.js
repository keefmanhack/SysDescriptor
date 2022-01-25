import React from 'react';
import { Notification, toaster } from "rsuite";

// PlacementType = 'topCenter' | 'bottomCenter' | 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd';

const type = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
}

const DEF_DURATION = 1500;

export default class Alert{

    static PlacementType={
        TOPCENTER: 'topCenter',
        BOTTOMCENTER: 'bottomCenter',
        TOPSTART: 'topStart',
        TOPEND: 'topEnd',
        BOTTOMSTART: 'bottomStart',
        BOTTOMEND: 'bottomend'
    }

    static checkDuration = d => {
        if(d && Number.isInteger(d)){
            return d
        }
        return DEF_DURATION;
    }

    static checkPlace = p => {
        return this.checkPlace[p] === null ? this.PlacementType.TOPEND : p;
    }
    
    static success = (msg, place=this.PlacementType.TOPEND, duration) => {
        const checkedPlace = this.checkPlace(place);
        toaster.push(
        <Notification 
            header={type.success}  
            duration={this.checkDuration(duration)} 
            closable
            type={type.success}
        >
            {msg}
        </Notification>, {placement: checkedPlace});
    }

    static warning = (msg,place=this.PlacementType.TOPEND, duration) => {
        const checkedPlace = this.checkPlace(place);
        toaster.push(
            <Notification 
                header={type.warning}  
                duration={this.checkDuration(duration)} 
                closable 
                type={type.warning}
            >
                {msg}
            </Notification>, {placement: checkedPlace});
    }

    static info = (msg, place=this.PlacementType.TOPEND, duration) => {
        const checkedPlace = this.checkPlace(place);
        toaster.push(
            <Notification 
                header={type.info}  
                duration={this.checkDuration(duration)} 
                closable
                type={type.info}
            >
                {msg}
            </Notification>, {placement: checkedPlace});
    }

    static error = (msg, place=this.PlacementType.TOPEND, duration) => {
        const checkedPlace = this.checkPlace(place);
        toaster.push(
            <Notification 
                header={type.error}  
                duration={this.checkDuration(duration)} 
                closable
                type={type.error}
            >
                {msg}
            </Notification>, {placement: checkedPlace});
    }
}