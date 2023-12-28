import './index.scss';

import { Menu } from '@arco-design/web-react';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const router: RouterItem[] = [
  {
    title: 'home',
    hasChildren: false,
    path: '/home',
  },
  {
    title: 'login',
    hasChildren: true,
    children: [
      {
        title: 'home',
        hasChildren: false,
        path: '/home',
      },
      {
        title: 'login',
        hasChildren: false,
        path: '/login',
      },
    ],
  },
];

interface RouterItem {
  title: string;
  path?: string;
  hasChildren: boolean;
  icon?: string;
  children?: RouterItem[];
}

const LayoutMenu = () => {
  const [collapse, setCollapse] = useState(false);

  const switchCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className='menu-demo'>
      {/* <Button
        style={{
          padding: '0 12px',
          height: 30,
          lineHeight: '30px',
          marginBottom: 4,
        }}
        type='primary'
        onClick={() => setCollapse(!collapse)}
      >
        {collapse ? <IconMenuUnfold /> : <IconMenuFold />}
      </Button> */}
      <Menu
        // style={{ width: 200, borderRadius: 4 }}
        hasCollapseButton
        theme='dark'
        mode='pop'
        collapse={collapse}
        onCollapseChange={switchCollapse}
        // defaultOpenKeys={['0']}
        // defaultSelectedKeys={['0_2']}
      >
        <LayoutMenuItem page={router}></LayoutMenuItem>
      </Menu>
    </div>
  );
};

const LayoutMenuItem = ({ page }: { page: RouterItem[] }) => {
  const navigate = useNavigate();

  const handleClick = (page: RouterItem) => {
    navigate(page.path!);
  };

  return page.map((item) => {
    return item.children?.length ? (
      <SubMenu
        key={item.title}
        title={
          <>
            <div className='r-ph-anchor-simple-thin' />
            {item.title}
          </>
        }
      >
        <LayoutMenuItem page={item.children}></LayoutMenuItem>
      </SubMenu>
    ) : (
      <MenuItem key={item.title} onClick={() => handleClick(item)}>
        <div className='r-logos-vue text-3xl' />
        {item.title}
      </MenuItem>
    );
  });
};

export default LayoutMenu;
