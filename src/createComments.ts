import * as BabelTypes from "@babel/types";

const convertExpressionToString = (
  types: typeof BabelTypes,
  node: BabelTypes.Expression | BabelTypes.PatternLike
) => {
  if (types.isStringLiteral(node)) {
    return `'${node.value}'`;
  } else if (types.isRegExpLiteral(node)) {
    return `/${node.pattern}/`;
  } else if (types.isBooleanLiteral(node)) {
    return node.value;
  }

  throw new Error(
    "value needs to be one of the following types; StringLiteral, RegExpLiteral, BooleanLiteral"
  );
};

const capitalizeFirstLetter = (key: string) => {
  return key.charAt(0).toUpperCase() + key.substring(1);
};

const convertOptionPropertiesToWebpackMagicString = (
  types: typeof BabelTypes,
  properties: (
    | BabelTypes.ObjectMethod
    | BabelTypes.ObjectProperty
    | BabelTypes.SpreadElement
  )[]
) => {
  return properties.map(prop => {
    if (!types.isObjectProperty(prop)) {
      throw new Error("options.properties[i] needs to be ObjectProperty");
    }

    const key = capitalizeFirstLetter(prop.key.name);
    const value = convertExpressionToString(types, prop.value);

    return `webpack${key}: ${value}`;
  });
};

const getOptionsString = (
  types: typeof BabelTypes,
  options: BabelTypes.ObjectExpression
) => {
  const comments = convertOptionPropertiesToWebpackMagicString(
    types,
    options.properties
  );
  return comments.join(", ");
};

export const createComments = (
  type: typeof BabelTypes,
  options?: BabelTypes.ObjectExpression
) => {
  return [
    {
      type: "CommentBlock",
      value: ` ${getOptionsString(type, options)} `
    } as BabelTypes.CommentBlock
  ];
};
