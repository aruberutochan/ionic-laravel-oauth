# Ionic Laravel OAuth

This is a starting install of Ionic, with OAuth enabled.

It has templates for user login/register/logout which can be customized. 

It is designed to works with a clone of [Laravel OAuth Blank](https://github.com/aruberutochan/laravel-oauth-blank)

## Getting Started

Clone the repository and enter in the created folder
```
git clone git@github.com:aruberutochan/laravel-oauth-blank.git
cd laravel-oauth-blank
```

### Prerequisites

Install [Ionic](http://ionicframework.com/docs/intro/installation/) and all his dependencies.

#### Configure your api conection
You will need to configure your Api endpoints routes, if you are using [Laravel OAuth Blank](https://github.com/aruberutochan/laravel-oauth-blank), we need the following information:
- The OAuth Client ID with password access
- The OAuth Client Secret for the previous ID
- The base domain name, let say it is  [mydomain.com](#)

Once we have it information we will configure the Ionic conection.

Open the file `src/providers/o-auth-service/o-auth-service.ts` and change the following info

```typescript
// (...)
// CONFIGURATION PARAMS
baseDomain: string = 'http://mydomain.com/';
clientSecret: string = 'YOUROAUTHCLIENTSECRET';
clientId: number = 0; // Change for your oauth client ID
// (...)
```

### Install all node modules
It is necesary to install all dependencies of the package.json file, but if it is not installed, ionic installs this for us.

So we only need to run
```
ionic serve
```
And say yes when it ask us if we want to install node modules.

### Compile your App
This is a blank project, you can modify everything to get a working awesome App.

To complile the App for Android, Ios or Windows, follow the instructions on the [Ionic website](https://ionicframework.com/docs/intro/deploying/)

