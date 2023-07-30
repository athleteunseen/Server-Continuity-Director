const ping = require('ping');

const health_monitor = async function(servers = []) {
  let status = [];
  let startTime = Date.now();
  let loadingInterval = startLoadingAnimation();

  for(let i = 0; i < servers.length; i++) {
    const server = servers[i];

    await pingServer(server, startTime, servers.length, i, status);
  }

  stopLoadingAnimation(loadingInterval);
  displayTable(status);
};

async function pingServer(server, startTime, total, current, status) {
  return new Promise((resolve) => {
    ping.sys.probe(server.STATIC, (isAlive, error, rtt) => {
      const serverName = server.NAME;

      if (error) {
        console.error(`Error for ${serverName}:`, error);
        status.push({ name: serverName, status: 'dead', latency: 'N/A' });
      } else {
        if (isAlive) {
          console.log(`Checking ${serverName}... alive`);
          status.push({ name: serverName, status: 'alive', latency: `${rtt} ms` });
        } else {
          console.log(`Checking ${serverName}... dead`);
          status.push({ name: serverName, status: 'dead', latency: 'N/A' });
        }
      }

      // Update ETA
      updateETA(startTime, total, current);
      resolve();
    });
  });
}

function startLoadingAnimation() {
  let i = 0;
  const frames = ['-', '\\', '|', '/'];
  let loadingInterval = setInterval(() => {
    process.stdout.write(`\tCreating Health Monitor\t\r${frames[i]}`);
    i = (i + 1) % frames.length;
  }, 100);
  return loadingInterval;
}

function stopLoadingAnimation(loadingInterval) {
  clearInterval(loadingInterval);
  process.stdout.write('\r');
}

function updateETA(startTime, total, current) {
  const elapsed = Date.now() - startTime;
  const avgTimePerServer = elapsed / (current + 1);
  const remainingServers = total - current - 1;
  const etaSeconds = Math.round(avgTimePerServer * remainingServers / 1000);

  process.stdout.write(`\tETA: ${etaSeconds} s`);
}

function displayTable(status) {
  console.log('+----------------+-------------+------------+');
  console.log('|    Server      |   Status    |   Latency  |');
  console.log('+----------------+-------------+------------+');

  for (let server of status) {
    const { name, status, latency } = server;
    const namePadding = ' '.repeat(16 - name.length);
    const statusPadding = ' '.repeat(13 - status.length);

    console.log(`| ${name}${namePadding}| ${status}${statusPadding}| ${latency} |`);
    console.log('+----------------+-------------+------------+');
  }
}

module.exports = health_monitor;
