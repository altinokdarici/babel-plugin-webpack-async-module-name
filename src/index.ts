import * as BabelTypes from "@babel/types";
import { Visitor, NodePath } from "@babel/traverse";
import { createComments } from "./createComments";

type BabelTypes = typeof BabelTypes;

type Babel = {
  types: BabelTypes;
};

export default function({ types }: Babel): { visitor: Visitor } {
  const replaceCallExpression = (
    path: NodePath<BabelTypes.CallExpression>,
    modulePath: BabelTypes.StringLiteral,
    options?: BabelTypes.ObjectExpression
  ) => {
    if (options) {
      modulePath.leadingComments = createComments(types, options);
    }
    path.replaceWith(
      types.callExpression(types.identifier("import"), [modulePath])
    );
  };

  return {
    visitor: {
      CallExpression: path => {
        const { node } = path;
        if (types.isIdentifier(node.callee, { name: "importName" })) {
          const modulePath = node.arguments[0];
          const options = types.isObjectExpression(node.arguments[1])
            ? node.arguments[1]
            : undefined;

          if (types.isStringLiteral(modulePath)) {
            replaceCallExpression(path, modulePath, options);
          } else {
            throw new Error(
              "The first argument of the importName() must be a string."
            );
          }
        }
      }
    }
  };
}
