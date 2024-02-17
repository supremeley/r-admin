export const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export const noLabelLayout = {
  wrapperCol: {
    span: 18,
    offset: 6,
  },
};

export const pageDefaultConfig = {
  page: 1,
  limit: 10,
};

export const adminTypeMap: Record<number, string> = {
  1: '高级管理员',
  2: '普通管理员',
};

export const genderMap: Record<number, string> = {
  1: '男',
  2: '女',
};

export const statusMap: Record<number, string> = {
  0: '禁用',
  1: '启用',
};
