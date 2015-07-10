Seng 299 Project

**Farmers’ Market Booth Online Scheduling**
---
**Problem Description**
The Fernwood Farmers’ Market would like to improve their quality of service for
vendors by providing a more convenient way for vendors to reserve a booth. To aid
them in this new venture, your expertise is required to develop their online booth
reservation system.

The Farmers’ Market would like to provide online reservations for the following booth
types:

- 3 Lunch Booths
- 4 Produce Booths
- 5 Merchandise Booths

The Farmers’ Market is open Tuesday through Saturday from 10:00 AM to 8:00 PM.
Each day they have two different sessions for vendors with an 2 hour break from 2‐4
(one session from 10am‐2pm and one from 4pm‐8pm).  They are also open Sunday
from 12:00 PM to 4:00 PM with only one session.  Vendors should be able to book
available booths for an entire session.

Each vendor will maintain a profile with their biographic information and information
about their merchandise. Booking a booth should be simple for each vendor. The
vendor should be able to login, see a listing of available booths for a given day and
make a reservation. The vendor should be able to see information about each booth
to make sure they are booking the correct booth.

Each vendor should also be able to see all their reservations and any cancellation
should be done 24 hours prior their reservation. Any cancellation less than 24 hours
prior their appointment, the member will not be able to book another reservation for
the next 48 hours.

To make sure that all booths are ready for a vendor, an administrator should be able
to see and edit all reservations.
These are the core features of the system, the rest is up to you. Marks will be
awarded for creativity.

** Installation Instructions **
npm install
make sure ruby is installed (required for mailcatcher, for emails on localhost)
gem install mailcatcher (if not installed already)
mailcatcher --foreground --http-ip=0.0.0.0
node server.js
navigate to localhost:8080

**Available Technologies**
Javascript, node, express, Mongodb, css, html, jquery, ajax, other things too

**Members**
- Brett Binnersley, V00776751
- Ross Gorden-Baker, V00741538
- Brett A. Blashko, V00759982
- Tyler Becker, V00169236
- Charlotte Fedderly, V00721942
- Nick Conde, V00781910

**Disclaimer**
This application is built for education purposes only and is not intended for production use. Any usage of this software is undertaken at the users risk with the understanding that this software may be not be secure or safe for use.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


