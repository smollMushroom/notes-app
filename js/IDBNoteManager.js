export class IDBNoteManager {
  constructor(idbName, storeName, version) {
    this.idbName = idbName;
    this.storeName = storeName;
    this.version = version;
    this.db = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.idbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(this.storeName)) {
          const objectStore = db.createObjectStore(this.storeName, {
            keyPath: 'id',
            autoIncrement: true
          });

          objectStore.createIndex('notes', 'id', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  add(data) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('Database Not Initialized');
      }

      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const addRequest = objectStore.add(data);

      addRequest.onsuccess = () => {
        resolve('Data added successfully');
      };

      addRequest.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('Database Not Initialized');
      }

      const transaction = this.db.transaction(this.storeName, 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const getRequest = objectStore.get(id);

      getRequest.onsuccess = (event) => {
        resolve(event.target.result);
      };

      getRequest.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  getAll(){
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('Database Not Initialized');
      }

      const transaction = this.db.transaction(this.storeName, 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = (event) => {
        resolve(event.target.result);
      };

      getRequest.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  delete(id){
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('Database Not Initialized');
      }

      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const getRequest = objectStore.delete(id);

      getRequest.onsuccess = (event) => {
        resolve(event.target.result);
      };

      getRequest.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
}
