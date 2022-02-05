var Ticket = require("./ticket");

function Tickets() {
  this.tickets = [];
}

Tickets.prototype._apply = function (fn, args) {
  for (let i = 0; i < this.tickets.length; i++) {
    const ticket = this.tickets[i];
    ticket[fn].apply(ticket, args);
  }
};

Tickets.prototype.push = function (ticket) {
  var self = this;
  if (ticket instanceof Tickets) {
    for (let i = 0; i < ticket.tickets.length; i++) {
      const subTicket = ticket.tickets[i];
      self.push(subTicket);
    }
    return;
  }

  if (ticket instanceof Ticket) {
    if (!self.tickets.includes(ticket)) {
      self.tickets.push(ticket);
    }
  }
};

const methods = Object.keys(Ticket.prototype);
for (let i = 0; i < methods.length; i++) {
  const method = methods[i];
  Tickets.prototype[method] = function () {
    this._apply(method, arguments);
  };
}

module.exports = Tickets;
