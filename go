# To run: ./go
npm install
node server/ &
pid=$!
wait ${pid}