import './index.scss';

import { Button, Card, Descriptions, PageHeader, Spin, Tooltip } from '@arco-design/web-react';
import type { DataType } from '@arco-design/web-react/es/Descriptions/interface';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';

import { file, manager } from '@/api';
import { adminTypeMap, genderMap } from '@/constants';
import { EvaluationTagEnum, ResultEnum } from '@/enums';

type Desc = Record<
  string,
  {
    key?: React.Key | undefined;
    label?: ReactNode;
    value?: ReactNode;
    span?: number | undefined;
    transform?: (val: number) => string;
  }
>;

const detailDescMap: Desc = {
  id: { label: 'ID' },
  username: { label: '名称' },
  mobile: { label: '手机号' },
  gender: { label: '性别', transform: (val) => genderMap[val] },
  type: { label: '类型', transform: (val) => adminTypeMap[val] },
  status: { label: '状态', transform: (val) => (val ? '启用' : '禁用') },
  describe: { label: '说明', span: 4 },
  remark: { label: '备注', span: 4 },
  createTime: { label: '创建时间' },
  updateTime: { label: '更新时间' },
};

const ManagerDetail = () => {
  const { id: userId } = useParams();

  const [loading, setLoading] = useState(false);
  // const [detail, setDetail] = useState<Manager | null>(null);
  const [detailDesc, setDetailDesc] = useState<DataType>([]);

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const params = {
      id: Number(userId!),
    };

    try {
      const { code, result } = await manager.getManagerDetail(params);

      if (code === ResultEnum.SUCCESS) {
        const detailArr = [];

        for (const [key, value] of Object.entries(result)) {
          detailArr.push({ value: detailDescMap[key].transform?.(value as number) ?? value, ...detailDescMap[key] });
        }

        // setDetail(result);
        setDetailDesc(detailArr);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleExport = async (tag: EvaluationTagEnum) => {
    const data = await file.fileDownload({ userId: +userId!, tag });

    let start = '';
    let suffix = '.xlsx';

    switch (tag) {
      case EvaluationTagEnum.Develop:
        start = '职业发展诊断';
        suffix = '.pptx';
        break;
      case EvaluationTagEnum.Motivation:
        start = '职业动机测评';
        break;
      case EvaluationTagEnum.Interest:
        start = '职业兴趣测评';
        break;
      case EvaluationTagEnum.Type:
        start = '职业类型测评';
        break;
      case EvaluationTagEnum.Develop:
        start = 'MBTI';
        break;
      case EvaluationTagEnum.Word:
        start = '职业定位测评报告';
        suffix = '.docx';
        break;
      default:
        break;
    }

    const filename = start + dayjs().format('YYYY-MM-DD') + suffix;
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <section className='container'>
      <PageHeader
        title='管理员详情'
        breadcrumb={{
          routes: [
            {
              path: 'manager',
              breadcrumbName: '管理员',
            },
            {
              path: 'manager/list',
              breadcrumbName: '管理员列表',
            },
            {
              path: 'manager/detail',
              breadcrumbName: '管理员详情',
            },
          ],
        }}
      />
      <Spin block size={60} loading={loading}>
        <Card>
          <Descriptions
            border
            title='基础信息'
            size='large'
            layout='horizontal'
            data={detailDesc}
            style={{ marginBottom: 20 }}
            column={{
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
          />
        </Card>
        <Card title='相关报告' className='mt-4'>
          <div>
            <Tooltip content='导出'>
              <Button
                type='primary'
                icon={<div className='i-material-symbols:cloud-download mr-2'></div>}
                onClick={() => handleExport(EvaluationTagEnum.Develop)}
              >
                职业发展诊断
              </Button>
            </Tooltip>
          </div>
          <div className='mt-4'>
            <Tooltip content='导出'>
              <Button
                type='primary'
                icon={<div className='i-material-symbols:cloud-download mr-2'></div>}
                onClick={() => handleExport(EvaluationTagEnum.Word)}
              >
                职业定位测评报告
              </Button>
            </Tooltip>
          </div>
        </Card>
      </Spin>
    </section>
  );
};

export default ManagerDetail;
