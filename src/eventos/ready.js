module.exports = async (client) => {
  client.user.setStatus('online');

  const activities = [
    'Apostando em vários servidores!',
  ];
  let i = 0;

  setInterval(() => {
    client.user.setPresence({
      activity: {
        name: activities[i++ % activities.length],
        type: 'PLAYING',
        status: 'online',
      },
    });
  }, 30000);

  console.log(`Conectei em: ${client.user.tag}`);
};