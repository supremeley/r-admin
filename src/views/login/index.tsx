import './index.scss';

import type { FormInstance } from '@arco-design/web-react';
import { Button, Form, Grid, Input } from '@arco-design/web-react';

import type { LoginParams } from '@/api/auth/interface';
import { useAuth } from '@/hooks';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const InputPassword = Input.Password;

const Login = () => {
  const [{ login: authLogin, loading }] = useAuth();

  const formRef = useRef<FormInstance<LoginParams>>(null);

  const handleLogin = async () => {
    if (formRef.current) {
      try {
        const res = await formRef.current.validate();
        await authLogin(res);
      } catch (_) {
        console.log(formRef.current.getFieldsError());
        // Message.error('校验失败，请检查字段！');
      }
    }
  };

  return (
    <section className='login-container'>
      <Row>
        <Col xs={24} sm={24} md={12} lg={10} xl={6}>
          <div className='form'>
            <div className='form-hello'>hello!</div>
            <div className='form-title'>欢迎来到</div>
            <Form ref={formRef} wrapperCol={{ span: 24 }} autoComplete='off' size='large'>
              <FormItem field='username' rules={[{ required: true }]}>
                <Input
                  addBefore={<div className='r-ph-anchor-simple-thin'></div>}
                  placeholder='请输入用户名'
                  className='form-input'
                />
              </FormItem>
              <FormItem field='password' rules={[{ required: true }]}>
                <InputPassword
                  addBefore={<div className='r-ph-anchor-simple-thin'></div>}
                  placeholder='请输入密码'
                  className='form-input'
                />
              </FormItem>
              <FormItem>
                <Button loading={loading} className='form-button' onClick={handleLogin}>
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Login;
