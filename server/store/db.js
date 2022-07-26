const MemoryStorage = require("dom-storage");

const AppStore = new MemoryStorage(null, { strict: true });
AppStore.setItem("users", []);
const UsersStore = AppStore.getItem("users") || [];

module.exports = { UsersStore, AppStore };
