const health_monitor = require("./health_monitor")

class HEALTH_MONITOR_ROUTER 
{
    constructor()
    {
        this.HEALTH_MONITOR_URL = "/health/monitor"
        this.HEALTH_MONITOR_SERVERS = []       
    }

    async createServerCluster(servers = Array)
    {
        let serverCluster = [];
        await new Promise((resolve) => {
            for (let serverIndex = 0; serverIndex < servers.length; serverIndex++) {
                serverCluster.push(servers[serverIndex]);
            }
            resolve();
        });
    
        return serverCluster;
    }

    getHealth(servers)
    {
        health_monitor(servers)
    }
    getTelemetryOnOne(server)
    {
        return 0
    }
}

class SERVER
{
    constructor()
    {
        this.STATIC = "0.0.0.0"
        this.NAME = "SERVER NAME"
        this.LOCATION = "LOCATION"
        this.ENABLED = true
    }
}

module.exports = {HEALTH_MONITOR_ROUTER, SERVER}