cmake_minimum_required(VERSION 3.5)
project(hellogrpc_server)

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 允许手动设置 protoc 和 grpc_cpp_plugin 的路径
set(PROTOC_PATH "" CACHE PATH "Path to protoc executable")
set(GRPC_CPP_PLUGIN_PATH "" CACHE PATH "Path to grpc_cpp_plugin executable")

# 查找依赖包
find_package(Threads REQUIRED)

# 设置 Protobuf 路径（如果需要）
if(NOT Protobuf_DIR)
    set(Protobuf_DIR "/home/jeff/.local/lib/cmake/protobuf" CACHE PATH "Path to ProtobufConfig.cmake")
endif()

# 查找 Protobuf
find_package(Protobuf REQUIRED CONFIG)
if(NOT Protobuf_FOUND)
    message(FATAL_ERROR "Protobuf package not found")
endif()

# 查找 gRPC
find_package(gRPC REQUIRED)
if(NOT gRPC_FOUND)
    message(FATAL_ERROR "gRPC package not found")
endif()

# 查找 protoc 可执行文件
if(PROTOC_PATH)
    set(PROTOBUF_PROTOC_EXECUTABLE ${PROTOC_PATH})
else()
    find_program(PROTOBUF_PROTOC_EXECUTABLE protoc)
endif()

if(NOT PROTOBUF_PROTOC_EXECUTABLE)
    message(FATAL_ERROR "protoc not found. Please install protobuf-compiler or set PROTOC_PATH")
endif()

# 查找 grpc_cpp_plugin 可执行文件
if(GRPC_CPP_PLUGIN_PATH)
    set(GRPC_CPP_PLUGIN_EXECUTABLE ${GRPC_CPP_PLUGIN_PATH})
else()
    find_program(GRPC_CPP_PLUGIN_EXECUTABLE grpc_cpp_plugin)
endif()

if(NOT GRPC_CPP_PLUGIN_EXECUTABLE)
    message(FATAL_ERROR "grpc_cpp_plugin not found. Please install grpc-plugins or set GRPC_CPP_PLUGIN_PATH")
endif()

# 打印调试信息
message(STATUS "Found protoc: ${PROTOBUF_PROTOC_EXECUTABLE}")
message(STATUS "Found grpc_cpp_plugin: ${GRPC_CPP_PLUGIN_EXECUTABLE}")
message(STATUS "Protobuf version: ${Protobuf_VERSION}")
message(STATUS "gRPC version: ${gRPC_VERSION}")
message(STATUS "gRPC includes: ${gRPC_INCLUDE_DIRS}")
message(STATUS "gRPC libraries: ${gRPC_LIBRARIES}")

# 生成 protobuf 文件
set(PROTO_PATH "${CMAKE_CURRENT_SOURCE_DIR}/../proto")
set(PROTO_FILES "${PROTO_PATH}/greeter.proto")

# 检查 proto 文件是否存在
if(NOT EXISTS "${PROTO_FILES}")
    message(FATAL_ERROR "Proto file not found: ${PROTO_FILES}")
endif()

# 设置生成的文件路径
set(PROTO_SRC_DIR "${CMAKE_CURRENT_BINARY_DIR}/generated")
file(MAKE_DIRECTORY ${PROTO_SRC_DIR})
message(STATUS "Proto output directory: ${PROTO_SRC_DIR}")

# 生成 protobuf 和 grpc 文件
# 使用更明确的命令格式，避免参数解析问题
add_custom_command(
  OUTPUT 
    "${PROTO_SRC_DIR}/greeter.pb.cc"
    "${PROTO_SRC_DIR}/greeter.pb.h"
    "${PROTO_SRC_DIR}/greeter.grpc.pb.cc"
    "${PROTO_SRC_DIR}/greeter.grpc.pb.h"
  COMMAND ${CMAKE_COMMAND} -E echo "Generating Protocol Buffers code..."
  COMMAND ${PROTOBUF_PROTOC_EXECUTABLE}
    --cpp_out=${PROTO_SRC_DIR}
    -I${PROTO_PATH}
    ${PROTO_FILES}
  COMMAND ${CMAKE_COMMAND} -E echo "Generating gRPC code..."
  COMMAND ${PROTOBUF_PROTOC_EXECUTABLE}
    --grpc_out=${PROTO_SRC_DIR}
    -I${PROTO_PATH}
    --plugin=protoc-gen-grpc=${GRPC_CPP_PLUGIN_EXECUTABLE}
    ${PROTO_FILES}
  DEPENDS "${PROTO_FILES}"
  COMMENT "Generating gRPC and Protocol Buffers files"
  VERBATIM
)

# 添加生成的源文件
set(PROTO_SOURCES
  "${PROTO_SRC_DIR}/greeter.pb.cc"
  "${PROTO_SRC_DIR}/greeter.grpc.pb.cc"
)

# 添加头文件路径
include_directories(${PROTO_SRC_DIR})

# 添加可执行文件
add_executable(greeter_server 
  src/server.cpp
  ${PROTO_SOURCES}
)

# 链接库
target_link_libraries(greeter_server
  gRPC::grpc++
  gRPC::grpc++_reflection
  protobuf::libprotobuf
  ${CMAKE_THREAD_LIBS_INIT}
)