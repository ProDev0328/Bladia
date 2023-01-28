# viaferries

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies for test on dev server

it uses .env.test.production

```
npm run build-test
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## simulate domain in local

there are some ways to simulate domain in local:

- use domain query for temp porpuses `http://localhost:8080/en/?domain=bladia.com` 
- use different command to load base on bladia (default is viaferries) ` npm run build-bladia` 

**these changes will apply only for localhost:8080**


## Update Server

- update dist folder
- connect to ssh and run below commands
```
cd /var/www/viaferries
chmod 777 -R dist
docker-compose restart
```

**NOTE**
Any update should change packeage.json version config (semantic versioning). we update configs based on new version change.

## Build with prerendering

to build with prerender all routes you only need to call below commands:

```
# publish viaferries
npm run build

# publish bladia
npm run build-bladia

#dev server for viaferries
npm run build-test

#dev server for bladia with Journeys prerendering
npm run build-test-bladia 

```
## SEO ROUTES

if you added a new route to application that is important for seo, you need to add it to `src/router/seo_routes.js`

it handle languages and important routes for seo.

also if you have dynamic routes you should check codes in `build.prerender.js` to see how to add them.

# Routes multilanguage
All the routes that shown in the front web are coming from translation forms.
so to have translated forms you have to do 2 steps:

1- update translation files 
2- make sure that routes in "route/index.js" has the translated aliases.

For example to change the translate of port in routes :
At first update the translation in "src/lang/translations"
Then add aliases to route like below:
```
{
    path: "ports/:title/:id",
    name: "portDetails",
    alias: [
        "puertos/:title/:id",
        "Häfen/:title/:id",
        "porti/:title/:id",
        "poorten/:title/:id",
    ],
    component: PortDetails,
},
```

**Note** be aware you shouldn't remove any alias , some of them are important for app. so just change them or add new.

# Production

there are 2 domains for this project (viaferries , bladia)

for productions there is a difference between them. ( SEO PAGES )

so we should build them separately.


**Building**
 - viaferries:
```
npm run build
```
 - bladia
 ```
 npm run build-bladia
 ```


**Publish**

for both of them we should do the same steps. but should be done in different folders in prod server.

the important files for are:
- docker-compose files (docker-compose.yml, docker-compose.bladia.yml)
- docker folder
- dist folder

upload these folders to server


**Run server**
 - viaferries:
```
# first make sure that they are not up
docker-compose down

#start 
docker-compose up -d
```
 - bladia
 ```
 # first make sure that they are not up
docker-compose -f docker-compose.bladia.yml down

#start 
docker-compose -f docker-compose.bladia.yml up -d
 ```


 **Note**
 To run them maybe you need to restart manager too

 ```

 #folder is dependent to manager path of server
 cd /pathToManager/request_manager

 #restart server, it depends to docker-compose file of server (example is bein server)
docker-compose -f docker-compose.bein.yml restart
 ```