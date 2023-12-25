import './index.scss';

const Home = () => {
  const [textA, setText] = useState('test');

  return (
    <div className='home'>
      home
      <div>{textA}</div>
      <button onClick={() => setText('ttttt')}></button>
    </div>
  );
};

export default Home;
