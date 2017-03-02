# MengoX
koa mongodb webpack2 react-router MVC CMS
# Local machine
Start mongodb

```sh
mongod
```

Get packages ready

```sh
npm i
```

Migrate initial data

```sh
npm run migrate_up
```

Run app (development)

```sh
npm run start_dev
```

Run app (production)

```sh
npm run start_prod
```

# Server machine

Start mongodb

```sh
mongod
```

Run app (production)

```sh
npm run build_prod
npm run pm2
```

# NginX
```sh
upstream mengox {
  server 127.0.0.1:3000;
}

server {
  listen 80;
  server_name mengox.com;
  root ~/www/mengox/public;
location / {
    index  index.html index.htm;
    proxy_pass http://mengox;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

gzip on;
gzip_disable "msie6";

gzip_comp_level 6;
gzip_min_length 1100;
gzip_buffers 16 8k;
gzip_proxied any;
gzip_types
    text/plain
    text/css
    text/js
    text/xml
    text/javascript
    application/javascript
    application/x-javascript
    application/json
    application/xml
    application/rss+xml
    image/svg+xml;
}
```

# Configs
<div>
<ul>
<li>All configs stored in .env.js.</li>
<li>The initial user info (username, password) can be found in 
'mengox/migrations/add-users.js'</li>
</ul>
</div>


