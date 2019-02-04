import RequestService from './requestService.js';
import StorageService from './storageService.js';

const requestService = new RequestService(storageService);
const storageService = new StorageService(requestService);

export default {
  Request: requestService,
  Storage: storageService
};
