import './index.scss';

const Login = () => {
  const [textA, setText] = useState('test');

  return (
    <div className='login'>
      login
      <div>{textA}</div>
      <button onClick={() => setText('ttttt')}></button>
    </div>
  );
};

export default Login;
