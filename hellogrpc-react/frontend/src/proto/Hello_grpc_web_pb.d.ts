import * as grpcWeb from 'grpc-web';

import {
  HelloRequest,
  HelloResponse,
  StreamRequest,
  StreamResponse} from './hello_pb';

export class HelloServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  sayHello(
    request: HelloRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: HelloResponse) => void
  ): grpcWeb.ClientReadableStream<HelloResponse>;

  getServerStream(
    request: StreamRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<StreamResponse>;
}

export class HelloServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  sayHello(
    request: HelloRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<HelloResponse>;

  getServerStream(
    request: StreamRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<StreamResponse>;
}