#include <iostream>
#include <memory>
#include <string>
#include <thread>
#include <chrono>

#include <grpcpp/grpcpp.h>
#include <grpcpp/health_check_service_interface.h>
#include <grpcpp/ext/proto_server_reflection_plugin.h>

#include "greeter.grpc.pb.h"

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;
using grpc::ServerWriter;
using helloworld::Greeter;
using helloworld::HelloRequest;
using helloworld::HelloReply;

// 实现 Greeter 服务
class GreeterServiceImpl final : public Greeter::Service {
  // 实现一元调用的 SayHello 方法
  Status SayHello(ServerContext* context, const HelloRequest* request,
                 HelloReply* reply) override {
    std::string prefix("Hello, ");
    reply->set_message(prefix + request->name());
    std::cout << "Received request from: " << request->name() << std::endl;
    return Status::OK;
  }

  // 实现服务器流式调用的 SayHelloStreamReply 方法
  Status SayHelloStreamReply(ServerContext* context, const HelloRequest* request,
                           ServerWriter<HelloReply>* writer) override {
    HelloReply reply;
    std::string prefix("Hello, ");
    std::string name = request->name();
    
    // 发送5条消息，每条消息间隔1秒
    for (int i = 0; i < 5; i++) {
      reply.set_message(prefix + name + " #" + std::to_string(i + 1));
      writer->Write(reply);
      std::cout << "Sent streaming reply #" << (i + 1) << " to: " << name << std::endl;
      std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    
    return Status::OK;
  }
};

void RunServer() {
  std::string server_address("0.0.0.0:9090");
  GreeterServiceImpl service;

  grpc::EnableDefaultHealthCheckService(true);
  grpc::reflection::InitProtoReflectionServerBuilderPlugin();
  
  ServerBuilder builder;
  // 设置服务器监听地址
  builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
  // 注册服务
  builder.RegisterService(&service);
  
  // 构建并启动服务器
  std::unique_ptr<Server> server(builder.BuildAndStart());
  std::cout << "Server listening on " << server_address << std::endl;

  // 等待服务器终止
  server->Wait();
}

int main(int argc, char** argv) {
  RunServer();
  return 0;
}