module.exports = {
    apps: [
      {
        name: 'BNC Web Engineering',
        script: 'npm',
        args: 'run start',
        watch: false,
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
};