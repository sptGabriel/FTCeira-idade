const promBundle = require("express-prom-bundle");

export const metricsMiddleware = promBundle({ 
        includeMethod: true, 
        includePath: true, 
        customLabels: 
            { 
                project_version: '3.0' 
            } 
    });