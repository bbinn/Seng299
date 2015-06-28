
// Command: Command to send (IE: Login, bookBoth etc)
// Body: Arguments to send to the server inside the body of the message
// Callback(err, message): Callback function taking 2 arguments (will be envoked once the server)
// Responds back with a message to the client.


safeParse = function(data) {
    try {
      if (!data) {
        return {};
      }
      return JSON.parse(data);
    } catch (_error) {
      return {};
    }
  }

extractError = function(xhr) {
  return (safeParse(xhr.responseText)).error;
}


function sendCommand(command, body, callback) {
  ($).ajax(
    {
      url: 'api/' + command,
      type: "POST",
      data: JSON.stringify(body),
      success: function (data, status, xhr){
        return callback( null, data )
      } ,
      error: function (xhr, status, err) {
        console.log( extractError (xhr) );
        return callback( extractError (xhr) );
      }
    }
  );
}
