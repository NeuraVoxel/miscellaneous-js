/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.tutorial = (function() {
    
        /**
         * Namespace tutorial.
         * @exports tutorial
         * @namespace
         */
        var tutorial = {};
    
        /**
         * Role enum.
         * @name tutorial.Role
         * @enum {number}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} ADMIN=1 ADMIN value
         * @property {number} USER=2 USER value
         * @property {number} GUEST=3 GUEST value
         */
        tutorial.Role = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "ADMIN"] = 1;
            values[valuesById[2] = "USER"] = 2;
            values[valuesById[3] = "GUEST"] = 3;
            return values;
        })();
    
        tutorial.User = (function() {
    
            /**
             * Properties of a User.
             * @memberof tutorial
             * @interface IUser
             * @property {string|null} [id] User id
             * @property {string|null} [name] User name
             * @property {number|null} [age] User age
             * @property {string|null} [email] User email
             * @property {tutorial.Role|null} [role] User role
             * @property {Array.<string>|null} [hobbies] User hobbies
             */
    
            /**
             * Constructs a new User.
             * @memberof tutorial
             * @classdesc Represents a User.
             * @implements IUser
             * @constructor
             * @param {tutorial.IUser=} [properties] Properties to set
             */
            function User(properties) {
                this.hobbies = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * User id.
             * @member {string} id
             * @memberof tutorial.User
             * @instance
             */
            User.prototype.id = "";
    
            /**
             * User name.
             * @member {string} name
             * @memberof tutorial.User
             * @instance
             */
            User.prototype.name = "";
    
            /**
             * User age.
             * @member {number} age
             * @memberof tutorial.User
             * @instance
             */
            User.prototype.age = 0;
    
            /**
             * User email.
             * @member {string} email
             * @memberof tutorial.User
             * @instance
             */
            User.prototype.email = "";
    
            /**
             * User role.
             * @member {tutorial.Role} role
             * @memberof tutorial.User
             * @instance
             */
            User.prototype.role = 0;
    
            /**
             * User hobbies.
             * @member {Array.<string>} hobbies
             * @memberof tutorial.User
             * @instance
             */
            User.prototype.hobbies = $util.emptyArray;
    
            /**
             * Creates a new User instance using the specified properties.
             * @function create
             * @memberof tutorial.User
             * @static
             * @param {tutorial.IUser=} [properties] Properties to set
             * @returns {tutorial.User} User instance
             */
            User.create = function create(properties) {
                return new User(properties);
            };
    
            /**
             * Encodes the specified User message. Does not implicitly {@link tutorial.User.verify|verify} messages.
             * @function encode
             * @memberof tutorial.User
             * @static
             * @param {tutorial.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.age != null && Object.hasOwnProperty.call(message, "age"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.age);
                if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.email);
                if (message.role != null && Object.hasOwnProperty.call(message, "role"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.role);
                if (message.hobbies != null && message.hobbies.length)
                    for (var i = 0; i < message.hobbies.length; ++i)
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.hobbies[i]);
                return writer;
            };
    
            /**
             * Encodes the specified User message, length delimited. Does not implicitly {@link tutorial.User.verify|verify} messages.
             * @function encodeDelimited
             * @memberof tutorial.User
             * @static
             * @param {tutorial.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a User message from the specified reader or buffer.
             * @function decode
             * @memberof tutorial.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tutorial.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tutorial.User();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.age = reader.int32();
                            break;
                        }
                    case 4: {
                            message.email = reader.string();
                            break;
                        }
                    case 5: {
                            message.role = reader.int32();
                            break;
                        }
                    case 6: {
                            if (!(message.hobbies && message.hobbies.length))
                                message.hobbies = [];
                            message.hobbies.push(reader.string());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a User message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof tutorial.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {tutorial.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a User message.
             * @function verify
             * @memberof tutorial.User
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            User.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.age != null && message.hasOwnProperty("age"))
                    if (!$util.isInteger(message.age))
                        return "age: integer expected";
                if (message.email != null && message.hasOwnProperty("email"))
                    if (!$util.isString(message.email))
                        return "email: string expected";
                if (message.role != null && message.hasOwnProperty("role"))
                    switch (message.role) {
                    default:
                        return "role: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.hobbies != null && message.hasOwnProperty("hobbies")) {
                    if (!Array.isArray(message.hobbies))
                        return "hobbies: array expected";
                    for (var i = 0; i < message.hobbies.length; ++i)
                        if (!$util.isString(message.hobbies[i]))
                            return "hobbies: string[] expected";
                }
                return null;
            };
    
            /**
             * Creates a User message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tutorial.User
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tutorial.User} User
             */
            User.fromObject = function fromObject(object) {
                if (object instanceof $root.tutorial.User)
                    return object;
                var message = new $root.tutorial.User();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.age != null)
                    message.age = object.age | 0;
                if (object.email != null)
                    message.email = String(object.email);
                switch (object.role) {
                default:
                    if (typeof object.role === "number") {
                        message.role = object.role;
                        break;
                    }
                    break;
                case "UNKNOWN":
                case 0:
                    message.role = 0;
                    break;
                case "ADMIN":
                case 1:
                    message.role = 1;
                    break;
                case "USER":
                case 2:
                    message.role = 2;
                    break;
                case "GUEST":
                case 3:
                    message.role = 3;
                    break;
                }
                if (object.hobbies) {
                    if (!Array.isArray(object.hobbies))
                        throw TypeError(".tutorial.User.hobbies: array expected");
                    message.hobbies = [];
                    for (var i = 0; i < object.hobbies.length; ++i)
                        message.hobbies[i] = String(object.hobbies[i]);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a User message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tutorial.User
             * @static
             * @param {tutorial.User} message User
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            User.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.hobbies = [];
                if (options.defaults) {
                    object.id = "";
                    object.name = "";
                    object.age = 0;
                    object.email = "";
                    object.role = options.enums === String ? "UNKNOWN" : 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.age != null && message.hasOwnProperty("age"))
                    object.age = message.age;
                if (message.email != null && message.hasOwnProperty("email"))
                    object.email = message.email;
                if (message.role != null && message.hasOwnProperty("role"))
                    object.role = options.enums === String ? $root.tutorial.Role[message.role] === undefined ? message.role : $root.tutorial.Role[message.role] : message.role;
                if (message.hobbies && message.hobbies.length) {
                    object.hobbies = [];
                    for (var j = 0; j < message.hobbies.length; ++j)
                        object.hobbies[j] = message.hobbies[j];
                }
                return object;
            };
    
            /**
             * Converts this User to JSON.
             * @function toJSON
             * @memberof tutorial.User
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            User.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for User
             * @function getTypeUrl
             * @memberof tutorial.User
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            User.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/tutorial.User";
            };
    
            return User;
        })();
    
        return tutorial;
    })();

    return $root;
});
