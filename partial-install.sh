cd covid19-registry
npm install
npm run build
mkdir /var/www/covid19-registry
mv dist /var/www/covid19-registry/dist
cd ../server
touch .env
npm install --only=prod
rm -r test/
cd ../
