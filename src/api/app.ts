import axios from 'axios';
import AppStore from '../store/app';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3001/graphql' }),
  cache: new InMemoryCache()
});

export const SERVER_URL = 'http://localhost:3001';

export default class AppApi {
  //chat: ChatApi;

  //socket: SocketApi;

  serverConnection = axios.create({
    baseURL: SERVER_URL,
  });

  constructor(store: AppStore) {
    //this.chat = new ChatApi(this, store);
    //this.socket = new SocketApi(SERVER_URL, user.uId, this, store);
  }
}