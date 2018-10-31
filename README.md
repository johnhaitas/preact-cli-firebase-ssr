# preact-cli-firebase-ssr

## CLI Commands

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# test the production build locally
npm run serve

# deploy production build to Firebase
npm run deploy

# run tests with jest and preact-render-spy 
npm run test
```
**NOTE:** When running `npm run serve`, the `build/index.html` file is removed before serving locally. This is because `firebase serve --only hosting,functions` command does not appear to respect `hosting.ignore` array in `firebase.json`

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
