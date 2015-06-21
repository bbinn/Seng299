# To run: ./go
npm install && bower install
node server/ &
pid=$!
wait ${pid}