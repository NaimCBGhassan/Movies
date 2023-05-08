//TYPES HErE??

const modelOptions = {
  toJSON: {
    virtuals: true,
    transform: (_: any, obj: { _id?: string; algo: number }) => {
      delete obj._id;
      return obj;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_: any, obj: { _id?: string; algo: number }) => {
      delete obj._id;
      return obj;
    },
  },
  versionKey: false,
  timestamps: true,
};

export default modelOptions;
