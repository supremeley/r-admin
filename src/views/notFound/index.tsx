import './index.scss';

import { Button, Grid } from '@arco-design/web-react';

import statusBg from '@/assets/error_images/404.png';
import cloud from '@/assets/error_images/cloud.png';

const Row = Grid.Row;
const Col = Grid.Col;

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ pathname: '/home' }, { replace: true });
  };

  return (
    <section className='error-container'>
      <div className='error-content'>
        <Row gutter={20}>
          <Col lg={12} md={12} sm={24} xl={12} xs={24}>
            <div className='pic-error'>
              <img className='pic-error-parent' src={statusBg} />
              <img className='pic-error-child left' src={cloud} />
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} xl={12} xs={24}>
            <div className='bullshit'>
              {/* <div className='bullshit-oops'>抱歉!</div> */}
              <div className='bullshit-headline'>页面加载中...</div>
              {/* <div className='bullshit-info'>请检查您输入的网址是否正确，或点击下面的按钮返回首页。</div> */}
              <Button type='primary' className='bullshit-return-home' onClick={handleBack}>
                返回首页
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default NotFound;
