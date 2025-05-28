/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const message = $root.message = (() => {

    /**
     * Namespace message.
     * @exports message
     * @namespace
     */
    const message = {};

    message.AwesomeMessage = (function() {

        /**
         * Properties of an AwesomeMessage.
         * @memberof message
         * @interface IAwesomeMessage
         * @property {string|null} [awesomeField] AwesomeMessage awesomeField
         * @property {number|null} [count] AwesomeMessage count
         * @property {boolean|null} [isActive] AwesomeMessage isActive
         */

        /**
         * Constructs a new AwesomeMessage.
         * @memberof message
         * @classdesc Represents an AwesomeMessage.
         * @implements IAwesomeMessage
         * @constructor
         * @param {message.IAwesomeMessage=} [properties] Properties to set
         */
        function AwesomeMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AwesomeMessage awesomeField.
         * @member {string} awesomeField
         * @memberof message.AwesomeMessage
         * @instance
         */
        AwesomeMessage.prototype.awesomeField = "";

        /**
         * AwesomeMessage count.
         * @member {number} count
         * @memberof message.AwesomeMessage
         * @instance
         */
        AwesomeMessage.prototype.count = 0;

        /**
         * AwesomeMessage isActive.
         * @member {boolean} isActive
         * @memberof message.AwesomeMessage
         * @instance
         */
        AwesomeMessage.prototype.isActive = false;

        /**
         * Creates a new AwesomeMessage instance using the specified properties.
         * @function create
         * @memberof message.AwesomeMessage
         * @static
         * @param {message.IAwesomeMessage=} [properties] Properties to set
         * @returns {message.AwesomeMessage} AwesomeMessage instance
         */
        AwesomeMessage.create = function create(properties) {
            return new AwesomeMessage(properties);
        };

        /**
         * Encodes the specified AwesomeMessage message. Does not implicitly {@link message.AwesomeMessage.verify|verify} messages.
         * @function encode
         * @memberof message.AwesomeMessage
         * @static
         * @param {message.IAwesomeMessage} message AwesomeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AwesomeMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.awesomeField != null && Object.hasOwnProperty.call(message, "awesomeField"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.awesomeField);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.count);
            if (message.isActive != null && Object.hasOwnProperty.call(message, "isActive"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isActive);
            return writer;
        };

        /**
         * Encodes the specified AwesomeMessage message, length delimited. Does not implicitly {@link message.AwesomeMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.AwesomeMessage
         * @static
         * @param {message.IAwesomeMessage} message AwesomeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AwesomeMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AwesomeMessage message from the specified reader or buffer.
         * @function decode
         * @memberof message.AwesomeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.AwesomeMessage} AwesomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AwesomeMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.AwesomeMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.awesomeField = reader.string();
                        break;
                    }
                case 2: {
                        message.count = reader.int32();
                        break;
                    }
                case 3: {
                        message.isActive = reader.bool();
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
         * Decodes an AwesomeMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.AwesomeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.AwesomeMessage} AwesomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AwesomeMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AwesomeMessage message.
         * @function verify
         * @memberof message.AwesomeMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AwesomeMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.awesomeField != null && message.hasOwnProperty("awesomeField"))
                if (!$util.isString(message.awesomeField))
                    return "awesomeField: string expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count))
                    return "count: integer expected";
            if (message.isActive != null && message.hasOwnProperty("isActive"))
                if (typeof message.isActive !== "boolean")
                    return "isActive: boolean expected";
            return null;
        };

        /**
         * Creates an AwesomeMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.AwesomeMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.AwesomeMessage} AwesomeMessage
         */
        AwesomeMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.message.AwesomeMessage)
                return object;
            let message = new $root.message.AwesomeMessage();
            if (object.awesomeField != null)
                message.awesomeField = String(object.awesomeField);
            if (object.count != null)
                message.count = object.count | 0;
            if (object.isActive != null)
                message.isActive = Boolean(object.isActive);
            return message;
        };

        /**
         * Creates a plain object from an AwesomeMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.AwesomeMessage
         * @static
         * @param {message.AwesomeMessage} message AwesomeMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AwesomeMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.awesomeField = "";
                object.count = 0;
                object.isActive = false;
            }
            if (message.awesomeField != null && message.hasOwnProperty("awesomeField"))
                object.awesomeField = message.awesomeField;
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            if (message.isActive != null && message.hasOwnProperty("isActive"))
                object.isActive = message.isActive;
            return object;
        };

        /**
         * Converts this AwesomeMessage to JSON.
         * @function toJSON
         * @memberof message.AwesomeMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AwesomeMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AwesomeMessage
         * @function getTypeUrl
         * @memberof message.AwesomeMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AwesomeMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/message.AwesomeMessage";
        };

        return AwesomeMessage;
    })();

    return message;
})();

export const user = $root.user = (() => {

    /**
     * Namespace user.
     * @exports user
     * @namespace
     */
    const user = {};

    /**
     * Role enum.
     * @name user.Role
     * @enum {number}
     * @property {number} USER=0 USER value
     * @property {number} ADMIN=1 ADMIN value
     * @property {number} GUEST=2 GUEST value
     */
    user.Role = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "USER"] = 0;
        values[valuesById[1] = "ADMIN"] = 1;
        values[valuesById[2] = "GUEST"] = 2;
        return values;
    })();

    user.User = (function() {

        /**
         * Properties of a User.
         * @memberof user
         * @interface IUser
         * @property {string|null} [id] User id
         * @property {string|null} [name] User name
         * @property {number|null} [age] User age
         * @property {string|null} [email] User email
         * @property {user.Role|null} [role] User role
         * @property {Array.<string>|null} [hobbies] User hobbies
         */

        /**
         * Constructs a new User.
         * @memberof user
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {user.IUser=} [properties] Properties to set
         */
        function User(properties) {
            this.hobbies = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User id.
         * @member {string} id
         * @memberof user.User
         * @instance
         */
        User.prototype.id = "";

        /**
         * User name.
         * @member {string} name
         * @memberof user.User
         * @instance
         */
        User.prototype.name = "";

        /**
         * User age.
         * @member {number} age
         * @memberof user.User
         * @instance
         */
        User.prototype.age = 0;

        /**
         * User email.
         * @member {string} email
         * @memberof user.User
         * @instance
         */
        User.prototype.email = "";

        /**
         * User role.
         * @member {user.Role} role
         * @memberof user.User
         * @instance
         */
        User.prototype.role = 0;

        /**
         * User hobbies.
         * @member {Array.<string>} hobbies
         * @memberof user.User
         * @instance
         */
        User.prototype.hobbies = $util.emptyArray;

        /**
         * Creates a new User instance using the specified properties.
         * @function create
         * @memberof user.User
         * @static
         * @param {user.IUser=} [properties] Properties to set
         * @returns {user.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message. Does not implicitly {@link user.User.verify|verify} messages.
         * @function encode
         * @memberof user.User
         * @static
         * @param {user.IUser} message User message or plain object to encode
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
                for (let i = 0; i < message.hobbies.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.hobbies[i]);
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link user.User.verify|verify} messages.
         * @function encodeDelimited
         * @memberof user.User
         * @static
         * @param {user.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof user.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {user.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.user.User();
            while (reader.pos < end) {
                let tag = reader.uint32();
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
         * @memberof user.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {user.User} User
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
         * @memberof user.User
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
                    break;
                }
            if (message.hobbies != null && message.hasOwnProperty("hobbies")) {
                if (!Array.isArray(message.hobbies))
                    return "hobbies: array expected";
                for (let i = 0; i < message.hobbies.length; ++i)
                    if (!$util.isString(message.hobbies[i]))
                        return "hobbies: string[] expected";
            }
            return null;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof user.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {user.User} User
         */
        User.fromObject = function fromObject(object) {
            if (object instanceof $root.user.User)
                return object;
            let message = new $root.user.User();
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
            case "USER":
            case 0:
                message.role = 0;
                break;
            case "ADMIN":
            case 1:
                message.role = 1;
                break;
            case "GUEST":
            case 2:
                message.role = 2;
                break;
            }
            if (object.hobbies) {
                if (!Array.isArray(object.hobbies))
                    throw TypeError(".user.User.hobbies: array expected");
                message.hobbies = [];
                for (let i = 0; i < object.hobbies.length; ++i)
                    message.hobbies[i] = String(object.hobbies[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof user.User
         * @static
         * @param {user.User} message User
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.hobbies = [];
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.age = 0;
                object.email = "";
                object.role = options.enums === String ? "USER" : 0;
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
                object.role = options.enums === String ? $root.user.Role[message.role] === undefined ? message.role : $root.user.Role[message.role] : message.role;
            if (message.hobbies && message.hobbies.length) {
                object.hobbies = [];
                for (let j = 0; j < message.hobbies.length; ++j)
                    object.hobbies[j] = message.hobbies[j];
            }
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof user.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for User
         * @function getTypeUrl
         * @memberof user.User
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        User.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/user.User";
        };

        return User;
    })();

    return user;
})();

export { $root as default };
