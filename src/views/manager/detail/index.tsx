import './index.scss';

import { Card, Descriptions, PageHeader } from '@arco-design/web-react';
import type { DataType } from '@arco-design/web-react/es/Descriptions/interface';
import { adminTypeMap, genderMap } from '@constants/index';

import { manager } from '@/api';
import type { Manager } from '@/api/manager/interface';
import { ResultEnum } from '@/enums/http';

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
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<Manager | null>(null);
  const [detailDesc, setDetailDesc] = useState<DataType>([]);

  useEffect(() => {
    // console.log('useEffect');
    void fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const params = {
      id: Number(id!),
    };

    try {
      const { code, result } = await manager.getManagerDetail(params);

      if (code === ResultEnum.SUCCESS) {
        const detailArr = [];

        for (const [key, value] of Object.entries(result)) {
          detailArr.push({ value: detailDescMap[key].transform?.(value as number) ?? value, ...detailDescMap[key] });
        }

        setDetail(result);
        setDetailDesc(detailArr);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
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
              path: 'manager/detail',
              breadcrumbName: '管理员详情',
            },
          ],
        }}
      />
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
    </section>
  );
};

export default ManagerDetail;
