export const TransformOptions = ({
  Tags: ({ value }) => value ? [... new Set(value.map((tag: string) => tag.toLowerCase()))] : [],
  Type: ({ value } ) => value.toString().toUpperCase(),
  Number: ({ value } ) => +value,
  Count: ({ value }) => value.length,
  ObjectID: ({ obj }) => obj._id
})
