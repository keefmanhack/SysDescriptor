import React from 'react';
import { Notification, toaster } from "rsuite"


const type = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
}

export default class Alert{
    static duration = 3000; 
    
    static success = (msg) => {
        toaster.push(
        <Notification 
            header={type.success}  
            duration={this.duration} 
            closable 
            type={type.success}
        >
            {msg}
        </Notification>);
    }

    static warning = (msg) => {
        toaster.push(
            <Notification 
                header={type.warning}  
                duration={this.duration} 
                closable 
                type={type.warning}
            >
                {msg}
            </Notification>);
    }

    static info = (msg) => {
        toaster.push(
            <Notification 
                header={type.info}  
                duration={this.duration} 
                closable 
                type={type.info}
            >
                {msg}
            </Notification>);
    }

    static error = (msg) => {
        toaster.push(
            <Notification 
                header={type.error}  
                duration={this.duration} 
                closable 
                type={type.error}
            >
                {msg}
            </Notification>);
    }
}