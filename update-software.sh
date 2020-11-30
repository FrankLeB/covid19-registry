cd covid19-registry
npm install
npm run build
rm -r /var/www/covid19-registry/dist/
mv dist /var/www/covid19-registry/dist
cd ../server
mv /var/www/covid19-registry-server/.env .
npm install --only=prod
rm -r test/
rm -r /var/www/covid19-registry-server/
cd ../
mv server /var/www/covid19-registry-server
cd /var/www/covid19-registry-server
pm2 restart app-covid19-registry.js
