import './index.scss';

import { Button, Card, Checkbox, Grid, PageHeader, Radio, Space, Spin } from '@arco-design/web-react';

import { exam } from '@/api';
import { topicTypeMap } from '@/constants';
import { ResultEnum, TopicTypeEnum } from '@/enums';

import type { ExamTopicWithAnswer, UserAnswerOption } from '../interface';

const { Row, Col } = Grid;

const ExamDetail = () => {
  const { id: userId } = useParams<string>();

  useEffect(() => {
    void fetchData();
  }, [userId]);

  // const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [topicList, setTopicList] = useState<ExamTopicWithAnswer[] | []>([]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const { code, result } = await exam.getExamDetail({ id: Number(userId) });

      if (code === ResultEnum.SUCCESS) {
        const { examTopicList } = result;
        // const { topicList } = evaluation;

        const list: ExamTopicWithAnswer[] = examTopicList.map((topic) => {
          // const examTopic = examTopicList.find((i) => i.topicId === topic.id);

          let userAnswer: undefined | string | UserAnswerOption[] = [];

          if (topic.type === TopicTypeEnum.Input || topic.type === TopicTypeEnum.Score) {
            const examAnswer = topic.answerList.find(
              (answer) => !answer.optionInputted && !answer.topicInputted && !answer.optionInputted,
            );
            // console.log(examAnswer);
            userAnswer = examAnswer?.remark;
          }

          if (
            topic.type === TopicTypeEnum.Checkbox ||
            topic.type === TopicTypeEnum.Radio ||
            topic.type === TopicTypeEnum.Sort
          ) {
            userAnswer = topic.answerList.filter((answer) => !answer.topicInputted && !answer.optionInputted);
            // .map(answer => {
            //   return {
            //     ...answer,

            //   }
            // });
            // .map((option) => {
            //   const examAnswer = examTopic?.answerList.find((answer) => answer.topicOptionId === option.id);

            //   return {
            //     ...option,
            //     selected: !!examAnswer,
            //     remark: examAnswer?.remark,
            //     // selected: answer.selected,
            //   };
            // });
            console.log(userAnswer);
          }

          const answerInputted = topic.answerList.find((answer) => answer.topicInputted && answer.remark)?.remark;

          let inputted = false,
            inputtedTopic = '',
            inputtedRemark = '';

          if (answerInputted) {
            inputted = true;
            inputtedTopic = topic.topic.inputtedTopic;
            inputtedRemark = answerInputted;
          }

          return {
            ...topic,
            inputted,
            inputtedTopic,
            inputtedRemark,
            userAnswer,
          };
        });

        console.log(list);
        setTopicList(list);

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='container'>
      <PageHeader
        title='评测详情'
        breadcrumb={{
          routes: [
            {
              path: 'user',
              breadcrumbName: '用户',
            },
            {
              path: 'user/list',
              breadcrumbName: '用户管理',
            },
            {
              path: 'exam/list',
              breadcrumbName: '评测记录',
            },
            {
              path: 'exam/detail',
              breadcrumbName: '评测详情',
            },
          ],
        }}
        extra={
          <div>
            <Button type='secondary' style={{ marginRight: 12 }}>
              导出报告
            </Button>
          </div>
        }
      />
      <Spin block size={60} loading={loading}>
        <Card bordered={false} className='min-h-100vh'>
          {topicList.map((topic, index: number) => {
            return (
              <Card
                title={
                  <div className='flex items-center '>
                    <div className='white-break'>
                      {index + 1}.{topic.name}
                    </div>
                    <div className='ml-2 red'>({topicTypeMap[topic.type]})</div>
                    {topic.required && <div className='ml-2 color-red'>*</div>}
                  </div>
                }
                key={topic.id}
                className='mt-4'
              >
                {topic.type === TopicTypeEnum.Input && <div>{topic.userAnswer as string}</div>}
                {topic.type === TopicTypeEnum.Score && <div>{topic.userAnswer as string}</div>}
                {topic.type === TopicTypeEnum.Radio && (
                  <div>
                    {(topic.userAnswer as UserAnswerOption[]).map((option) => {
                      return (
                        <Space key={option.id}>
                          <Radio
                            key={option.name}
                            checked={option.selected}
                            disabled={!option.selected}
                            className='mr-4'
                          >
                            {option.name}
                          </Radio>
                          {option.inputted && <span className='underline'>{option.remark}</span>}
                        </Space>
                      );
                    })}
                  </div>
                )}
                {topic.type === TopicTypeEnum.Checkbox && (
                  <div>
                    {(topic.userAnswer as UserAnswerOption[]).map((option) => {
                      return (
                        <Space key={option.id}>
                          <Checkbox
                            key={option.name}
                            checked={option.selected}
                            disabled={!option.selected}
                            className='mr-4'
                          >
                            {option.name}
                          </Checkbox>
                          {option.inputted && <span className='underline'>{option.remark}</span>}
                        </Space>
                      );
                    })}
                  </div>
                )}
                {topic.type === TopicTypeEnum.Sort &&
                  (topic.userAnswer as UserAnswerOption[]).map((option) => {
                    return (
                      <Row key={option.id} className='flex'>
                        <Col span={12} className='underline'>
                          {option.name}
                        </Col>
                        <Col span={4} className='underline'>
                          {option.remark}
                        </Col>
                      </Row>
                    );
                  })}
                {topic.inputted && (
                  <Space className='mt-4'>
                    <div className='font-500'>{topic.inputtedTopic}:</div>
                    <div>{topic.inputtedRemark}</div>
                  </Space>
                )}
              </Card>
            );
          })}
        </Card>
      </Spin>
    </section>
  );
};

export default ExamDetail;
