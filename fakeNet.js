"use strict";

/**
 * Simulates a network by using events to enable simpler testing.
 */
module.exports = class FakeNet {

  constructor() {
    this.clients = new Map();
  }

  /**
   * Registers clients to the network.
   * Clients and Miners are registered by public key.
   *
   * @param {...Object} clientList - clients to be registered to this network (may be Client or Miner)
   */
  register(...clientList) {
    for (const client of clientList) {
      console.log(`Registering ${client.address}`);
      this.clients.set(client.address, client);
    }
  }

  /**
   * Broadcasts to all clients within this.clients the message msg and payload o.
   *
   * @param {String} msg - the name of the event being broadcasted (e.g. "PROOF_FOUND")
   * @param {Object} o - payload of the message
   */
  broadcast(msg, o) {
    for (const address of this.clients.keys()) {
      this.sendMessage(address, msg, o);
    }
  }

  /**
   * Sends message msg and payload o directly to Client name.
   *
   * @param {String} address - the public key address of the client or miner to which to send the message
   * @param {String} msg - the name of the event being broadcasted (e.g. "PROOF_FOUND")
   * @param {Object} o - payload of the message
   */
  sendMessage(address, msg, o) {
    const client = this.clients.get(address);
    setTimeout(() => client.emit(msg, o), 0);
  }

}
