"use strict";
exports.__esModule = true;
var createComments_1 = require("./createComments");
function default_1(_a) {
    var types = _a.types;
    var replaceCallExpression = function (path, modulePath, options) {
        if (options) {
            modulePath.leadingComments = createComments_1.createComments(types, options);
        }
        path.replaceWith(types.callExpression(types.identifier("import"), [modulePath]));
    };
    return {
        visitor: {
            CallExpression: function (path) {
                var node = path.node;
                if (types.isIdentifier(node.callee, { name: "importName" })) {
                    var modulePath = node.arguments[0];
                    var options = types.isObjectExpression(node.arguments[1])
                        ? node.arguments[1]
                        : undefined;
                    if (types.isStringLiteral(modulePath)) {
                        replaceCallExpression(path, modulePath, options);
                    }
                    else {
                        throw new Error("The first argument of the importName() must be a string.");
                    }
                }
            }
        }
    };
}
exports["default"] = default_1;
