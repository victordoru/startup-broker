module.exports = {
  apps: [{
    name: 'startup-server',
    script: './index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/startup-error.log',
    out_file: '/var/log/pm2/startup-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    // Cargar variables de entorno desde .env
    env_file: '.env'
  }]
};

