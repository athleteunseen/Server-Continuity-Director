const loadBalancer = require('../loadBalancer/load_balanacer')

let healthMonitor = new loadBalancer.HEALTH_MONITOR_ROUTER()

let server1 = new loadBalancer.SERVER()
server1.ENABLED = true
server1.LOCATION = "US, FL, 33467"
server1.NAME = "TEST SERVER"
server1.STATIC = "44.206.62.43"

let server2 = new loadBalancer.SERVER()
server2.ENABLED = true
server2.LOCATION = "US, FL, 33467"
server2.NAME = "AthleteUnseen"
server2.STATIC = "athleteunseen.com"

let serverCluster =  healthMonitor.createServerCluster([server1, server2])
healthMonitor.getHealth(serverCluster)

