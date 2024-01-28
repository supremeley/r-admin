import './index.scss';

import { login } from '@/api/sys/auth';

const Home = () => {
  const [textA, setText] = useState('test');

  useEffect(() => {
    // async function fetchData(): Promise<void> {
    //   // You can await here
    //   const response = await MyAPI.getData(someId);
    //   // ...
    // }

    void fetchData();
  });

  const fetchData = async () => {
    const res = await login({ password: '123', username: 'wawawa' });

    console.log(res);
    // setText(res.data.token);
  };

  return (
    <div className='home'>
      home
      <div>{textA}</div>
      <button onClick={() => setText('ttttt')}>submit</button>
    </div>
  );
};

export default Home;
