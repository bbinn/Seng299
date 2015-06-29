
// Command: Command to send (IE: Login, bookBoth etc)
// Body: Arguments to send to the server inside the body of the message
// Callback(err, message): Callback function taking 2 arguments (will be envoked once the server)
// Responds back with a message to the client.
// If err is NOT NULL, then an error occured, else a success occured (and can be extracted from the message)

activeUser = null;

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